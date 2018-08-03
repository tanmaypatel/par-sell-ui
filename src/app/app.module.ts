import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../common/components/navbar/navbar.component';
import { DashboardPageComponent } from '../dashboard/pages/dashboard/dashboard.page';
import { NotFoundPageComponent } from '../common/pages/not-found/not-found.page';
import { LoginPageComponent } from '../common/pages/login/login.page';
import { AuthService } from '../common/services/authentication.service';
import { Config } from '../config/configuration.provider';
import { SessionRepository } from '../common/repositories/session.respository';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardPageComponent,
        NotFoundPageComponent,
        LoginPageComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule.forRoot()
    ],
    providers: [Config, AuthService, SessionRepository],
    bootstrap: [AppComponent]
})
export class AppModule {}
