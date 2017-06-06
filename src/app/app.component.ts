import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authService: AuthService) { }

    title = 'app works! Bootstrap';
    isCollapsed: boolean = true;

    public onShown(): void {
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
