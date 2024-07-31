import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Auth/navbar/navbar.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtInterceptor } from './interceptor/jwt.interceptor';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [StorageService]
})
export class AppComponent implements OnInit {
  private isNavigatingWithinApp = false;
  title = 'SuperMarket';
  constructor(private storageService : StorageService,
    private router: Router
  ){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigatingWithinApp = true;
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.isNavigatingWithinApp) {
     this.storageService.clearLocal();
    }
  }
}
