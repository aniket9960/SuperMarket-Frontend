import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopUpMessageService } from '../../services/pop-up-message.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[PopUpMessageService,AuthService,StorageService]
})
export class LoginComponent implements OnInit{
  loginForm : FormGroup;
  constructor(
    private fb : FormBuilder,
    private popMsg: PopUpMessageService, 
    private authService: AuthService, 
    private store: StorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if(this.store.getLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(){
     if(this.loginForm.valid){   
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (response:any) => {
          //console.log(response);
          this.store.setToken(response.token);
          this.store.setLoggedIn(true);
          console.log("login: "+this.store.getLoggedIn());
          this.router.navigate(['/dashboard']);
          this.popMsg.successSnackBar(response.message);
        },
        error: (err:any) => {
          console.log(err);
          this.popMsg.successSnackBar(err.error.message);
        }
      });
    }
    else{
      this.popMsg.errorSnackBar("Fill The Form");
    }
  } 

}
