import { Button } from '@mui/material'
import { useState } from 'react'
import CreateAdminPassword from '../../shared/components/CreateAdminPassword'
import { Users_Menu } from '../../shared/components/UsersMenu'
import Secretaria from '../secretaria/Secretaria'

function Usuario({disabled = false}) {
  const[user_or_equip, set_user_or_equip] = useState(5)




  function MenuTrade(){
    if(user_or_equip == 0){
        return<Users_Menu disabled={disabled}/>
    }
    if(user_or_equip == 1){
        return<Secretaria disabled={disabled} /> 
    }

}
  return (
    <>
      <div className="content_admin_root_menu">
          <Button variant="contained" onClick={() => { set_user_or_equip(0) }}>Professores</Button>
          <Button variant="contained" onClick={() => { set_user_or_equip(1) }} >Secretaria</Button>
      </div>
      {MenuTrade()}
      <CreateAdminPassword disabled={disabled} />
    </>
    
  )
}

export default Usuario
