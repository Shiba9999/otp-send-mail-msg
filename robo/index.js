
//send otp through nodemailer

const express = require('express');
var cors = require("cors");
const userRouter = require('./user.routes');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const app = express();
app.use(cors());//to handle cors error 
app.use(express.json());
const port = 3000;

const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: 'demoshiba4@gmail.com', // Your Gmail email address
      pass: 'xprw sywf yboh agtb', // Your Gmail password (use app-specific password for better security)
    },
  })

  app.post('/send-email', (req, res) => {
    let otp= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    console.log('Generated OTP:', otp);
    console.log(req.body);
    const { to } = req.body;
    const mailOptions = {
        from: 'demoshiba4@gmail.com', // Sender's email address
        to,
        subject: 'Your OTP', // Subject of the email
        text: `your OTP: ${otp}`, // Body of the email containing the OTP
      };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });

// app.use("/api/v1/users",userRouter)

app.listen(port, () => {
    console.log(`server is running ${port}` );
  });