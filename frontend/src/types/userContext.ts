import {User} from "@/queries";

export type UserContextType = {
    checkLogin: () => void
    handleLogout: () => void
    setProfile: () => void
    isLogin: boolean
    user?: User | null
    userModalOpen: boolean
    setUserModalOpen: (state:boolean) => void
    passwordModalOpen: boolean
    setPasswordModalOpen: (state:boolean) => void

};
