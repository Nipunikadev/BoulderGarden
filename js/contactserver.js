import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle contact form submission
app.post("/send-contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "it@hunasholdings.com",   // your sending email
      pass: "ljpn tsue xmlw dzpd"     // your Gmail App password
    }
  });

  // Email content
  const mailOptions = {
    from: "it@hunasholdings.com",
    to: "kalani@tadlanka.com",        // hotel email
    subject: `New Contact Message: ${subject}`,
    text: `
📧 New Message from Contact Form:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

------------------------
Thank you,
Boulder Garden Contact System
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Contact email sent from ${email}`);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
