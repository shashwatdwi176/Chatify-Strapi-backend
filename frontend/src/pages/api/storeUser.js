import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { username, email } = req.body;
    const SECRET = "this is a secret";  // ⚠️ Replace with a strong secret key

    try {
        // Generate JWT Token
        const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

        // Prepare Data for Strapi
        const strapiData = {
            data: { username, email, token },
        };

        // Send Data to Strapi
        const strapiResponse = await fetch("http://localhost:1337/api/accounts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(strapiData),
        });

        const strapiResult = await strapiResponse.json();

        if (!strapiResponse.ok) {
            console.error("❌ Strapi Error:", strapiResult);
            return res.status(500).json({ error: strapiResult.error || "Failed to store user in Strapi" });
        }

        return res.status(200).json({ message: "✅ User stored in Strapi successfully", data: strapiResult });
    } catch (error) {
        console.error("❌ Server Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
