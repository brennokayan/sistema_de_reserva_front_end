import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { CadEquipamentos, CadReserva, GetEquipamentos } from '../services/api';
import { Eye, PlusCircle } from 'phosphor-react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import 'moment-timezone';





type repositoryEquipments = {
  id: string,
  name: string,
}

export default function ModalCreateReservaUser({email}): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false), window.location.reload()};
  const [userid, set_userid] = useState<string | null>(null)
  const [data_inicio, set_data_inicio] = useState<Date | null>(null)
  const [data_fim, set_data_fim] = useState<Date | null>(null)
  const [item_da_reserva, set_item_da_reserva] = useState<string | null>(null)
  const [equipment, set_equipment] = useState<repositoryEquipments[]>([])
  


  async function Equipments() {
    await GetEquipamentos()
    .then(res => { set_equipment(res.data); })
  }
  async function NewReserva() {
    const data = {
      data_inicio: data_inicio,
      data_fim: data_fim,
      userID: email,
      item_da_reserva: Equipamentos_reduce
    }
    await CadReserva(data)
  }
  var Equipamentos = equipment.map(e => (e.name))
  var Equipamentos_split = item_da_reserva?.split()
  var Equipamentos_reduce = Equipamentos_split?.reduce(function (texto) { return texto })
  useEffect(() => {

    Equipments()
  }, [])
  
  
  return (
    <div>
      <Button variant='contained' color='warning' style={{ marginTop: '1em' }} onClick={handleOpen}><
        PlusCircle size={24} style={{ marginRight: '0.3em' }} />
        Nova Reserva
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
          <h1>Nova Reserva </h1>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}> 
            <Stack spacing={2}>
              <DateTimePicker
                label="Data & Hora Iniciala"
                value={data_inicio}
                onChange={(e: Date | null) => { set_data_inicio(e) }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat='DD-MM-YYYY HH:mm:ss'
                ampm={false}
                disableFuture = {true}
                disablePast = {true}

              />
              <DateTimePicker
                label="Data & Hora Final"
                value={data_fim}
                onChange={(e: Date | null) => { set_data_fim(e) }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat='DD-MM-YYYY HH:mm:ss'
                ampm={false}
                disableFuture = {true}
                disablePast = {true}
              />
              <Autocomplete
                options={Equipamentos}
                sx={{ width: '60vw' }}
                freeSolo
                onChange={((e: any, newValue: string | null) => { set_item_da_reserva(newValue) })}
                renderInput={(e) =>
                  <TextField
                    {...e}
                    onChange={e => set_item_da_reserva(e.target.value)}
                    className="TextField"
                    label="Equipamento"
                    variant="outlined"
                    color={"info"}
                    id="busca"
                    InputLabelProps={{ className: "TextField" }}
                    value={item_da_reserva}
                  />
                }
              />
              <Button title='Cadastrar' onClick={() => NewReserva()} disabled = {!data_inicio || !data_fim || !item_da_reserva}> Cadastrar</Button>
            </Stack>
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
}