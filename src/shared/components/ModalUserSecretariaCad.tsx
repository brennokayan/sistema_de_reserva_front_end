import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { CadUsers, CadUserSecretaria } from '../services/api';
import { IdentificationCard, PlusCircle } from 'phosphor-react';
import * as CryptoJS from 'crypto-js';

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

export default function ModalUserSecretariaCad() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false), window.location.reload()};

  const [name, set_name] = useState<string>("")
  const [email, set_email] = useState<string>("")
  const [password, set_password] = useState<string>("")
  async function NewUserSecretaria(){
      const data = {
          name: name,
          email: email,
          password: password
      }
      await CadUserSecretaria(data)
      .then(res => {if(res.status == 201){
        alert("Usuário da secretaria cadastrado com sucesso!")
        handleClose()
      }})

  }
  function EncryptedPassword(data: any){
    const result = CryptoJS.SHA256(data).toString();
    return result
  }



  return (
    <div>
      <Button color={"warning"} style={{margin:'1em'}} variant='contained' onClick={handleOpen}>< PlusCircle size={24} style={{marginRight:'1em'}} /> Novo(a) Secretario(a) </Button>
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
            <h1>Novo Usuário Secretaria</h1>
            <TextField autoFocus placeholder='nome do usuário' onChange={(e) => {set_name(e.target.value)}} />
            <TextField type={'email'} placeholder='email' onChange={(e) => {set_email(e.target.value)}}/>
            <TextField type={"password"} placeholder='password' onChange={(e) => {set_password(EncryptedPassword(e.target.value))}} />
            <Button title='Cadastrar' onClick={() => NewUserSecretaria()} disabled = {!name || !email || !password}> Cadastrar</Button>
        </Box>
      </Modal>
    </div>
  );
}