import { useState } from "react";
import { Header } from "./Header";
import { Categories } from "./Categories";
import { Catalog } from "./Catalog";
import "./App.css";

function App() {
  return (
    <>
      <Header></Header>
      <div className="content-container">
        <Categories></Categories>
        <Catalog></Catalog>
      </div>
    </>
  );
}

export default App;
