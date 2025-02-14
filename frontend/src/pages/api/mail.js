// src/pages/api/mail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, token } = req.body;

    if (!email || !token) {
        return res.status(400).json({ error: "Email and token are required" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail email
            pass: process.env.EMAIL_PASS, // App password (not your actual password)
        },
    });

    const verificationLink = `https://yourdomain.com/verify?token=${token}`;

    const mailOptions = {
        from: `"Chatify Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your Email - Chatify",
        html: `
            <h2>Welcome to Chatify! 🎉</h2>
            <p>We're excited to have you on board. Before you start chatting, please verify your email address.</p>
            <p>Click the button below to verify your email:</p>
            <a href="${verificationLink}" style="display:inline-block; padding:10px 20px; color:#fff; background-color:#007bff; text-decoration:none; border-radius:5px;">
                Verify Email
            </a>
            <p>If you didn't sign up for Chatify, please ignore this email.</p>
            <p>- The Chatify Team 🙂</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Verification email sent!" });
    } catch (error) {
        console.error("Email Error:", error);
        return res.status(500).json({ error: "Failed to send email." });
    }
}
