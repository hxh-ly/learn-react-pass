import { createContext } from "react";
interface LocaleContextType {
  locale: string;
}
let type = "zn-CN";
const LocaleContext = createContext<LocaleContextType>({ locale: type });

export default LocaleContext;
