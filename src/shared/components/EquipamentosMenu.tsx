import React, { useEffect, useState } from "react";
import ModalEquipamentCad from "./ModalEquipamentCad";
import { DelEquipamento, GetEquipamentos } from "../services/api";
import { Box, Button, useMediaQuery } from "@mui/material";
import { MinusCircle } from "phosphor-react";

type RepositoryEquipamentos = {
    name: string;
    type: string;
}

export default function Equipamentos_Menu({disabled = false}) {
    const [equipaments, set_equipaments] = useState<RepositoryEquipamentos[]>([])
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
    
    async function Equipaments(){
        await GetEquipamentos()
            .then(res => {
                set_equipaments(res.data);
            })
    }

    async function Excluir(id: string){
        await DelEquipamento(id)
        .then(() => Equipaments())
    }
    useEffect(() => {
        Equipaments();
    }, [])



    return(
        <Box bgcolor="transparent"  width={'100%'} flexDirection={"column"} display={"flex"}>
            <Box bgcolor={'transparent'} display={"flex"} alignItems="center" justifyContent={"center"}>
                <ModalEquipamentCad />
            </Box>
            <Box display={!matches ? "grid" : "grid" } gridTemplateColumns={!matches ?"auto": "auto auto auto"} >
                {
                    equipaments.map(e => 
                        <Box
                            key={e.name}
                            textAlign={"center"} 
                            bgcolor={"blanchedalmond"}
                            // #0288d1 
                            margin={'1em'}
                            borderRadius={'1em'} 
                            boxShadow={"2px 2px 5px black"}
                            color = {"black"}
                            width={!matches? "95%": "95%"}

                        >
                                <h3>{e.name}</h3>
                                <p>tipo de equipamento: {"{ "+e.type+" }"}</p>
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    style={{ margin: '1em 0px',  visibility: disabled? 'hidden': 'visible' }}
                                    onClick={() => Excluir(e.name)}
                                >
                                    <MinusCircle 
                                        size={24} 
                                        style={{ marginRight: '0.3em' }} 
                                    />
                                    Excluir Equipamento
                                </Button>
                            </Box>
                        )
                }
            </Box>
        </Box>
    );
}