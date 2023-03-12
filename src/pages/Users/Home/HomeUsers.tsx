import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DelReserva, GetUniqueUser } from '../../../shared/services/api';
import { logout } from '../../../shared/utils/Auth';
import 'moment-timezone';
import useMediaQuery from '@mui/material/useMediaQuery';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import ModalCreateReservaUser from '../../../shared/components/ModalCreateReservaUser';

type RepositoryUser = {
    UserReserva: Array<
    {
      userID: string,
      data_inicio: string,
      data_fim: string,
      item_da_reserva: string,
      id: string
      
  }
    >
    GetUniqueUser:{
        id: string
        name: string
        email: string
    }

}

function HomeUsers() {
    var contador = 0;
    const [data, set_data] = useState<RepositoryUser[] >([])
    const  params  = useParams(); 
    const id: any = params.id

  
    const navigation = useNavigate();
    const handleSingIn = () => navigation('/login') 
    const handleLogout =  () => {
        logout()
        handleSingIn()
    }
    async function user(id: string){
        await GetUniqueUser(id)
        .then(res => {set_data([res.data])})
    }
    // const themes = useTheme()
    // console.log(themes)
    const matches = useMediaQuery('(min-width:900px)');
    console.log(matches)
    function apresentar() {
      contador = data.flatMap((e) => e.UserReserva).length;
        if (contador == 0) return <h1>não possui</h1>;
        else {
          const options = [];
          for (let i = contador - 1; i >= 0; i--) {
            options.push(
              <Box >
                {data.map((e) => (
                  <Box
                  textAlign={"center"} 
                  bgcolor={"blanchedalmond"}
                  // #0288d1 
                  margin={'1em'}
                  borderRadius={'1em'} 
                  boxShadow={"2px 2px 5px black"}
                  color = {"black"}
                  width={!matches? "80%": "75%"}
                  padding={"1em"}

                  >
                    <p>Protocolo de reserva: <br />{e.UserReserva[i].id}</p>
                    <p>email: {e.GetUniqueUser.email}</p>
                    <p>Item Reservado: <br />{e.UserReserva[i].item_da_reserva}</p>
                    <p>Data Inicial: {e.UserReserva[i].data_inicio}</p>
                    <p>Data Final: {(e.UserReserva[i]).data_fim}</p>
                    <Button variant="contained" color="error" onClick={() => Excluir(e.UserReserva[i].id)}>
                      Deletar
                    </Button>
                  </Box>
                ))}
              </Box>
            );
          }
          return options;
        }
    }
      

    async function Excluir(idReserva: string){
        await DelReserva(idReserva)
        .then(() => user(id))
    }


    useEffect(() => {
        user(id)
    }, [])


    return (
      <>
        <Box display={"flex"} padding={".5em"} bgcolor={"rgba(127, 127, 127, .5)"} >
            <ModalCreateReservaUser email={String(data.map(e => e.GetUniqueUser.id))} name={"brenno"} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            </Typography>
            <Button color="primary" variant='contained' style={{ margin: '1em' }} onClick={() => handleLogout()} >
                <Typography>{data.map(e => e.GetUniqueUser.name)}</Typography>

                <SensorDoorOutlinedIcon />
                {/* <Typography>Sair</Typography> */}
            </Button>
        </Box>

        <Box bgcolor="transparent"  width={'100%'} flexDirection={"column"} display={"flex"}>
            <Box bgcolor={'transparent'} display={"flex"} alignItems="center" justifyContent={"center"}>
            </Box>
            <Box display={!matches ? "grid" : "grid" } gridTemplateColumns={!matches ?"auto": "auto auto auto"}>
            {
              apresentar()
            }
            </Box>
        </Box>
      </>
    );
}

export default function Home(){
  return <HomeUsers />
}