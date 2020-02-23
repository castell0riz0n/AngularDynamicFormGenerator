import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserName = ['Chris', 'Anna'];
  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbidenNames.bind(this)]),
        email: new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails.bind(this)),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.signupForm.setValue({
      userData: {
        username: 'Max',
        email: 'Ali@test.com'
      },
      gender: 'male',
      hobbies: []
    });


    this.signupForm.patchValue({
      userData: {
        username: 'Hoseyn',
      },
      gender: 'female'
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset()
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  forbidenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
