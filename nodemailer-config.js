const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_GMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

function sendConfirmationEmail(email, otp) {
    console.log(otp);
    transport.sendMail({
        from: process.env.ADMIN_GMAIL,
        to: email,
        subject: "Please confirm your DMS account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${email}$</h2>
            <p>Thank you for Registering in DMS-WebApp. Here is the one time password for your verification of the email id.</p>
            <br/>
            <h3>${otp}</h3>
            <br/>
            <p>If the above request is not initiated by you please report it immediately by clicking <a href="localhost:3000/report/verification">here</a> </p>
            </div>`,
      }, (err, info)=> {
        if(err) {
          console.log(err);
        }
        else{
          console.log("Email Sent: ", info);
        }
      });
};

module.exports = sendConfirmationEmail;