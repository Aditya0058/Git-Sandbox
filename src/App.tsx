import { emptyBook, doInit, doCommit, doBranch, doCheckout, doLog } from './engine/types'
import './App.css'

function App() {

  let book = emptyBook();
  book = doInit(book);
  book = doCommit(book, "first");
  book = doCommit(book, "second");
  book = doBranch(book, "feature");
  book = doCheckout(book, "feature");
  book = doCommit(book, "login");  
  book = doCheckout(book, "main");
  book = doCommit(book, "nothing");

  console.log(JSON.stringify(book, null, 2));

  console.log("__________________________________");
  console.log(doLog(book).map(c => `${c.id}  ${c.message}`));
  return (
    <>
    
    </>
  )
}

export default App
