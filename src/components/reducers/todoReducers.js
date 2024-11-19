// reducers/todoReducer.js
const initialState = {
    inputtodo: '',
    notes: [],
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_INPUT_TODO':
        return {
          ...state,
          inputtodo: action.payload,
        };
      case 'SET_NOTES':
        return {
          ...state,
          notes: action.payload,
        };
      case 'ADD_TODO':
        return {
          ...state,
          notes: [...state.notes, action.payload], // Add new todo to the list
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  