import { OnInit, Directive, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FieldConfig } from '../../core/models/field.interface';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../form-elements/input/input.component';
import { ButtonComponent } from '../form-elements/button/button.component';
import { SelectComponent } from '../form-elements/select/select.component';
import { DateComponent } from '../form-elements/date/date.component';
import { RadioComponent } from '../form-elements/radio/radio.component';
import { CheckboxComponent } from '../form-elements/checkbox/checkbox.component';



const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadioComponent,
  checkbox: CheckboxComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {

  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
