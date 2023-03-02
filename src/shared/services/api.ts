import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});
export async function CadPasswordAdmin(data: any){
    const res = await api.put("/admin_password_edit", data);
    return res;
}
export async function GetPasswordAdmin(){
    const res = await api.get("/admin_password_get");
    return res;
}

export async function GetUsers(){
    const res = await api.get("/usuarios");
    return res;
}

export async function GetUniqueUser(id: string){
    const res = await api.get(`/usuarios/${id}`)
    return res;
}

export async function GetPassword(id: string){
    const res = await api.get(`/password/${id}`);
    return res;
}

export async function CadUsers(data: any) {
    const res = await api.post("/cadastro_usuario", data);
    return res;
}
export async function DelUsers(email: string){
    const res = await api.delete(`/delte_user/${email}`);
    return res;

}
export async function GetEquipamentos(){
    const res = await api.get("/equipamentos");
    return res;
}
export async function CadEquipamentos(data: any){
    const res = await api.post("/cadastro_equipamento", data);
    return res;
}

export async function GetItensReservados(itens_da_reserva: string){
    const res = await api.get(`/reservas/${itens_da_reserva}`)
    return res;
}

export async function GetDataReservadas(data_fim: any){
    const res = await api.get(`datas_reservas/q=${data_fim}`)
    return res;
}

export async function DelEquipamento(id: string){
    const res = await api.delete(`/delete_equipamento/${id}`);
    return res;
}

export async function GetReserva(){
    const res = await api.get("/reservas");
    return res;
}
export async function CadReserva(data: any){
    const res = await api.post("/cadastro_reserva", data);
    return res;
}

export async function DelReserva(id: string){
    const res = await api.delete(`/delete_reserva/${id}`);
    return res;
}

export async function CadUserSecretaria(data: any){
    const res = await api.post("/create_secretaria_user", data);
    return res;
}

export async function GetUserSecretaria(){
    const res = await api.get("/read_secretaria_user");
    return res;
}
export async function GetPasswordUserSecretaria(id: string){
    const res = await api.get(`/read_secretaria_user/${id}`)
    return res;
}