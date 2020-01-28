import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { PASSENGERS_MODEL } from '../../core/models/passengers.model';
import {
  DynamicFormModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicTextAreaModel,
  DynamicFormService,
  DynamicFormGroupModel,
  DynamicFormArrayModel,
  DynamicFormValueControlModel,
  DynamicFormControlModel,
  DynamicFormLayout
} from '@ng-dynamic-forms/core';
import { PASSENGERS_FORM_LAYOUT } from '../../core/models/passengers.layout';

@Component({
  selector: 'app-ngx-dynamic-form',
  templateUrl: './ngx-dynamic-form.component.html',
  styleUrls: ['./ngx-dynamic-form.component.scss']
})
export class NgxDynamicFormComponent implements OnInit, AfterViewInit {

  formModel: DynamicFormControlModel[] = PASSENGERS_MODEL;
  formGroup: FormGroup;
  formLayout: DynamicFormLayout = PASSENGERS_FORM_LAYOUT;
  arrayCount = 3;

  sampleFormControl: FormControl;
  sampleFormControlModel: DynamicInputModel;

  formArray: FormArray;
  formArrayModel: DynamicFormArrayModel;

  constructor(
    private formService: DynamicFormService,
    private elRef: ElementRef) { }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.sampleFormControlModel = this.formService.findModelById<DynamicInputModel>('firstNameInput', this.formModel);
    this.formArrayModel = this.formService.findModelById<DynamicFormArrayModel>('passengersListGroup', this.formModel);

    this.sampleFormControl = this.formService.findControlByModel<FormControl>(this.sampleFormControlModel, this.formGroup);
    this.formArray = this.formService.findControlByModel<FormArray>(this.formArrayModel, this.formGroup);

    // === === === === === to Generate Passengers part by it's count === === === === ===
    for (let i = 0; i < this.arrayCount; i++) {
      this.insert(this.formArrayModel, 2);
    }
    // === === === === === End === === === === === ===
  }

  ngAfterViewInit() {

    this.findElement();

  }

  getFormArray(model: DynamicFormArrayModel, group: FormGroup): FormArray {
    return this.formService.findControlByModel(model, group) as FormArray;
  }

  insert(context: DynamicFormArrayModel, index: number) {
    this.formService.insertFormArrayGroup(index, this.getFormArray(context, this.formGroup), context);
  }

  remove(context: DynamicFormArrayModel, index: number) {
    this.formService.removeFormArrayGroup(index, this.getFormArray(context, this.formGroup), context);
  }

  move(context: DynamicFormArrayModel, index: number, step: number) {
    this.formService.moveFormArrayGroup(index, step, this.getFormArray(context, this.formGroup), context);
  }

  clear() {
    this.formService.clearFormArray(this.formArray, this.formArrayModel);
  }

  test() {

    debugger;

    // === === === For Form Arrays (Get Passengers by index) === === ===
    // 1.For previous passenger this should call in a seperate method
    // 2. i test this in ctor and ngOnInit and didn't work for me
    const passengerArray = this.formService.findModelById<DynamicFormArrayModel>('passengersListGroup', this.formModel);
    const passenger = (passengerArray.get(0).group[0] as DynamicFormValueControlModel<any>).value = 'Test';
    this.formService.detectChanges(); // This will submit changes to Form and this is mandatory
    // === === === === === === End === === === === ===


    // === === === === === For Ticket Owner part and out of FormArray === === === === === ===
    // 1. Data Should come from some where with constructor
    // 2.this part should never written in ctor or ngOnInit
    this.formService.findModelById<DynamicInputModel>('firstNameInput', this.formModel).value = 'Ali';
    this.formService.findModelById<DynamicInputModel>('lastNameInput', this.formModel).value = 'Ali';
    this.formService.findModelById<DynamicInputModel>('emailInput', this.formModel).value = 'ali@yahoo.com';
    this.formService.findModelById<DynamicInputModel>('phoneInput', this.formModel).value = '09127335838';
    this.formService.detectChanges(); // This will submit changes to Form and this is mandatory
    // === === === === === === End === === === === ===

    // const values = this.formGroup.value['ticketOwner'];
    // this.sampleFormControlModel.disabled = !this.sampleFormControlModel.disabled;
    // this.sampleFormControlModel.value = 'Hello Hello';

    // (this.formArrayModel.get(1).group[0] as DynamicFormValueControlModel<any>).value = 'This is just a test';

    // this.formService.moveFormArrayGroup(2, -1, this.formArray, this.formArrayModel);

    // this.formService.addFormGroupControl(
    //   this.formGroup,
    //   this.formModel,
    //   new DynamicFormGroupModel({
    //     id: 'bsFormGroup3',
    //     group: [new DynamicInputModel({ id: 'newInput' })]
    //   })
    // );

    // this.formService.addFormGroupControl(
    //   this.formGroup.get('bsFormGroup3') as FormGroup,
    //   this.formModel[2] as DynamicFormGroupModel,
    //   new DynamicInputModel({ id: 'newInput' })
    // );

    this.formService.detectChanges();
  }

  onBlur($event) {
    console.log(`BLUR event on ${$event.model.id}: `, $event);
  }

  onChange($event) {
    console.log(`CHANGE event on ${$event.model.id}: `, $event);
  }

  onFocus($event) {
    console.log(`FOCUS event on ${$event.model.id}: `, $event);
  }

  onSelectPastPassenger(index: number) {
    const passengerArray = this.formService.findModelById<DynamicFormArrayModel>('passengersListGroup', this.formModel);
    (passengerArray.get(index).group[0] as DynamicFormValueControlModel<any>).value = 'Test' + index;
    (passengerArray.get(index).group[1] as DynamicFormValueControlModel<any>).value = 'famili' + index;
    this.formService.detectChanges();
  }

  findElement() {
    const div = this.elRef.nativeElement.querySelector('.ali') as HTMLDivElement;
    const prv = div.parentElement;
    prv.classList.add('ali');
  }
}
