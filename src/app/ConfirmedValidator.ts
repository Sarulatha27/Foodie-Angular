import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(controlName: string, matchingName: string) {
    return (formgroup: FormGroup) => {
        const password = formgroup.controls[controlName];
        const cpassword = formgroup.controls[matchingName];

        if (password.value !== cpassword.value) {
            cpassword.setErrors({ ConfirmedValidator: true });
        }
        else {
            cpassword.setErrors(null);
        }
    }
}