import * as React from "react";
import * as Server from "react-dom/server";
import * as ReactDOM from "react-dom/client";
import test from "../shared/test";

let Greet = () => {
  let [count, setCount] = React.useState(0);
  return (
    <div>
      <h1 style={{ marginTop: 200 }} onClick={() => setCount(count + 1)}>
        client-2: counts={count} and {test()}
      </h1>
      <input type="text" />
    </div>
  );
};

console.log(Server.renderToString(<Greet />));

ReactDOM.createRoot(
  document.body.appendChild(document.createElement("DIV"))
).render(<Greet />);
