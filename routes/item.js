const express = require('express')
const router = express.Router()
const Item = require('../models/item')

// Getting all
router.get('/', async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
// getItem is the middleware
router.get('/:id', getitem, (req, res) => {
  res.json(res.item)
})

// Creating one
router.post('/', async (req, res) => {
  const item_ = new Item({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  })
  try {
    const newitem = await item_.save()
    res.status(201).json(newitem)
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getitem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name
  }
  if (req.body.email != null) {
    res.item.email = req.body.email
  }
  if (req.body.mobile != null) {
    res.item.mobile = req.body.mobile
  }
  try {
    const updateditem = await res.item.save()
    res.json(updateditem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getitem, async (req, res) => {
  try {
    await res.item.remove()
    res.json({ message: 'Deleted item' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getitem(req, res, next) {
  let item_
  try {
    item_ = await Item.findById(req.params.id)
    if (item_ == null) {
      return res.status(404).json({ message: 'Cannot find item' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.item = item_
  next()
}

module.exports = router