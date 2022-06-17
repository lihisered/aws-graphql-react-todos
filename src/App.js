import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { loadTodos, updateTodo, addTodo, removeTodo } from './store/actions/todoActions'

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const initialState = { name: '', description: '' }

const App = () => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState(initialState)
  const todos = useSelector(state => state.todoModule.todos)

  useEffect(() => {
    dispatch(loadTodos())
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out:', error);
    }
  }

  async function onAddTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setFormState(initialState)
      dispatch(addTodo(todo))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function onRemoveTodo(todoId) {
    const input = { id: todoId }
    try {
      dispatch(removeTodo(input))
    } catch (err) {
      console.log('error removing todo:', err)
    }
  }

  async function onUpdateTodo(todoId) {
    const description = prompt('Enter new description')
    const input = { id: todoId, description }
    try {
      dispatch(updateTodo(input))
    } catch (err) {
      console.log('error updating todo:', err)
    }
  }

  return (
    <div style={styles.container}>
      <button onClick={signOut}>sign out</button>
      <h2>Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={onAddTodo}>Create Todo</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p>{todo.id}</p>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
            <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
            <button onClick={() => onUpdateTodo(todo.id)}>Update</button>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App)
// export default App