import {useState} from 'react'
export function App(){
    const [count,setCount] = useState(0)
    return <>
    aaa
    <button onClick={(e)=>setCount(count+1)}>{count}</button>
    </>
}