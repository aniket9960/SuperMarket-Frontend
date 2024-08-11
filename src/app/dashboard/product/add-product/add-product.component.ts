import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  user_id: string | null | undefined;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private auth : AuthService
  ){}

  productForm = this.fb.group({
    productName: ['', Validators.required],
    hsn : ['', Validators.required],
    rate : ['', Validators.required],
    discount : ['', Validators.required],
    gst : ['', Validators.required],
  });

  onSubmit() {
    this.user_id = this.auth.getUserIdFromToken();
    console.log(this.user_id);
    this.productService.addProduct(this.user_id,this.productForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.productForm.reset();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    
    }

}
