"use client";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            console.log("🔹 Requesting JWT Token...");

            // Fetch the token from API
            const tokenResponse = await fetch("/api/generateToken", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const tokenData = await tokenResponse.json();
            if (!tokenResponse.ok) throw new Error(tokenData.error || "Token generation failed");

            console.log("✅ JWT Token Received:", tokenData.token);

            // Authenticate User
            const authResponse = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const authData = await authResponse.json();
            if (!authResponse.ok) throw new Error(authData.error || "Authentication failed");

            // Store User in Strapi
            const strapiResponse = await fetch("/api/storeUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email }),
            });

            const strapiData = await strapiResponse.json();
            if (!strapiResponse.ok) throw new Error(strapiData.error?.message || "Failed to save user in Strapi");

            setMessage("✅ Account created & verification email sent! Check your inbox.");
            setMessageType("success");
        } catch (error) {
            console.error("❌ Error:", error);
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

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={styles.input}
                    disabled={loading}
                />

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
