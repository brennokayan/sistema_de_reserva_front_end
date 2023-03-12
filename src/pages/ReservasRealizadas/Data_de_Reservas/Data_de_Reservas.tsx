import { Box, Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { GetDataReservadas } from "../../../shared/services/api";
import { ToUtc } from "../../../shared/utils/ToUTC";



type RepositoryCalendarReserved = {
    data_inicio: string
    data_fim: string
    nameUser: string
    item_da_reserva: string
    id: string
}





export default function Data_de_Reserva(){
    const [dia, set_dia] = useState<Date | null>(null)
    const [Date_Reserved, set_Date_Reserved] = useState<RepositoryCalendarReserved[]>([])
    const [data_inicio, set_data_inicio] = useState<Date|null>(null)
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
    const semanaPosterior = new Date();
    semanaPosterior.setDate(semanaPosterior.getDate() + 30)
    const semanaAnterior = new Date();
    semanaAnterior.setDate(semanaAnterior.getDate() - 30)

    async function GetDateReserved(Date_Search: string){
        await GetDataReservadas(Date_Search)
        .then(
            res => {
                set_Date_Reserved(res.data)
                console.log(res.data)
            }
        )
    
    
    
    }
    // useEffect(() => {
    //     set_data_inicio(new Date)
    // }, [])

    // useEffect(() => {
    //     GetDateReserved(ToUtc(data_inicio))
    // },[data_inicio])


    return(
        <>
            <Box bgcolor={"transparent"} 
                 height={"75vh"} 
                 width={'100%'} 
                 display={"flex"} 
                 alignItems={"center"} 
                 justifyContent={"start"} 
                 flexDirection={"column"}
                 paddingTop={'1em'}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} locale={"ptBR"}>
                    <Stack spacing={2}>
                        <DateTimePicker
                            label="Data & Hora da busca"
                            value={data_inicio}
                            onChange={(e: Date | null) => { set_data_inicio(e)}}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat='DD/MM/YYYY - HH:mm'
                            ampm={false}
                            InputProps={{sx: {"& .MuiSvgIcon-root": {color: "blue"}}}}
                            disableFuture = {false}
                            disablePast = {false}
                            maxDate={semanaPosterior}
                            minDate={semanaAnterior}
                        />
                    </Stack>
                </LocalizationProvider>
                <Button
                    style={{margin:"1em"}}
                    variant={"contained"}
                    onClick={() => GetDateReserved(ToUtc(data_inicio))}
                    
                >
                    Verificar data
                </Button>
                <Box display={!matches ? "grid" : "grid" } gridTemplateColumns={!matches ?"auto": "auto auto auto"}>
                    {
                        Date_Reserved.map(e => 
                            <Box
                                key={e.id}
                                textAlign={"center"} 
                                bgcolor={"blanchedalmond"}
                                // #0288d1 
                                margin={'1em'}
                                padding={'1em'}
                                borderRadius={'1em'} 
                                boxShadow={"2px 2px 5px black"}
                                color = {"black"}
                                width={!matches? "95%": "95%"}

                            >
                                <p>{e.data_inicio}</p>
                                <p>{e.data_fim}</p>
                                <p>{e.item_da_reserva}</p>
                                <p>{e.nameUser}</p>

                            </Box>    
                        )
                    }
                    
                </Box>
            </Box>
        </>
    )
}
