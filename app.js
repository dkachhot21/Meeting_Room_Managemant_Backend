const express = require('express');
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv').config();
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const meetingRoute = require('./routes/meetingsRoute');


const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use('/user',userRoute);
app.use('/meeting',meetingRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});