import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserInfo } from './class/user-info';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authService: AuthService, private profileService: ProfileService) {
        this.profileService.getObservableUserInfo().map(userInfo => userInfo.id).subscribe(id => {
            this.userId = id;
        });
    }

    userId: string;

    isCollapsed: boolean = true;

    onShown(): void {
        console.log('Dropdown is shown');
    }

    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    login() {
        this.authService.login("", "").subscribe();
    }

    logout() {
        this.authService.logout();
    }

    isLogin(): boolean {
        return this.authService.isLogin();
    }
}
