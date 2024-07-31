import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../Auth/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[StorageService]
})
export class DashboardComponent implements OnInit {

  constructor(private store: StorageService){}

  ngOnInit(): void {}

}
