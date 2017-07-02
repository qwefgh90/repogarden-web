import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from './class/user-info';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private profileService: ProfileService) {
        let currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(currentUser);
        if (currentUser != undefined) {
            this.profileService.setUserInfo(new UserInfo(user.id, user.username,
                user.firstName, user.lastName, user.expiredDate, user.imgUrl));
        }
    }

    private sessionCreated: boolean = false;

    requestUserIdentity(): void {
        this.http.get('/client').toPromise().then(response => {
            let state = Date.now();
            let client_id = response.text();
            let redirect_uri = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/callback`;
            window.location.href = `https://github.com/login/oauth/authorize?state=${state}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
        })
    }

    login(code: string, state: string): Observable<void> {
        var observable = this.http.post('/login', '');
        return observable.map(response => {
            let user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.profileService.setUserInfo(new UserInfo(user.id, user.username,
                    user.firstName, user.lastName, user.expiredDate, user.imgUrl));
                let returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'];
                if (returnUrl == undefined)
                    this.router.navigate(['/'], {});
                else
                    this.router.navigate([returnUrl], {});
            }
        });
    }

    logout(): void {
        localStorage.clear();
        location.reload();
    }

    isLogin(): boolean {
        return localStorage.getItem('currentUser') != undefined;
    }


}
