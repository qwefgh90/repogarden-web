import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
    private code: string;
    private state: string;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
        let params = activatedRoute.snapshot.queryParams;
        this.code = params['code'];
        this.state = params['state'];
        console.info(router.url);
        this.authService.login(this.code, this.state);
    }

    ngOnInit() {
    }

}
