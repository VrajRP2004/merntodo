const express = require('express')
const app = express();
const port = 5000;
const db = require('./db');
const cors = require('cors');

db();
app.use(express.json())
app.use(cors()); // Allow all origins
app.use('/api/auth',require('./route/UserLogin'))
app.use('/api/auth',require('./route/UserTodo'))

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})