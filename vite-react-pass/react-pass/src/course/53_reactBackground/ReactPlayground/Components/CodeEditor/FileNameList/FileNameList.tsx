import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import styles from "../../../index.module.scss";
import { FileNameItem } from "./FileNameItem";
import create from "@ant-design/icons/lib/components/IconFont";
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "../../../files";
const READ_ONLY = [ENTRY_FILE_NAME,IMPORT_MAP_FILE_NAME,APP_COMPONENT_FILE_NAME]
export function FileNameList() {
  const {
    files,
    addFile,
    removeFile,
    updateFileName,
    setSelectedFileName,
    selectedFiles,
  } = useContext(PlaygroundContext);
  const [tab, setTabs] = useState([""]);
  const [create, setCreate] = useState(false);
  useEffect(() => {
    console.log(Object.keys(files));
    setTabs(Object.keys(files));
  }, [files]);
  const addTab = () => {
    const name = "Comp" + Math.random().toString().slice(2, 8) + ".tsx";
    addFile(name);
    setSelectedFileName(name);
    setCreate(true);
  };
  return (
    <>
      <div className={styles["tabs"]}>
        {tab.map((v, i) => {
          return (
            <FileNameItem
              key={v + i}
              value={v}
              readonly={READ_ONLY.includes(v)}
              active={v === selectedFiles}
              onClick={() => {
                setSelectedFileName(v);
              }}
              create={create}
              onEditComplete={(newFile) => {
                console.log(v, newFile);
                updateFileName(v, newFile);
                setSelectedFileName(newFile);
                setCreate(false);
              }}
              onRemove={(e) => {
                e.stopPropagation();
                removeFile(v);
                setSelectedFileName(ENTRY_FILE_NAME);
              }}
            ></FileNameItem>
          );
        })}
        <div className={styles["add"]} onClick={(e) => addTab()}>
          +
        </div>
      </div>
    </>
  );
}
