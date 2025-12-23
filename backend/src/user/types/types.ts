export enum genderType {
    male = "male", 
    female = "female"
}

export interface newUserType {
    email: string; 
    password: string;
    gender: genderType;
    fullName: string;
}