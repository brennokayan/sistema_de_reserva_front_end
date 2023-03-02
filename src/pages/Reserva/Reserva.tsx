import { useState } from 'react'
import ReservasMenu from '../../shared/components/ReservasMenu'

function Reserva({disabled= false}) {
  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <ReservasMenu disabled={disabled} />
    </div>
  )
}

export default Reserva
