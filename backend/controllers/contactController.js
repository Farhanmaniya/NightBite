const transporter = require("../config/nodemailer");

const escapeHTML = (str) => {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
};

const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Prevent NoSQL Injection / Type Tampering
        if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
            return res.status(400).json({ message: "Invalid input types" });
        }

        // Validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Escape inputs to prevent HTML/XSS injection in emails
        const escapedName = escapeHTML(name);
        const escapedEmail = escapeHTML(email);
        const escapedMessage = escapeHTML(message);

        // Email to you
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Message from ${escapedName} - NightBite`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${escapedName}</p>
                <p><strong>Email:</strong> ${escapedEmail}</p>
                <p><strong>Message:</strong></p>
                <p>${escapedMessage}</p>
            `,
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email, // Can be sent to unescaped email since SMTP sends to this address string, but escaped name is used below
            subject: "We received your message — NightBite",
            html: `
                <h2>Hi ${escapedName}!</h2>
                <p>Thanks for reaching out. We received your message and will get back to you shortly.</p>
                <br/>
                <p>— NightBite Team 🌙</p>
            `,
    });

    res.status(200).json({ message: "Message sent successfully" });
    } catch (error){
        console.error("Error in contact email:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};

module.exports = { sendContactEmail };