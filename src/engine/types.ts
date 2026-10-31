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