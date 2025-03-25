import { useState } from "react";
import { Calendar } from "../course/08_calendar_01/testCalendar01";
import Dayjs from "dayjs";
import LocaleContext from "../course/08_calendar_01/LocaleContext";
export function Home08() {
  const [value, setValue] = useState(Dayjs("2023-11-08"));
  const useClick = (date)=>{
    console.log('onChange '+ date.date())
    setValue(date);
  }
  const [localeType,setLocalType] = useState({locale:navigator.language})
  return (
    <>
    <button onClick={(e)=>setLocalType({locale: localeType.locale==='zh-CN'?'en-US':'zh-CN'}) }>切换语言</button>
    <LocaleContext.Provider value={localeType}>
    <Calendar value={value} className="aaa" onChange={useClick} style={{ padding: 2 }} dateInnerRender={(date)=>{
        return  <> 农历</>
      }}/>
    </LocaleContext.Provider>
     
    </>
  );
}
