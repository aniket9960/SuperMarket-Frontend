import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  addProduct(user_id: any, product : any){
    return this.http.post(`http://localhost:3000/product/addProduct/${user_id}`, product);
  }

  // API endpoint for getting all products
  getAllProducts(user_id:any){
    return this.http.get(`http://localhost:3000/product/getAllProducts/${user_id}`);
  }

}
