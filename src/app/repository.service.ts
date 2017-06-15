import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Repository } from './class/repository';
import { REPOSITORIES } from './mock/mock-repositories';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class RepositoryService {
    private repositoriesUrl = 'api/repositories';
    constructor(private http: Http) { }

    getRepositories(): Promise<Repository[]> {
        return this.http.get(this.repositoriesUrl)
            .map(response => response.json() as Repository[])
            .toPromise()
    }

    private handleError(error: any) {
        console.error('An error occurred', error);

    }


}
