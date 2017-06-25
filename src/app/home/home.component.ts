import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { UserInfo } from '../class/user-info';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public repositories: Repository[];
    public userInfo: UserInfo;
    constructor(private repositoryService: RepositoryService, private profileService: ProfileService) {
        this.bindRepositories();
        this.bindUserInfo();
    }

    private bindUserInfo() {
        this.profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
    }

    private bindRepositories() {
        this.repositoryService.getRepositories().then(repos => {
            this.repositories = repos;
        }).catch(ex => {
            console.error(ex);
        });

    }

    ngOnInit() {
    }
}
