const express = require("express");
const nodemailer = require("nodemailer");
const router = require("./BlogsArticles.routes");
const app = express();



router.get("/subscribe", (req, res) => {
  res.render("contact");
});

router.post("/send", (req, res) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    service: "Gmail",
    auth: {
        user: "pytester26@gmail.com",
        pass: "Testit012"
    }
});



  let mailOptions2 = {
    from: '"Draod" <noreply@teamDroad>', // sender address
    to: `${req.session.loggedInUser.email}`,
    // list of receivers
    subject: "Thank you for subscribing to Droad.", // Subject line
    html:
      // <h1> Hi ${req.body.name} ,</h1>
      `<h1> Hi ${req.session.loggedInUser.name} ,</h1>
      <p><a href="https://droad.herokuapp.com/">Read the news</a></p><br>
      <br>We will get in touch with you soon</br>
       <br>
       <br>
    <p>Thank you for subscribing ${req.session.loggedInUser.name} </p>
    <p>Best Regards </p>
    <h3> Team Droad</h3>
    <p>Your news app. </p> 
  `,

    // html body
  };

  

  // send mail with defined transport object
  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.redirect('/dashboard');
    // res.render('contact', {msg:'Email has been sent'});
  });
});

module.exports = router;
