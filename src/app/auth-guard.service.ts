import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLogin()) {
            return true;
        }

        let retry = route.queryParams['retry'];
        if (retry) {
            this.authService.requestUserIdentity(state.url);
        } else
            this.router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
