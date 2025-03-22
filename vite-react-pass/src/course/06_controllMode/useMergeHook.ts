import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

interface CalendarProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (date: Date) => void;
  }
export function useMergeHook<T>(defaultStateValue:T, props?:{defaultValue?:T,value:T,onChange:(T)=>void}):[T,React.Dispatch<SetStateAction<T>>]{
    const {defaultValue,value:propsValue,onChange} = props||{};
    const [stateValue,setStateValue] = useState<T>(()=>{
        if (propsValue!==undefined) {
            return propsValue;
        } else if (defaultValue!==undefined) {
            return defaultValue!;
        } else {
            return defaultStateValue;
        }
    });
    const isFirst = useRef(true);
    useEffect(()=>{
        if(propsValue === undefined && !isFirst.current) {
            setStateValue(propsValue);
        }
        isFirst.current = false;
    },[
        propsValue
    ])
    function isFunction(value: unknown): value is Function {
        return typeof value === 'function';
      } 
      // changeValue函数
    const setState = useCallback((value:SetStateAction<T>)=>{
        const res = isFunction(value)?value(stateValue):value;
        if(propsValue===undefined) {
            setStateValue(res);
        }
        onChange?.(res);
    },[stateValue]) // 用stateValue的是非受控
    const mergeValue = propsValue === undefined?stateValue:propsValue;
    return [mergeValue,setState];
}