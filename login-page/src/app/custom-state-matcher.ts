import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CustomErrorStateMatcher implements ErrorStateMatcher{
    isErrorState(
        control: FormControl | null,
        profileForm: FormGroupDirective | NgForm | null): boolean {
            console.log(control, profileForm);
            return control?.dirty && control.errors?.['required'];
        }
}