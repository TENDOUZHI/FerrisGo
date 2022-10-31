import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import { Provider } from "react-redux";
import { Source } from "./Source";
import { store } from "./store";
import { TitleBar } from "./components/organisms/TitleBar";

function App() {
  // const invoke = window.__TAURI__.invoke
  document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    console.log(321);
    
    invoke('close_splashscreen')
  })
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
