import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { CadReserva, GetDataReservadas, GetEquipamentos } from '../services/api';
import { PlusCircle } from 'phosphor-react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToUtc } from '../utils/ToUTC';
import "dayjs/locale/pt-br";
import dayjs from 'dayjs';









type repositoryEquipments = {
  id: string,
  name: string,
}
type RepositoryEquipamentReserved ={
  data_inicio: string,
  data_fim: string,
  item_da_reserva: string,
  id: string
}

export default function ModalCreateReservaUser({name, email}:any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false), window.location.reload()};
  const [equipamentReserved, set_equipamentReserved] = useState<RepositoryEquipamentReserved[]>([])
  const [data_inicio, set_data_inicio] = useState<Date|null>(null)
  const [data_fim, set_data_fim] = useState<Date | null>(null)
  const [item_da_reserva, set_item_da_reserva] = useState<string | null>(null)
  const [equipment, set_equipment] = useState<repositoryEquipments[]>([])
  const [itens, set_itens] = useState<Object[]>([])
  const semanaPosterior = new Date();
  semanaPosterior.setDate(semanaPosterior.getDate() + 7)
  const semanaAnterior = new Date();
  semanaAnterior.setDate(semanaAnterior.getDate() - 7)

  var Equipamentos = equipment.map(e => (e.name))
  var EquipamentosCopy = Equipamentos
  var Equipamentos_reduce = [item_da_reserva].reduce(function (texto) { return texto })

  dayjs.locale("pt-br")

  async function Equipments() {
    await GetEquipamentos()
    .then(res => { set_equipment(res.data); })
  }

  async function EquipamentsReserved(data_inicio: any){
    await GetDataReservadas(data_inicio)
    .then(res => {set_equipamentReserved(res.data)})

  }

  async function NewReserva() {
    const data = {
      data_inicio: ToUtc(data_inicio),
      data_fim: ToUtc(data_fim),
      userID: email,
      nameUser: name,
      item_da_reserva: Equipamentos_reduce
    }
    await CadReserva(data)
    .then(res => {if(res.status == 201){
      alert("Reserva feita com sucesso!")
      handleClose()
    }})
  }

  function OptionsEquipamentos(){
    EquipamentsReserved(ToUtc(data_inicio))
    OptionsEquipamentos()
    if(equipamentReserved.length == 0){
      console.log("não ha equipamentos reservados")
      set_itens(Equipamentos)
    }
    for (var i = 0 ; i < equipamentReserved.length; i++) {
      for(var j = 0; j < Equipamentos.length; j++) {
        if(equipamentReserved[i].item_da_reserva == Equipamentos[j]){
          SpliceEquipamentos(j)
          set_itens(EquipamentosCopy)
        }
      }
    }
  }
  function SpliceEquipamentos(position: number){
    EquipamentosCopy.splice(position, 1)

    console.log(itens)
  }
  
  
  
  

    


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
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={"ptBR"}>
            <Stack spacing={2}>
              <DateTimePicker
                label="Data & Hora Iniciala"
                value={data_inicio}
                onChange={(e: Date | null) => { set_data_inicio(e)}}
                renderInput={(params) => <TextField {...params} />}
                inputFormat='DD/MM/YYYY - HH:mm'
                ampm={false}
                InputProps={{sx: {"& .MuiSvgIcon-root": {color: "blue"}}}}
                disableFuture = {false}
                disablePast = {false}
                maxDate={semanaPosterior}
                minDate={semanaAnterior}
              />

              <DateTimePicker
                label="Data & Hora Final"
                value={data_fim}
                onChange={(e: Date | null) => { set_data_fim(e) }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat='DD/MM/YYYY - HH:mm'
                ampm={false}
                InputProps={{sx: {"& .MuiSvgIcon-root": {color: "red"}}}}
                disableFuture = {false}
                disablePast = {false}
                maxDate={semanaPosterior}
                minDate={semanaAnterior}
                

              />
              <Autocomplete
                options={itens}
                sx={{ width: '60vw' }}
                freeSolo = {false}
                onChange={((e: any, newValue: any) => { set_item_da_reserva(newValue) })}
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
              <Button onClick={() => OptionsEquipamentos()}>Verificar equipamentos para data</Button>
              <Button title='Cadastrar' onClick={() => NewReserva()} disabled = {!data_inicio || !data_fim || !item_da_reserva}> Cadastrar</Button> 
            </Stack>
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
}