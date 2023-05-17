const mongoose = require('mongoose')

const itemrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
  }
})


// items is the name of the collection in sample_visity database
module.exports = mongoose.model('items', itemrSchema)