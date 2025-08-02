import { createContext, PropsWithChildren, ReactNode } from "react"

export interface ContextAliveProps extends PropsWithChildren{
    alivePath: Array<string | RegExp>,
    keepElement?:Record<string,ReactNode>
    dropPath?:(p:string)=>void
}

const iKeepElement = {};
 const aliveCtx =  createContext<ContextAliveProps>({
    alivePath:[],
    keepElement:iKeepElement,
    dropPath:(key)=>{
        iKeepElement[key] = null
    }
 })

 export const isKeepAlive = (allPath:Array<string | RegExp>,path:string)=>{
    let flag = false; 
    console.log(allPath,path)
    allPath.forEach(v=>{
        if(v === path) {
            flag = true;
        }
        if(v instanceof RegExp && v.test(path) ) {
          flag = true;
        }
        if (typeof v === 'string' && v.toLowerCase()=== path.toLowerCase()) {
            flag  = true;
        }
    })
    return flag;
 }
 export default aliveCtx;