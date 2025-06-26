import { PropsWithChildren, useEffect, useState } from "react";
import { PlaygroundContext, Files } from "./PlaygroundContext";
import { compress, uncompress, fileName2Language } from "./utils";
import { initFiles } from "./files";
const getFilesFromUrl = () => {
  const hash = window.location.hash.slice(1);
  let files;
  try {
    const str = uncompress(hash);
    files = JSON.parse(str);
  } catch (e) {}
  return files;
};
export function PlaygroundProvider(props: PropsWithChildren) {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromUrl()||{ ...initFiles });
  const [selectedFiles, setSelectedFileName] = useState("main.tsx");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    console.log('save hash',files)
    const hash = compress(JSON.stringify(files));
    window.location.hash = hash;
  }, [files]);
  const addFile = (name: string) => {
    const newOne = {
      name: name,
      language: fileName2Language(name),
      value: "",
    };
    setFiles({ ...files, [name]: { ...newOne } });
  };
  const removeFile = (f: string) => {
    delete files[f];
    setFiles({ ...files });
  };
  const updateFileName = (oldF: string, newF: string) => {
    if (oldF === newF || !oldF || !newF) {
      return;
    }
    const {
      [oldF]: { value },
      ...rest
    } = files;
    const newFiles = {
      ...rest,
      [newF]: {
        name: newF,
        language: fileName2Language(newF),
        value,
      },
    };
    console.log("update");
    setFiles(newFiles);
  };
  return (
    <PlaygroundContext.Provider
      value={{
        theme,
        setTheme,
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
