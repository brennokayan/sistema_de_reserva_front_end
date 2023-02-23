import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModalCreateReservaUser from '../../../shared/components/ModalCreateReservaUser';
import { DelReserva, GetUniqueUser } from '../../../shared/services/api';
import { logout } from '../../../shared/utils/Auth';
import moment from 'moment';
import 'moment-timezone';

import './styles.css';

type RepositoryUser = {
    UserReserva: {
        0: 
           [ 
            userID: string,
            data_inicio: string,
            data_fim: string,
            item_da_reserva: string,
            id: string
        ]
        
    }
    GetUniqueUser:{
        name: string
        email: string
    }

}


function HomeUsers() {
    var a = 0;
    const [data, set_data] = useState<RepositoryUser[] >([])

    const  params  = useParams(); 
    const id = params.id
    const handleLogout =  () => {
        logout()
        handleSingIn()
    }
    const navigation = useNavigate();
    const handleSingIn = () => navigation('/login') 

    
    async function user(id: string){
        await GetUniqueUser(id)
        .then(res => {set_data([res.data])})
    }

    function apresentar(){
        a = data.flatMap(e => e.UserReserva).length
        if(a == 0) return <h1>não possui</h1>
        else {
            const options = [];
        for (let i = a -1; i >= 0; i--) {
            options.push( data.map(e => 
            <ul className='ul-content-user-page'>
                {
                    data.map(e =>
                        <li key={e.UserReserva[i].userID}>
                            <p>Protocolo de reserva: <br/>{e.UserReserva[i].id}</p>
                            <p>email: {e.UserReserva[i].userEmail}</p>
                            <p>Item Reservado: <br/>{e.UserReserva[i].item_da_reserva}</p>
                            <p>Data Inicial: {e.UserReserva[i].data_inicio}</p>
                            <p>Data Final: {e.UserReserva[i].data_fim}</p>
                            <Button variant='contained' color='error' onClick={() => Excluir(e.UserReserva[i].id)} >Deletar</Button>
                        </li>
                    )
                }
            </ul>
            ));
        }
        return options
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
      <div className='content-user-page'>
        <h1>
            <Button 
                variant='contained' 
                style={{margin: "1em"}} 
                onClick={handleLogout} 
            >
                Logout
            </Button>
            Bem vindo: {data.map(e => e.GetUniqueUser.name.toUpperCase())}
        </h1>
        <ModalCreateReservaUser email={String(data.map(e => e.GetUniqueUser.id))} />
        {
            apresentar()
        }
        

      </div>
    );
}

export default HomeUsers;