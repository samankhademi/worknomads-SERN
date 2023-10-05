export type FormPropsType = {
    open: boolean
    setOpen: (state:boolean) => void
    form: Partial<AddUserFormRequest> | undefined,
    editMode: boolean
}
export type AddUserFormRequest = {
    id?: number
    firstName: string
    lastName: string
    password: string
    email: string
    isActive?: boolean
    sex: string | number
    age: string | number
    role: string
    books: any[]
}
