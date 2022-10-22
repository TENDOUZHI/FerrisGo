import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import { Provider } from "react-redux";
import { Source } from "./Source";
import { store } from "./store";

function App() {

  return (
    <Provider store={store}>
      <Source />
      <h1>hello</h1>
    </Provider>
  );
}

export default App;
