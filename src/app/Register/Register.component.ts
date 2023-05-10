import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../ConfirmedValidator';
import { RegisterFormService } from '../RegisterForm.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;

  constructor(private RegForm: RegisterFormService, private formbuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {}
  RegisterForm = this.formbuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$"), Validators.minLength(6)]],
    email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobile: ["", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    cpassword: []
  }, { validator: ConfirmedValidator('password', 'cpassword') })

  SubmitForm() {
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
    }
    else {
      this.RegForm.addUser(this.RegisterForm.value).subscribe(data => {
        alert("You have Registered Successfully");
        this.RegisterForm.reset();
        this.router.navigate(['login']);
      })
    }
  }
}
