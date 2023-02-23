import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Equipamentos_Menu from "../../shared/components/EquipamentosMenu";
import { Users_Menu } from "../../shared/components/UsersMenu";
import { logout } from "../../shared/utils/Auth";
import Equipamento from "../Equipamentos/Equipamento";
import Reserva from "../Reserva/Reserva";
import Usuario from "../Usuarios/Usuario";
import "./style_admin.css"
import { useNavigate } from 'react-router-dom'

export function Admin() {


    const handleLogout =  () => {
        logout()
        handleSingIn()
    
      }
      const navigation = useNavigate();
      const handleSingIn = () => navigation('/login') 

    function MenuTrade(){
        if(user_or_equip == 0){
            return<Usuario />
        }
        if(user_or_equip == 1){
            return<Equipamento /> 
        }
        if(user_or_equip == 2){
            return<Reserva />
        }
    }


    const[user_or_equip, set_user_or_equip] = useState(0)
    return(
        <>
            <div className="content_admin_root">
                <Button onClick={handleLogout}>Log out</Button>
                <div className="content_admin_root_menu">
                    <Button variant="contained" onClick={() => { set_user_or_equip(0) }}>Usuários</Button>
                    <Button variant="contained" onClick={() => { set_user_or_equip(1) }} >Equipamentos</Button>
                    <Button variant="contained" onClick={() => { set_user_or_equip(2) }} >Reservas</Button>
                </div>
                {/* {user_or_equip ? (<Usuario />) : (<Equipamento />)} */}
                {
                 MenuTrade()   
                }
            </div>
        </>
    );
}

