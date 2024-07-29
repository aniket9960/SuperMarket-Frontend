import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, 
              private authService : AuthService
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
  ngOnInit(): void {  }
  onSubmit(){
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.authService.registerUser(this.registrationForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (err: any) => {
          console.log('Error is : ', err.error.message);
          alert(err.error.message);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
