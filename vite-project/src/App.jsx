import { useState } from "react";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [result, setResult] = useState(undefined);
  const [curNumber, setCurNumber] = useState(0);
  const [prevOperation, setPrevOperation] = useState("");
  const [operationsList, setOperationsList] = useState([
    "+",
    "-",
    "*",
    "/",
    "%",
    "^",
    "=",
    "C",
  ]);

  function handleInputChange(event) {
    if (!isFinite(event.target.value)) return;
    setCurNumber(+event.target.value);
  }

  function saveResult(newResult) {
    setResult(newResult);
    setCurNumber(0);
  }

  function handleOperation(operation) {
    if (operation === "C") {
      setResult(undefined);
      setCurNumber(0);
      return;
    }

    if (!prevOperation) {
      if (operation !== "=") {
        setCurNumber(0);
      }
      if (!result) {
        setResult(curNumber);
        setCurNumber(0);
        setPrevOperation(operation);
        return;
      }
      setPrevOperation(operation);
      return;
    }

    let newResult = result;

    switch (prevOperation) {
      case "+":
        newResult = result + curNumber;
        saveResult(newResult);
        break;
      case "-":
        newResult = result - curNumber;
        saveResult(newResult);
        break;
      case "*":
        newResult = result * curNumber;
        saveResult(newResult);
        break;
      case "/":
        newResult = result / curNumber;
        saveResult(newResult);
        break;
      case "%":
        newResult = result * (curNumber / 100);
        saveResult(newResult);
        break;
      case "^":
        newResult = result ** curNumber;
        saveResult(newResult);
        break;
    }
    setPrevOperation(operation);
    if (operation === "=") {
      setCurNumber(newResult);
      setPrevOperation("");
    }
  }

  return (
    <>
      <input
        className="input-field"
        type="text"
        value={curNumber}
        onChange={handleInputChange}
      />
      <div className="operations-container">
        {operationsList.map((op) => (
          <Button onOperation={handleOperation} operation={op} />
        ))}
      </div>
    </>
  );
}

export default App;
