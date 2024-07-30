import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(token:any){
    localStorage.setItem('SMToken',token);
  }
  getToken(){
    return localStorage.getItem('SMToken');
  }
  setLoggedIn(value:any){
    localStorage.setItem('IsLoggedIn',value);
  }
  public getLoggedIn(): boolean{
    let result = localStorage.getItem('IsLoggedIn')
    return result==='true';
  }
  clearLocal(){
    localStorage.clear();
    sessionStorage.clear();
  }

}
