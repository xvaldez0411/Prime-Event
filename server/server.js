require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()) 

require('./config/mongoose.config')

require('./routes/event.route')(app)
require('./routes/user.route')(app) //added for LR



app.listen(process.env.MY_PORT, () => console.log(`Locked and loaded on port: ${process.env.MY_PORT}`))