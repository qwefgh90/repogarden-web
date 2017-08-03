import { TestBed, inject } from '@angular/core/testing';

import { GithubService } from './repository.service';

describe('RepositoryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GithubService]
        });
    });

    it('should be created', inject([GithubService], (service: GithubService) => {
        expect(service).toBeTruthy();
    }));
});
