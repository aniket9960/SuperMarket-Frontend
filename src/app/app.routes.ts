import { Routes } from '@angular/router';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './gaurds/auth.guard';
import { CustomerComponent } from './dashboard/customer/customer.component';
import { OrderComponent } from './dashboard/order/order.component';
import { ProductComponent } from './dashboard/product/product.component';
import { CustomerListComponent } from './dashboard/customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './dashboard/customer/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './dashboard/customer/update-customer/update-customer.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    {path:'register', component:  RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent, canActivate:[authGuard], 
        children: [
        { path: 'customer', component: CustomerComponent, 
            children: [
                {path: '', component: CustomerListComponent},
                {path:'addCustomer', component: AddCustomerComponent},
                {path: 'updateCustomer', component: UpdateCustomerComponent}
            ]},
        { path: 'order', component: OrderComponent },
        { path: 'product', component: ProductComponent },

      ]}
    
];
