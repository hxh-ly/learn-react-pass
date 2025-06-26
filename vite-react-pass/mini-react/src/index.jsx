const { render, useState, useEffect } = window.MiniReact;

function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([
    { id: 0, content: Math.random().toString().substring(2, 6) },
    { id: 1, content: Math.random().toString().substring(2, 6) },
  ]);
  return (
    <div>
        <ul>
            <li>1</li>
            <li>2</li>
        </ul>
      <button
        onClick={()=>setList([
          { id: 0, content: Math.random().toString().substring(2, 6) },
          list[1],
        ])}
      >
        set ul 0
      </button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
