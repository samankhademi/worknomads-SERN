import {ProfileFormRequest} from './types'
import {SubmitHandler, useForm} from "react-hook-form";
import {UseAppGuard} from "@/providers/AppGuard";
import {useEffect} from "react";
import {useChangePassword} from "@/queries";

export const useChangePasswordForm = () => {
    const {passwordModalOpen, setPasswordModalOpen} = UseAppGuard()
    const {handleSubmit, watch, control, reset, formState: {errors}} = useForm<ProfileFormRequest>();

    const { mutateAsync, isLoading: changePasswordRequestLoading } = useChangePassword()

    const onSubmit: SubmitHandler<ProfileFormRequest> = async (data) => {
        await mutateAsync({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }).then(() => {
            setPasswordModalOpen(false)
        })
    };

    // reset if close form
    useEffect(() => {
        if(!passwordModalOpen) reset({ newPassword: '', newPasswordConfirm: '', oldPassword: '' })
    },[passwordModalOpen])

    return {
        handleSubmit,
        control,
        errors,
        onSubmit,
        profileRequestLoading: changePasswordRequestLoading,
        formData: watch
    }
}