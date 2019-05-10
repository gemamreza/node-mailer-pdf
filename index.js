const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Selamat Datang di INVOICE-HANDLEBARS</h1>')
})

app.use('/pdf', require('./router/pdf'))

app.listen(port, () => console.log('Berjalan di Port ' + port))