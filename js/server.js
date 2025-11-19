import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle booking form submission
app.post("/send-booking", async (req, res) => {
  const { email, arrival, departure, guests, room, amount, paymentMethod, paymentDateTime } = req.body;

  // Configure email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "it@hunasholdings.com",
      pass: "ljpn tsue xmlw dzpd" // Gmail App Password (securely generated in account)
    }
  });

  // Email content
  const mailOptions = {
    from: "it@hunasholdings.com",
    to: "kalani@tadlanka.com",
    subject: "New Booking Received - Boulder Garden",
    text: `
📅 New Booking Details:

Email: ${email}
Arrival Date: ${arrival}
Departure Date: ${departure}
Guests: ${guests}
Room Type: ${room}
Payment Amount: ${amount}
Payment Method: ${paymentMethod}
Booking Time: ${paymentDateTime}

------------------------
Thank you,
Boulder Garden Reservation System
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Booking email sent to kalani@tadlanka.com for ${email}`);
    res.json({ success: true, message: "Booking email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
