import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { GithubService } from '../repository.service';
import { ProfileService } from '../profile.service';
import { Repository } from '../class/repository';
import { UserInfo } from '../class/user-info';
import { CveCounter, TypoCounter, dfs } from '../class/git-node';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public repositories: Repository[];
    public userInfo: UserInfo;

    @ViewChildren(TooltipDirective) tooltips: QueryList<TooltipDirective>;

    constructor(private githubService: GithubService, private profileService: ProfileService) {
        this.bindRepositories();
        this.bindUserInfo();
    }

    private bindUserInfo() {
        this.profileService.getObservableUserInfo().subscribe(userInfo => {
            this.userInfo = userInfo;
        });
    }

    private bindRepositories() {
        this.githubService.getRepositories().subscribe(repos => {
            this.repositories = repos;
        });
    }

    public closeTooltip(event) {
        this.tooltips.filter(tooltip => event == tooltip[" __tooltipValue"]).forEach(tooltip => {
            tooltip.hide();
        });
    }

    public getLastestCveCount(repo: Repository) {
        //        if (repo.getDefaultBranch().commits.length == 0)
        return 0;
        //        else
        //            return dfs(repo.getDefaultBranch().commits[0].tree, new CveCounter())
    }

    public getLastestTypoCount(repo: Repository) {
        //        if (repo.getDefaultBranch().commits.length == 0)
        return 0;
        //        else
        //            return dfs(repo.getDefaultBranch().commits[0].tree, new TypoCounter())
    }

    ngOnInit() {
    }
}
