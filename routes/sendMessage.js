const express = require('express');
const router = express.Router();
const transporter = require('../config/emailconfig');
const Contact = require("../models/contactSchema");
const dotenv = require('dotenv');
dotenv.config();

router.post('/contact', async (req, res) => {
    const { name, email, subject, gender, message } = req.body;

    if (!name || !email || !message || !subject || !gender) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const newContact = new Contact({
        name,
        email,
        subject,
        message,
        gender
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${email}`,
        subject: `New message from TEKGAI`,
        html: `
                    <h2 style="text-transform: uppercase; font-family: "sans-serif">Thank you for contacting TEKGAI</h2>
                    <p>Your message was sent successfully</p>
                `,
    };
    const myMailOptions = {
        from: `${email}`,
        to: process.env.EMAIL_USER,
        subject: `New message from ${email}`,
        html: `
                    <h3 style="text-transform: uppercase; font-family: "sans-serif">Subject: ${subject}</h3>
                    <p>Message: ${message}</p>
                     <p>Gender: ${gender}</p>
                `,
    };
    try {
        await newContact.save();
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(myMailOptions);
        res.status(200).json({ success: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});
router.get('/contact', async (req, res) => {
    try {
        const contact = await Contact.find({});
        res.status(200).json(contact)
    } catch (err) {
        console.error(err.message);
    }
})

router.get('/contact/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id)
        if (!contact) {
            res.status(400).json({ message: "No item found" })
        }
        res.status(200).json({
            message: "Success",
            sucess: true,
            items: contact
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        })

    }
})
module.exports = router;
