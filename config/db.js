const { config } = require('dotenv')
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
        })

        console.log(`MongoDB connection success: ${conn.connection.host}`.cyan.underline)

    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB

