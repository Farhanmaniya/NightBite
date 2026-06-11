const transporter = require("../config/nodemailer");

const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email to you
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Message from ${name} - NightBite`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "We received your message — NightBite",
            html: `
                <h2>Hi ${name}!</h2>
                <p>Thanks for reaching out. We received your message and will get back to you shortly.</p>
                <br/>
                <p>— NightBite Team 🌙</p>
            `,
    });

    res.status(200).json({ message: "Message sent successfully" });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendContactEmail };