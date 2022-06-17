import { API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '../graphql/queries'
import { createTodo, deleteTodo, updateTodo } from '../graphql/mutations'

export const todoService = {
    query,
    add,
    remove,
    update
}

async function query() {
    try {
        const todoData = await API.graphql(graphqlOperation(listTodos))
        const todos = todoData.data.listTodos.items
        // setTodos(todos)
        return todos
    } catch (err) {
        console.log('error fetching todos')
    }
}

async function add(todo) {
    try {
        return await API.graphql(graphqlOperation(createTodo, { input: todo }))
    } catch (err) {
        console.log('error creating todo:', err)
    }
}

async function remove(input) {
    try {
        await API.graphql(graphqlOperation(deleteTodo, { input }))
    } catch (err) {
        console.log('error removing todo:', err)
    }
}

async function update(input) {
    try {
        return await API.graphql(graphqlOperation(updateTodo, { input }))
    } catch (err) {
        console.log('error updating todo:', err)
    }
}