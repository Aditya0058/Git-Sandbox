import { emptyBook, doInit, doCommit, doBranch, doCheckout, doLog, type RepositoryState } from './engine/types'
import { tokenize } from './engine/parser';
import { applyCommand } from './engine/parser';
import './App.css'

function App() {

  let state: RepositoryState = emptyBook();

  // const cmds = ["git init", "ls", "git rebase", "git", "", ];

  // for (const c of cmds) {
  //   const result = applyCommand(state, c);
  //   state = result.state;
  //   console.log(JSON.stringify(c), "---", result.output );
  // }

  console.log(applyCommand(state, 'git commit -m "this is first commit"'))
  
  // console.log(result.state)
  // console.log(result.output)

  return (
    <>
    
    </>
  )
}

export default App
