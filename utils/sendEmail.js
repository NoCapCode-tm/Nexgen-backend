import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.nocapcode.clou",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"NoCapCode" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
