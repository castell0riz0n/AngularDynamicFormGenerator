import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent implements OnInit {
  PassengerCounts = 5;
  myForm: FormGroup;
  constructor(
    private _fb: FormBuilder
  ) {
    this.myForm = this._fb.group({
      passengers: this._fb.array([])
    });
  }
  get f() { return this.myForm.controls; }
  get p() { return this.f.passengers as FormArray; }

  ngOnInit() {
    for (let i = 0; i < this.PassengerCounts; i++) {
      this.p.push(this._fb.group(this.init_addPassenger()));
    }
  }


  init_addPassenger() {
    // initialize our address
    return {
      gender: ['2', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      birthDate: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.minLength(10)]],
      Country: this._fb.group({
        code: [''],
        id: [''],
        countryName: ['', Validators.required],
        combined: [''],
      }),
      savedUser: ['']
    };
  }

  insert(){
    this.p.push(this._fb.group({
      gender: [],
      firstName: [],
      lastName: [],
      birthDate: [],
      nationalId: [],
      Country: this._fb.group({
        code: [],
        id: [],
        countryName: [],
        combined: [],
      }),
      savedUser: []
    }));
  }

}
