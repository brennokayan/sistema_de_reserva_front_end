import React, { useEffect, useState } from "react";
import { DelUserSecretaria, GetUserSecretaria } from "../../shared/services/api";
import { Button } from "@mui/material";
import { MinusCircle } from "phosphor-react";
import ModalUserSecretariaCad from "../../shared/components/ModalUserSecretariaCad";
import ModalShowUserPasswordSecretaria from "../../shared/components/ModalShowUserPasswordSecretaria";

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

    useEffect(() => {
        UsersSecretaria();
    }, [])

    return (
        <>
            <div className="content-admin">
                <ModalUserSecretariaCad />
                <ul>
                    {
                        get_Users_Secretaira.map(e =>
                            <li>
                                <h3>Usuário: {e.name}</h3>
                                <p>email: {e.email}</p>
                                <p>id: {e.id}</p>
                                <ModalShowUserPasswordSecretaria id={e.id} />
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    style={{ margin: '1em 0px', visibility: disabled? 'hidden': 'visible' }} 
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


            </div>
        </>
    );
}