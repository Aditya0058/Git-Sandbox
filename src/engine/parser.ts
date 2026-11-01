// ex - git commit -m "fixed bugs"
// eg, - git push -u origin main
// const input = 'git commit -m "fixed bugs"';
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