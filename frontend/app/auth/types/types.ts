interface loginForm {
    email: string;
    password: string;
}

interface registerForm extends loginForm {
    fullName: string;
    gender: string;
}

interface UserInterface extends registerForm {
    tasks: string[];
}

export type { loginForm, registerForm, UserInterface }