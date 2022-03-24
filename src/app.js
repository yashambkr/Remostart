const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000;

require('./db/conn')
const register = require('./models/registers');

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views')
app.use(express.static(static_path))
app.set('view engine', 'hbs')
app.set('views', template_path)

app.get('/', (req, res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})