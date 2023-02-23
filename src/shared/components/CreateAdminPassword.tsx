import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { CadPasswordAdmin, CadUsers } from '../services/api';
import { IdentificationCard, Pen, PlusCircle } from 'phosphor-react';
import EncryptedPassword from './EncryptPassword';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateAdminPassword() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [password, set_password] = useState<string>("")
  async function PasswordAdmin(){
      const data = {
          password: password
      }
      await CadPasswordAdmin(data)
  }



  return (
    <div>
      <Button 
        style={{margin:'0.5em'}} 
        variant='contained' 
        onClick={handleOpen}
      >
          < Pen size={24} style={{marginRight:'1em'}}/> 
          Editar Senha Admin  
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
                <Box sx={{
        top: '20%', 
        left: '5vw', 
        display: 'flex', 
        flexDirection: "column", 
        alignItems: 'center', 
        justifyContent:'center',
        height: 400, 
        width: '90vw', 
        position: 'absolute', 
        background: 'white'}}>
            <h1>Editar Senha ADMINISTRADOR</h1>
            <TextField type={"password"} placeholder='password' onChange={(e) => {set_password( EncryptedPassword(e.target.value))}} />
            <Button title='Cadastrar' onClick={() => PasswordAdmin()} disabled = {!password}> Cadastrar</Button>
        </Box>
      </Modal>
    </div>
  );
}