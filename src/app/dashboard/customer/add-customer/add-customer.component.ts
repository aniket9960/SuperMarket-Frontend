import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { PopUpMessageService } from '../../../services/pop-up-message.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
  providers: [CustomerService, PopUpMessageService, AuthService]
})
export class AddCustomerComponent {

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private popMsg: PopUpMessageService,
    private router: Router,
    private auth: AuthService
  ) { }

  customerForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    email: ['', Validators.required],
    storeName: ['', Validators.required],
    gstNum: ['', Validators.required],
    address: ['', Validators.required],
    pincode: ['', Validators.required],
  });

  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      const user_id = this.auth.getUserIdFromToken();
      this.customerService.addCustomer(user_id,this.customerForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.customerForm.reset();
          this.router.navigateByUrl('/dashboard/customer');
          this.popMsg.successSnackBar(response.message);
        },
        error: (err: any) => {
          console.log(err);
          this.popMsg.errorSnackBar('Failed To Add Customer');
        }
      });
    }else{
      this.popMsg.errorSnackBar('Fill Customer Details');
    }


  }

}
