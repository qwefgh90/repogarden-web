import { Component, OnInit } from '@angular/core';
import { GithubService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { UserInfo } from '../class/user-info';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public repositories: Repository[];
    public activeCount: number;
    public userInfo: UserInfo;

    constructor(private repositoryService: GithubService, private profileService: ProfileService) {
        this.getRepositories();

        this.profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
    };

    ngOnInit() {
    }

    private getRepositories() {
        this.repositoryService.getRepositories().subscribe(repositories => {
            this.activeCount = repositories.filter(repo => repo.activatedRadio == "on").length;
            this.repositories = repositories;
        });
    }

    radioClick(repo) {
        console.log(repo);
        this.repositoryService.updateActivated(repo, repo.getActivated()).then(isSuccess => {
            //regardless of success or fail, fetch repositories and binding it.
            this.getRepositories();
            if (!isSuccess)
                console.error('update failed in server.');
        });
    }

}
