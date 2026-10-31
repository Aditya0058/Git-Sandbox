import { emptyBook, doInit, doCommit } from './engine/types'
import './App.css'

function App() {

  let book = emptyBook();
  book = doInit(book);
  book = doCommit(book, "first");
  book = doCommit(book, "second");

  console.log(JSON.stringify(book, null, 2));
  return (
    <>
    
    </>
  )
}

export default App
