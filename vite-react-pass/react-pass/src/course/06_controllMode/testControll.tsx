import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMergeHook } from "./useMergeHook";
export function TestControll() {
  const [value, setVal] = useState("");
  const setChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  return (
    <>
      <input value={value} onChange={setChange} />
    </>
  );
}
// 非受控组件1
function UnControllerCmp() {
  const setChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("非受控组件" + e.target.value);
  };
  return (
    <>
      <input defaultValue={"guang"} onChange={setChange} />
    </>
  );
}
// 非受控组件2
function UnControllerCmp2() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      console.log(inputRef.current?.value);
    }, 2000);
  }, []);
  return (
    <>
      <input defaultValue={"guang"} ref={inputRef} />
    </>
  );
}

// 受控组件1
function ControllerCmp1() {
  const [value, setVal] = useState("");
  const setChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("非受控组件" + e.target.value); // 值由代码控制的，
    setVal(e.target.value.toUpperCase()); // 会引起多次渲染
  };
  return (
    <>
      <input value={value} onChange={setChange} />
    </>
  );
}
/* 
什么情况用受控组件：
需要对用户的输入做处理的后设置到表单的，或者你想实时同步状态值到父组件
1.比如把用户输入改为大写
2.Form组件
如果是单独用的组件，比如 Calendar，那就没必要用受控模式了，用非受控模式，设置 defaultValue 就可以了

受控组件的value还要setValue触发额外的渲染
*/

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar({
  value: propsValue,
  onChange,
  defaultValue,
}: CalendarProps) {
  // 如果value不存在，就用默认初始化state (非受控)
  // 兼容value本身存在，被改为不存在的情况
  const [mergeValue, setState] = useMergeHook<Date>(new Date(),{value:propsValue,defaultValue,onChange});
  
  return (
    <div>
      {mergeValue?.toLocaleDateString()}
      <div
        onClick={() => {
            setState(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
            setState(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
            setState(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
  // 要改成支持受控和非受控的方式
}
function UseControllApp() {
  const [value, setValue] = useState(new Date()); // value的维护在调用方
  
  return (
    <div>
    {/* 情况1如果value存在。受控， value可能也可能变成空   受控->非受控 */}
      <Calendar
        value={value}
        onChange={(date) => {
          setValue(date);
        }}
      />
      {/* 情况2如果value不存在，非受控 */}
      <Calendar
        defaultValue={new Date()}
        onChange={(date) => {
        console.log(date.toLocaleDateString());
        }}
      />
    </div>
  );
}

// 封装成hook

