const initialState = {
    todos: []
}

export function todoReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: action.todos
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.todo]
            }
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.todo.id) return action.todo;
                    return todo;
                })
            }
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.todoId)
            }
        default:
            return state;
    }
}