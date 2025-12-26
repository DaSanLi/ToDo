import { UserInterface } from "@/app/auth/types/types";

export interface UserStateType {
    user: UserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
}

export interface ThemeStateType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}