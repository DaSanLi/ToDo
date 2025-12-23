interface loginForm {
    email: string;
    password: string;
}

interface registerForm extends loginForm {
    fullName: string;
    gender: string;
}

export type { loginForm, registerForm }