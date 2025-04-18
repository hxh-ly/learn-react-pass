import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './home'
import { Home08 } from './home/home08'
import  Home09 from './home/home09'
import  Home14 from './home/home14'
import Home18 from './home/home18'
import {Home19} from './home/home19'
import { Home23 } from './home/home23'
import { Home24 } from './home/home24'
import { Home26 } from './home/home26'
import { Home30 } from './home/home30'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   {/*  <Home/> */}
    {/* <Home08/> */}
    {/* <Home09/> */}
   {/*  <Home14/>
    <Home18/>
    <Home19/>
    <Home23/> */}
   {/*  <Home24/> 
    <Home26/> */}
    <Home30/>
    </>
  )
}

export default App
