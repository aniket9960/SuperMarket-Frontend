import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopUpMessageService } from '../../services/pop-up-message.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService,PopUpMessageService]
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private popMsg : PopUpMessageService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      storeName: ['', Validators.required],
      gstNum: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  ngOnInit(): void { }


  onSubmit() {
    
    
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.authService.registerUser(this.registrationForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.popMsg.successSnackBar("User Created Successfully");
        },
        error: (err: any) => {
          console.log('Error is : ', err.error.message);
          this.popMsg.errorSnackBar(err.error.message);
        }
      });
    } else {
      this.popMsg.errorSnackBar("Fill The Form");
    }
  }

}
