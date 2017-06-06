import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//service
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
//bootstrap

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        LoginComponent,
        LogoutComponent,
        HomeComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'welcome',
                component: WelcomeComponent
            },
            // otherwise redirect to home
            { path: '**', redirectTo: '' }
        ]),
        BsDropdownModule.forRoot()
    ],
    providers: [
        AuthGuardService,
        AuthService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions],
    bootstrap: [AppComponent]
})
export class AppModule { }
