import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { CadUsers, GetUsers, GetPassword, GetPasswordAdmin } from '../services/api';
import { Eye } from 'phosphor-react';


type RepositoryPassword = {
    name: string;
    password: string;
}
type RepositoryAdmin = {
  password: string;
}




export default function ModalShowUserPassword({id}) {
  const [passwordAdmin, set_passwordAdmin] = useState<RepositoryAdmin[]>([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [passwordAuth, set_passwordAuth] = useState<string>("")
  const [password_user,set_password_user] = useState<RepositoryPassword[]>([])

  async function Password_Admin(){
      await GetPasswordAdmin()
      .then(res => {
        set_passwordAdmin([res.data])

      })
  }
  
  async function GetUserPassword(id: any){
      await GetPassword(id)
      .then(res => {
        set_password_user([res.data]);
        })
    }
    
    function AdminAcess(password_auth: string){
        if(password_auth === String(passwordAdmin.map(e =>e.password))){
            GetUserPassword(id)
        }
        else{
            alert("acesso negado");
            setOpen(false)
        }
    }

    useEffect(() => {
      Password_Admin();
    }, [])

  return (
    <div>
      <Button variant='contained' color='warning'  style={{marginTop:'1em'}} onClick={handleOpen}><Eye size={24} style={{marginRight:'0.3em'}}/>mostrar a senha</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{top: '20%', left: '20%', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent:'center' ,height: 400, width: 400, position: 'absolute', background: 'white'}}>
            <h1>Senha de {password_user.map(e => <p>{e.name}</p>)}</h1>
            <TextField type={"password"} placeholder='password' onChange={(e) => {set_passwordAuth(e.target.value)}} />
            <Button variant='contained' title='Mostrar Senha' onClick={() => AdminAcess(passwordAuth)} disabled = {!passwordAuth} style ={{margin:"0.5em"}}>Mostrar Senha</Button>
            <ul style={{listStyle:"none"}}>
                {
                    password_user.map(e => 
                            <li>
                                <p>senha: {e.password}</p>
                            </li>
                        )
                }
            </ul>

        </Box>
      </Modal>
    </div>
  );
}