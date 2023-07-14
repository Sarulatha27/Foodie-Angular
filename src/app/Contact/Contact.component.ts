import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactQueryService } from '../ContactQuery.service';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contact: ContactQueryService, private form: FormBuilder) { }

  ngOnInit() { }

  ContactForm = this.form.group({
    name: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$"), Validators.minLength(6)]],
    email: ["", [Validators.required, Validators.pattern("^([A-Za-z0-9.]{3,})+\@([A-Za-z0-9]{5,})+\.([a-zA-Z]{2,4})$")]],
    mobile: ["", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
    message: ["", [Validators.required, Validators.minLength(30)]]
  })

  SubmitForm() {
    if (this.ContactForm.invalid) {
      return;
    }
    else {
      this.contact.Contact(this.ContactForm.value).subscribe(data => {
        alert("Thanks for your queries, soon we'll reply")
      })
    }
  }

  isScrollActive = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrollActive = window.pageYOffset > 100;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
