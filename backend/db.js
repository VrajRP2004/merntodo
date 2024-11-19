const mongoose = require('mongoose')
require("dotenv").config();


const url = 'mongodb+srv://vrajprajapati07132004:TxCJj0FUtiMnxlxR@authrouting.pkugp.mongodb.net/?retryWrites=true&w=majority&appName=AuthRouting;';

const connectToMongose = () =>{
    mongoose.connect(url);
    console.log('mongo database connected successfully')
}

module.exports = connectToMongose;
