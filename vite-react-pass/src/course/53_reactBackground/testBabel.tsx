import { useRef } from "react";
import { transform } from "@babel/standalone";
import { Editor } from "@monaco-editor/react";
import iframeRaw from './iframe.html?raw'
export function TestBabel() {
  const textAreaRef = useRef(null);

  const code = `import { useEffect, useState } from "react";

  function App() {
    const [num, setNum] = useState(() => {
      const num1 = 1 + 2;
      const num2 = 2 + 3;
      return num1 + num2
    });
  
    return (
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
  }
  
  export default App;
    `;
  const compile = () => {
    if (!textAreaRef.current) {
      return;
    }
    const res = transform(textAreaRef.current.value, {
      presets: ["react", "typescript"],
      filename: "guang.tsx",
    });
    console.log(res.code)
  };
  return (
    <>
      <textarea ref={textAreaRef} style={{ width: '500px', height: '300px'}} defaultValue={code}></textarea>
      <button onClick={compile}>编译</button>
    </>
  );
}

export function TestEditor(){
     const code =`import { useEffect, useState } from "react";

function App() {
    const [num, setNum] = useState(() => {
        const num1 = 1 + 2;
        const num2 = 2 + 3;
        return num1 + num2
    });

    return (
        <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
}

export default App;
`;
    return <Editor height='500px' defaultLanguage="javascript" defaultValue={code}></Editor>
}
const iframeUrl = URL.createObjectURL(new Blob([iframeRaw],{type:'text/html'}))

export function Preview(){
  return <>
  <iframe src={iframeUrl} style={{height:'100%',width:'100%',padding:0,border:'none'}}></iframe>
  </>
}