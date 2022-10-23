import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import { Provider } from "react-redux";
import { Source } from "./Source";
import { store } from "./store";
import { TitleBar } from "./components/organisms/TitleBar";

function App() {

  return (
    <Provider store={store}>
      <TitleBar />
      <div className="source">
        <Source />
      </div>

    </Provider>
  );
}

export default App;
