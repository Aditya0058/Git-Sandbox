import { type RepositoryState, emptyBook, doInit, doCommit } from "./types";

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
        default: 
            return {state, output: `error: unknown command '${sub}'`};
        
    }

    
}