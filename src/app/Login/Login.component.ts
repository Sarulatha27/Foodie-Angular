import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItemService } from '../MenuItem.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router,private menuservice:MenuItemService) { }

  LoginForm = this.formbuilder.group({
    email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit() {
  }

  errors: any = false;

  validateCredentials() {

    this.submitted = true;
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
    this.http.get<any>("http://localhost:3000/RegisteredUsers").subscribe(data => {
      const customer = data.find((a: any) => {
        return a.email === this.LoginForm.value.email && a.password === this.LoginForm.value.password
      });
      if (customer) {
        alert("Login Success!");
        localStorage.setItem('user', JSON.stringify(this.LoginForm.value));
        this.LoginForm.reset();
        this.router.navigate(['home']);
      }
      else {
        this.errors = true;
      }
    })
  }

  admin() {
    this.http.get<any>("http://localhost:3000/Admin").subscribe(data => {
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
}
