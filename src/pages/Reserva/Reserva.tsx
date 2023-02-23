import { useState } from 'react'
import ReservasMenu from '../../shared/components/ReservasMenu'

function Reserva() {
  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <ReservasMenu />
    </div>
  )
}

export default Reserva
