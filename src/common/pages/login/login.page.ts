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
    loginForm: FormGroup;

    constructor(private _router: Router, private _authService: AuthService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required, Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ])
        });
    }

    onLoginFormSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;

            this._authService
                .authenticate(email, password)
                .then((authenticationDetails: IAuthenticationDetails) => {
                    this._router.navigate(['/dashboard']);
                });
        }
    }
}
