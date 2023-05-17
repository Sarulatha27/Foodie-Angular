import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Header/Header.component';
import { FooterComponent } from './Footer/Footer.component';
import { HomeComponent } from './Home/Home.component';
import { AboutComponent } from './About/About.component';
import { MenuComponent } from './Menu/Menu.component';
import { ContactComponent } from './Contact/Contact.component';
import { CartComponent } from './Cart/Cart.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { OrdersComponent } from './Orders/Orders.component';

import { AdminComponent } from './Admin/Admin.component';
import { AdminOrderDetailsComponent } from './AdminOrderDetails/AdminOrderDetails.component';
import { AdminQueriesComponent } from './AdminQueries/AdminQueries.component';
import { AdminCustomerDetailsComponent } from './AdminCustomerDetails/AdminCustomerDetails.component';
import { AdminMenuEditComponent } from './AdminMenuEdit/AdminMenuEdit.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuDetailedComponent } from './MenuDetailed/MenuDetailed.component';
import { AdminProfileComponent } from './AdminProfile/AdminProfile.component';
import { OrderDetailedComponent } from './OrderDetailed/OrderDetailed.component';

@NgModule({
  declarations: [				
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    ContactComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,

    AdminComponent,
    AdminOrderDetailsComponent,
    AdminQueriesComponent,
    AdminCustomerDetailsComponent,
    AdminMenuEditComponent,
    HeaderComponent,
    FooterComponent,
    MenuDetailedComponent,
    OrderDetailedComponent,
    AdminProfileComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgbModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
