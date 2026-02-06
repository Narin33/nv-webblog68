const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()

// Middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/assets', express.static('public'))

// Authentication setup
require('./userPassport')

// Routes setup
require('./routes')(app)

const port = config.port

// Start Server
sequelize.sync({ force: false })
    .then(() => {
        app.listen(port, '0.0.0.0', () => {
            console.log('Server running on port ' + port)
        })
    })