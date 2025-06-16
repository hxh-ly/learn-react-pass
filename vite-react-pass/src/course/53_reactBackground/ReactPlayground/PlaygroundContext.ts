import { createContext } from "react"

interface File {
  name:string,
  value:string,
  language:string
}
export interface Files {
  [key:string]:File
}
interface PlaygroundContextProps {
  files:Files,
  selectedFiles:string,
  setSelectedFileName:(f:string)=>void,
  setFiles:(f:Files)=>void,
  addFile:(f:string)=>void,
  removeFile:(f:string)=>void,
  updateFileName:(oldF:string,newF:string)=>void
}

export const PlaygroundContext = createContext<PlaygroundContextProps>({
selectedFiles:'App.tsx'
} as PlaygroundContextProps)