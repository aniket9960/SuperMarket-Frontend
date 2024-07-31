import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  providers: [CustomerService,AuthService]
})
export class CustomerListComponent {

  constructor(private customerService: CustomerService,
              private auth: AuthService
  ) { this.getAllCustomers() }

  customers : any;
  count : any;
  user_id : any;

  getAllCustomers(){
    this.user_id = this.auth.getUserIdFromToken();
    this.customerService.getAllCustomers(this.user_id).subscribe({
      next:(response:any)=>{
        console.log(response.response);
        this.count = response.response.count;
        this.customers = response.response.customers.map((customer: any)=>{
          return {
            id: customer.id,
            name : customer.name,
            email : customer.email,
            mobile : customer.mobile,
            storeName : customer.storeName,
            gstNum : customer.gstNum,
            address : customer.address,
            pincode : customer.pincode
          }
        });
        console.log(this.customers);
        
        
      },
      error:(error:any)=>{
        console.log(error);
        
      }
    });
  }

}
