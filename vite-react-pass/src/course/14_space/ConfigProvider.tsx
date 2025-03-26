import { createContext, PropsWithChildren } from "react";
import { SizeType } from ".";
interface SpaceContextType {
  space: {
    size: SizeType;
  };
}
interface ConfigProviderProps extends PropsWithChildren<SpaceContextType> {}
const SpaceContext = createContext<SpaceContextType>({ space: { size: 0 } });
export default SpaceContext;

export function ConfigProvider(props: PropsWithChildren<SpaceContextType>) {
  const { space } = props;
  return (
    <SpaceContext.Provider value={{ space }}>
      {props.children}
    </SpaceContext.Provider>
  );
}
