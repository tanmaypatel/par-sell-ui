import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { SessionRepository } from '../repositories/session.respository';

@Injectable()
export class UnauthenticatedAccessGuard implements CanActivate {

    constructor(private _router: Router, private _session: SessionRepository) {}

    canActivate() {
        if (!this._session.isLoggedIn) {
            return true;
        }
    }
}
