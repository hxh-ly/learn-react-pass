import cs from "classnames";
type HandlerSize = "default" | "small";
interface HandleProps {
  size?: HandlerSize;
  color?: string;
}
export function Handle(props: HandleProps) {
  return (
    <div
      className={cs(`color-picker-panel-palette-handler`, {
        [`color-picker-panel-palette-handler-sm`]: props.size === "small",
      })}
      style={{ backgroundColor: props.color }}
    ></div>
  );
}

