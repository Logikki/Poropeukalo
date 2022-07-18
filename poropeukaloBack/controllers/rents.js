const rentsRouter = require('express').Router()
const Rent = require('../models/rent')

rentsRouter.post('/', async (req, res) => {
  const body = req.body

  const rentinf = new Rent({
    name : body.name,
    number : body.number,
    guests: body.guests,
    startDate: body.startDate,
    endDate: body.endDate,
    email: body.email,
    lisatietoja: body.lisatietoja
  })

  const savedRent = await rentinf.save()
  res.status(201).json(savedRent)

})

rentsRouter.get('/', async (req,res) => {
  const rents = await Rent
    .find({})
  res.json(rents)
})

rentsRouter.delete('/', async (req,res) => {
  await Rent.deleteMany({})
  res.status(204).end()
})

module.exports = rentsRouter