import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactQueryService } from '../ContactQuery.service';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent implements OnInit {
  submitted: boolean = false;

  constructor(private contact: ContactQueryService, private form: FormBuilder) { }

  ngOnInit() { }

  ContactForm = this.form.group({
    name: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$"), Validators.minLength(6)]],
    email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobile: ["", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
    message: ["", [Validators.required, Validators.minLength(30)]]
  })

  SubmitForm() {
    this.submitted = true;
    if (this.ContactForm.invalid) {
      return;
    }
    else {
      this.contact.Contact(this.ContactForm.value).subscribe(data => {
        alert("Thanks for your queries, soon we'll reply")
      })
    }
  }

}
