import { Component, OnInit } from '@angular/core';
import { SessionRepository } from '../../../common/repositories/session.respository';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss']
})

export class DashboardPageComponent {
    constructor(public session: SessionRepository) {}
}
