import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, of } from "rxjs";

export function uniqueEmailValidator(): AsyncValidatorFn { // http: HttpClient

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const existingEmails = ["test@gmail.com", "admin@gmail.com"];

        // console.log('Email => ', existingEmails.includes(control.value));

        // return http.get<{ exists: boolean }>(`https://your-api.com/users/check-email?email=${control.value}`).pipe(
        //     map(response => response.exists ? { emailTaken: true } : null),
        //     catchError(() => of(null)) // Optionally handle errors gracefully
        // );

        return of(existingEmails.includes(control.value)).pipe(
            delay(1000),
            map(isTaken => (isTaken ? { emailTaken: true } : null))
        )
    }

}