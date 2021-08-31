import { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid' // generates random IDs

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const [isAddTodoDisabled, setAddTodoDisabled] = useState(true)
  const [isClearTodosDisabled, setClearTodosDisabled] = useState(true)
  const todoNameRef = useRef()

  // Load todos
  // just the first time, so we have an empty dependency array
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Save todos
  // every time 'todos' array changes, this 'useEffect' is called
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

    const todosCompleted = todos.filter(todo => todo.complete)
    if (todos.length > 0 && todosCompleted.length) {
      setClearTodosDisabled(false)
    } else {
      setClearTodosDisabled(true)
    }
  }, [todos])

  const toggleTodo = (id) => {
    // copy the current todos list, so we don't change the current todos list -> in React you should never directly modified a state variable
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo(e)
    }
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name === '' ) return // if the string is empty, then return
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name,
          complete: false,
        }
      ]
    })
    todoNameRef.current.value = null; // cleanup the input after adding the todo
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // Check if the 'add todo' button should be enabled or disabled
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      setAddTodoDisabled(true)
    } else {
      setAddTodoDisabled(false)
    }
  }

  return (
    <div className="todos-container">
      {/* new todo item */}
      <input ref={todoNameRef} type="text" onChange={handleInputChange} onKeyPress={handleKeyPress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      {/* buttons */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddTodo} disabled={isAddTodoDisabled}>Add Todo</button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClearTodos} disabled={isClearTodosDisabled}>Clear complete</button>

      {/* items list */}
      <TodoList todos={todos} toggleTodo={toggleTodo}/>

      {/* info */}
      <p>{todos.filter(todo => !todo.complete).length} left to do</p>
    </div>
  );
}

export default App;
