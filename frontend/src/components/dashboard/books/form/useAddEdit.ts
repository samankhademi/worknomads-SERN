import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {AddBookFormRequest, FormPropsType} from './types'
import {useAddBookRequest} from "@/queries/client/books/addBook";
import {useEditBookRequest} from "@/queries/client/books/editBook";

export const useAddEdit = (props : FormPropsType) => {
    const {handleSubmit, control, reset, formState: {errors}} = useForm<AddBookFormRequest>();
    // set value on form change
    useEffect(() => {
        if(props.open && props.editMode) {
            reset({...props.form})
        } else if(props.open && !props.editMode) {
            reset({
                bookTitle: '',
                ISBN: '',
                publisher: '',
                yearOfPublication: '',
            })
        }
    },[props.open])

    const { mutateAsync: addBookMutate, isLoading: addBookRequestLoading } = useAddBookRequest()
    const { mutateAsync: editBookMutate } = useEditBookRequest(props?.form?.id)

    const onSubmit: SubmitHandler<AddBookFormRequest> = async (data) => {
        if(props.editMode) {
            await editBookMutate({
                yearOfPublication: +data.yearOfPublication,
                publisher: data.publisher,
                ISBN: data.ISBN,
                isActive: data.isActive,
                bookTitle: data.bookTitle
            }).then(() => {
                props.setOpen(false)
            })
        }else{
            await addBookMutate({
                yearOfPublication: +data.yearOfPublication,
                publisher: data.publisher,
                ISBN: data.ISBN,
                isActive: data.isActive,
                bookTitle: data.bookTitle
            }).then(() => {
                props.setOpen(false)
            })
        }
    };

    return {
        handleSubmit,
        control,
        errors,
        onSubmit,
        profileRequestLoading: addBookRequestLoading,
    }
}