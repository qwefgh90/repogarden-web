import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
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

    userInfo: UserInfo;
    activeTab: Tab = Tab.Cve;
    selectedBranch: Branch;
    private qparamSubscription: Subscription;
    private branchSubscription: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService, private githubService: GithubService) {
        profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.repository != undefined) {
            console.log("getbranch");
            if (this.branchSubscription != undefined)
                this.branchSubscription.unsubscribe();
            this.branchSubscription = this.githubService.getBranches(this.repository).subscribe((branches) => {
                console.log("sub");
                this.repository.branches = branches;
                let queryParams = this.route.snapshot.queryParams;
                let tab = queryParams['tab'] || Tab.Cve;
                let branchName = queryParams['branch'] || this.repository.defaultBranch;
                let found = branches.find((branch: Branch) => branchName == branch.name);
                if (found != undefined)
                    this.selectedBranch = found;
                else
                    this.selectedBranch = undefined;
                if (this.qparamSubscription == undefined) {
                    this.qparamSubscription = this.route.queryParams.subscribe(params => {
                        let tab = params['tab'] || Tab.Cve;
                        let branchName = params['branch'] || this.repository.defaultBranch;
                        this.activeTab = tab;
                        if (this.repository.branches != undefined) {
                            let found = this.repository.branches.find((branch: Branch) => branchName == branch.name);
                            if (found != undefined)
                                this.selectedBranch = found;
                            else
                                this.selectedBranch = undefined;
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
