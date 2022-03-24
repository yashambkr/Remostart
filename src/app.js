const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;

require('./db/conn')

const static_path = path.join(__dirname, '../public')
app.use(express.static(static_path))

app.get('/', (req, res) => {
    res.send("hello Remostart")
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})