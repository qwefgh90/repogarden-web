import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { GithubService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { UserInfo } from '../class/user-info';
import { Branch } from '../class/branch';
import { RepositoryCveDetailComponent } from '../repository-cve-detail/repository-cve-detail.component';
import { RepositoryTypoDetailComponent } from '../repository-typo-detail/repository-typo-detail.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

enum Tab {
    Cve = 1,
    Typo
};

@Component({
    selector: 'app-repository-master',
    templateUrl: './repository-master.component.html',
    styleUrls: ['./repository-master.component.css']
})
export class RepositoryMasterComponent implements OnInit {
    private selectedId: string;


    Tab = Tab; // for using Tab structure
    selectedRepository: Repository;
    repositories: Repository[];
    userInfo: UserInfo;
    isCollapsed = false;
    activeTab: Tab = Tab.Cve;
    selectedBranch: Branch;

    constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService, private githubService: GithubService) {
        githubService.getRepositories().subscribe(repos => {
            this.repositories = repos;
            this.route.params.subscribe(params => {
                this.selectedId = params['id'];
                this.selectedRepository = this.repositories.find(repo => params['repository'] == repo.name);
            });

        });

        profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
    }

    ngOnInit() {
    }

    collapseToggle() {
        this.isCollapsed = !this.isCollapsed;
    }
}

