import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../class/user-info';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public repositories: Repository[] = [];
    public userInfo: UserInfo = new UserInfo();
    constructor(private repositoryService: RepositoryService, private profileService: ProfileService) { 
        repositoryService.getRepositories().subscribe(repositories => {
            this.repositories = repositories;
            console.log(repositories);
        });
        this.profileService.getUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
            console.log(this.userInfo);
        });
    };

ngOnInit() {
}

}
