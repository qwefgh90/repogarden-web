import { Injectable } from '@angular/core';
import { UserInfo } from './class/user-info'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {
    constructor() { }
    private userInfo: ReplaySubject<UserInfo> = new ReplaySubject<UserInfo>(1);
    getUserInfo(): Observable<UserInfo> {
        return this.userInfo;
    }
    setUserInfo(userInfo: UserInfo) {
        this.userInfo.next(userInfo);
    }

}
