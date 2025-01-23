const transporter = require('./emailconfig');

const welcomeNewUser = (email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'FROM TEKGAI',
        html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border: 1px solid #ddd;">
        <h2 style="color: #333; text-align: center;">Login Successful!</h2>
        <p style="font-size: 16px; color: #555; text-align: center;">
        Your account was created successfully
         <br/> <strong style="font-size: 18px; color: #28a745;">Welcome to TEKGAI</strong>
        </p>
         <p style="font-size: 16px; color: #555; text-align: center; line-height: 0px"></p>
         <div style="text-align: center; margin-top: 30px;">
          <a href="https://tekgai.netlify.app"
             style="display: inline-block; padding: 12px 25px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Go to Portfolio
          </a>
        </div>
        </div>
      </div>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};



module.exports = welcomeNewUser;

