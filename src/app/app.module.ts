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

import { Config } from '../config/configuration.provider';
import { SessionRepository } from '../common/repositories/session.respository';
import { TractorsService } from '../tractors/services/tractors.service';
import { AuthService } from '../common/services/authentication.service';
import { TractorsPageComponent } from '../tractors/pages/tractors/tractors.page';
import { TractorsRepository } from '../tractors/repositories/tractors.repository';
import { AuthenticatedAccessGuard } from '../common/guards/authenticated-access.guard';
import { UnauthenticatedAccessGuard } from '../common/guards/unauthenticated-access.guard';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardPageComponent,
        NotFoundPageComponent,
        LoginPageComponent,
        TractorsPageComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule.forRoot()
    ],
    providers: [
        Config,
        SessionRepository,
        AuthService,
        AuthenticatedAccessGuard,
        UnauthenticatedAccessGuard,
        TractorsService,
        TractorsRepository
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
