/* eslint-disable no-unused-vars */
/* rentsRouter handles requests to url /api/rents */
const rentsRouter = require('express').Router()
const Rent = require('../models/rent')
const nodeMailer = require('nodemailer')
const config = require('../utils/config')

/* Function to handle post request. */ 
rentsRouter.post('/', async (req, res) => {
  const body = req.body
  if (!body.name || !body.number || !body.guests || !body.startDate ||
     !body.endDate || !body.email || !body.lisatieto || !body.address ) {
    return res.status(400).json({
      error: 'Aseta kaikki tiedot'
    })
  }
  else {
    const rentinf = new Rent({
      name : body.name,
      number : body.number,
      guests: body.guests,
      startDate: body.startDate,
      address: body.address,
      endDate: body.endDate,
      email: body.email,
      lisatieto: body.lisatieto
    })
  
    const savedRent = await rentinf.save()
    /** Sending email with all the data */
    console.log(config.EMAIL)
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.EMAIL,
        pass: config.PASS
      }
    })

    let mailOptions = {
      from: '"poropeukalo" <porobotti@gmail.com>', // sender address
      to: body.email, //receiver address
      subject: 'varausvahvistus', 
      text: `Kiitos varauksestasi, varaus toteutettiin näillä tiedoilla: \n ${JSON.stringify(rentinf)}`, 
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
      res.render('index')
    })
  }})

/*Function handles get request. Return all the json data in the mongodb server  */ 
rentsRouter.get('/', async (req,res) => {
  const rents = await Rent
    .find({})
  res.json(rents)
})

rentsRouter.delete('/', async (req,res) => {
  await Rent.deleteMany({}) //POISTAA KAIKEN DATAN PALVELIMELTA
  res.status(204).end()
})

module.exports = rentsRouter