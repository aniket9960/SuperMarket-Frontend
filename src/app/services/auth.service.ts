import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  registerUser(body : any){
    return this.http.post("http://localhost:3000/auth/signUp/",body);
  }

}
