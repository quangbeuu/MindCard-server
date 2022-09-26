const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Cần tạo 1 trình gửi mail (gmail, ...)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2. Khai báo các email options
  const mailOptions = {
    from: "Mind Card <mindcard@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3. Gửi email bằng nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
