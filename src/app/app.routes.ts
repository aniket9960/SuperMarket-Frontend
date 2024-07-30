import { Routes } from '@angular/router';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './gaurds/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '*', redirectTo: '/login' },
    {path:'register', component:  RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]}
    
];
