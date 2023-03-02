import React, { useEffect, useState } from "react";
import ModalEquipamentCad from "./ModalEquipamentCad";
import "../components/admin.css"
import { DelEquipamento, GetEquipamentos } from "../services/api";
import { Button } from "@mui/material";
import { MinusCircle } from "phosphor-react";

type RepositoryEquipamentos = {
    id: string;
    name: string;
    type: string;
}

export default function Equipamentos_Menu({disabled = false}) {
    const [equipaments, set_equipaments] = useState<RepositoryEquipamentos[]>([])
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
        <div className="content-admin">
            <ModalEquipamentCad />
            <ul style={{marginTop: '1em'}}>
                {
                    equipaments.map(e => 
                            <li>
                                <h3>{e.name}</h3>
                                <p>{e.id}</p>
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
                            </li>
                        )
                }
            </ul>
        </div>
    );
}