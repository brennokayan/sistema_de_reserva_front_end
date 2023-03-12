import React, { useEffect, useState } from "react";
import { DelReserva,GetReserva } from "../services/api";
import { Box, Button, useMediaQuery } from "@mui/material";
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
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
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
        <Box bgcolor="transparent"  width={'100%'} flexDirection={"column"} display={"flex"}>
            <Box bgcolor={'transparent'} display={"flex"} alignItems="center" justifyContent={"center"}>
                <ModalReservaCad />
            </Box>
            <Box display={!matches ? "grid" : "grid" } gridTemplateColumns={!matches ?"auto": "auto auto"}>
                {
                    reserva.map(e => 
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
                                <h2>Item da reserva: {e.item_da_reserva}</h2>
                                <h3>reservado por: {e.nameUser}</h3>
                                <p>Protocolo: {e.id}</p>
                                <>data inicio:{e.data_inicio}</>
                                <br />
                                <>data fim: {e.data_fim}</>
                                <br />
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
                            </Box>
                        )
                }
            </Box>
        </Box>
    );
}