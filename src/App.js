import { useState, useRef } from 'react'
import TodoList from './TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
  }

  return (
    <>
      <TodoList todos={todos}/>
      <input ref="todoNameRef" type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear complete</button>
      <p>0 left to do</p>
    </>
  );
}

export default App;
