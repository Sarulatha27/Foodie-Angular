import { Component, OnInit } from '@angular/core';
import { RegisterFormService } from '../RegisterForm.service';

@Component({
  selector: 'app-AdminCustomerDetails',
  templateUrl: './AdminCustomerDetails.component.html',
  styleUrls: ['./AdminCustomerDetails.component.css']
})
export class AdminCustomerDetailsComponent implements OnInit {
  Customers: any;
  page:number = 1;

  constructor(private service: RegisterFormService) {
    this.service.retriveUser().subscribe(data => {
      this.Customers = data;
    })
  }

  ngOnInit() { }

}
