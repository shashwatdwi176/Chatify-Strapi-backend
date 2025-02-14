"use client";

import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            const authResponse = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const authData = await authResponse.json();
            if (!authResponse.ok) {
                throw new Error(authData.error || "Authentication failed");
            }

            setToken(authData.token);

            const mailResponse = await fetch("/api/mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token: authData.token }),
            });

            const mailData = await mailResponse.json();
            if (!mailResponse.ok) {
                throw new Error(mailData.error || "Failed to send email");
            }

            setMessage("✅ Verification email sent! Check your inbox.");
            setMessageType("success");
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.main} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Login to Chatify</h1>

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                    disabled={loading}
                />

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? <span className={styles.loader}></span> : "Verify Email"}
                </button>

                {message && <p className={`${styles.message} ${styles[messageType]}`}>{message}</p>}
            </form>
        </div>
    );
}
