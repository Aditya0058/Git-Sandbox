import { type RepositoryState, emptyBook, doInit, doCommit, doBranch, doLog, doCheckout } from "./types";

export function tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = "";
    let inQuotes = false;
    let quoteChar = "";
    for(const ch of input.trim()){
        if(inQuotes){
            if(ch === quoteChar) {
                inQuotes = false;
            }else {
                current += ch;
            }
        } else if (ch === "'" || ch == '"'){
            inQuotes = true;
            quoteChar = ch;
        } else if (ch === " "){
            if(current){
                tokens.push(current);
                current = "";
            }
        } else {
            current += ch;
        }

    }
    if (current) {
        tokens.push(current);
    }
    return tokens;
}

export interface CommandResullt {
    state: RepositoryState;
    output: string;
}

export function applyCommand(state: RepositoryState, input:string): CommandResullt{
    const tokenizedArr = tokenize(input);
    if(tokenizedArr.length==0){
        return {
            state,
            output: ""
        }
    
    } 
    
    if(tokenizedArr[0]!=="git"){
        return {
            state,
            output: "error: only git commands are supported"
        }
    } 

    const sub = tokenizedArr[1];
    if(sub === undefined){
        return {
            state,
            output: "error: missing sub-command"
        }
    }

    switch(sub) {
        case "init":
            return{state: doInit(emptyBook()), output: "Initialized git repository"};
        case "commit": {
            const args = tokenizedArr.slice(2);
            const i = args.indexOf("-m");
            if(i === -1 || !args[i+1]){
                return { state, output: "mesage is required for commit"}
            } 
            const message = args[i+1];
            const next = doCommit(state, message);
            const newId = next.branches[next.head];
            return { state: next, output: `[${next.head} ${newId}] ${message}`};

        }

        case "log":
            const commits = doLog(state);
            if(commits.length === 0) {
                return {state, output: "no commits yet"}
            }
            const output = commits.map(c=> `${c.id} ${c.message}`).join("\n");
            return {state, output};

        case "branch":
            const branchName = tokenizedArr[2];
            if(!branchName){
                return {state, output: "error: branch name is required"}
            }

            try {
                const result = doBranch(state, branchName);
                return {state: result, output: `${branchName}: branch created sucessfully`} 
            } catch (e){
                return {state, output: `error: ${(e as Error).message}`};
            };
        case "switch":
        case "checkout": {
            const branchName = tokenizedArr[2];
            if(!branchName){
                return {state, output: "error: there should be branch name"}
            }
            try{
                const result = doCheckout(state, branchName);
                return {state:result, output: `switched to ${branchName} successfully`}
            } catch (e) {
                return { state, output:`error: ${(e as Error).message}`};
            }
            }

        default: 
            return {state, output: `error: unknown command '${sub}'`};
        
    }

    
} 