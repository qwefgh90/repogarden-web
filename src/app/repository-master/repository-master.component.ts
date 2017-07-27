import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { RepositoryService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { UserInfo } from '../class/user-info';
import { Branch } from '../class/branch';
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

    Tab = Tab; // for using Tab structure
    selectedRepository: Repository;
    repositories: Repository[];
    userInfo: UserInfo;
    isCollapsed = false;
    activeTab: Tab = Tab.Cve;
    selectedBranch: Branch;
    branches: Array<Branch>;

    constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService, private repositoryService: RepositoryService) {
        repositoryService.getRepositories().then(repos => {
            this.repositories = repos;
            this.route.params.subscribe(params => {
                this.selectedId = params['id'];
                this.selectedRepositoryName = params['repository'];
                this.selectedRepository = this.repositories.find(repo => params['repository'] == repo.name);
                this.branches = this.selectedRepository.branches;
                this.selectedBranch = this.selectedRepository.getDefaultBranch();

                let qparams = route.snapshot.queryParams
                let tab = qparams['tab'] || Tab.Cve;
                let branchName = qparams['branch'] || this.selectedRepository.getDefaultBranch().name;

                this.router.navigate([this.selectedId, this.selectedRepositoryName], { queryParams: { tab: tab, branch: branchName } });
            });

            this.route.queryParams.subscribe(params => {
                let tab = params['tab'] || Tab.Cve;
                let branchName = params['branch'] || this.selectedRepository.getDefaultBranch().name;
                this.activeTab = tab;
                console.log('query:' + JSON.stringify(params));
                this.selectedBranch = this.selectedRepository.branches.find((branch: Branch) => branchName == branch.name);
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

    selectTab(tabName: Tab) {
        console.log("select tab");
        let tabNumber = Tab[tabName];
        if (this.selectedBranch != undefined)
            this.router.navigate([this.selectedId, this.selectedRepositoryName], { queryParams: { tab: tabNumber, branch: this.selectedBranch.name } });
    }
}

