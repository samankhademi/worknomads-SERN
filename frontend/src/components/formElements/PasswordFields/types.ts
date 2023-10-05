import {FieldError} from "react-hook-form";

export type PropsType = {
    control: any,
    error?: FieldError,
    label: string,
    name: string,
    placeholder: string,
    validation?: any,
    labelClasses?: any,
    validationMessage?: string
}
