import {FieldError} from "react-hook-form";
import {ReactElement} from "react";

export type PropsType = {
    control: any,
    register?: any,
    error?: FieldError,
    label?: string,
    name: string,
    placeholder: string,
    validation?: any,
    labelClasses?: any,
    validationMessage?: string,
    list?: any[],
    type?: string,
    disabled?: boolean
    readonly?: boolean
    showClear?: boolean
    sx?: any
    setOpen: (state:boolean) => void
    open?: boolean
    onChange?: (val?:any) => void
    hint?: ReactElement
    tooltip?: ReactElement
    loading?: boolean
    size?: 'small' | 'medium'
    options: any[]
    setSearch: (text:string) => void
    setValue: (value: any) => void
    titleField: string
}
