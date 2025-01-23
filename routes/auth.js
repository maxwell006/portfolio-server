const express = require('express');
const router = express.Router();
const User = require("../models/userSchema");
const { authenticateUser, addUser, verifyOTP } = require('../middleware/loginAuth');

// LOGIN USER
router.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    const result = await authenticateUser(username, password);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
});

router.post('/verify-otp', async (req, res) => {
    const { username, otp } = req.body;
    const response = await verifyOTP(username, otp);
    res.json(response);
});

// SIGN UP USER
router.post('/users', async (req, res) => {
    const { username, password, email } = req.body;
    const result = await addUser(username, password, email);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json(result);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (err) {
        console.error(err.message);
    }
})
module.exports = router;
