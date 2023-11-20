import { FormControl, FormGroup, ValidatorFn, AbstractControl, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';

export class CustomFormGroup extends FormGroup {
    constructor(
        controls: { [key: string]: AbstractControl; } = {},
        validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public _addControl(name: string, control: AbstractControl, disabled: boolean = false): void {
        if (disabled)
            control.disable();
        super.addControl(name, control);
    }
}
