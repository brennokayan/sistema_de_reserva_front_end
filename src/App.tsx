import { useState } from 'react'
import { Routes_services } from "../src/routes/routes"
import "./style.css"
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes_services/>
  )
}

export default App
