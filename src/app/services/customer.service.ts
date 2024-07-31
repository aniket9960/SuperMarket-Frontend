import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  headers:any;

  constructor(private http: HttpClient, private store: StorageService) {
    const token = this.store.getToken();
    console.log('Token:', token); // Debugging line
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   }

  getAllCustomers(){
    return this.http.get('http://localhost:3000/customer/getAllCustomers/', { headers: this.headers });
  }

}
