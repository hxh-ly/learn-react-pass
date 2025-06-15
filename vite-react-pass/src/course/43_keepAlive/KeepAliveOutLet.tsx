import { createContext, useContext } from "react"

import KeepAliveContext,{isKeepAlive,ContextAliveProps} from './KeepAliveContext';
import { matchPath, useLocation, useOutlet } from "react-router-dom";
export function KeepAliveOutLet(){
    const {alivePath,keepElement} =  useContext(KeepAliveContext);
    const {pathname} = useLocation();
    const isKeep = isKeepAlive(alivePath,pathname);
    const element = useOutlet();
    if (isKeep) {
        keepElement![location.pathname] = element;
        console.log(keepElement)
    }
    return <>
    <div>
       {Object.entries(keepElement) .map(([path,ele])=>{
        return <div key={path} hidden={!matchPath(pathname,path)}>
            {ele}
        </div>
       })}
       {!isKeep&& element }
    </div>
    </>
}

export function KeepLayout(props:ContextAliveProps) {
    const {alivePath,...other} = props;
    const {dropPath,keepElement}  = useContext(KeepAliveContext)
    return <KeepAliveContext.Provider value={{dropPath,keepElement,alivePath}}>
        {props.children}
    </KeepAliveContext.Provider>
}