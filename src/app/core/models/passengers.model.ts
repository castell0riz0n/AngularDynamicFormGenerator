import { DynamicFormGroupModel, DynamicInputModel, DynamicFormArrayModel } from '@ng-dynamic-forms/core';

export const PASSENGERS_MODEL = [
  new DynamicFormGroupModel({
    id: 'ticketOwner',
    legend: 'Ticket Owner Details',
    group: [
      new DynamicInputModel({

        hint: 'Ticket owner first name',
        id: 'firstNameInput',
        label: 'First Name',
        maxLength: 50,
        placeholder: 'Just some input',
        prefix: 'First Name',
        suffix: 'Suffix',
        relations: [],
        validators: {
          maxLength: 5,
          required: null
        },
        errorMessages: {
          maxLength: 'Max character count is 5',
          required: 'this field is mandatory'
        }
      }),
      new DynamicInputModel({

        hint: 'ticket owner last name',
        id: 'lastNameInput',
        label: 'Last Name',
        maxLength: 50,
        placeholder: 'Just some input',
        prefix: 'Last Name',
        suffix: 'Suffix',
        relations: [],
        validators: {
          maxLength: 15
        },
        errorMessages: {
          maxLength: 'Max character count is 15'
        }
      }),
      new DynamicInputModel({

        hint: 'Enter your email address',
        id: 'emailInput',
        label: 'Email',
        maxLength: 50,
        placeholder: 'Just some input',
        prefix: 'Email: ',
        suffix: 'Suffix',
        relations: [],
        inputType: 'email',
        validators: {
          maxLength: 150
        },
        errorMessages: {
          maxLength: 'Max character count is 150'
        }
      }),
      new DynamicInputModel({

        hint: 'Enter your mobile/phone number',
        id: 'phoneInput',
        label: 'Phone Number',
        maxLength: 50,
        placeholder: 'Just some input',
        prefix: 'Phone Number',
        suffix: 'Suffix',
        relations: [],
        validators: {
          maxLength: 5
        },
        errorMessages: {
          maxLength: 'Max character count is 5'
        }
      }),
      new DynamicFormArrayModel({

        id: 'passengersListGroup',
        initialCount: 1,
        label: 'Passengers Array',
        groupFactory: () => {
          return [
            new DynamicInputModel({
              id: 'pFirstName',
              // label: "Label",
              placeholder: 'Passenger First Name',
              validators: {
                required: null
              },
              errorMessages: {
                required: 'this field is mandatory'
              }
            }),
            new DynamicInputModel({
              id: 'pLastName',
              // label: "Label",
              placeholder: 'Passenger Last Name'
            }),
            new DynamicInputModel({
              id: 'pSSId',
              // label: "Label",
              placeholder: 'Passenger national Id'
            }),
            new DynamicInputModel({
              id: 'pBirthDate',
              // label: "Label",
              placeholder: 'Birth Date ...'
            })
          ];
        }
      })
    ]
  })
];
