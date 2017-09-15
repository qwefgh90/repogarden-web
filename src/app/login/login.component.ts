import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private authService: AuthService) { }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let code = params['code'];
            let state = params['state'];
            this.authService.login(code, state);
        })
    }

}
