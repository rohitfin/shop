import { AbstractControl, ValidationErrors } from "@angular/forms";

export function noSpecialCharsValidators(control: AbstractControl): ValidationErrors | null {

    const value = control.value;
    const regex = /^[a-zA-Z0-9 ]*$/; // only letters, numbers, and space

    if(value && !regex.test(value)){
        return { noSpecialCharsValidators: true }
    }
    return null;

}


