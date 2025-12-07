import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrease = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Counter App</h1>
      <p style={{ fontSize: "3rem" }}>Count: {count}</p>
      <div>
        <button
          onClick={increase}
          style={{
            fontSize: "2rem",
            margin: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          +
        </button>
        <button
          onClick={decrease}
          style={{
            fontSize: "2rem",
            margin: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}
