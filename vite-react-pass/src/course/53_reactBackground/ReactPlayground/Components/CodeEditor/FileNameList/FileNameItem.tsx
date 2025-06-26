import classNames from "classnames";
import styles from "../../../index.module.scss";
import { useEffect, useRef, useState, MouseEventHandler } from "react";
interface FileNameItemProps {
  value: string;
  active: boolean;
  create: boolean;
  readonly:boolean;
  onClick: () => void;
  onEditComplete: (path: string) => void;
  onRemove: MouseEventHandler;
}
export function FileNameItem(props: FileNameItemProps) {
  const {
    value,
    active = false,
    create,
    readonly,
    onClick,
    onEditComplete,
    onRemove,
  } = props;
  const [name, setName] = useState(value);
  const [isEdit, setIsEdit] = useState(create);
  const inputRef = useRef(null);
  const cs = classNames(styles["tab-item"], active ? styles.actived : "");
  const handleDoubleClick = (e) => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  useEffect(() => {
    if (create) {
      inputRef.current?.focus();
    }
  }, [create]);
  return (
    <div className={cs} onClick={onClick}>
      {isEdit ? (
        <div>
          <input
            ref={inputRef}
            value={name}
            className={styles["tabs-item-input"]}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={(e) => {
              setIsEdit(false);
              onEditComplete(name);
            }}
          ></input>
        </div>
      ) : (
        <>
          <span onDoubleClick={readonly?()=>{}:handleDoubleClick}>{name}</span>

          {!readonly&&<span style={{ marginLeft: 5, display: "flex" }} onClick={onRemove}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
              <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>}
        </>
      )}
    </div>
  );
}
