import { Button } from "@mui/material";
import React, {useState, useEffect} from "react";
import Data_de_Reserva from "./Data_de_Reservas/Data_de_Reservas";
import Equipamentos_Reservados from "./Equipamentos_Reservados/Equipamentos_Reservados";

export default function ReservaRealizada(){

    const[user_or_equip, set_user_or_equip] = useState(0)
    

    function MenuTrade(){
        if(user_or_equip == 0){
            return <Data_de_Reserva />
        }
        if(user_or_equip == 1){
            return <Equipamentos_Reservados />
        }
    }
    return (
        <>
            <div className="content_admin_root_menu">
                    <Button variant="contained" onClick={() => { set_user_or_equip(0) }} >Data de Reservas</Button>
                    <Button variant="contained" onClick={() => { set_user_or_equip(1) }} >Equipamentos Reservados</Button>
            </div>
            {
                MenuTrade()
            }
        </>
    )
}