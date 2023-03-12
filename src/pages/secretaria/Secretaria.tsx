import React, { useEffect, useState } from "react";
import { DelUserSecretaria, GetUserSecretaria } from "../../shared/services/api";
import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import { MinusCircle } from "phosphor-react";
import ModalUserSecretariaCad from "../../shared/components/ModalUserSecretariaCad";
import ModalShowUserPasswordSecretaria from "../../shared/components/ModalShowUserPasswordSecretaria";
import { grid } from "@mui/system";

type repositoryUsersSecretaria = {
    id: string;
    name: string;
    email: string;
    password: string;
}
export default function Secretaria({disabled = false}){
    const [get_Users_Secretaira, set_Users_Secretaria] = useState<repositoryUsersSecretaria[]>([])

    async function UsersSecretaria() {
        await GetUserSecretaria()
            .then(res => {
                res.data;
                set_Users_Secretaria(res.data);
            })
    }

    async function Excluir(id: string) {
        await DelUserSecretaria(id)
            .then(() => UsersSecretaria())
    }

    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

    useEffect(() => {
        UsersSecretaria();
    }, [])

    return (
        <>
            <Box bgcolor="transparent"  width={'100%'} flexDirection={"column"} display={"flex"}>
                <Box bgcolor={'transparent'} display={"flex"} alignItems="center" justifyContent={"center"}>
                    <ModalUserSecretariaCad />
                </Box>
                
                    <Box display={!matches ? "grid" : "grid" } gridTemplateColumns={!matches ?"auto": "auto auto auto"}>
                    {
                        get_Users_Secretaira.map(e => 
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
                                <p>{e.name}</p>
                                <p>{e.email}</p>
                                <ModalShowUserPasswordSecretaria id={e.id} />
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    style={{ margin: '1em 0px', visibility: disabled? 'hidden': 'visible'}} 
                                    onClick={() => Excluir(e.id)}
                                >
                                    <MinusCircle 
                                        size={24} 
                                        style={{ marginRight: '0.3em' }} 
                                    />
                                    Excluir Usuário
                                </Button>
                            </Box>    
                        )
                    }
                    </Box>
            </Box>
        </>
    );
}