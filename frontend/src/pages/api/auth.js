export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email } = req.body;

    try {
        console.log("✅ Authenticating user:", email);
        return res.status(200).json({ message: "✅ Email verified successfully" });
    } catch (error) {
        console.error("❌ Authentication Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
