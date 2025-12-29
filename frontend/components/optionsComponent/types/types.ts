import { genderType } from "@/app/auth/types/types";

interface updateOption {
    fullName?: string;
    password?: string;
    gender?: genderType;
}

interface generalRes {
    message: string;
}

export type { updateOption, generalRes }