"use client"
import { useContext, useEffect, useState } from 'react'
import { loginForm, UserInterface } from '../types/types'
import Link from 'next/link'
import { UserContext } from '@/context/UserContext/UserContext'
import { useRouter } from 'next/navigation'
import { fetchApi } from '@/scripts.tsx/general-scripts/scripts'

function LoginPage() {
    const [form, setForm] = useState<loginForm | null>(null)
    const endPoint: string = `auth/login`
    const [error, setError] = useState<string | null>(null)
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("UserContext must be used within UserProvider");
    }
    const { setUser } = context
    const router = useRouter()


    const saveForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newForm: loginForm = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }
        setForm(newForm)
    }


    useEffect(() => {
        if (form) {
            async function sendForm() {
                const res = await fetchApi<UserInterface>(endPoint, {
                    headers: { "Content-Type": "application/json" },
                    method: 'POST',
                    body: JSON.stringify(form),
                    credentials: 'include'
                })
                setUser(res)
                router.replace('/')
            }
            sendForm()
        }
    }, [form, setUser, router, endPoint])


    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 10000)
        }
    }, [error])


    return (
        <section className="bg-(--bg-primary)">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="relative w-full bg-(--bg-secondary) rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    {error && (
                        <p className="absolute -top-10 left-0 text-white bg-red-800 rounded-2xl p-2">
                            {error}
                        </p>
                    )}
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-(--text-primary) md:text-2xl">
                            Iniciar sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={(e) => saveForm(e)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-(--text-primary)"
                                >
                                    Ingresa email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-(--bg-primary) border border-(--border-color) text-(--text-primary) rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-(--text-primary)"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-(--bg-primary) border border-(--border-color) text-(--text-primary) rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-(--border-color) rounded bg-(--bg-primary) focus:ring-3 focus:ring-(--color-primary)"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-(--text-secondary)"
                                        >
                                            Recuerdame
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-(--color-primary) hover:underline text-sm font-medium"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-(--color-primary) hover:bg-(--color-secondary) focus:ring-4 focus:outline-none focus:ring-(--color-primary) font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Entrar
                            </button>
                            <p className="text-sm font-light text-(--text-secondary)">
                                ¿No tienes cuenta aún?{' '}
                                <Link
                                    href="/auth/register"
                                    className="font-medium text-(--color-primary) hover:underline"
                                >
                                    Registrate
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage