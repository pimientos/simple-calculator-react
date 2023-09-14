import { useState, useRef, useCallback } from "react"; 
import "./App.css";

function App() { 
  const inputRef = useRef(null); 
  const [result, setResult] = useState(0);

  const handleOperation = useCallback((operation) => (e) => {
    e.preventDefault();
    const inputValue = Number(inputRef.current.value);
    inputRef.current.select();

    switch(operation) {
      case 'plus':
        setResult(prevResult => prevResult + inputValue);
        break;
      case 'minus':
        setResult(prevResult => prevResult - inputValue);
        break;
      case 'times':
        setResult(prevResult => prevResult * inputValue);
        break;
      case 'divide':
        if (inputValue === 0) {
          // Maybe handle this differently or show an error
          setResult("Cannot divide by zero");
          return;
        }
        setResult(prevResult => prevResult / inputValue);
        break;
      default:
        break;
    }
  }, []);

  const resetInput = useCallback((e) => {
    e.preventDefault();
    inputRef.current.value = "";
    inputRef.current.select();
  }, []);

  const resetResult = useCallback((e) => {
    e.preventDefault(); 
    setResult(0);
  }, []);

  return ( 
    <div className="App"> 
      <h1>Simplest Working Calculator</h1> 
      <form> 
        <p>{result}</p> 
        <input
          pattern="[0-9]" 
          ref={inputRef} 
          type="number" 
          placeholder="Type a number" 
        /> 
        <button onClick={handleOperation('plus')}>add</button>
        <button onClick={handleOperation('minus')}>subtract</button>
        <button onClick={handleOperation('times')}>multiply</button>
        <button onClick={handleOperation('divide')}>divide</button>
        <button onClick={resetInput}>reset input</button>
        <button onClick={resetResult}>reset result</button>
      </form> 
    </div> 
  ); 
} 

export default App;
