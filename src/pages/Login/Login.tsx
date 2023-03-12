import { useEffect, useState } from 'react'

import {User, Key, IdentificationCard, Target} from "phosphor-react"
import { Avatar, Box, Button, Checkbox, createTheme, CssBaseline, FormControlLabel, Grid, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { login } from '../../shared/utils/Auth'
import { Link, useNavigate } from 'react-router-dom'
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
  id: string
  email: string
  password: string
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{color: "blue", textDecoration:'none'}} to={"#"}>
        SisReserva
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

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
          navigation(`/secretaria/${secretaria[i].id}`) 
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
    <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.sistemadereserva.com/core/painel/app-assets/images/pages/login-v2.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'auto',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              SisReserva - Bem Vindo!
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => set_email(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => set_password(EncryptedPassword(e.target.value))}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {handleLogin(email, password)}}
                disabled={!email || !password}
              >
                Entrar
              </Button>
            </Box>
          </Box>
              <Copyright sx={{ mt: '40%' }} />
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  )
}

export default Login

