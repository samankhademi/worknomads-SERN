import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import {AddUserFormRequest, FormPropsType} from './types'
import {useAddUserRequest, useBooksList, useEditUserRequest} from "@/queries";
import {UseAppGuard} from "@/providers/AppGuard";

export const useAddEdit = (props : FormPropsType) => {
    const {handleSubmit, setValue, control, watch, reset, formState: {errors}} = useForm<AddUserFormRequest>();
    const {user} = UseAppGuard()
    const isCurrentUser = useMemo(() => {
        return user?.email === watch('email')
    },[user, watch('email')])
    const [searchBook, setSearchBook] = useState<string>("")
    // set value on form change
    useEffect(() => {
        if(props.open && props.editMode) {
            reset({
                ...props.form,
                age: String(props.form?.age),
                sex: String(props.form?.sex),
            })
        } else if(props.open && !props.editMode) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                age: "",
                role: "",
                sex: "",
            })
        }
    },[props.open])

    useEffect(() => {
        if (searchBook) refetch()
    },[searchBook])
    console.log(watch())
    const { data, isLoading, refetch } = useBooksList({ take: 50, page: 0, bookTitle: searchBook })
    const { mutateAsync: addUserMutate, isLoading: addUserRequestLoading } = useAddUserRequest()
    const { mutateAsync: editUserMutate, isLoading: editUserRequestLoading } = useEditUserRequest(props?.form?.id)

    const onSubmit: SubmitHandler<AddUserFormRequest> = async (data) => {
        if(props.editMode) {
            await editUserMutate({
                ...data,
                age: +data.age,
                sex: +data.sex,
                books: data?.books?.map((book) => book.id)
            }).then(() => {
                props.setOpen(false)
            })
        } else {
            await addUserMutate({
                ...data,
                age: +data.age,
                sex: +data.sex,
                books: data?.books?.map((book) => book.id)
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
        addUserRequestLoading,
        editUserRequestLoading,
        isCurrentUser,
        data,
        isLoading,
        refetch,
        setSearchBook,
        setValue
    }
}