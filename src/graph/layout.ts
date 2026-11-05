// import { type RepositoryState } from "../engine/types";


// export function layoutGraph(state: RepositoryState){
    
    

    


// }
const commits = {
    c1: { id: "c1", parents: [] },
    c2: { id: "c2", parents: ["c1"] },
    c3: { id: "c3", parents: ["c2"] },
    c4: { id: "c4", parents: ["c3"] },
    c5: { id: "c5", parents: ["c2"] },
    c6: { id: "c6", parents: ["c5"] },
    };

console.log(Object.keys(commits).forEach(c => {
    console.log(c);
}));
