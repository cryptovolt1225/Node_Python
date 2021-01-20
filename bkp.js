const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let dataToSend
  let largeDataSet = []
  // spawn new child process to call the python script
  // const python = spawn('python', ['script3.py'])
  const python = spawn('python', ['script4.py'])

  // collect data from script
  python.stdout.on('data', function (data) {
    // console.log("Type of Data :: ", typeof data)
    console.log('Data :: ', data)
    // console.log("Data.toString() :: ", data.toString())
    const successBuffer = Buffer.from("<Response [200]>\r\n", 'utf-8')
    console.log("successBuffer :: ", successBuffer)

    const internalServerErrorBuffer = Buffer.from("<Response [500]>\n\r", 'utf-8')
    console.log("internalServerErrorBuffer :: ", internalServerErrorBuffer)

    const missingDataBuffer = Buffer.from("<Response [400]>\n\r", 'utf-8')
    console.log("missingDataBuffer :: ", missingDataBuffer)
    
    const successStatus = Buffer.compare(successBuffer, data)  //  big number = 1, small number=-1   //  all data and success then 0 else error then -1 else if half or missing data then -1
    const internalErrorStatus = Buffer.compare(internalServerErrorBuffer, data)  //  big number = 1, small number=-1   //  all data and success then 0 else error then -1 else if half or missing data then -1
    const missingStatus = Buffer.compare(missingDataBuffer, data)  //  big number = 1, small number=-1   //  all data and success then 0 else error then -1 else if half or missing data then -1

    if(successStatus == 0) {
      console.log("Success Form")    // res - 200 - ok
    } else if(internalServerErrorBuffer == 0) {
      console.log("Form Not Success")
    } else if(missingStatus == 0) {
      console.log("Some Form Data Missing...")    // error
    }

    // if(Buffer.compare(successBuffer, data) == 1) {
    //   console.log("Some Error :: Form Not Submitted many be Data not Provided....")
    // } else if(Buffer.compare(successBuffer, data) == 0) {
    //   console.log("Form Submitted Success...")
    // } else {
    //   console.log("Unknown Error :: ")
    // }

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
