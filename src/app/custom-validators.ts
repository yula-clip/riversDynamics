import { FormControl, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
    static noWhiteSpaceValidator(control: FormControl): Object {
        if (!control.value) {
            return null;
        }
        const isWhitespace = (control.value.toString() || '').trim().length === 0;
        return !isWhitespace ? null : { 'whitespace': true };
    }

    static minLengthArray(min: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
            if (c.value.length >= min) {
                return null;
            }
            return { 'minLengthArray': { valid: false } };
        };
    }

    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            const newPassword = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];

            if (newPassword.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    static isPasswordMismatchError(passwordForm: FormGroup) {
        return passwordForm.errors && passwordForm.errors.mismatchedPasswords
            && (passwordForm.touched || passwordForm.dirty);
    }

    static IS_FIELD_ERROR = (formGroup: FormGroup, formControlName: string | string[]) => {
        return formGroup.get(formControlName) && formGroup.get(formControlName).invalid
            && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched);
    }

    static GET_ERROR_PARAM = (formGroup: FormGroup, formControlName: string | string[], errorName: string) => {
        return formGroup.get(formControlName) && formGroup.get(formControlName).errors
            ? formGroup.get(formControlName).errors[errorName]
            : null;
    }
}
