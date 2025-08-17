import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"PayTrack" <noreply@myapp.com>',
      to,
      subject,
      text,
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
