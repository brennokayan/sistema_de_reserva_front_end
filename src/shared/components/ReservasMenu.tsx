import React, { useEffect, useState } from "react";
import "../components/admin.css"
import { DelReserva,GetReserva } from "../services/api";
import { Button } from "@mui/material";
import { MinusCircle } from "phosphor-react";
import ModalReservaCad from "./ModalReservaCad";

type RepositoryEquipamentos = {
    id: string;
    data_inicio: Date;
    data_fim: Date;
    userEmail: string;
    item_da_reserva: string;
}

export default function Reserva_Menu(){
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
                                <h3>id da reserva: {e.id}</h3>
                                <h5>user id: {e.userEmail}</h5>
                                <p>id da item da reserva: {e.item_da_reserva}</p>
                                <>data inicio:{e.data_inicio}</>
                                <>data fim: {e.data_fim}</>
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    style={{ margin: '1em 0px' }} 
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