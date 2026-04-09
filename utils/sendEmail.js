import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "nocapcode.cloud",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.verify();

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"NoCapCode" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
