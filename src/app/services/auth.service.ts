import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private storageService: StorageService) { }

  private base64UrlDecode(str: string): string {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const jsonPayload = this.base64UrlDecode(base64Url);
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
  getUserIdFromToken(): string | null {
    const token:any = this.storageService.getToken();
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.userId : null;
  }

  registerUser(body : any){
    return this.http.post("http://localhost:3000/auth/signUp/",body);
  }
  loginUser(body:any){
    return this.http.post("http://localhost:3000/auth/signIn/",body)
  }

}
