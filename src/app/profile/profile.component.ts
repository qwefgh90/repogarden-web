import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { UserInfo } from '../class/user-info';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public repositories: Repository[] = [];
    public activeCount: number = 0;
    public userInfo: UserInfo = new UserInfo();
    public radioButtonDetector: BehaviorSubject<number>;//detect radio button's change
    constructor(private repositoryService: RepositoryService, private profileService: ProfileService) {
        repositoryService.getRepositories().then(repositories => {
            this.activeCount = repositories.filter(repo => repo.activated == "on").length;
            this.repositories = repositories;
            this.radioButtonDetector = new BehaviorSubject(this.repositories.filter(repo => repo.activated == "on").length);
            this.radioButtonDetector
                .debounceTime(300)
                .distinctUntilChanged()
                .subscribe(activeCount => {
                    console.log('server update');
                    //server update
                    //if 200, then update active count
                    //else, nothing
                });
        });
        this.profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
    };

    ngOnInit() {
    }

    radioClick() {
        this.radioButtonDetector.next(this.repositories.filter(repo => repo.activated == "on").length);
    }

}
