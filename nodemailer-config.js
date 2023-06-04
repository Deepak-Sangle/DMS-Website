const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_GMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

const sendEmail = async  (email, otp, content)=> {
  return new Promise((resolve, reject)=> {
    transport.sendMail({
      from: process.env.ADMIN_GMAIL,
      to: email,
      subject: content.subject,
      html: content.body,
    }, (err, info)=> {
      if(err) {
        console.log(err);
        reject(err);
      }
      else{
        console.log("Email Sent: ", info);
        resolve(info);
      }
    });
  })
}

async function sendConfirmationEmail(email, otp, content) {
  const res = await sendEmail(email, otp, content);
  console.log(otp);
};

module.exports = sendConfirmationEmail;