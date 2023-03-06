import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetEquipamentos, GetItensReservados } from "../../../shared/services/api";
import './style.css'

type RepositoryEquipamentos = {
    id: string;
    name: string;
    type: string;
}
type Itens_da_Reserva = {
    data_inicio: string;
    data_fim: string;
    nameUser: string;
    item_da_reserva: string;
}
export default function Equipamentos_Reservados() {
    const [equipaments, set_equipaments] = useState<RepositoryEquipamentos[]>([])
    const [itens_da_reserva, set_itens_da_reserva] = useState<Itens_da_Reserva[]>([])


    async function Equipaments() {
        await GetEquipamentos()
            .then(res => {
                set_equipaments(res.data);
            })
    }

    async function EquipamentsReservados(item: string) {
        await GetItensReservados(item)
            .then(res => {

                set_itens_da_reserva(res.data)

            })
            
        }


    function hasReservations(itemName: string) {
        const reservations = itens_da_reserva.filter(
            (reservation) => reservation.item_da_reserva === itemName
        );
        return reservations.length > 0;
    }

    useEffect(() => {
        Equipaments();

    }, [])

    return (
        <>
            <div className="content-equipaments">
                {/* <ul className="content-equipaments-buttons">
                {
                    equipaments.map(e => 
                        
                        <Button 
                        id={e.name}
                        onClick={()=> {
                            EquipamentsReservados(e.name)
                            set_cor(e.name)
                            
                        }}
                        style={{ margin: '1em', backgroundColor: cor === e.name && itens_da_reserva.length ===0? 'green' : 'red'}}
                        variant='contained'
                        >
                        {e.name}
                        </Button>
                    )   
                }
            </ul> */}

                <ul className="content-equipaments-buttons">
                    {equipaments.map((e) => (
                        <Button
                            id={e.name}
                            onClick={() => {
                                EquipamentsReservados(e.name)
                            }}
                            style={{
                                margin: "1em",
                                backgroundColor: hasReservations(e.name) ? "red" : "green",
                            }}
                            variant="contained"
                        >
                            {e.name}
                        </Button>
                    ))}
                </ul>

                <ul className="content-equipaments-registros">
                    {
                        itens_da_reserva.map(e =>
                            <li>
                                <h3>{e.item_da_reserva}</h3>
                                <p>{e.nameUser}</p>
                                <>{e.data_inicio}</>
                                <br />
                                <>{e.data_fim}</>
                            </li>
                        )
                    }
                </ul>



            </div>
        </>
    )
}