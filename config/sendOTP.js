const transporter = require('./emailconfig');

const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'FROM TEKGAI: Your OTP Code',
    html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border: 1px solid #ddd;">
        <h2 style="color: #333; text-align: center;">Login Successful!</h2>
        <p style="font-size: 16px; color: #555; text-align: center;">
          Your OTP code is 
          <strong style="font-size: 18px; color: #28a745;">${otp}</strong>
          <br>
          <span style="font-size: 16px; color: #555; text-align: center;">It will expire in <strong>10</strong> minutes.</span>
        </p>
         <p style="font-size: 16px; color: #555; text-align: center; line-height: 0px"></p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="http://localhost:5173"
             style="display: inline-block; padding: 12px 25px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Back to Login
          </a>
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



module.exports = sendOTPEmail;

