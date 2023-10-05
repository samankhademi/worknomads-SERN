"use client"

import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {UserContextType} from "@/types/userContext";
import {routers, storage} from "@/core";
import {useRouter, usePathname} from "next/navigation";
import {useProfile, User} from '@/queries'
import AppLoading from "@/components/common/loading";
import {useDidMountEffect} from "@/utils/useDidMountEffect";

export type ProviderProps = {
    children: ReactNode;
};

export const AppGuardContext = createContext<UserContextType>({
    checkLogin: () => {},
    handleLogout: () => {},
    setPasswordModalOpen: (state) => {},
    setUserModalOpen: (state) => {},
    setProfile: () => {},
    isLogin: false,
    userModalOpen: false,
    passwordModalOpen: false

});

export const UseAppGuard = () => {
    return useContext(AppGuardContext);
};

export const AppGuardProvider = (props: ProviderProps) => {
    const router = useRouter();
    const url = usePathname();
    const [user, setUser] = useState<User | null>()
    const {
        isFetching: ProfileDataLoading,
        refetch: ProfileDataFetch,
        isError: ProfileFetchError,
        isFetched: ProfileIsFetch
    } = useProfile()
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    const setProfile = () => {
        ProfileDataFetch().then(res => {
            setUser(res.data?.message);
        })

    }
    const checkLogin = () => {
        const jwt = storage.jwt.get()
        if (jwt) setProfile();
    }

    function checkUrlAuthorized() {
        if (typeof (user) === 'undefined') return
        if (user && url === routers.LOGIN) {
            router.replace(routers.DASHBOARD)
        } else if (!user && url !== routers.LOGIN) {
            router.replace(routers.LOGIN)
        }
    }

    const handleLogout = () => {
        storage.jwt.remove()
        storage.profile.remove()
        setUser(null)
        if (url === routers.LOGIN) router.replace(routers.LOGIN);
    };

    useEffect(() => {
        checkLogin()
    }, [])

    useDidMountEffect(() => {
        checkUrlAuthorized()
    }, [user])

    useDidMountEffect(() => {
        if (!ProfileFetchError && ProfileIsFetch) handleLogout()
    }, [ProfileFetchError])

    const stateValues: UserContextType = {
        checkLogin,
        handleLogout,
        isLogin: !!user,
        user,
        userModalOpen,
        setUserModalOpen,
        passwordModalOpen,
        setPasswordModalOpen,
        setProfile
    }

    return <AppGuardContext.Provider value={stateValues}>
        {(ProfileDataLoading) && <AppLoading/>}
        {(!ProfileDataLoading) && props.children}
    </AppGuardContext.Provider>
}