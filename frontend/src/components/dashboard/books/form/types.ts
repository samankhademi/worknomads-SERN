export type FormPropsType = {
    open: boolean
    setOpen: (state:boolean) => void
    form: Partial<AddBookFormRequest> | undefined,
    editMode: boolean
}
export type AddBookFormRequest = {
    id?: number
    ISBN: string
    bookTitle: string
    publisher: string
    yearOfPublication: number | string
    isActive: boolean
}
export type EditBookFormRequest = Partial<AddBookFormRequest>