import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      if (!action.payload.text.trim()) return state;
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text.trim(),
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
};

const AppContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f7f6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const TodoForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const TodoInput = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const TodoListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItemContainer = styled.li`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TodoText = styled.span`
  flex-grow: 1;
  font-size: 18px;
  color: #333;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  color: ${(props) => (props.completed ? '#888' : '#333')};
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  &:hover {
    background-color: #c82333;
  }
`;

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [], (initial) => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : initial;
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      return initial;
    }
  });
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', payload: { text: newTodoText } });
    setNewTodoText('');
  };

  return (
    <AppContainer>
      <Title>PROTYASISH'S Todo App</Title>
      <TodoForm onSubmit={handleAddTodo}>
        <TodoInput
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <AddButton type="submit">Add</AddButton>
      </TodoForm>
      <TodoListContainer>
        {todos.map((todo) => (
          <TodoItemContainer key={todo.id}>
            <TodoText
              completed={todo.completed}
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
            >
              {todo.text}
            </TodoText>
            <DeleteButton onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}>
              Delete
            </DeleteButton>
          </TodoItemContainer>
        ))}
      </TodoListContainer>
    </AppContainer>
  );
}

export default App;


