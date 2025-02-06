const path = require('path')
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

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/transactions', transactions)
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('*', (req, res) =>
res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')))

// if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('client/dist'))

    // app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')))

    // const __dirname = path.resolve()
    // app.use(express.static(path.join(__dirname, 'client/dist')))

    // app.get('*', (req, res) =>
    //     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
//     )
// }


app.listen(PORT, console.log(`Running`.blue.bold))
