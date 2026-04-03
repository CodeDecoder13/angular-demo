import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly auth = inject(AuthService);

  protected readonly stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', color: 'blue' },
    { label: 'Revenue', value: '$45,678', change: '+8%', color: 'green' },
    { label: 'Active Projects', value: '23', change: '+3', color: 'purple' },
  ];
}
