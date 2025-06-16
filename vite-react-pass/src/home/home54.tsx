import { ReactPlayground } from "../course/53_reactBackground/ReactPlayground";
import { PlaygroundProvider } from "../course/53_reactBackground/ReactPlayground/PlaygroundProvider";
export function Home54() {
  return (
    <>
      <PlaygroundProvider>
        <ReactPlayground />
      </PlaygroundProvider>
    </>
  );
}
