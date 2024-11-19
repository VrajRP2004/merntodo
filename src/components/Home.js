import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInputTodo, setNotes, addTodo } from './actions/todoActions';

function Home() {
  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { inputtodo, notes } = useSelector((state) => state.todo);

  // Handle change in input field
  function onchange(e) {
    dispatch(setInputTodo(e.target.value)); // Dispatch action to update input value
  }

  // Function to fetch all notes (todos)
  async function allNotes() {
    try {
      const response = await fetch('http://localhost:5000/api/auth/gettodo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'u-id': localStorage.getItem('idid'),
        },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch(setNotes(json)); // Dispatch action to store todos in Redux
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  // Fetch todos when the component mounts
  useEffect(() => {
    allNotes();
  }, [dispatch]); // Only run once on component mount

  // Handle adding a new todo
  async function onclick() {
    if (inputtodo === '' || inputtodo.length < 3) {
      alert('Todo list name must be at least 3 characters long');
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/auth/addtodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'u-id': localStorage.getItem('idid'),
          },
          body: JSON.stringify({ task: inputtodo }),
        });

        if (response.ok) {
          const todo = await response.json();
          dispatch(addTodo(todo)); // Dispatch action to add new todo to Redux state
          dispatch(setInputTodo('')); // Clear the input field
        } else {
          console.error('Failed to add todo');
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  }

  return (
    <div style={style.div}>
      <div style={style.div1}>
        <input
          style={style.input}
          name="todo"
          onChange={onchange}
          value={inputtodo}
          type="text"
          placeholder="Enter todo"
        />
        <button style={style.button} type="button" onClick={onclick}>
          Add
        </button>

        {/* Render todos */}
        <div>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <p key={note._id}>{note.task}</p> // Render each todo task, using unique _id as key
            ))
          ) : (
            <p>No todos available</p> // Display a message if there are no todos
          )}
        </div>
      </div>
    </div>
  );
}

const style = {
  input: {
    backgroundColor: 'pink',
    width: '200px',
    alignItems: 'center',
    margin: '10px',
  },
  button: {
    margin: '10px',
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  div1: {
    width: '300px',
    backgroundColor: 'lightblue',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '5px',
    padding: '10px',
  },
};

export default Home;
