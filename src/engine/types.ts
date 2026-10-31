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
