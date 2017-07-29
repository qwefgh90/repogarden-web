import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { RepositoryService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { UserInfo } from '../class/user-info';
import { RepositoryCveDetailComponent } from '../repository-cve-detail/repository-cve-detail.component';
import { RepositoryTypoDetailComponent } from '../repository-typo-detail/repository-typo-detail.component';

enum Tab {
    Cve=1,
    Typo
};

@Component({
    selector: 'app-repository-master',
    templateUrl: './repository-master.component.html',
    styleUrls: ['./repository-master.component.css']
})
export class RepositoryMasterComponent implements OnInit {
    private selectedId: string;
    private selectedRepositoryName: string;

    selectedRepository: Repository;
    repositories: Repository[];
    userInfo: UserInfo;
    isCollapsed = false;
    activeTab = Tab.Cve; // it can have a number from zero

    constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService, private repositoryService: RepositoryService) {
        this.route.params
            .subscribe(params => {
                this.selectedId = params['id'];
                this.selectedRepositoryName = params['repository'];
                repositoryService.getRepositories().then(repos => {
                });
            });
        this.route.queryParams.map(params => {
            return params['tab'] || '0';
        }).subscribe(tab => {
            this.activeTab = tab;
        });;

        repositoryService.getRepositories().then(repos => {
            this.repositories = repos;
            this.route.params.subscribe(params => {
                this.selectedRepository = repos.find(repo => params['repository'] == repo.name);
            });
        });

        profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
    }

    ngOnInit() {
    }

    collapseToggle(){
        this.isCollapsed = !this.isCollapsed;
    }

    selectRepository(repo: Repository){
        this.router.navigate([this.selectedId, repo.name]);
    }

    selectTab(tabName: Tab){
        let tabNumber = Tab[tabName];
        this.router.navigate([this.selectedId, this.selectedRepositoryName], {queryParams : { tab : tabNumber }});
    }
}

