import { Fragment, useState } from 'react'
import { TodoList } from './components/TodoList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Fragment>
        <TodoList />
        <h1>hola</h1>
      </Fragment>
    </>
  )
}

export default App