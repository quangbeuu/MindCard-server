const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user, resetToken) {
    this.user = user;
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.resetToken = resetToken;
    this.from = "superquang08@gmail.com";
  }

  // Gửi email thực tế
  async send(templateId, subject, dynamic_template_data = {}) {
    // 1. Khai báo các cài đặt email
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      templateId,
      dynamic_template_data,
    };
    console.log(mailOptions);

    // 2) Create a transport and send email
    await sgMail.send(mailOptions).then(
      (response) => {
        console.log("mail-sent-successfully", {
          templateId,
          dynamic_template_data,
        });
        console.log("response", response);
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  }
  async sendPasswordReset() {
    console.log(this.to);
    const dynamic_template_data = {
      name: this.user.name,
      resetToken: this.resetToken,
    };
    await this.send(
      "d-22ac5511f72d4299bbb54533c3d35739",
      "Your password reset token (valid for only 10 minutes)",
      dynamic_template_data
    );
  }
};
