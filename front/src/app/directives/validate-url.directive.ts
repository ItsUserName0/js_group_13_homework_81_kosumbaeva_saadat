import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export const urlValidator = (control: AbstractControl): ValidationErrors | null => {
  const url = /^(http)?s?(:\/\/)/.test(control.value);
  if (url) {
    return null;
  }
  return {url: true};
}

@Directive({
  selector: '[appUrl]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateUrlDirective,
    multi: true,
  }]
})
export class ValidateUrlDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return urlValidator(control);
  }
}
