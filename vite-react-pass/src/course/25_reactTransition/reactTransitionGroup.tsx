import { useState } from "react";
import {
  CSSTransition,
  Transition,
  TransitionGroup,
} from "react-transition-group";
import "./index.scss";
const duration = 1000;
const defaultStyle = {};

export function ReactTransitionGroup() {
  const [flag, setFlag] = useState(false);

  return (
    <div className="transition-group">
      <CSSTransition in={flag} className="aa" timeout={duration}>
        <div style={{ ...defaultStyle }}> BBBB</div>
      </CSSTransition>
      <button onClick={(e) => setFlag(!flag)}>{!flag ? "in" : "out"} </button>
    </div>
  );
}

export function ReactTransitionGroup2() {
  const [item, setItem] = useState([
    { id: 0, name: "1" },
    { id: 1, name: "2" },
  ]);

  return (
    <div className="">
      <TransitionGroup className="item-box">
        {item.map((v, i) => {
          return (
            <CSSTransition className="aa" timeout={duration} key={v.id}>
              <div style={{ ...defaultStyle }}>
                {" "}
                BBBB{v.name}{" "}
                <span
                  className="del-btn"
                  onClick={() =>
                    setItem(item.filter((sitem) => sitem.id !== v.id))
                  }
                >
                  del
                </span>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>

      <div
        className="btn"
        onClick={() => setItem([...item, { id: Date.now(), name: "ff" }])}
      >
        {" "}
        add
      </div>
    </div>
  );
}
