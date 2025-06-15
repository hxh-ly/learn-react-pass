import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DndProvider } from "react-dnd";
// @ts-ignore
import { ClickToComponent } from "click-to-react-component";
import { HTML5Backend } from "react-dnd-html5-backend";
createRoot(document.getElementById("root")!).render(
  <>
    <ClickToComponent />
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </>
);
