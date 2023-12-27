import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../ConfirmedValidator';
import { RegisterFormService } from '../RegisterForm.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private RegForm: RegisterFormService, private formbuilder: FormBuilder, private router: Router,private http: HttpClient) { }
  ngOnInit(): void {}

  RegisterForm = this.formbuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$"), Validators.minLength(6)]],
    email: ["", [Validators.required, Validators.pattern("^([A-Za-z0-9.]{3,})+\@([A-Za-z0-9]{5,})+\.([a-zA-Z]{2,4})$")]],
    mobile: ["", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
    password: ["", [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$")]],
    cpassword: []
  }, {validator: ConfirmedValidator('password', 'cpassword')})

  errors:any = false;

  SubmitForm() {
    if (this.RegisterForm.invalid) {
      return;
    }
    else{
      this.Reg();
      if(this.errors)
      { alert('User Already Exist.Try to register with different Email Id.');}
    }
  }

  Reg(){
    this.http.get(environment.getRegisteredUsers).subscribe((data:any)=>{
      const user = data.find((a:any)=>{
        return a.email === this.RegisterForm.value.email;
      });
      if (!user) { 
        this.RegForm.addUser(this.RegisterForm.value).subscribe(()=>{
          alert("You have Registered Successfully");
          localStorage.setItem('user',JSON.stringify(this.RegisterForm.value));
          this.RegisterForm.reset();
          this.router.navigate(['home']);
        })
      }
      else{
        this.errors = true;
      }
    });
  }
}