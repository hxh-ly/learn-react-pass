import { useState } from "react";
import { TestTailwindcss } from "../course/26_tailwindcss";
import { SliceOverlay, D } from '../course/29_inoutTranstion/SliceInOverlay'
export function Home26() {
  const [show,setShow] = useState(true)
  return (
    <>
      {/* <Viewpager /> */}
   <TestTailwindcss/>
   <SliceOverlay isVisible={show} from="bottom">
    <button onClick={(e)=>setShow(!show)}>qie{show}</button>
    </SliceOverlay>
    </>
  );
}
