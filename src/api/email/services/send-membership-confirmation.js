"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBookingConfirmation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendBookingConfirmation = async (email, bookingDetails) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Booking Confirmation",
        text: `Dear Customer, your booking is confirmed. Details: ${JSON.stringify(bookingDetails, null, 2)}`,
        html: `<p>Dear Customer, your booking is confirmed.</p><pre>${JSON.stringify(bookingDetails, null, 2)}</pre>`,
    };
    return transporter.sendMail(mailOptions);
};
exports.sendBookingConfirmation = sendBookingConfirmation;
