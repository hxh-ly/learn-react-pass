import { EditorView } from "./EditorView/EditorView";
import { FileNameList } from "./FileNameList/FileNameList";
import { PlaygroundContext, Files } from "../../PlaygroundContext";
import { useContext } from "react";
import { debounce } from "lodash-es";
export function CodeEditor() {
  const { files, theme, selectedFiles, setFiles } =
    useContext(PlaygroundContext);
  const file = files[selectedFiles];
  const onChange = (e) => {
    console.log("change");
    files[file.name].value = e;
    setFiles({ ...files });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList></FileNameList>
      <EditorView
        options={{ theme: `vs-${theme}` }}
        file={file}
        onChange={debounce(onChange, 500)}
      ></EditorView>
    </div>
  );
}
