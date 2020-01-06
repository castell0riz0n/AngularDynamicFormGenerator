import { Component, OnInit } from '@angular/core';
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
export class NgxDynamicFormComponent implements OnInit {

  formModel: DynamicFormControlModel[] = PASSENGERS_MODEL;
  formGroup: FormGroup;
  formLayout: DynamicFormLayout = PASSENGERS_FORM_LAYOUT;
  arrayCount = 3;

  sampleFormControl: FormControl;
  sampleFormControlModel: DynamicInputModel;

  formArray: FormArray;
  formArrayModel: DynamicFormArrayModel;

  constructor(private formService: DynamicFormService) {
    // const myform = this.formModel[0]['group'] as DynamicFormArrayModel[];
    // const myControlIndex = myform.findIndex(a => a.id === 'passengersListGroup');
    // myform[myControlIndex].initialCount = 3;
    // this.formModel[0]['group'] = myform;
  }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.sampleFormControlModel = this.formService.findModelById<DynamicInputModel>('firstNameInput', this.formModel);
    this.formArrayModel = this.formService.findModelById<DynamicFormArrayModel>('passengersListGroup', this.formModel);

    this.sampleFormControl = this.formService.findControlByModel<FormControl>(this.sampleFormControlModel, this.formGroup);
    this.formArray = this.formService.findControlByModel<FormArray>(this.formArrayModel, this.formGroup);
    for (let i = 0; i < this.arrayCount; i++) {
      this.insert(this.formArrayModel, 2);
    }
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
    this.sampleFormControlModel.disabled = !this.sampleFormControlModel.disabled;
    this.sampleFormControlModel.value = 'Hello Hello';

    (this.formArrayModel.get(1).group[0] as DynamicFormValueControlModel<any>).value = 'This is just a test';

    this.formService.moveFormArrayGroup(2, -1, this.formArray, this.formArrayModel);

    this.formService.addFormGroupControl(
      this.formGroup,
      this.formModel,
      new DynamicFormGroupModel({
        id: 'bsFormGroup3',
        group: [new DynamicInputModel({ id: 'newInput' })]
      })
    );

    this.formService.addFormGroupControl(
      this.formGroup.get('bsFormGroup3') as FormGroup,
      this.formModel[2] as DynamicFormGroupModel,
      new DynamicInputModel({ id: 'newInput' })
    );

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

  onSelectPastPassenger() {
    debugger;
    const pIndex = 0;
    const myform = this.formModel[0]['group'] as DynamicFormArrayModel[];
    const myControlIndex = myform.findIndex(a => a.id === 'passengersListGroup');
    const ctrl = myform[myControlIndex] as DynamicFormArrayModel;
    const pfirstName = ctrl.groups[pIndex]['group'].find(a => a.id === 'pFirstName');
    pfirstName['_value'] = 'xyz';
    console.log(pfirstName);
    console.log(this.formService.findById('pFirstName', this.formModel));
    this.formService.detectChanges();
  }

}
