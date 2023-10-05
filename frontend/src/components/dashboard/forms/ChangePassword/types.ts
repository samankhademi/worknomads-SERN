export type FormPropsType = {
    open: boolean
    setOpen: (state:boolean) => void
}
export type ProfileFormRequest = {
    oldPassword: string
    newPassword: string
    newPasswordConfirm: string
}