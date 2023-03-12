import { Box, Button, useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetEquipamentos, GetItensReservados } from "../../../shared/services/api";


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
    id: string;
}
export default function Equipamentos_Reservados() {
    const [equipaments, set_equipaments] = useState<RepositoryEquipamentos[]>([])
    const [itens_da_reserva, set_itens_da_reserva] = useState<Itens_da_Reserva[]>([])
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))


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

                <ul>
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

                <ul>

                </ul>
                <Box display={!matches ? "grid" : "grid" } gridTemplateColumns={!matches ?"auto": "auto auto auto"}>
                    {
                        itens_da_reserva.map(e =>
                            <Box
                            key={e.id}
                            textAlign={"center"} 
                            bgcolor={"blanchedalmond"}
                            // #0288d1 
                            margin={'1em'}
                            borderRadius={'1em'} 
                            boxShadow={"2px 2px 5px black"}
                            color = {"black"}
                            width={!matches? "95%": "95%"}

                        >
                                <h3>{e.item_da_reserva}</h3>
                                <p>{e.nameUser}</p>
                                <>{e.data_inicio}</>
                                <br />
                                <>{e.data_fim}</>
                            </Box>
                        )
                    }
                </Box>




        </>
    )
}