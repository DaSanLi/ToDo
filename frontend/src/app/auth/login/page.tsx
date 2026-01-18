import LoginForm from "@/src/components/auth/login/LoginForm"

function LoginPage() {
    return (
        <section className="min-h-screen bg-(--bg-primary) flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-(--bg-secondary) rounded-lg shadow">
                <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-(--text-primary)">
                        Iniciar sesión
                    </h1>
                    <LoginForm />
                </div>
            </div>
        </section>
    )
}

export default LoginPage