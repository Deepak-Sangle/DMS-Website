const nodemailer = require("nodemailer");
const fs = require('fs');
const ejs = require('ejs');

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_GMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

const sendEmail = async  (email, htmlContent, subject)=> {
  return new Promise((resolve, reject)=> {
    transport.sendMail({
      from: process.env.ADMIN_GMAIL,
      to: email,
      subject: subject,
      html: htmlContent,
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

async function sendConfirmationEmail(email, user, contentType, extraInfo) {
    let path, subject;
    if(contentType === "NEW_ACCOUNT"){
        path = './email/new_account.ejs';
        subject = "Confirm your DMS account";
    }
    else if(contentType === "NEW_PASSWORD"){
        path = './email/new_password.ejs';
        subject = "Request for new Password";
    }

    const htmlFileString = fs.readFileSync(path, "utf-8");
    console.log({ user, ...extraInfo });
    const htmlContent = ejs.render(htmlFileString, { user, ...extraInfo });
    await sendEmail(email, htmlContent, subject);
    console.log(user.confirmationCode);
};

module.exports = sendConfirmationEmail;