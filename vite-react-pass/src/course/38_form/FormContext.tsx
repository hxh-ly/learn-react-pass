import { createContext } from "react";

interface FormContextProps {
  values?: Record<string, any>;
  setValues?: (value: Record<string, any>) => void;
  onValueChange?: (key: string, value: any) => void;
  validateRegister?: (name: string, cb: Function) => void;
}

export default createContext<FormContextProps>({});
