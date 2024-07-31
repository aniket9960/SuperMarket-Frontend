import { Component } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent {
  user = {
    name: 'Aniket',
    mobile: 9865321254,
    email: 'aniket@gmail.com',
    password: 'Aniket@1',
    storeName: 'XYZ',
    gstNum: '27AAAAP0267H2ZN',
    address: 'Deccan Pune',
    pincode: 411011
  };
}
