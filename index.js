const express = require('express')
const { spawn } = require('child_process')
var nodemailer = require('nodemailer')

const app = express()
const port = 5000

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
})

var mailOptions = {
  from: 'from_email@gmail.com',
  to: 'to_email@gmail.com',
  subject: 'Attendance',
  text: 'Your Attendance has been counted.!'
}


app.get('/', (req, res) => {
  let dataToSend
  let largeDataSet = []
  // spawn new child process to call the python script
  // const python = spawn('python', ['script3.py'])
  const python = spawn('python', ['script4.py'])

  // collect data from script
  python.stdout.on('data', function (data) {

    const successStatus = data.toString().localeCompare("<Response [200]>\r\n");
    // console.log("Success Same :: " , successStatus);

    const internalStatus = data.toString().localeCompare("<Response [500]>\r\n");
    // console.log("Internal Same :: " , internalStatus);

    const missingStatus = data.toString().localeCompare("<Response [400]>\r\n");
    // console.log("Missing Same :: " , missingStatus);

    if(successStatus == 0) {
      console.log("Form Submitted Successfully");
      // send Mail
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    }
    if(internalStatus == 0) {
      console.log("Form Not Submitted");
    }
    if(missingStatus == 0) {
      console.log("Some Data Missing in Form");
    }

    dataToSend =  data
    largeDataSet.push(data)
  })

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    res.send(largeDataSet.join(''))
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
