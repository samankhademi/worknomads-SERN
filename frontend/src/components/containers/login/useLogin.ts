import {useLoginRequest} from '@/queries'
import {LoginFormRequest} from './types'
import {SubmitHandler, useForm} from "react-hook-form";
import {routers} from "@/core";
import {useRouter} from "next/navigation";
import {UseAppGuard} from "@/providers/AppGuard";

export const useLogin = () => {
    const router = useRouter()
    const { setProfile } = UseAppGuard()

    const {handleSubmit, control, formState: {errors}} = useForm<LoginFormRequest>({defaultValues: {email: '', password: '',}});

    const { mutateAsync: loginRequest, isLoading: loginRequestLoading } = useLoginRequest()

    const onSubmit: SubmitHandler<LoginFormRequest> = async (data) => {
        await loginRequest(data)
        setProfile()
        router.replace(routers.DASHBOARD);
    };

    return {
        handleSubmit,
        control,
        errors,
        onSubmit,
        loginRequestLoading,
    }
}