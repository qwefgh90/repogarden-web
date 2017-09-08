import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
    selector: 'app-branch-master',
    templateUrl: './branch-master.component.html',
    styleUrls: ['./branch-master.component.css']
})
export class BranchMasterComponent implements OnInit, OnChanges {

    Tab = Tab; // for using Tab structure
    @Input('selectedRepository') repository: Repository;
    @Input('selectedId') id: string;

    qparamSubscription: Subscription;
    userInfo: UserInfo;
    activeTab: Tab = Tab.Cve;
    selectedBranch: Branch;

    constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService, private githubService: GithubService) {

        profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.repository != undefined) {
            this.githubService.getBranches(this.repository).then((branches) => {
                console.log(`${this.repository.name}'s branches are loaded.`);
                this.repository.branches = branches;

                let tab = Tab.Cve;
                let branchName = this.repository.getDefaultBranch().name;
                this.selectedBranch = this.repository.getDefaultBranch();
                if (this.qparamSubscription == undefined) {
                    this.qparamSubscription = this.route.queryParams.subscribe(params => {
                        console.log(`query params ${params}`);
                        let tab = params['tab'] || Tab.Cve;
                        let branchName = params['branch'] || this.repository.getDefaultBranch().name;
                        this.activeTab = tab;
                        if (this.repository.branches != undefined) {
                            let found = this.repository.branches.find((branch: Branch) => branchName == branch.name);
                            if (found != undefined)
                                this.selectedBranch = found;
                        }
                    });
                }
                this.router.navigate([this.id, this.repository.name], { queryParams: { tab: tab, branch: branchName } });
            });
        }
    }

    selectTab(tabName: Tab) {
        console.log("select tab");
        let tabNumber = Tab[tabName];
        if (this.selectedBranch != undefined)
            this.router.navigate([this.id, this.repository.name], { queryParams: { tab: tabNumber, branch: this.selectedBranch.name } });
    }
}
