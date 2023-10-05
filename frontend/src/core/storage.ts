import { LocalStorage, Storage } from "@/utils/storage";

type StorageNameSpaceType = "jwt" | "theme" | "profile";

export const storage: Record<StorageNameSpaceType, Storage> = {
    jwt: new LocalStorage(`APP-jwt`),
    theme: new LocalStorage(`APP-theme`),
    profile: new LocalStorage(`APP-profile`),
};
