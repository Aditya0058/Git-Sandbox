import { emptyBook, type RepositoryState } from './engine/types'
import { applyCommand } from './engine/parser';
import './App.css'
import React, { useState } from 'react';

export default function App() {

  const [state, setState] = useState<RepositoryState>(emptyBook());
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key !== 'Enter') return;
    const result = applyCommand(state, input);
    setState(result.state);
    setLines(prev => [...prev, "$ " + input, result.output]);
    setInput("");

  }
  
  return (
    <>
    <div className='terminal'>
      <div className="commands">
        {lines.map((line, i)=>(
          <div key={i}>{line}</div>
        ))}
      </div>
      <input 
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
    <div className="visuals">
      <a href="#">SVG</a>
    </div>
    </>
  );
}


