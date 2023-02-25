import * as React from "react";
import * as Server from "react-dom/server";
import * as ReactDOM from "react-dom/client";
import test from "../shared/test";
import { proxy, useSnapshot } from "valtio";

let state = proxy({ count: 0, textState: { inputText: "" } });

let App = () => {
  return (
    <React.StrictMode>
      <Greet />
    </React.StrictMode>
  );
};

let Greet = () => {
  let snap = useSnapshot(state);
  return (
    <div>
      <h1 style={{ marginTop: 200 }} onClick={() => (state.count += 1)}>
        client-1: counts={snap.count} and {test()}
      </h1>
      <InputView />
    </div>
  );
};

let InputView = () => {
  let snap = useSnapshot(state.textState);
  return (
    <div>
      <input
        type="text"
        value={snap.inputText}
        onChange={(e) => {
          state.textState.inputText = e.target.value;
        }}
      />
      <div>{snap.inputText}</div>
    </div>
  );
};

console.log(Server.renderToString(<Greet />));

ReactDOM.createRoot(
  document.body.appendChild(document.createElement("DIV"))
).render(<App />);
