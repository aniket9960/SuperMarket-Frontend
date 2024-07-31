import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  providers: [CustomerService]
})
export class CustomerListComponent {

  constructor(private customerService: CustomerService) { this.getAllCustomers() }

  customers : any;
  count : any;

  getAllCustomers(){
    this.customerService.getAllCustomers().subscribe({
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
