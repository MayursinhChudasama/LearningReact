import { useState } from "react";

export default function Greetings() {
  const [text, setText] = useState(false);
  return (
    <>
      <h1>Hello Mayur!</h1>
      {!text && <p>Welcome to our app!</p>}
      {text && <p>Welcome to your account.</p>}
    </>
  );
}
