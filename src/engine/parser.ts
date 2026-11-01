import { type RepositoryState, emptyBook, doInit } from "./types";

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
    
    } else if(tokenizedArr[0]!="git"){
        return {
            state,
            output: "error: only git commands are supported"
        }
    } else if (tokenizedArr[1] == 'init'){
        return {
            state: doInit(emptyBook()),
            output: "Initialized empty repository"
        }
    } else {
        return {
            state,
            output: "error: unknow command"
        }
    }
}