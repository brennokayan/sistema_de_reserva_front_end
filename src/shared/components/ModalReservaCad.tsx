import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, TextField } from '@mui/material';
import { CadReserva, CadUsers, GetEquipamentos, GetUsers } from '../services/api';
import { IdentificationCard, PlusCircle } from 'phosphor-react';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

type repositoryUsers = {
  id: string,
  email: string,
  name: string,
}
type repositoryEquipments = {
  id: string,
  name: string,
}



export default function ModalReservaCad() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false), window.location.reload()};
  const [get_Users, set_Users] = useState<repositoryUsers[]>([])
  const [equipment, set_equipment] = useState<repositoryEquipments[]>([])


  const [userid, set_userid] = useState<string | null>(null)
  const [data_inicio, set_data_inicio] = useState<Date | null>(null)
  const [data_fim, set_data_fim] = useState<Date | null>(null)
  const [item_da_reserva, set_item_da_reserva] = useState<string | null>(null)
  const [nameUser, set_nameUser] = useState<string | null>(null)


  var Usuarios = get_Users.map(e => (e.id + " - " + e.email))
  var Usuarios_split= userid?.split(' - ')
  var Usuarios_reduce = Usuarios_split?.reduce(function(texto){return texto})


  var NomeUsuario = get_Users.map(e => (e.name + " - " + e.email))
  var NomeUsuario_split= nameUser?.split(' - ')
  var NomeUsuario_reduce = NomeUsuario_split?.reduce(function(texto){return texto})
  
  console.log(NomeUsuario_reduce, Usuarios_reduce)
  
  var Equipamentos = equipment.map(e => (e.name))
  var Equipamentos_reduce = [item_da_reserva].reduce(function(texto){return texto})


  
  async function NewReserva(){
    const data = {
      data_inicio: data_inicio,
      data_fim: data_fim,
      userID: Usuarios_reduce,
      item_da_reserva: Equipamentos_reduce,
      nameUser: NomeUsuario_reduce
    }
    await CadReserva(data)
  }

  
  
  async function Users() {
      await GetUsers()
          .then(res => {set_Users(res.data);})
  }

  async function Equipments(){
    await GetEquipamentos()
      .then(res => {set_equipment(res.data);})
  }

  useEffect(() => {
    Users()
    Equipments()
  }, [])


  return (
    <div>
        <Button 
            style={{margin:'1em'}} 
            variant='contained' 
            onClick={handleOpen}
            color={"warning"}
        >
            < PlusCircle 
                size={24} 
                style={{marginRight:'1em'}} 
            /> 
            Cadastrar Reserva  
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={{
        top: '10%', 
        left: '5vw', 
        display: 'flex', 
        flexDirection: "column", 
        alignItems: 'center', 
        justifyContent:'center',
        height: '80%', 
        width: '90vw', 
        position: 'absolute', 
        background: 'white'}}>
            <h1>Nova Reserva </h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2}>
                    <DateTimePicker
                      label="Data & Hora Inicial"
                      value={data_inicio}
                      onChange={(e: Date | null) => {set_data_inicio(e)}}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat = 'DD-MM-YYYY HH:mm:ss'
                      ampm = {false}
                      
                    />
                    <DateTimePicker
                      label="Data & Hora Final"
                      value={data_fim}
                      onChange={(e) => {set_data_fim(e)}}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat = 'DD-MM-YYYY HH:mm:ss'
                      ampm = {false}
                    />
                    <Autocomplete
                        options={Usuarios}
                        sx={{width: '60vw'}}
                        freeSolo
                        onChange={((e: any, newValue: string |null) => {set_userid(newValue)})}
                        renderInput={(e) => 
                            <TextField
                                {...e}
                                onChange={e => set_userid(e.target.value)}
                                className="TextField"
                                label="Email do Usuário" 
                                variant="outlined"
                                color={"info"} 
                                id="busca" 
                                InputLabelProps={{className: "TextField"}}
                                value={userid} 
                            />
                        }
                    
                    />

                    <Autocomplete
                        options={NomeUsuario}
                        sx={{width: '60vw'}}
                        freeSolo
                        onChange={((e: any, newValue: string |null) => {set_nameUser(newValue)})}
                        renderInput={(e) => 
                            <TextField
                                {...e}
                                onChange={e => set_nameUser(e.target.value)}
                                className="TextField"
                                label="Nome do Usuário" 
                                variant="outlined"
                                color={"info"} 
                                id="busca" 
                                InputLabelProps={{className: "TextField"}}
                                value={nameUser} 
                            />
                        }
                    
                    />

                    <Autocomplete
                        options={Equipamentos}
                        sx={{width: '60vw'}}
                        freeSolo
                        onChange={((e: any, newValue: string |null) => {set_item_da_reserva(newValue)})}
                        renderInput={(e) => 
                            <TextField
                                {...e}
                                onChange={e => set_item_da_reserva(e.target.value)}
                                className="TextField"
                                label="Equipamento" 
                                variant="outlined"
                                color={"info"} 
                                id="busca" 
                                InputLabelProps={{className: "TextField"}}
                                value={item_da_reserva} 
                            />
                        }
                    
                    />
                </Stack>
            </LocalizationProvider>
            <Button title='Cadastrar' onClick={() => NewReserva()} disabled = {!userid}> Cadastrar</Button>
        </Box>
      </Modal>
    </div>
  );
}