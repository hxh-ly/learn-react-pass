import { useState } from "react";
import {Calendar} from "../course/08_calendar_01/testCalendar01"
import Dayjs from "dayjs"
export function Home08(){
    const [value, setValue] =  useState(Dayjs('2023-11-08'));

    return <>
    <Calendar value={value}/>
    </>
}