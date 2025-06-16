import { Allotment } from "allotment"
import 'allotment/dist/style.css'
import { Header } from "./Components/Header/Header"
import { CodeEditor } from "./Components/CodeEditor/CodeEditor"
import { Preview } from "./Components/Preview/Preview"

export function ReactPlayground(){
    return <div style={{height:'100vh'}}>
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