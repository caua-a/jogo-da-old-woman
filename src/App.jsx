import { useState } from 'react'
import Board from './components/Board/Board'
import BoardOnline from './components/Board/BoardOnline'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BoardOnline />
    </>
  )
}

export default App
