import { Button, Stack, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import React, { useState } from "react";
import { Calendar } from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { GetDataReservadas } from "../../../shared/services/api";
import { ToUtc } from "../../../shared/utils/ToUTC";



type RepositoryCalendarReserved = {
    data_inicio: string
    data_fim: string
    nameUser: string
    item_da_reserva: string
}





export default function Data_de_Reserva(){
    const [dia, set_dia] = useState<Date | null>(null)
    const [Date_Reserved, set_Date_Reserved] = useState<RepositoryCalendarReserved[]>([])
    const [data_inicio, set_data_inicio] = useState<Date|null>(null)
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

    console.log(moment(dia).format())

    return(
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent:'flex-start', flexDirection: "column", height:'100%', width: '100%'}}>
                {/* <Calendar 
                    // defaultActiveStartDate={startDate}
                    // activeStartDate = {startDate}
                    // goToRangeStartOnSelect
                    // maxDetail="month"
                    showFixedNumberOfWeeks = {false}
                    showNeighboringMonth = {false}
                    maxDetail = "month"
                    next2Label={null}
                    prev2Label={null}
                    // minDetail = "month"
                    calendarType ="ISO 8601"
                    onChange={(e: any) => {set_dia(e)} }
                /> */}
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
                onClick={() => GetDateReserved(ToUtc(data_inicio))}
                >
                    Buscar
                </Button>
                <ul style={{display: 'grid', gridTemplateColumns: "auto auto auto   "}}>
                    {
                        Date_Reserved.map(e => 
                            <li style={{margin: '1em '}}>
                                <p>{e.data_inicio}</p>
                                <p>{e.data_fim}</p>
                                <p>{e.item_da_reserva}</p>
                                <p>{e.nameUser}</p>

                            </li>    
                        )
                    }
                    
                </ul>

            </div>
        </>
    )
}
