import './App.css';
import React, { useState } from 'react';

function App() {
  const [count,setCount]=useState(0);
    function Addition(){
      setCount(prevCount=>prevCount+1);
    }
    function Subtraction(){
      setCount(prevCount=>prevCount-1);
    }
  return (
    <div className="counter">
      <button className='counter--minus' onClick={Subtraction}>-</button>
      <div className='counter--count'>
        <h1>{count}</h1>
      </div>
      <button className='counter--plus' onClick={Addition}>+</button>
    </div>
  );
}

export default App;

 
