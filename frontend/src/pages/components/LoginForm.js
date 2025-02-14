"use client"

import { useState } from "react";
import styles from "../../styles/Home.module.css"

export default function Home() {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            email,
            message: `Dear User,
            Welcome to Chatify! 🎉 We're excited to have you on board. Before you start chatting, please verify your email address to secure your account.
        
        Click the button below to verify your email:
        
        🔹 Verify Email
        
        If you didn't sign up for Chatify, please ignore this email.
        
        Happy chatting!  
        - The Chatify Team 🙂`,
        };
try {
    const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 200) {
        setMessage("✅ Email sent successfully!");
    } else {
        setMessage("❌ Error sending email!");
    }
} catch (error) {
    setMessage("❌ Failed to send email!");
}

setEmail("");
setUser("");
  };

return (
    <div className={styles.container}>
        <form className={styles.main} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>Login</h1>

            <label htmlFor="user">Username:</label>
            <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className={styles.input}
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
            />

            <button type="submit" className={styles.button}>
                Submit
            </button>

            {message && <p className={styles.message}>{message}</p>}
        </form>
    </div>
);
}
