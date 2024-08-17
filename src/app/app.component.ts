import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, DatePipe, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'personel-app';
  addForm: FormGroup = new FormGroup({});
  updateForm: FormGroup = new FormGroup({});
  employees: Employee[] | any = [];
  isUpdateFormActive: boolean = false;
  updateIndex: number = 0;

  constructor(private _date: DatePipe) { }

  ngOnInit(): void { this.createAddForm(); }
  createAddForm() {
    this.addForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      surname: new FormControl("", [Validators.required]),
      startingDate: new FormControl(this._date.transform(new Date(), "yyyy-MM-dd")),
      profession: new FormControl("", [Validators.required, Validators.minLength(3)])
    })
  }
  createUpdateForm() {
    this.updateForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      surname: new FormControl("", [Validators.required]),
      startingDate: new FormControl(this._date.transform(new Date(), "yyyy-MM-dd")),
      profession: new FormControl("", [Validators.required, Validators.minLength(3)])
    })
  }
  get(model: Employee, index: number) {
    this.createUpdateForm();
    this.updateForm.controls["name"].setValue(model.name);
    this.updateForm.controls["surname"].setValue(model.surname);
    this.updateForm.controls["profession"].setValue(model.profession);
    this.updateForm.controls["startingDate"].setValue(model.startingDate);
    this.isUpdateFormActive = true;
    this.updateIndex = index;
  }
  cancel() {
    this.isUpdateFormActive = false;
  }
  update() {
    if (this.updateForm.valid) {
      this.employees[this.updateIndex] = this.updateForm.value;
      this.cancel();
    }
  }
  save() {
    if (this.addForm.valid) {
      this.employees.push(this.addForm.value);
      this.createAddForm();
    }
  }
}
class Employee {
  name?: string = "";
  surname?: string = "";
  profession?: string = "";
  startingDate?: string = "";
}
