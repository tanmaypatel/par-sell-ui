import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { SessionRepository } from '../repositories/session.respository';

@Injectable()
export class AuthenticatedAccessGuard implements CanActivate {

    constructor(private _router: Router, private _session: SessionRepository) {}

    canActivate() {
        if (this._session.isLoggedIn) {
            return true;
        } else {
            this._router.navigate(['/login']);
        }
    }
}
