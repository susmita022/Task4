const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/files/index.html');
})
app.post('/', (req, res) =>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'sushdash2001@gmail.com',
          pass: 'demsrkl2007',
        }
      })
      const mail ={
          from: req.body.name,
          to: req.body.email,
          subject: req.body.subject,
          text: `Mail from ${req.body.name}  \n${req.body.message}`
      }
      

      transporter.sendMail(mail, (error,info) => {
        if (error) {
          console.log(error);
          res.send("Something went wrong.");
        } else {
          console.log("Email successfully sent to recipient!" + info.response)
          res.send('success')
        }
      })
})
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})