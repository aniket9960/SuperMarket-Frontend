import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  Products: any[] = [];
  filteredProducts: any[][] = [];
  user_id: any;
  customers : any[] = [];
  filteredCustomers: any[] = [];
  productSuggestions = false ;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService, 
    private auth: AuthService,
    private customerService: CustomerService
  ) {
    this.orderForm = this.fb.group({
      buyerName: ['', Validators.required],
      invoiceDate: [this.getCurrentDate(), Validators.required],
      products: this.fb.array([this.createProduct()]),
      total: [{ value: '0.00', disabled: true }],
      discountPercent: ['0'],
      discountAmount: [{ value: '0.00', disabled: true }],
      totalGst: [{ value: '0.00', disabled: true }],
      grandTotal: [{ value: '0.00', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.user_id = this.auth.getUserIdFromToken();
    this.productService.getAllProducts(this.user_id).subscribe({
      next: (response: any) => {
        this.Products = response.response.products.map((product: any) => ({
          id: product.productId,
          name: product.productName,
          rate: product.rate,
          hsn: product.hsn,
          discount: product.discount,
          gst: product.gst
        }));
        this.customerService.getAllCustomers(this.user_id).subscribe({
          next: (response: any) => {
            this.customers = response.response.customers.map((customer: any) => ({
              id: customer.id,
              name: customer.name
            }));
            console.log(this.customers);
          },
          error: (error: any) => console.error('Error:', error)
        });
        this.filteredProducts = this.products.controls.map(() => []);
      },
      error: (error: any) => console.error('Error:', error)
    });
  }

  productSuggestionDisplay(event: FocusEvent): void {
   this.productSuggestions = !this.productSuggestions
  }

  onBlurProduct(event: FocusEvent): void {
    console.log('Input field has lost focus', event);
    // Add your blur handling logic here
  }

  createProduct(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      gstRate: [{ value: 0, disabled: true }],
      gstAmount: [{ value: '0.00', disabled: true }],
      discount: [0, [Validators.required, Validators.min(0)]],
      discountAmount: [{ value: '0.00', disabled: true }],
      total: [{ value: '0.00', disabled: true }]
    });
  }

  getProductNameControl(index: number): FormControl {
    const control = this.products.at(index).get('name');
    if (control instanceof FormControl) {
      return control;
    }
    throw new Error('Expected FormControl');
  }

  onProductNameChange(index: number): void {
    const control = this.getProductNameControl(index);
    const filterValue = control.value?.toLowerCase() || '';
    this.filteredProducts[index] = this.Products.filter(product =>
      product.name.toLowerCase().includes(filterValue)
    );
  }

  onProductSelected(selectedProduct: any, index: number): void {
    const productGroup = this.products.at(index);
    productGroup.get('name')?.setValue(selectedProduct.name);
    productGroup.get('price')?.setValue(selectedProduct.rate);
    productGroup.get('gstRate')?.setValue(selectedProduct.gst);
    productGroup.get('discount')?.setValue(selectedProduct.discount);
    this.filteredProducts[index] = []; // Clear the suggestions after selection

    this.calculateTotal(index);
  }

  addProduct(): void {
    const newProductGroup = this.createProduct();
    this.products.push(newProductGroup);
    this.filteredProducts.push([]);
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
    this.filteredProducts.splice(index, 1);
    this.calculateGrandTotal();
  }

  calculateTotal(index: number): void {
    const productGroup = this.products.at(index);
    const quantity = productGroup.get('quantity')?.value || 0;
    const price = productGroup.get('price')?.value || 0;
    const discount = productGroup.get('discount')?.value || 0;
    const gstRate = productGroup.get('gstRate')?.value || 0;

    const discountAmount = (price * quantity * discount) / 100;
    const subtotal = price * quantity - discountAmount;
    const gstAmount = (subtotal * gstRate) / 100;
    const total = subtotal + gstAmount;

    productGroup.get('discountAmount')?.setValue(discountAmount.toFixed(2));
    productGroup.get('gstAmount')?.setValue(gstAmount.toFixed(2));
    productGroup.get('total')?.setValue(total.toFixed(2));

    this.calculateGrandTotal();
  }

  calculateGrandTotal(): void {
    let grandTotal = 0;
    let totalDiscount = 0;
    let totalGst = 0;

    this.products.controls.forEach((productGroup) => {
      const total = parseFloat(productGroup.get('total')?.value || '0');
      const discount = parseFloat(productGroup.get('discountAmount')?.value || '0');
      const gst = parseFloat(productGroup.get('gstAmount')?.value || '0');

      grandTotal += total;
      totalDiscount += discount;
      totalGst += gst;
    });

    this.orderForm.get('total')?.setValue(grandTotal.toFixed(2));
    this.orderForm.get('discountAmount')?.setValue(totalDiscount.toFixed(2));
    this.orderForm.get('totalGst')?.setValue(totalGst.toFixed(2));
    this.orderForm.get('grandTotal')?.setValue(grandTotal.toFixed(2));
  }

  calculateDiscount(): void {
    const discountPercent = this.orderForm.get('discountPercent')?.value || 0;
    const total = parseFloat(this.orderForm.get('total')?.value || '0');
    const discountAmount = (total * discountPercent) / 100;

    this.orderForm.get('discountAmount')?.setValue(discountAmount.toFixed(2));
    const grandTotal = total - discountAmount;
    this.orderForm.get('grandTotal')?.setValue(grandTotal.toFixed(2));
  }

  getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  cancel(): void {
    this.orderForm.reset();
    this.products.clear();
    this.addProduct();
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Order submitted:', this.orderForm.value);
      // Submit the form
    } else {
      console.log('Form is invalid');
    }
  }

  get products(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }
}
