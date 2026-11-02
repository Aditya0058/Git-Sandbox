import { emptyBook, doInit, type RepositoryState } from './engine/types'
import { applyCommand } from './engine/parser';
import './App.css'

function App() {

  let state: RepositoryState = emptyBook();

  const cmds = ["git log","git init", "git log","git commit -m \'first\'", "git log", "git branch master", "git log", "git branch master", "git checkout master", "git checkout cooked"];

  for (const c of cmds) {
    const result = applyCommand(state, c);
    state = result.state;
    console.log("$", c);
    console.log(result.output);
    console.log("---");
  }

  // console.log(applyCommand(state, 'git commit -m "this is first commit"'))
  


  return (
    <>
    
    </>
  )
}

export default App
