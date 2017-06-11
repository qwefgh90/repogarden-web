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
    private repositories = new ReplaySubject<Repository[]>();

    constructor(private http: Http) { }

    getRepositories(): Observable<Repository[]> {
        this.http.get(this.repositoriesUrl)
            .toPromise()
            .then(response => {
                let repositories = response.json() as Repository[];
                this.repositories.next(repositories);
            })
            .catch(this.handleError);
        return this.repositories;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);

    }


}
