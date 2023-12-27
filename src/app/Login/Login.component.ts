import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MenuItemService } from '../MenuItem.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router,private menuservice:MenuItemService) { }

  LoginForm = this.formbuilder.group({
    email: ["", [Validators.required, Validators.pattern("^([A-Za-z0-9.]{3,})+\@([A-Za-z0-9]{2,})+\.([a-zA-Z]{2,4})$")]],
    password: ["", [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$")]]
  })

  ngOnInit() {
  }

  errors: any = false;

  validateCredentials() {
    if (this.LoginForm.invalid) {
      return;
    }
    else {
      this.customer();
      this.admin();
      if (this.errors) {
        alert('User Not Found');
      }
    }
  }

  customer() {
    this.http.get<any>(environment.getRegisteredUsers).subscribe(data => {
      const customer = data.find((a: any) => {
        return a.email === this.LoginForm.value.email && a.password === this.LoginForm.value.password
      });
      
      if (customer) {
        alert("Login Success!");
        localStorage.setItem('user', JSON.stringify(this.LoginForm.value));
        this.LoginForm.reset();
        this.router.navigate(['home']);
        this.localCarttoDB();
      }
      else {
        this.errors = true;
      }
    })
  }

  admin() {
    this.http.get<any>(environment.getAdminDetails).subscribe(data => {
      const admin = data.find((a: any) => {
        return a.email === this.LoginForm.value.email && a.password === this.LoginForm.value.password
      });
      if (admin) {
        alert("Login Success as Admin!");
        localStorage.setItem('admin', JSON.stringify(this.LoginForm.value));
        this.LoginForm.reset();
        this.router.navigate(['admin']);
      }
      else {
        this.errors = true;
      }
    })
  }

  localCarttoDB(){
    let localcartmenu = localStorage.getItem('localCart');
    if(localcartmenu){
      let cartDataList:[] = JSON.parse(localcartmenu);
      let user = localStorage.getItem('user');
      let userEmail = user && JSON.parse(user).email;
      cartDataList.forEach((menu:any,index) => {
        let cartData = 
        {menuId: menu.id,
        ...menu,
        userEmail: userEmail,
      }
        delete cartData.id;
        this.menuservice.addToCartDB(cartData).subscribe();
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart');
        }
      });
    }
  }
}
