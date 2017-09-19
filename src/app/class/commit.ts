import { Cve } from './cve';
import { GitNode } from './git-node';
import { TreeService } from '../tree.service';
import { Repository } from './repository'

export interface Commit {
    sha: string;
    message: string;
    date: string;
    committerEmail: string;
    committerName: string;
    url: string;
    status: string;
    typoStatId?: number;
    cveStatId?: number;
    tree?: GitNode;
}
