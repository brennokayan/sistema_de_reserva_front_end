import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";


import "../../admin/style_admin.css"
import { useNavigate } from 'react-router-dom'
import { logout } from "../../../shared/utils/Auth";
import Equipamento from "../../Equipamentos/Equipamento";
import Reserva from "../../Reserva/Reserva";
import ReservaRealizada from "../../ReservasRealizadas/ReservasRealizadas";
import Usuario from "../../Usuarios/Usuario";


export function ControleSecretaria() {


    const handleLogout =  () => {
        logout()
        handleSingIn()
    
      }
      const navigation = useNavigate();
      const handleSingIn = () => navigation('/login') 

    function MenuTrade(){
        if(user_or_equip == 0){
            return<Usuario disabled={true} />
        }
        if(user_or_equip == 1){
            return<Equipamento disabled={true} /> 
        }
        if(user_or_equip == 2){
            return<Reserva disabled={true} />
        }
        if(user_or_equip == 3){
            return <ReservaRealizada/>
        }
    }


    const[user_or_equip, set_user_or_equip] = useState(5)
    return(
        <>
            <div className="content_admin_root">
                <Button onClick={handleLogout}>Log out</Button>
                <div className="content_admin_root_menu">
                    <Button variant="contained" onClick={() => { set_user_or_equip(0) }}>Usuários</Button>
                    <Button variant="contained" onClick={() => { set_user_or_equip(1) }} >Equipamentos</Button>
                    <Button variant="contained" onClick={() => { set_user_or_equip(2) }} >Reservas</Button>
                    <Button variant="contained" onClick={() => { set_user_or_equip(3) }} >Reservas Realizadas</Button>
                </div>
                {/* {user_or_equip ? (<Usuario />) : (<Equipamento />)} */}
                {
                 MenuTrade()   
                }
            </div>
        </>
    );
}

