const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number:{
    type: String,
    minlength: 8,
    required: true,
  },
  guests: {
    type: Number,
    required: true 
  },

  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  lisatietoja: String
})

rentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Rent', rentSchema)