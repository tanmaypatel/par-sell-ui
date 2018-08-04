import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimpleNotificationsModule } from 'angular2-notifications';

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
import { ParcelProcessingsPageComponent } from '../parcels/pages/parcel-processings/parcel-processings.page';
import { ParcelProcessingsService } from '../parcels/services/parcel-processings.service';
import { ParcelProcessingsRepository } from '../parcels/repositories/parcel-processings.repository';
import { ProcessParcelComponent } from '../parcels/components/process-parcel/process-parcel.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
library.add(faCalendar);

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardPageComponent,
        NotFoundPageComponent,
        LoginPageComponent,
        TractorsPageComponent,
        ParcelsPageComponent,
        ParcelProcessingsPageComponent,
        CreateTractorComponent,
        CreateParcelComponent,
        ProcessParcelComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        NgbModalModule,
        FontAwesomeModule,
        SimpleNotificationsModule.forRoot()
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
        ParcelsRepository,
        ParcelProcessingsService,
        ParcelProcessingsRepository
    ],
    entryComponents: [
        CreateTractorComponent,
        CreateParcelComponent,
        ProcessParcelComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
