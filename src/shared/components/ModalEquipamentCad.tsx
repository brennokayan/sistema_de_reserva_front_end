import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { CadEquipamentos } from '../services/api';
import { Eye, PlusCircle } from 'phosphor-react';







export default function ModalEquipamentCad() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false), window.location.reload() };
  const [name, set_name] = useState<string>("")
  const [type, set_type] = useState<string>("")

  async function NewEquipamento() {
    const data = {
      name: name,
      type: type,
    }
    await CadEquipamentos(data)
  }


  return (
    <div>
      <Button variant='contained' color='warning' style={{ marginTop: '1em' }} onClick={handleOpen}><
        PlusCircle size={24} style={{ marginRight: '0.3em' }} />
        Cadastrar Equipamentos
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
          justifyContent: 'center',
          height: 400,
          width: '90vw',
          position: 'absolute',
          background: 'white'
        }}
        >
          <h1>Novo Usuário</h1>
          <TextField autoFocus placeholder='nome do equipamento' onChange={(e) => { set_name(e.target.value) }} />
          <TextField placeholder='tipo do equipamento' onChange={(e) => { set_type(e.target.value) }} />
          <Button title='Cadastrar' onClick={() => NewEquipamento()} disabled={!name || !type}> Cadastrar</Button>
        </Box>
      </Modal>
    </div>
  );
}