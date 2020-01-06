import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../core/models/field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {


  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
