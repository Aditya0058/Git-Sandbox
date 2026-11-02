import { emptyBook, doInit, doCommit, doBranch, doCheckout, doLog, type RepositoryState } from './engine/types'
import { tokenize } from './engine/parser';
import { applyCommand } from './engine/parser';
import './App.css'

function App() {

  let state: RepositoryState = emptyBook();

  const cmds = ["git log","git init", "git log","git commit -m \'first\'","git commit -m \'second\'", "git commit -m \'third\'","ls", "git rebase", "git log" ];

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
