const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

connectDB()

const transactions = require('./routes/transactions')

const app = express()

app.use(express.json())

app.use('/api/v1/transactions', transactions)
app.listen(PORT, console.log(`Running`.blue.bold))