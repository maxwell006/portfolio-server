require('dotenv').config();
const express = require('express');
const mongoDBConnection = require("./config/db");
// IMPORTS
const cors = require('cors');
const PORT = process.env.PORT;
const multer = require("multer");
const cloudinary = require("cloudinary");
// FILE IMPORTS
const authRoutes = require('./routes/auth');
const message = require('./routes/sendMessage');
const heroPage = require('./routes/heropage');
const Settings = require('./routes/settings');
const Socials = require('./routes/socialMedia');
const About = require('./routes/about');
const Projects = require("./routes/projectPage");
const Services = require("./routes/services");
const WhatIKnowPage = require("./routes/whatIKnowRoute");
const app = express();

// MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// MONGODB
mongoDBConnection();

//========= ALL  REQUESTS ================//
app.get('/', (req, res) => {
  res.send('Tekgai in the building');
});
app.use('/api', heroPage);
app.use('/api', message);
app.use('/api', Settings);
app.use('/api', Socials);
app.use('/api', About);
app.use('/api', Projects);
app.use('/api', Services);
app.use('/api', WhatIKnowPage);
// LOGIN USER
app.use('/api', authRoutes);



// SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
