import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// @ts-ignore
import { ClickToComponent } from "click-to-react-component";
createRoot(document.getElementById("root")!).render(
  <>
    <ClickToComponent />
    <App />
  </>
);
