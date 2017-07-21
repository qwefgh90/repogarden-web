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
import { Observable } from 'rxjs/Observable';

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
    private selectedRepositoryName: string;

    selectedRepository: Repository;
    repositories: Repository[];
    userInfo: UserInfo;
    isCollapsed = false;
    activeTab = Tab.Cve; // it can have a number from one
    selectedBranch: String;
    branches: Array<String>;

    constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService, private repositoryService: RepositoryService) {
        this.route.params
            .subscribe(params => {
                this.selectedId = params['id'];
                this.selectedRepositoryName = params['repository'];
                repositoryService.getRepositories().then(repos => {
                });
            });
        /*
                this.route.queryParams.map(params => {
                    return params['tab'] || Tab.Cve;
                }).subscribe(tab => {
                    this.activeTab = tab;
                })
        
                this.route.queryParams.map(params => {
                    return params['branch'] || "";
                }).subscribe(branch => {
                    this.selectedBranch = branch;
                })
        */

        this.route.queryParams.subscribe(params => {
            let tab = params['tab'] || Tab.Cve;
            let branch = params['branch'] || "";
            this.activeTab = tab;
            this.selectedBranch = branch;
        });

        repositoryService.getRepositories().then(repos => {
            this.repositories = repos;
            this.route.params.subscribe(params => {
                this.selectedRepository = repos.find(repo => params['repository'] == repo.name);
                this.branches = this.selectedRepository.branches;
                this.selectedBranch = this.branches.length > 0 ? this.branches[0] : "";
                this.router.navigate([this.selectedId, this.selectedRepositoryName], { queryParams: { tab: this.activeTab, branch: this.selectedBranch } });
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

    selectBranch(name: string) {
        this.router.navigate([this.selectedId, this.selectedRepositoryName], { queryParams: { tab: this.activeTab, branch: name } });
    }

    selectRepository(repo: Repository) {
        this.router.navigate([this.selectedId, repo.name], { queryParams: { tab: this.activeTab, branch: this.selectedBranch } });
    }

    selectTab(tabName: Tab) {
        console.log("select tab");
        let tabNumber = Tab[tabName];
        this.router.navigate([this.selectedId, this.selectedRepositoryName], { queryParams: { tab: tabNumber, branch: this.selectedBranch } });
    }
}

