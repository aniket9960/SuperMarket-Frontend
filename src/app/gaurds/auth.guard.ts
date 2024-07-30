import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { PopUpMessageService } from '../services/pop-up-message.service';



export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let popMsg = inject(PopUpMessageService);
  let result = localStorage.getItem('IsLoggedIn')
  console.log(result);
  if(!result){
    popMsg.errorSnackBar("Login First");
    router.navigate(['/login']);
    return false;
  }
  return true;
};
