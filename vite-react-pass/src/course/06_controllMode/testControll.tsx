import { ChangeEvent, useState } from "react"

export function TestControll(){
    const [value,setVal] = useState('');
    const setChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setVal(e.target.value)
    }
    return <>
    <input value={value} onChange={setChange}/>
    </>
}