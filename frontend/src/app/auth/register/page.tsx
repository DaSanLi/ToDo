import RegisterForm from "@/src/components/auth/register/RegisterForm"

function RegisterPage() {

    return (
        <section className="bg-(--bg-primary)">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="relative w-full bg-(--bg-secondary) rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-(--text-primary) md:text-2xl">
                            Registro
                        </h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage