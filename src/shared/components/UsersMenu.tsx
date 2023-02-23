import React, { useEffect, useState } from "react";
import { DelUsers, GetUsers } from "../../shared/services/api";
import ModalUserCad from "../../shared/components/ModalUserCad";

import "../components/admin.css"
import ModalShowUserPassword from "../../shared/components/ModalShowUserPassword";
import { Button } from "@mui/material";
import { MinusCircle } from "phosphor-react";
import  CreateAdminPassword  from "../../shared/components/CreateAdminPassword";

type repositoryUsers = {
    id: string;
    name: string;
    email: string;
    password: string;
}





export function Users_Menu() {
    const [get_Users, set_Users] = useState<repositoryUsers[]>([])

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
            <div className="content-admin">
                <ModalUserCad />
                <ul>
                    {
                        get_Users.map(e =>
                            <li>
                                <h3>Usuário: {e.name}</h3>
                                <p>email: {e.email}</p>
                                <p>id: {e.id}</p>
                                <ModalShowUserPassword id={e.id} />
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
                                    Excluir Usuário
                                </Button>
                            </li>
                        )
                    }
                </ul>
                <CreateAdminPassword />

            </div>
        </>
    );
}

