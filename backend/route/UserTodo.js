const express = require('express')
const router = express.Router();
const {body,validationResult} = require('express-validator')
const Todo = require('../model/Todo')

// fetch all notes by id using /api/notes/gettodo
router.get('/gettodo', async (req, res) => {
    try {
        const uid = req.header('u-id');  // Get the user ID from the request header
        if (!uid) {
            return res.status(400).send('User ID is required');
        }
        
        console.log(uid);  // Log the user ID for debugging
        
        // Find todos where the userId matches the provided uid
        const todos = await Todo.find({ userId: uid });
        
        if (todos.length === 0) {
            return res.status(404).send('No todos found for this user');
        }
        
        // Send the todos back as a JSON response
        res.json(todos);
        console.log(todos);  // Log the todos

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});




// ROUTE : Add a new Note using : POST "/api/notes/addtodo" Login required

router.post('/addtodo', [
    body('task', 'task length must be at least 3').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { task } = req.body;
        const userId = await req.header('u-id')
        if(userId.isEmpty){
            return res.status(400).json(userId)

        }
        // if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            console.log('vraj')
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Todo({
           task,userId
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

router.delete('/deletetodo/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Get the todo's ID from the URL parameters
        const uid = req.header('u-id');  // Get the user ID from the request header

        if (!uid) {
            return res.status(400).send('User ID is required');
        }

        // Find the todo and delete it if it matches the userId
        const todo = await Todo.findOneAndDelete({ 
            _id: id, 
            userId: uid 
        });

        if (!todo) {
            return res.status(404).send('Todo not found or not authorized to delete this todo');
        }

        // Respond with a success message
        res.json({ message: 'Todo deleted successfully' });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router