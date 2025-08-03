import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(forbiddenName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = control.value?.toLowerCase() === forbiddenName.toLowerCase();

        return forbidden ? { forbiddenName : { value: control.value }  } : null;
    }
}
