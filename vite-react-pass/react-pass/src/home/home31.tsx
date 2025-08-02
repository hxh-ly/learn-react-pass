import { PopOver } from "../course/31_popover/popover";
export function Home31() {
  const popoverContent = (
    <div>
      光光光
      <button
        onClick={() => {
          alert(1);
        }}
      >
        111
      </button>
    </div>
  );
  return (
    <>
      <PopOver
        content={popoverContent}
        placement="left"
        trigger="click"
        style={{ margin: "200px" }}
      >
        <button>点我点我</button>
      </PopOver>
    </>
  );
}
