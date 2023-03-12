import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login"
import { Admin } from "../pages/Admin/Admin";
import PrivateRoutes from "./PrivateRoutes";
import HomeUsers from "../pages/Users/Home/HomeUsers";
import Secretaria from "../pages/secretaria/Secretaria";
import { ControleSecretaria } from "../pages/SecretariaUsuarios/ControleSecretaria";



export function Routes_services(){
    return(
        <BrowserRouter >
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route element={<PrivateRoutes />}>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/user/:id" element={<HomeUsers/>} />
                    <Route path="/secretaria/:id" element={<ControleSecretaria />} />
                </Route>
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </BrowserRouter>
    )
}