const express = require('express');
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { specs, swaggerUi } = require("./swagger");
const PORT = process.env.PORT || 3000;


const userRoute = require('./routes/userRoute');
const meetingRoute = require('./routes/meetingsRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send("Hello Welcome to the Meeting Room Management API, Goto  /api-docs for more information.");
})

app.use('/user', userRoute);
app.use('/meeting', meetingRoute);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});