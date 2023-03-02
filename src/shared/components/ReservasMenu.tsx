import React, { useEffect, useState } from "react";
import "../components/admin.css"
import { DelReserva,GetReserva } from "../services/api";
import { Button } from "@mui/material";
import { MinusCircle } from "phosphor-react";
import ModalReservaCad from "./ModalReservaCad";
import { HmacSHA224 } from "crypto-js";

type RepositoryEquipamentos = {
    id: string;
    data_inicio: Date;
    data_fim: Date;
    userID: string;
    item_da_reserva: string;
    nameUser: string;
}

export default function Reserva_Menu({disabled = false}){
    const [reserva, set_reserva] = useState<RepositoryEquipamentos[]>([])
    async function Reservas(){
        await GetReserva()
            .then(res => {
                set_reserva(res.data);
            })
    }

    async function Excluir(id: string){
        await DelReserva(id)
        .then(() => Reservas())
    }
    useEffect(() => {
        Reservas();
    }, [])

  

    return(
        <div className="content-admin">
            <ModalReservaCad />
            <ul style={{marginTop: '1em'}}>
                {
                    reserva.map(e => 
                            <li>
                                <h2>Item da reserva: {e.item_da_reserva}</h2>
                                <h3>reservado por: {e.nameUser}</h3>
                                <p>Protocolo: {e.id}</p>
                                <>data inicio:{e.data_inicio}</>
                                <br />
                                <>data fim: {e.data_fim}</>
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    style={{ margin: '1em 0px', visibility: disabled?'hidden': 'visible' }} 
                                    onClick={() => Excluir(e.id)}
                                >
                                    <MinusCircle 
                                        size={24} 
                                        style={{ marginRight: '0.3em' }} 
                                    />
                                    Excluir Reserva
                                </Button>
                            </li>
                        )
                }
            </ul>
        </div>
    );
}