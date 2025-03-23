import { useEffect, useRef, useState } from "react";
import { TestControll } from "../course/06_controllMode/testControll";
import Calendar,{CalendarRef} from "../course/07_calendar/testCalendar";
export function Home() {
  const calRef = useRef<CalendarRef>(null);
  // const [date,setDate] = useState(new Date());
 /*  useEffect(() => {
    setInterval(()=>{
        calRef.current?.setDate(new Date(2024,3,Math.random()*10-2));
    },3000) 
  }, []);*/
  return (
    <div>
      {/*  <TestControll/> */}
      <Calendar
        ref={calRef}
        defaultValue={new Date("2023-3-1")}
        onChange={(newdate) => {
          console.log(newdate.toLocaleDateString());
        }}
      />
   {/*    <Calendar
        ref={calRef}
        value={date}
        onChange={(date) => {
          console.log(date.toLocaleDateString());
          setDate(date)
        }}
      /> */}
    </div>
  );
}

