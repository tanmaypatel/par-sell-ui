import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
    AuthService,
    IAuthenticationDetails
} from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {
    loginForm: FormGroup = new FormGroup({
        userEmail: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        userPassword: new FormControl('', [
            Validators.required
        ])
    });

    constructor(private _router: Router, private _authService: AuthService) {
    }

    onLoginFormSubmit() {
        if (this.loginForm.valid) {
            const { userEmail, userPassword } = this.loginForm.value;

            this._authService
                .authenticate(userEmail, userPassword)
                .then((authenticationDetails: IAuthenticationDetails) => {
                    this._router.navigate(['/dashboard']);
                });
        }
    }
}
