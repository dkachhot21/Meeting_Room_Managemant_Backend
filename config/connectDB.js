const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const connect = mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("MongoDB Connected",(await connect).connection.host);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;