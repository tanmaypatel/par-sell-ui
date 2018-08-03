import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionRepository {
    private _accessToken = '';

    get accessToken(): string {
        return this._accessToken;
    }

    private _loggedInUser: BehaviorSubject<User> = new BehaviorSubject(null);

    get loggedInUser(): BehaviorSubject<User> {
        return this._loggedInUser;
    }

    get isLoggedIn() {
        return this.accessToken ? true : false;
    }

    constructor() {}

    activateSession(accessToken: string, loggedInUser: User) {
        this._accessToken = accessToken;
        this.loggedInUser.next(loggedInUser);
    }

    reset() {
        this._accessToken = '';
        this._loggedInUser.next(null);
    }
}
