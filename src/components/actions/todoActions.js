// actions/todoActions.js
export const setInputTodo = (value) => ({
    type: 'SET_INPUT_TODO',
    payload: value,
  });
  
  export const setNotes = (notes) => ({
    type: 'SET_NOTES',
    payload: notes,
  });
  
  export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    payload: todo,
  });
  