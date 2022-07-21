
/* rentsRouter handles requests to url /api/rents */
const rentsRouter = require('express').Router()
const Rent = require('../models/rent')

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
    res.status(201).json(savedRent)
  }
})

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