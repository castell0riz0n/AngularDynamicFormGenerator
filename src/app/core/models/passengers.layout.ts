import { DYNAMIC_FORM_CONTROL_TYPE_ARRAY } from '@ng-dynamic-forms/core';

export const PASSENGERS_FORM_LAYOUT = {

  'firstNameInput, lastNameInput, emailInput, phoneInput': {
    element: {
      container: 'form-group',
      label: 'control-label',
      option: 'btn-primary'
    },

    grid: {
      control: 'col-sm-4',
      label: 'col-sm-2',
      errors: 'col-sm-offset-3 col-sm-9'
    }
  },

  bsCheckbox: {
    element: {
      container: 'form-group'
    },
    grid: {
      control: 'col-sm-offset-3 col-sm-9'
    }
  },
  'passengersListGroup': {
    element: {
      container: 'form-group form-array ali',
      group: 'd-flex',
    },
    grid: {
      children: 'col-sm-2',
      label: 'col-sm-2'
    },
  }
};
