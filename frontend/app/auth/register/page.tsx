"use client"
import { useContext, useEffect, useState } from 'react'
import type { registerForm } from '../types/types'
import Link from 'next/link'
import { UserContext } from '@/context/UserContext/UserContext'
import { URLBASE } from '@/scripts.tsx/general-scripts/scripts'

function RegisterPage() {

    const [form, setForm] = useState<registerForm | null>(null)
    //actualizar la interface registerForm con tasks[]
    const [error, setError] = useState<string | null>(null)
    const URL: string = `${URLBASE}/auth/register`
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("UserContext must be used within UserProvider");
    }
    const { setUser } = context


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
                try {
                    const request = await fetch(URL, {
                        headers: { "Content-Type": "application/json" },
                        method: 'POST',
                        body: JSON.stringify(form),
                    })
                    const response = await request.json()
                    if (!request.ok) {
                        setError(response?.message)
                    } else {
                        setUser(() => response)
                        setError(() => null)
                    }
                } catch {
                    setError("Ha ocurrido un error, vuelve a intentarlo más tarde")
                    throw new Error("Ha ocurrido un error al traer los datos del cliente")
                }
            }
            sendForm()
        }
    }, [form, setUser, URL])


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
                            Registro
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => saveForm(e)}>
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage