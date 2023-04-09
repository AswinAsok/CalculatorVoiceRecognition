import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../styles/calculator.css";
function Calculator() {
  const [result, setResult] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setResult(result.concat(e.currentTarget.name));
  };

  const clear = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  function evaluateExpression(expression: string): string {
    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expression})`)();
      return result.toString();
    } catch (error) {
      console.error(error);
      return "Error";
    }
  }

  const calculate = () => {
    try {
      let num: number = 0; 
      const score= num.toString(); 
      const result = evaluateExpression(score);
      setResult(result);
    } catch (error) {
      console.error(error);
      setResult("Error");
    }
  };

  const { resetTranscript } = useSpeechRecognition();

  const handleVoiceRecognition = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.log("Your browser does not support speech recognition");
      return;
    }

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopVoiceRecognition = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    calculate();
  };
  return (
    <div className="calculator">
    <input type="text" value={result} />
    <div className="keypad">
    <button className="operator" onClick={clear}>
    AC
    </button>
    <button className="operator" onClick={backspace}>
    C
    </button>
    <button className="operator" name="+" onClick={handleClick}>
    +
    </button>
    <button name="7" onClick={handleClick}>
    7
    </button>
    <button name="8" onClick={handleClick}>
    8
    </button>
    <button name="9" onClick={handleClick}>
    9
    </button>
    <button className="operator" name="-" onClick={handleClick}>
    -
    </button>
    <button name="4" onClick={handleClick}>
    4
    </button>
    <button name="5" onClick={handleClick}>
    5
    </button>
    <button name="6" onClick={handleClick}>
    6
    </button>
    <button className="operator" name="*" onClick={handleClick}>
    x
    </button>
    <button name="1" onClick={handleClick}>
    1
    </button>
    <button name="2" onClick={handleClick}>
    2
    </button>
    <button name="3" onClick={handleClick}>
    3
    </button>
    <button className="operator" name="/" onClick={handleClick}>
    ÷
    </button>
    <button name="." onClick={handleClick}>
    .
    </button>
    <button name="0" onClick={handleClick}>
    0
    </button>
    <button className="operator" onClick={calculate}>
    =
    </button>
    <button className="operator" onClick={handleVoiceRecognition}>
    🎤
    </button>
    <button className="operator" onClick={stopVoiceRecognition}>
    🛑
    </button>
    </div>
    </div>
    );
    }
    export default Calculator;