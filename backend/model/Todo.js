const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    task:{
        type:String,
        require:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'todouser'
    }
})
const  Todo = mongoose.model('todo',todoSchema)
module.exports = Todo;