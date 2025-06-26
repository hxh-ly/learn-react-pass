import { useContext, useEffect, useRef, useState } from "react";
import CompilerWorker from "./compiler.worker?worker";
import { PlaygroundContext } from "../../PlaygroundContext";
import { Editor } from "@monaco-editor/react";
import { EditorView } from "../CodeEditor/EditorView/EditorView";
import iframeRaw from "../../../iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../../files";
import { Message, MessageData } from "../Message";
import { debounce } from "lodash-es";

export function Preview() {
  const { files } = useContext(PlaygroundContext);
  let getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        `<script type="importmap"></script>`,
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        `<script type="module" id="appSrc"></script>`,
        `<script type="module" id="appSrc">${compilerCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };
  const [compilerCode, setCompilerCode] = useState("");
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());
  const [error, setError] = useState("");
  const compilerWorkerRef = useRef<Worker>();
  const handleMessage = (m: MessageData) => {
    const { type, message } = m.data;
    if (type === "ERROR") {
      setError(message);
    }
  };
  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", ({ data }) => {
        console.log("worker", data);
        if (data.type === "COMPILED_CODE") {
          setCompilerCode(data.data);
        } else {
          console.log("error", data.data);
        }
      });
    }
  }, []);
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  useEffect(
    debounce(() => {
      console.log(["debounce post to worker"]);
      /* const c = compiler(files);
    setCompilerCode(c); */
      compilerWorkerRef.current?.postMessage(files);
    }, 500),
    [files]
  );

  useEffect(() => {
    console.log(["setIframeUrl"]);
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, compilerCode]);
  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{ height: "100%", width: "100%" }}
      ></iframe>
      <Message type="error" content={error} />
    </div>
  );
}
