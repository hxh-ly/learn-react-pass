import { transform } from "@babel/standalone";
import { Files, File } from "../../PlaygroundContext";
import { ENTRY_FILE_NAME } from "../../files";
import { PluginObj } from "@babel/core";
const getModuleFile = (files: Files, modulePath: string) => {
  // 截取最后./的后缀  如 ./App ./App.tsx
  // files的key遍历看有没有js ts jsx tsx进行过滤[App.tsx,main.tsx]
  //  在find 看看有没有App
  console.log({modulePath})
  let moduleName = modulePath.split("./").pop() || "";
  if (!moduleName.includes(".")) {
    const realName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith("js") ||
          key.endsWith("jsx") ||
          key.endsWith("ts") ||
          key.endsWith("tsx")
        );
      })
      .find((v) => v.split('.').includes(moduleName));
    if (realName) {
      moduleName = realName;
    }
  }
  return files[moduleName];
};
const css2js = (file: File) => {
  // 转化成一段立即执行函数
  const js = `(()=>{
        const sheet = document.createElement('style');
        sheet.setAttribute('id','style_${new Date().getTime()}_${file.name}');
        document.head.appendChild(sheet)
        const style = document.createTextNode(\`${file.value}\`)
        sheet.innerHTML=''
        sheet.appendChild(style)
    })()`;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};
const json2js = (file: File) => {
    console.log('json'+file.name)
  const js = `export default ${file.name}`;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};
export const beforeTransformCode = (filename: string, code: string) => {
    let _code = code
    const regexReact = /import\s+React/g
    if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
      _code = `import React from 'react';\n${code}`
    }
    return _code
}
export const babelTransform = (filename: string, code: string, file: Files) => {
  const _code = beforeTransformCode(filename,code);
    let result = "";
  try {
    result = transform(_code, {
      presets: ["react", "typescript"],
      filename,
      plugins: [customResolver(file)],
      retainLines: true,
    }).code!;
  } catch (e) {
    console.error("compiler error", e);
  }
  return result;
};
export const compiler = (files: Files) => {
  const f = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, f.value, files);
};

export function customResolver(files: Files) {
  return {
    visitor: {
      ImportDeclaration(path) {
        // 识别各种文件，然后替换path.node.source.value
        const modulePath = path.node.source.value;
        if (modulePath.startsWith(".")) {
          const file = getModuleFile(files, modulePath);
            if(!file) {
                return;
            }
          if (file.name.endsWith(".css")) {
            path.node.source.value = css2js(file);
          } else if (file.name.endsWith(".json")) {
            path.node.source.value = json2js(file);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
}

self.addEventListener('message',async ({data})=>{
try {
  self.postMessage({
    type:'COMPILED_CODE',
    data:compiler(data)
  })
} catch (error) {
  self.postMessage({
    type:'ERROR',
    data:compiler(error.message)
  })
}
})