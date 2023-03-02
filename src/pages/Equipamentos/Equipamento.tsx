import { useState } from 'react'
import Equipamentos_Menu from '../../shared/components/EquipamentosMenu'

function Equipamento({disabled= false}) {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Equipamentos_Menu disabled={disabled}/>
    </div>
  )
}

export default Equipamento
