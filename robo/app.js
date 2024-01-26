
//send otp using twilo trail account 
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const otpGenerator = require('otp-generator')

const app = express();
const port = 3000;

app.use(bodyParser.json());

const accountSid = 'AC3d9afb3597fb15d5f78e94e5247e0893';
const authToken = 'd98df925f53a860603ebcdb982a84044';
const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  let otp= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  const { to } = req.body;
  console.log(to);

  try {
    const sentMessage = await client.messages.create({
      body: `your otp is ${otp}`,
      from: "+17243023259",
      to,
    });
    console.log('SMS sent:', sentMessage.sid);
    res.status(200).send('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
