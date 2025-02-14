import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email } = req.body;
    const SECRET = "this is a secret"; // Change this to a strong secret key!

    try {
        const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

        return res.status(200).json({ token });
    } catch (error) {
        console.error("❌ JWT Generation Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
