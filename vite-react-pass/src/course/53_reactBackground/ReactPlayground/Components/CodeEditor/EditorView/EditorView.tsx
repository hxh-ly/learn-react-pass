import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import { createATA } from "./ata";
export interface EditFiles {
  name: string;
  language: string;
  value: string;
}
export interface EditViewProps {
  file: EditFiles;
  onChange: EditorProps["onChange"];
  options?: any;
}

export function EditorView(props: EditViewProps) {
  const { file, onChange, options } = props;

  const handleOnMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
      console.log(
        editor.getSupportedActions().map((v) => {
          return v.id;
        })
      );
    });
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => ata(editor.getValue()));

    ata(editor.getValue());
  };
  return (
    <Editor
      onMount={handleOnMount}
      language={file.language}
      value={file.value}
      onChange={onChange}
      height={"100%"}
      path={file.name}
      defaultLanguage="javascript"
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    ></Editor>
  );
}
