import { useEffect, useState } from 'react'
import "./style.css"

import {User, Key, IdentificationCard, Target} from "phosphor-react"
import { Button } from '@mui/material'
import { login } from '../../shared/utils/Auth'
import { useNavigate } from 'react-router-dom'
import { GetPasswordAdmin, GetUsers, GetUserSecretaria } from '../../shared/services/api'
import EncryptedPassword from '../../shared/components/EncryptPassword'
import sleep from '../../shared/components/Sleep'

type RepositoryUsers ={
  id: string
  name : string
  email : string
  password : string
}

type RepositoryAdmin = {
  password: string
}
type RepositoryUsersSecretaria = {
  email: string
  password: string
}

function Login() {
  
  const navigation = useNavigate();
  


  const [email, set_email] = useState<string>("")
  const [password, set_password] = useState<string>("")
  
  const [error, set_Error] = useState<string>("info")
  const [users, set_Users] = useState<RepositoryUsers[]>([])
  const [admin, set_admin] = useState<RepositoryAdmin[]>([])
  const [secretaria, set_secretaria] = useState<RepositoryUsersSecretaria[]>([])

  async function handleLogin(email: string | null, password: string | null) {
    if(email === "admin@admin.com" && password === admin[0].password){
      login("abc123")
      navigation('/admin') 
    }
      for(let i = 0; i < secretaria.length; i++){
        if(email === secretaria[i].email && password === secretaria[i].password){
          login("abc123")
          navigation('/secretaria') 
        }   
      } 
      for(var i = 0; i < users.length; i++){
        if(email === users[i].email && password === users[i].password){
          login("abc123")
          navigation(`/user/${users[i].id}`)
        }
        else{
          if(error == "info"){
            set_Error("error")
            await sleep(2000)
            set_Error("info")
        }
      }
    }
  }


  async function Users() {
    await GetUsers()
        .then(res => {
            res.data;
            set_Users(res.data);
        })
}

async function Secretaria(){
  await GetUserSecretaria()
        .then(res => {
          res.data;
          set_secretaria(res.data);
        })
}

async function Admin() {
  await GetPasswordAdmin()
      .then(res => {
          res.data;
          set_admin([res.data]);
      })
}


useEffect(() => {
  Admin();
  Secretaria()
  Users();
}, [])

  return (
    <div className="content">
      <div className='card'>
        <h1>Login Reserva</h1>
        <form action="">
          <div className='card-iten'>
            <User color='white' size={24} />
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder='e-mail'
              onChange={e => set_email(e.target.value)}
            />
          </div>

          {/* <div className='card-iten'>
            <IdentificationCard color='white' size={24} />
            <input type="text" name="nome" id="nome" placeholder='nome'/>
          </div> */}

          <div className='card-iten'>
            <Key color='white' size={24} />
            <input 
              type="password" 
              name="senha" 
              id="senha" 
              placeholder='senha'
              onChange={e => set_password(EncryptedPassword(e.target.value))}
            />
          </div>
          <Button 
            variant="contained" 
            color={"info"} 
            style={{ margin: '1em 0px' }} 
            onClick={() => {handleLogin(email, password)}}
            disabled={!email || !password}
          >
            Entrar
          </Button>

        </form>
      </div>
    </div>
  )
}

export default Login

