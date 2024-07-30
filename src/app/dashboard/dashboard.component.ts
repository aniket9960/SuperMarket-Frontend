import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[StorageService]
})
export class DashboardComponent implements OnInit {

  constructor(private store: StorageService){}

  ngOnInit(): void {}

}
