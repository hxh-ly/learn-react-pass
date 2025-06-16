import { PropsWithChildren, useState } from "react";
import { PlaygroundContext, Files } from "./PlaygroundContext";
import { fileName2Language } from "./utils";
import { initFiles } from "./files";
export function PlaygroundProvider(props: PropsWithChildren) {
  const { children } = props;
  const [files, setFiles] = useState<Files>({...initFiles});
  const [selectedFiles, setSelectedFileName] = useState("App.tsx");
  const addFile = (name: string) => {
    files[name] = {
      name: name,
      language: fileName2Language(name),
      value: "",
    };
    setFiles({ ...files });
  };
  const removeFile = (f: string) => {
    delete files[f];
    setFiles({ ...files });
  };
  const updateFileName = (oldF: string, newF: string) => {
    const {
      [oldF]: { value },
      ...rest
    } = files;
    const newFiles = {
      [newF]: {
        name: newF,
        language: fileName2Language(newF),
        value,
      },
      ...rest,
    };
    setFiles(newFiles);
  };
  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFiles,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}
