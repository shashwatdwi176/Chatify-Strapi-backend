// src/pages/api/auth.js
import jwt from "jsonwebtoken";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const SECRET = process.env.JWT_SECRET || "this_is_a_secret"; // Store in .env
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

    return res.status(200).json({ token });
}
