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

  getAllCustomers(user_id:any){
    return this.http.get(`http://localhost:3000/customer/getAllCustomers/${user_id}`, { headers: this.headers });
  }

  addCustomer(user_id:any,body:any){
    
    return this.http.post(`http://localhost:3000/customer/addCustomer/${user_id}`,body ,{ headers: this.headers });
  }

}
