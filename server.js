require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    serverApi: {
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true
    }
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const itemRouter = require('./routes/item')
app.use('/item', itemRouter)
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})
app.get('/mdb.min.css', (req, res) => {
    res.sendFile(__dirname + "/public/mdb.min.css")
})
app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + "/public/main.js")
})

app.listen(3000, () => console.log('Server Started'))