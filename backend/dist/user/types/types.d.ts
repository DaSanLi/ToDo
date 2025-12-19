export declare enum genderType {
    male = "male",
    female = "female"
}
export interface newUser {
    email: string;
    password: string;
    gender: genderType;
    fullName: string;
}
