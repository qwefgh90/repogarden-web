import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) {
        
    }

    private sessionCreated: boolean = false;

    login(code: string, state: string): Observable<void> {
        console.info('code:' + code + ',state:' + state);
        var observable = this.http.post('/login', '');
        return observable.map(response => {
            let user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                let returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'];
                console.log(returnUrl);
                if(returnUrl == undefined)
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
