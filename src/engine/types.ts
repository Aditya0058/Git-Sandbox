export type CommitId = string;

export interface Commit {
    id: CommitId;
    message: string;
    parents: string[];
    timestamp: number;
}

export interface RepositoryState {
    commits: Record<CommitId, Commit>;
    branches: Record<string, CommitId | null>;
    head: string;
    nextId: number;
}

// making empty notebook 

export function emptyBook(): RepositoryState {
    return {
        commits: {},
        branches: {},
        head: "",
        nextId: 1,
    };
}

// git init

export function doInit(state: RepositoryState): RepositoryState{
    return {
        ...state,
        branches:{ main: null},
        head: "main",
    };
}

// git commit -m "mesage"
export function doCommit(state: RepositoryState, message: string): RepositoryState {
    const id = `c${state.nextId}`;
    const parent = state.branches[state.head] ?? null;
    const commit: Commit = {
        id,
        message,
        parents: parent ? [parent] : [],
        timestamp: Date.now(), 
    };
    return {
        ...state,
        commits: { ...state.commits, [id]: commit },
        branches: { ...state.branches, [state.head]: id },
        nextId: state.nextId + 1,
    };
    

}


// git branch <name>
export function doBranch(state: RepositoryState, name:string): RepositoryState{
    if(name in state.branches){
        console.error(`Branch '${name}' already exists`);
        return state;
    }
    const headCommit = state.branches[state.head];
    return {
        ...state,
        branches: { ...state.branches, [name]: headCommit ?? null },

    };
}

// git checkout <branch> / git switch <branch>

export function doCheckout(state: RepositoryState, name: string): RepositoryState{
    if(!(name in state.branches)){
        console.error(`Branch '${name}' does not exists`);
        return state;
    }
    return{
        ...state,
        head: name,
    };
}

//git log (just list of commits)

export function doLog(state: RepositoryState): Commit[] {
  const result: Commit[] = [];
  let currentId: CommitId | null = state.branches[state.head];
  while (currentId) {
    const commit = state.commits[currentId];
    if (!commit) break;
    result.push(commit);
    currentId = commit.parents[0] ?? null;
  }
  return result;
}