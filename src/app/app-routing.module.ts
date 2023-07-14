import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './About/About.component';
import { AdminComponent } from './Admin/Admin.component';
import { AdminCustomerDetailsComponent } from './AdminCustomerDetails/AdminCustomerDetails.component';
import { AdminMenuEditComponent } from './AdminMenuEdit/AdminMenuEdit.component';
import { AdminOrderDetailsComponent } from './AdminOrderDetails/AdminOrderDetails.component';
import { AdminQueriesComponent } from './AdminQueries/AdminQueries.component';
import { CartComponent } from './Cart/Cart.component';
import { ContactComponent } from './Contact/Contact.component';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { MenuComponent } from './Menu/Menu.component';
import { OrdersComponent } from './Orders/Orders.component';
import { RegisterComponent } from './Register/Register.component';
import { MenuDetailedComponent } from './MenuDetailed/MenuDetailed.component';
import { AdminProfileComponent } from './AdminProfile/AdminProfile.component';
import { OrderDetailedComponent } from './OrderDetailed/OrderDetailed.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'menu/:check',
    component: MenuDetailedComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'orders/:check',
    component: OrderDetailedComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [{
      path: 'orderDetails',
      component: AdminOrderDetailsComponent
    },
    {
      path: 'update/:orderid',
      component: AdminOrderDetailsComponent
    },
    {
      path: 'menuedit',
      component: AdminMenuEditComponent
    },
    {
      path: 'customerDetails',
      component: AdminCustomerDetailsComponent
    },
    {
      path: 'queries',
      component: AdminQueriesComponent
    },
    {
      path: 'adminProfile',
      component: AdminProfileComponent
    },
    {
      path: '',
      component: AdminProfileComponent
    }]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
