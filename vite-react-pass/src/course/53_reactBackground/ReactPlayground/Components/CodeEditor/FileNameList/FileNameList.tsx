import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import styles from "../../../index.module.scss";
import { FileNameItem } from "./FileNameItem";
export function FileNameList() {
  const {
    files,
    addFile,
    removeFile,
    updateFileName,
    setSelectedFileName,
    selectedFiles,
  } = useContext(PlaygroundContext);
  const [tab, setTabs] = useState([]);
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);
  return (
    <>
      <div className={styles["tabs"]}>
        {tab.map((v, i) => {
          return (
            <FileNameItem
              key={v + i}
              value={v}
              active={v === selectedFiles}
              onClick={() => {
                setSelectedFileName(v);
              }}
            ></FileNameItem>
          );
        })}
      </div>
    </>
  );
}
