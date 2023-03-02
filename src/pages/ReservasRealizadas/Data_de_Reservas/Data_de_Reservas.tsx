import { Button } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { Calendar } from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { GetDataReservadas } from "../../../shared/services/api";



type RepositoryCalendarReserved = {
    data_inicio: string
    data_fim: string
    nameUser: string
    item_da_reserva: string
}





export default function Data_de_Reserva(){
    const [dia, set_dia] = useState<Date | null>(null)
    const [Date_Reserved, set_Date_Reserved] = useState<RepositoryCalendarReserved[]>([])


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
                <Calendar 
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
                />

                <Button
                onClick={() => GetDateReserved(moment(dia).format())}
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
