import { useState } from 'react'
import './App.css'
import Game from './components/Game/Game'
import Board from './components/Board/Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Board />
    </>
  )
}

export default App
