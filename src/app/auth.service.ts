import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from './class/user-info';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

interface InitialVector {
    client_id: string;
    state: string;
}

@Injectable()
export class AuthService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private profileService: ProfileService) {
        let currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(currentUser);
        if (currentUser != undefined) {
            this.profileService.setUserInfo(new UserInfo(user.id, user.username, user.login,
                user.firstName, user.lastName, user.expiredDate, user.imgUrl, user.url, user.htmlUrl));
        }
    }

    private sessionCreated: boolean = false;

    requestUserIdentity(returnPath?: string): void {
        let returnUrl = returnPath != undefined ? returnPath : this.activatedRoute.snapshot.queryParams['returnUrl'];
        this.http.get('/login/client').map(response => <InitialVector>response.json()).toPromise().then(initialVector => {
            let state = initialVector.state;
            let client_id = initialVector.client_id;
            console.log('cli: ' + client_id);
            let redirect_uri = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/callback?returnUrl=${returnUrl.split('?')[0]}`;
            window.location.href = `https://github.com/login/oauth/authorize?state=${state}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
        }, (response) => {
            console.error('A error occurs. ' + response);
            this.router.navigate(['/']);
        });
    }

    login(code: string, state: string): void {
        var promise = this.http.post('/login', { code: code, state: state }, { withCredentials: true }).toPromise();
        promise.then(response => {
            let user = response.json();
            if (user) {
                let userInfo = new UserInfo(user.id, user.username, user.login,
                    user.firstName, user.lastName, user.expiredDate, user.imgUrl, user.url, user.htmlUrl);
                localStorage.setItem('currentUser', JSON.stringify(userInfo));
                this.profileService.setUserInfo(userInfo);
                let returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'];
                if (returnUrl == undefined)
                    this.router.navigate(['/'], {});
                else
                    this.router.navigate([returnUrl], {});
            }
        }).catch((response) => {
            console.error('A error occurs. ' + response);
            this.router.navigate(['/']);
        });
    }

    logout(retry?: boolean): void {
        localStorage.clear();
        if (retry)
            this.router.navigate([this.router.url], { queryParams: { retry: 1 } });
        location.reload();
    }

    isLogin(): boolean {
        return localStorage.getItem('currentUser') != undefined;
    }


}
