import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './home'
import { Home08 } from './home/home08'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   {/*  <Home/> */}
    <Home08/>
    </>
  )
}

export default App
