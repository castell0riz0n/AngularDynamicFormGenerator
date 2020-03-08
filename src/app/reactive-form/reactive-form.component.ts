import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  genders = ['male', 'female'];
  nationality = ['Iranian', 'Non-Iranian'];
  signupForm: FormGroup;
  forbiddenUserName = ['Chris', 'Anna'];
  passengersCount = 3;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.signupForm = new FormGroup({
    //   userData: new FormGroup({
    //     username: new FormControl(null, [Validators.required, this.forbidenNames.bind(this)]),
    //     email: new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails.bind(this)),
    //   }),
    //   gender: new FormControl('male'),
    //   hobbies: new FormArray([])
    // });

    this.signupForm = this.fb.group({
      ticketOwner: this.fb.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required], this.forbiddenEmails.bind(this)),
        phoneNumber: new FormControl('', Validators.required)
      }),
      passengers: this.fb.array([])
    });

    this.fillTicketOwner();
    for (let i = 0; i < this.passengersCount; i++) {
      this.onAddPassenger();
    }

    // this.signupForm = new FormGroup({
    //   ticketOwner: new FormGroup({
    //     firstName: new FormControl(null, Validators.required),
    //     lastName: new FormControl(null, Validators.required),
    //     email: new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails.bind(this)),
    //     phoneNumber: new FormControl(null, Validators.required)
    //   }),
    //   passengers: new FormArray([new FormGroup(this.init_addPassenger())])
    // });

    // debugger
    // const form = this.signupForm.get('passengers')['controls'][0];
    // this.signupForm.get('passengers')['controls'].forEach((group: FormGroup) => {
    //   console.log(group);
    //   group.controls
    // });

    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    console.log(this.signupForm);



    // this.signupForm.patchValue({
    //   userData: {
    //     username: 'Hoseyn',
    //   },
    //   gender: 'female'
    // });
  }


  onSubmit() {
    console.log(this.signupForm.value);
    console.log(this.signupForm);
  }

  onAddPassenger() {
    const control = this.signupForm.controls.passengers as FormArray;
    control.push(this.fb.group(
      this.init_addPassenger()
    ));
    // const passengerInfo = new FormGroup(this.init_addPassenger());
    // const passengersArr = (this.signupForm.get('passengers')['controls'] as FormArray);
    // (this.signupForm.get('passengers') as FormArray).push(passengerInfo);
  }

  init_addPassenger() {
    // initialize our address
    return {
      gender: new FormControl('male'),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      birthDate: new FormControl('', Validators.required),
      nationalId: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      country: new FormControl('Iranian'),
      savedUser: new FormControl('')
    };
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

  fillTicketOwner(index?: number) {
    this.signupForm.setValue({
      ticketOwner: {
        firstName: 'Max',
        lastName: 'Payne',
        email: 'MaxPayn@Rockstar.com',
        phoneNumber: '09127335838',

      },
      passengers: []
    });
  }

  fillPreviousPassenger(index?: number){
    debugger;
    const formgroup = this.signupForm.controls.passengers as FormGroup;
    const controls = (<FormGroup><unknown>formgroup.controls);

    controls[index].setValue({
      firstName: 'xyz',
      lastName: 'test',
      nationalId: '2730032797',
      country: 'Iranian',
      gender: 'male',
      birthDate: new Date(),
      savedUser: false
    });

  }

  removePassenger(index?: number) {
    const formArray = this.signupForm.controls.passengers as FormArray;

    formArray.removeAt(index);
  }
}
