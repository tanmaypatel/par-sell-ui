import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../common/components/navbar/navbar.component';
import { DashboardPageComponent } from '../dashboard/pages/dashboard/dashboard.page';
import { NotFoundPageComponent } from '../common/pages/not-found/not-found.page';
import { LoginPageComponent } from '../common/pages/login/login.page';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardPageComponent,
        NotFoundPageComponent,
        LoginPageComponent
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
