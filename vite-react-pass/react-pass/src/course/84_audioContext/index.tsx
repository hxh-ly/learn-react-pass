import { useEffect, useMemo } from "react";
import styled, { createGlobalStyle, css } from "styled-components";

const KeysStyle = styled.div`
  width: 800px;
  height: 400px;
  margin: 40px auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
`;
const textStyle = css`
  line-height: 500px;
  text-align: center;
  font-size: 50px;
`;
const KeyStyle = styled.div`
  border: 4px solid black;
  background: #fff;
  flex: 1;
  ${textStyle}

  &:hover {
    background: #aaa;
  }
`;
const GlobalStyle = createGlobalStyle`body {
background:#000;
}
.pressed {
background: #aaa;
}
`;
const keys: Record<string, { frequency: number }> = {
  Q: { frequency: 261.63 },
  W: { frequency: 293.67 },
  E: { frequency: 329.63 },
  R: { frequency: 349.23 },
  T: { frequency: 391.99 },
  Y: { frequency: 440 },
  U: { frequency: 493.88 },
  A: {
    frequency: 196,
  },
  S: {
    frequency: 220,
  },
  D: {
    frequency: 246,
  },
  F: {
    frequency: 261,
  },
  G: {
    frequency: 293,
  },
  H: {
    frequency: 329,
  },
  J: {
    frequency: 349,
  },
  K: {
    frequency: 392,
  },

  L: {
    frequency: 1046,
  },
  Z: {
    frequency: 1175,
  },
  X: {
    frequency: 1318,
  },
  C: {
    frequency: 1397,
  },
  V: {
    frequency: 1568,
  },
  B: {
    frequency: 1760,
  },
  N: {
    frequency: 1976,
  },
};
const keymap = {
  "01": "Q",
  "02": "W",
  "03": "E",
  "04": "R",
  "05": "T",
  "06": "Y",
  "07": "U",
  1: "A",
  2: "S",
  3: "D",
  4: "F",
  5: "G",
  6: "H",
  7: "J",
  8: "K",
  11: "L",
  12: "Z",
  13: "X",
  14: "C",
  15: "V",
  16: "B",
  17: "N",
};
export function Piano() {
  const context = useMemo(() => {
    return new AudioContext();
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      play(e.key.toUpperCase());
    });
  }, []);
  function play(item: string) {
    const frequency = keys[item].frequency;
    if (!frequency) {
      return;
    }

    const osc = context.createOscillator();
    osc.frequency.value = frequency;
    osc.type = "sine";
    const volume = context.createGain();
    osc.connect(volume);
    volume.connect(context.destination);
    volume.gain.setValueAtTime(0, context.currentTime);
    volume.gain.linearRampToValueAtTime(1, context.currentTime + 0.01);
    osc.start(context.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);
    osc.stop(context.currentTime + 1);
    document.getElementById(`key-${item}`)?.classList.add("pressed");
    setTimeout(() => {
      document.getElementById(`key-${item}`)?.classList.remove("pressed");
    }, 200);
  }
  function playsong2() {
    let playTime = 0;
    const puzi = [
      [6, 1000],
      [6, 1000],
      [6, 1000],
      [3, 500],
      [6, 500],
      [5, 1000],
      [3, 500],
      [2, 500],
      [3, 1000],

      [0, 2000],

      /*     */

      [2, 500],
      [3, 500],
      [2, 1000],
      ["07", 1000],
      ["05", 500],
      ["05", 500],
      ["06", 1000],
      ["07", 500],
      ["06", 500],
      ["06", 1000],
      [6, 1000],
      [6, 1000],
      [6, 1000],
      [3, 500],
      [6, 500],
      [5, 1000],
      [3, 500],
      [2, 500],
      [3, 1000],

      [0,500],

      ['05',1000],
      ['05',1000],
      [3,500],
      [2,500],
      [1,1000],
      [2,1000],
      [5,1000],
      [3,500],
      [2,500],
      [3,1000]
    ];
    for (let [key, time] of puzi) {
      setTimeout(() => {
        play(keymap[key]);
      }, playTime * 0.5);
      playTime += time as number;
    }
  }
  return (
    <div>
      <KeysStyle as="section">
        {Object.entries(keys).map((item) => {
          return (
            <KeyStyle as="div" key={item[0]} id={`key-${item[0]}`}>
              <div onClick={(e) => play(item[0])}>
                <span> {item[0]}</span>
              </div>
            </KeyStyle>
          );
        })}
        <GlobalStyle></GlobalStyle>
      </KeysStyle>
      <button onClick={playsong2} style={{ background: "#fff" }}>
        播放奢香夫人
      </button>
    </div>
  );
}
