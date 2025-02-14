export default function (req, res) {
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      secure: "true",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
    const mailData = {
      from: "Chatify <" + process.env.EMAIL_USER + ">",
      to: req.body.email,
      subject: `Verify your email for Chatify`,
      text: req.body.message,
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err)
        return res.status(500).json({ message: `an error occurred ${err}` });
      res.status(200).json({ message: info });
      de;
    });
  }