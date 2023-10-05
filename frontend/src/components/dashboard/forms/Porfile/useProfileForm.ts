import {ProfileFormRequest} from './types'
import {SubmitHandler, useForm} from "react-hook-form";
import {UseAppGuard} from "@/providers/AppGuard";
import {useEffect} from "react";
import {useSetProfileRequest} from "@/queries/client/user/setProfile";

export const useProfileForm = () => {
    const {user, userModalOpen, setUserModalOpen, checkLogin} = UseAppGuard()
    const {handleSubmit, control, reset, formState: {errors}} = useForm<ProfileFormRequest>();
    // set value on form change
    useEffect(() => {
        if(userModalOpen) {
            reset({
                firstName: user?.firstName,
                lastName: user?.lastName,
                sex: String(user?.sex),
                age: String(user?.age),
            })
        }else{
            reset({
                firstName: '',
                lastName: '',
                sex: '',
                age: ''
            })
        }
    },[userModalOpen])

    const { mutateAsync, isLoading: profileRequestLoading } = useSetProfileRequest()

    const onSubmit: SubmitHandler<ProfileFormRequest> = async (data) => {
        await mutateAsync({
            firstName: data.firstName,
            lastName: data.lastName,
            age: +data.age,
            sex: +data.sex
        }).then(() => {
            setUserModalOpen(false);
            checkLogin()
        })
    };

    return {
        handleSubmit,
        control,
        errors,
        onSubmit,
        profileRequestLoading,
    }
}