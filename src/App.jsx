import { useState } from 'react'
import './App.css'
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
