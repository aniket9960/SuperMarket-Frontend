import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers:[StorageService]
})
export class NavbarComponent implements OnInit{

  constructor(private store: StorageService,
              private router : Router
  ) {  }

  isLoggedIn: any
  ngOnInit(): void {
    this.isLoggedIn = this.store.getLoggedIn();
    /* this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNav();
      }
    }); */
  }
  updateNav() {
    this.isLoggedIn = this.store.getLoggedIn();
  }
  
  logout() {
    this.isLoggedIn = false;
    this.store.setLoggedIn(false);
    this.store.clearLocal();
    this.router.navigate(['/login']);
  }
  

}
