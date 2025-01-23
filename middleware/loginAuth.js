const bcrypt = require('bcryptjs');
const User = require("../models/userSchema");
const generateOTP = require('../config/generateOTP');
const sendOTPEmail = require('../config/sendOTP');
const welcomeNewUser = require('../config/welcomeMessage');

const authenticateUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return {
                success: false,
                message: `Sorry! ${username} is not a user.`
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                success: false,
                message: 'Login failed. Wrong password.'
            };
        }

        // Genrate the OTP from the function I called in the generateOTP file
        const otp = generateOTP();
        user.otp = otp;

        // So that the OTP will expire in 10mins time
        user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        // Send OTP to the email
        sendOTPEmail(user.email, otp);

        return {
            success: true,
            message: `OTP sent to ${user.email}.`,
        };
    } catch (err) {
        console.error(err.message);
        return {
            success: false,
            message: 'Login failed: Server error.'
        };
    }
};

const verifyOTP = async (username, otp) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return {
                success: false,
                message: 'Verification failed: User not found.'
            };
        }

        if (user.otp !== otp || new Date() > user.otpExpiresAt) {
            return {
                success: false,
                message: "OTP doesn't match or has expired."
            };
        }

        // Make the OTP dissapear after successful validation
        user.otp = undefined;

        user.otpExpiresAt = undefined;
        await user.save();

        return {
            success: true,
            message: 'Login successful!',
            user
        };
    } catch (err) {
        console.error(err.message);
        return {
            success: false,
            message: 'Verification failed: Server error.'
        };
    }
};

// SIGN UP ROUTE
const addUser = async (username, password, email) => {
    try {
        if (!email) {
            return {
                success: false,
                message: 'Email is required.'
            };
        }

        if (password.length < 6) {
            return {
                success: false,
                message: 'Password must be greater than 6 characters.'
            };
        }

        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUser || existingEmail) {
            return {
                success: false,
                message: 'Email or Username already exists.'
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        welcomeNewUser(email);
        await newUser.save();

        return { success: true, message: 'User added successfully!' };
    } catch (err) {
        console.error(err.message);
        return { success: false, message: 'Failed to add user. Server error.' };
    }
};

module.exports = { authenticateUser, addUser, verifyOTP };
