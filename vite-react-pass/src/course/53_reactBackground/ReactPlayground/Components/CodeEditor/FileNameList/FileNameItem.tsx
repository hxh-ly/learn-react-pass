import classNames from "classnames";
import styles from "../../../index.module.scss";
import { useState } from "react";
interface FileNameItemProps {
  value: string;
  active: boolean;
  onClick: () => void;
}
export function FileNameItem(props: FileNameItemProps) {
  const { value, active = false, onClick } = props;
  const [name, setName] = useState(value);
  const cs = classNames(
    styles['tab-item'],
    active ? styles.actived : ""
  );
  return (
    <div className={cs} onClick={onClick}>
      <span>{name}</span>
    </div>
  );
}
