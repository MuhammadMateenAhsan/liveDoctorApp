const mongoose = require("mongoose")
const colors = require("colors")
// const config = {
//     autoIndex:true,
//     useNewUrlParser:true,
// }

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongooDB is connected at ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`MongooDB connection issue ${error}`.bgRed.white)
    }
}

module.exports = connectDB


// const connection = 'enteryour uri' 
// mongoose.connect(connection, config)
// .then(() =>console.log('Connected to Mongo'))
// .catch(err => console.log('Error', err))







