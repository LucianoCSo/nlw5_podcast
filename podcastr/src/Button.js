import { useState } from "react";

export default function Button(props) {
  const [cont, setCont] = useState(1);

  function increment() {
    setCont(cont + 1);
  }

  function decrement() {
    setCont(cont - 1);
  }

  function buttonDecrement() {
    if (cont > 1) {
      return <button onClick={decrement}>Decrement</button>;
    }
  }
  return (
    <>
      <span>{cont}</span>
      <button onClick={increment}>{props.children}</button>
      {buttonDecrement()}
      <br />
    </>
  );
}
