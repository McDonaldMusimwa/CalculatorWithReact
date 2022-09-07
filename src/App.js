import { useState, useEffect } from 'react';
import './App.css';
import {  NumericFormat } from "react-number-format";


function App() {

  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)


  /*functions*/
  const inputNum = (e) => {
    if(curState.includes(".") && e.target.innerText === ".")return
    if (total){
      setPreState("");
    }

    curState
    ? setCurState((pre)=> pre + e.target.innerText)
    : setCurState(e.target.innerText);
    setTotal(false);
  }

  useEffect(()=>{
    setInput(curState)
  },[curState])

  useEffect(()=>{
    setInput("0")
  },[])


  const operatorType = (e) => {
    setTotal(false)
    setOperator(e.target.innerText)
    if (curState === "") return
    if (preState !== ""){
      equals()
    }setPreState(curState)
    setCurState("")

  };  

  const equals = (e) => {
    if (e?.target.innerText==="="){
      setTotal(true)
    }
    let cal
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break; 
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break; 
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;  
        default:
          return    
      }
      setInput("")
      setPreState(cal)
      setCurState("")

  }
  
  
  const minusplus = () => {
    if (curState.charAt(0)==="-"){
      setCurState(curState.substring(1))
    }else{
      setCurState("-"+curState)
    }
  }

  const percent = () => {
    preState ? setCurState(String(parseFloat(curState) / 100 *
    preState)): setCurState(String(parseFloat(curState)/100));

  }

  const reset = () => {
    setPreState("")
    setCurState("")
    setInput("0")
  }


  return (
    <div className="container">
      <div className="wrapper">
      <div id="display" className='screen'>
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div id='clear' className="btn light-gray" onClick={reset}>DEL</div>
        <div className="btn light-gray" onClick={percent}>%</div>
        <div className="btn light-gray" onClick={minusplus}>+/-</div>
        <div id="divide" className="btn orange" onClick={operatorType}>/</div>
        <div id="seven" className="btn" onClick={inputNum}>7</div>
        <div id="eight" className="btn" onClick={inputNum}>8</div>
        <div id="nine" className="btn" onClick={inputNum}>9</div>
        <div id="multiply" className="btn orange" onClick={operatorType}>X</div>
        <div id="four" className="btn" onClick={inputNum}>4</div>
        <div id="five" className="btn" onClick={inputNum}>5</div>
        <div id="six" className="btn" onClick={inputNum}>6</div>
        <div id='add' className="btn orange" onClick={operatorType}>+</div>
        <div id="one" className="btn" onClick={inputNum}>1</div>
        <div id="two" className="btn" onClick={inputNum}>2</div>
        <div id="three" className="btn" onClick={inputNum}>3</div>
        <div id="subtract" className="btn orange" onClick={operatorType}>-</div>
        <div id="zero" className="btn zero" onClick={inputNum}>0</div>
        <div id='decimal' className="btn" onClick={inputNum}>.</div>
        <div id="equals" className="btn" onClick={equals}>=</div>

      </div>
    </div>
  );
}

export default App;
