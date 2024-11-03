const mongoose = require('mongoose')
require('dotenv').config()

const dbConfig = () => {
    
    const dbConnect = process.env.MONGO_URL 

    mongoose.connect(dbConnect, {})
    .then(() => {
        console.log("Db connection successful");
    })
    .catch(error => console.log("error connecting to dB ", error.message))

}

module.exports = dbConfig;