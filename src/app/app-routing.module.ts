import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from '../common/pages/not-found/not-found.page';
import { LoginPageComponent } from '../common/pages/login/login.page';
import { DashboardPageComponent } from '../dashboard/pages/dashboard/dashboard.page';
import { TractorsPageComponent } from '../tractors/pages/tractors/tractors.page';
import { AuthenticatedAccessGuard } from '../common/guards/authenticated-access.guard';
import { UnauthenticatedAccessGuard } from '../common/guards/unauthenticated-access.guard';
import { ParcelsPageComponent } from '../parcels/pages/parcels/parcels.page';
import { ParcelProcessingsPageComponent } from '../parcels/pages/parcel-processings/parcel-processings.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        canActivate: [ AuthenticatedAccessGuard ]
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [ UnauthenticatedAccessGuard ]
    },
    {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [ AuthenticatedAccessGuard ]
    },
    {
        path: 'tractors',
        component: TractorsPageComponent,
        canActivate: [ AuthenticatedAccessGuard ]
    },
    {
        path: 'parcels',
        component: ParcelsPageComponent,
        canActivate: [ AuthenticatedAccessGuard ]
    },
    {
        path: 'parcels/processed',
        component: ParcelProcessingsPageComponent,
        canActivate: [ AuthenticatedAccessGuard ]
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
