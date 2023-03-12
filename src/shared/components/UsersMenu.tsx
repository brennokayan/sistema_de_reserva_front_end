import React, { useEffect, useState } from "react";
import { DelUsers, GetUsers } from "../../shared/services/api";
import ModalUserCad from "../../shared/components/ModalUserCad";


import ModalShowUserPassword from "../../shared/components/ModalShowUserPassword";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { MinusCircle } from "phosphor-react";
import  CreateAdminPassword  from "../../shared/components/CreateAdminPassword";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


type repositoryUsers = {
    id: string;
    name: string;
    email: string;
    password: string;
}





export function Users_Menu({disabled = false}) {
    const [get_Users, set_Users] = useState<repositoryUsers[]>([])
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
    
    async function Users() {
        await GetUsers()
            .then(res => {
                res.data;
                set_Users(res.data);
            })
    }

    async function Excluir(id: string) {
        await DelUsers(id)
            .then(() => Users())
    }

    useEffect(() => {
        Users();
    }, [])


    return (
        <>

            <Box display={'flex'} bgcolor="transparent"  width={'100%'} flexDirection={"column"}>
                <Box bgcolor={'transparent'} display={"flex"} alignItems="center" justifyContent={"center"}>
                    <ModalUserCad />
                </Box>
                <Box display={!matches ? "flex" : "grid" } gridTemplateColumns={!matches ?"auto": "auto auto auto"}>
                    {
                        get_Users.map(e => 
                            <Box
                                key={e.id}
                                textAlign={"center"} 
                                bgcolor={"blanchedalmond"}
                                // #0288d1 
                                margin = {"1em"}
                                borderRadius={'1em'} 
                                boxShadow={"2px 2px 5px black"}
                                color = {"black"}
                                width={!matches? "95%": "55%"}
                            >
                                <p>{e.name}</p>
                                <p>{e.email}</p>
                                <p>{e.id}</p>
                                <ModalShowUserPassword id={e.id} />
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

