import {
  CSSProperties,
  EventHandler,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import FormContext from "../FormContext";
interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: CSSProperties;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, any>) => void;
  children?: React.ReactNode;
}
function Form(props: FormProps) {
  const {
    className,
    style,
    initialValues,
    onFinish,
    onFinishFailed,
    children,
  } = props;
  // context包裹
  // 有value 有setvalue
  const [value, setValue] = useState(initialValues || {});
  // 错误收集
  const errorMap = useRef<Record<string, boolean>>({});
  // 有validator 有注册validator
  const validatorMap = useRef(new Map());
  // 单独的value改变
  const onValueChange = (key: string, data: any) => {
    value[key] = data;
  };
  // 注册验证方法
  const registerValidator = (key: string, cb: Function) => {
    validatorMap.current.set(key, cb);
  };
  // 实现onSubmit方法
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    for (let [key, fn] of validatorMap.current) {
      if (typeof fn === "function") {
        errorMap.current[key] = fn(value[key]);
      }
    }
    console.log(validatorMap.current);
    console.log(errorMap.current);
    let errList = Object.values(errorMap.current).filter(Boolean);
    console.log(errList);
    if (errList.length) {
      onFinishFailed?.(errorMap.current);
    } else {
      onFinish(value);
    }
  };
  return (
    <FormContext.Provider
      value={{
        values: value,
        onValueChange: onValueChange,
        setValues: setValue,
        validateRegister: registerValidator,
      }}
    >
      {
        <form className={className} style={style} onSubmit={handleSubmit}>
          {children}
        </form>
      }
    </FormContext.Provider>
  );
}
export default Form;
