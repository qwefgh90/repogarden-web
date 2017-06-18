import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { LoginComponent } from './login/login.component';

import { fakeBackendProvider } from './mock/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//service
import { ProfileService } from './profile.service';
import { AuthGuardService } from './auth-guard.service';
import { RepositoryService } from './repository.service';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

//bootstrap
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

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
                path: 'profile/:id',
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
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        TooltipModule.forRoot()
    ],
    providers: [
        AuthGuardService,
        AuthService,
        RepositoryService,
        ProfileService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions],
    bootstrap: [AppComponent]
})
export class AppModule { }
