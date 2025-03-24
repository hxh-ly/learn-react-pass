import { useState } from "react";
import { Calendar } from "../course/08_calendar_01/testCalendar01";
import Dayjs from "dayjs";
export function Home08() {
  const [value, setValue] = useState(Dayjs("2023-11-08"));
  const useClick = (date)=>{
    console.log('onChange '+ date.date())
    setValue(date);
  }
  return (
    <>
      <Calendar value={value} className="aaa" onChange={useClick} style={{ padding: 2 }} dateInnerRender={(date)=>{
        return  <> 农历</>
      }}/>
    </>
  );
}
