import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

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
import { CreateTractorComponent } from '../tractors/components/create-tractor/create-tractor.component';
import { ParcelsPageComponent } from '../parcels/pages/parcels/parcels.page';
import { ParcelsService } from '../parcels/services/parcels.service';
import { ParcelsRepository } from '../parcels/repositories/parcels.repository';
import { CreateParcelComponent } from '../parcels/components/create-parcel/create-parcel.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardPageComponent,
        NotFoundPageComponent,
        LoginPageComponent,
        TractorsPageComponent,
        ParcelsPageComponent,
        CreateTractorComponent,
        CreateParcelComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        NgbModalModule
    ],
    providers: [
        Config,
        SessionRepository,
        AuthService,
        AuthenticatedAccessGuard,
        UnauthenticatedAccessGuard,
        TractorsService,
        TractorsRepository,
        ParcelsService,
        ParcelsRepository
    ],
    entryComponents: [
        CreateTractorComponent,
        CreateParcelComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
