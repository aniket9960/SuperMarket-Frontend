import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopUpMessageService } from '../../services/pop-up-message.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[PopUpMessageService,AuthService]
})
export class LoginComponent {
  loginForm : FormGroup;
  constructor(private fb : FormBuilder,private popMsg: PopUpMessageService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){   
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (response:any) => {
          console.log(response);
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
      //this.popMsg.openSnackBar('Fill The Form', 'Warn');
    }
  }

}
