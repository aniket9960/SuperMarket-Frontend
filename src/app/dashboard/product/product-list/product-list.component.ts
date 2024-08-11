import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  count : any;
Products: any;

  constructor(
    private productService: ProductService,
    private auth : AuthService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    const user_id = this.auth.getUserIdFromToken();
    this.productService.getAllProducts(user_id).subscribe({
      next: (response: any) => {
        console.log(response.response);
        this.count = response.response.count;
        this.Products = response.response.products.map((product: any) => {
          return {
            id: product.productId,
            name: product.productName,
            rate: product.rate,
            hsn : product.hsn,
            discount : product.discount,
            gst : product.gst
          };
        });
        console.log(this.Products);
        
      },
      error: (error: any) => console.error('Error:', error)
    });
  }

}
