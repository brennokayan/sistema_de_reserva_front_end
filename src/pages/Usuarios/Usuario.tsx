import { useState } from 'react'
import { Users_Menu } from '../../shared/components/UsersMenu'

function Usuario() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Users_Menu />
    </div>
  )
}

export default Usuario
