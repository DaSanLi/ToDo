"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchApi } from '@/src/scripts.ts/scripts'
import { useRouter } from 'next/navigation'
import { registerForm, UserInterface } from '@/src/app/auth/types/types'

function RegisterForm() {

    const [form, setForm] = useState<registerForm | null>(null)
    //actualizar la interface registerForm con tasks[]
    const [error, setError] = useState<string | null>(null)
    const endPoint: string = `auth/register`
    const router = useRouter()


    const saveForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const password: string = e.currentTarget.password.value
        const verifyPassword: string = e.currentTarget.verifyPassword.value
        //podria colocarse una pop encima del form para mejorar la visualización del la adventencia
        if (password !== verifyPassword) {
            alert("Tu contraseña no coincide con su verificación, vuelve a intentarlo")
            return
        }
        const newForm: registerForm = {
            email: e.currentTarget.email.value,
            fullName: e.currentTarget.fullName.value,
            gender: e.currentTarget.gender.value,
            password,
        }
        setForm(newForm)
    }


    useEffect(() => {
        if (form) {
            async function sendForm() {
                await fetchApi<UserInterface>(endPoint, {
                    headers: { "Content-Type": "application/json" },
                    method: 'POST',
                    body: JSON.stringify(form),
                    credentials: 'include'
                })
                router.replace('/dashboard')
            }
            sendForm()
        }
    }, [form, router, endPoint])


    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 10000)
        }
    }, [error])


    return (
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => saveForm(e)}>
                    {error && (
                        <p className="absolute -top-10 left-0 text-white bg-red-800 rounded-2xl p-2">
                            {error}
                        </p>
                    )}
                            <div className="h-full w-full grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-(--text-primary)">
                                        Nombre y apellidos
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        autoComplete="off"
                                        placeholder="Nombre completo"
                                        className="bg-(--bg-primary) border border-(--border-color) text-(--text-primary) text-sm rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-(--text-primary)">
                                        Ingresa tu email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="email@email.com"
                                        className="bg-(--bg-primary) border border-(--border-color) text-(--text-primary) text-sm rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-(--text-primary)">
                                        Ingresa tu contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="off"
                                        placeholder="••••••••"
                                        className="bg-(--bg-primary) border border-(--border-color) text-(--text-primary) text-sm rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="verifyPassword" className="block mb-2 text-sm font-medium text-(--text-primary)">
                                        Verifica tu contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="verifyPassword"
                                        id="verifyPassword"
                                        autoComplete="off"
                                        placeholder="••••••••"
                                        className="bg-(--bg-primary) border border-(--border-color) text-(--text-primary) text-sm rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <select
                                        name="gender"
                                        id="gender"
                                        className="text-(--text-primary) bg-(--bg-primary) border border-(--border-color) rounded-2xl w-full h-auto p-2.5 focus:border-(--color-primary) focus:ring-(--color-primary)"
                                        required
                                    >
                                        <option value="">Selecciona tu género</option>
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-(--color-primary) hover:bg-(--color-secondary) focus:ring-4 focus:outline-none focus:ring-(--color-primary) font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Crear cuenta
                            </button>
                            <p className="text-sm font-light text-(--text-secondary)">
                                ¿Ya tienes cuenta? Ingresa aqui{' '}
                                <Link
                                    href="/auth/login"
                                    className="font-medium text-(--color-primary) hover:underline"
                                >
                                    Iniciar sesión
                                </Link>
                            </p>
                        </form>
    )
}

export default RegisterForm