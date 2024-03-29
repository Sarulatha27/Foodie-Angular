import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-AdminMenuEdit',
  templateUrl: './AdminMenuEdit.component.html',
  styleUrls: ['./AdminMenuEdit.component.css']
})
export class AdminMenuEditComponent implements OnInit {

  editMenuForm: any;
  MenuList: any;
  status: boolean = false;
  menucategory: string[] = [
    'Soup',
    'Momo',
    'French Fries',
    'Pizza',
    'Burger',
    'Sandwich',
    'Ice Cream'
  ];
  search: any;
  key: string = 'id';
  reverse: boolean = false;
  p: number = 1;

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  toggleCase() {
    this.status = !this.status;
  }

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.editMenuForm = this.fb.group({
      id: [0],
      menuname: ['', Validators.required],
      menuprice: ['', Validators.required],
      menucategory: ['', Validators.required],
      menuimage: ['', Validators.required]
    });

    this.getAll();
  }

  get fc() { return this.editMenuForm.controls; }

  save() {
    if (this.editMenuForm.invalid) {
      return;
    }
    else {
      let id = this.editMenuForm.controls.id.value;
      if (!id) {
        this.http.post(environment.getMenuItems, this.editMenuForm.value).subscribe(() => {
          alert('Menu Item is Added');
          this.reset();
        });
      }
      else {
        this.http.put(environment.getMenuItems + '/' + id, this.editMenuForm.value).subscribe(() => {
          alert('Menu Item Updated Successfully');
          this.reset();
        });
      }
    }
  }

  reset() {
    this.editMenuForm.reset();

    this.getAll();
  }

  getAll() {
    this.http.get(environment.getMenuItems).subscribe((result: any) => {
      this.MenuList = result;
    });
  }

  editmenu(id: number) {
    this.status = true;
    if (id) {
      const menu = this.MenuList.find((x: any) => x.id === id);
      if (!menu) return;
      menu.isReading = true;

      this.http.get(environment.getMenuItems + '/' + id).subscribe((result: any) => {
        Object.keys(this.editMenuForm.controls).forEach(key => {
          this.editMenuForm.controls[key].setValue(result[key]);
        });

        menu.isReading = false;
        alert('Edit Menu data loaded successfully');
      });
    }
  }

  deletemenu(id: number) {
    var result = confirm("are you sure to delete menu item?");
    if (id && result) {
      const menu = this.MenuList.find((x: any) => x.id === id);
      if (!menu) return;
      menu.isDeleting = true;

      this.http.delete(environment.getMenuItems + '/' + id).subscribe(() => {
        menu.isReading = false;
        this.reset();
        alert('The menu is removed');
      })
    }
  }

}
