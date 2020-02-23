import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DynamicFormsNGxBootstrapUIModule
} from '@ng-dynamic-forms/ui-ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFieldDirective } from './form/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';
import { ButtonComponent } from './form/form-elements/button/button.component';
import { CheckboxComponent } from './form/form-elements/checkbox/checkbox.component';
import { DateComponent } from './form/form-elements/date/date.component';
import { InputComponent } from './form/form-elements/input/input.component';
import { RadioComponent } from './form/form-elements/radio/radio.component';
import { SelectComponent } from './form/form-elements/select/select.component';
import { NgxDynamicFormComponent } from './ng-dynamic-form/ngx-dynamic-form/ngx-dynamic-form.component';
import { FormTestComponent } from './forms/form-test/form-test.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    DynamicFieldDirective,
    NgxDynamicFormComponent,
    FormTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsNGxBootstrapUIModule,
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadioComponent,
    CheckboxComponent
  ]
})
export class AppModule { }
