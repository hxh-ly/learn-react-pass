import { Allotment } from "allotment"
import 'allotment/dist/style.css'
import { Header } from "./Components/Header/Header"
import { CodeEditor } from "./Components/CodeEditor/CodeEditor"
import { Preview } from "./Components/Preview/Preview"
import { useContext } from "react"
import { PlaygroundContext } from "./PlaygroundContext"
import style from './index.module.scss'
export function ReactPlayground(){
      const { theme, setTheme } = useContext(PlaygroundContext);
    return <div style={{height:'100vh'}} className={style[theme]}>
        <Header/>
        <Allotment defaultSizes={[100,100]}>
            <Allotment.Pane minSize={500}>
                <CodeEditor/>
            </Allotment.Pane>
             <Allotment.Pane minSize={0}>
                <Preview/>
             </Allotment.Pane>
        </Allotment>
    </div>
}