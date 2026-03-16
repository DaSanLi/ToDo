"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchApi } from '@/src/scripts.ts/scripts'
import { loginForm } from '@/src/app/auth/types/types'
import { GraphQLError, GraphQLResponse, LoginResponse } from '@/src/scripts.ts/types'

function LoginForm() {
    const [form, setForm] = useState<loginForm | null>(null)
    const [error, setError] = useState<GraphQLError[] | null>(null)
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
            const mutation = `mutation login($body: LoginDto!) {
                login(body: $body) {
                    email  
                }
            }`
            const variables = {
                body: {
                    email: form?.email,
                    password: form?.password
                }
            };
            fetchApi<GraphQLResponse<LoginResponse>>({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: mutation, variables }),
                credentials: 'include'
            }).then((data) => {
                if (data?.data?.login?.email) {
                    router.replace('/dashboard')
                }else if(data?.errors){
                    setError(data.errors)
                }
            })
        }
    }, [form, router])


    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 10000)
        }
    }, [error])


    return (
        <form className="space-y-4 md:space-y-6"
            onSubmit={(e) => saveForm(e)}
        >
            {error !== null && (
                <p className="absolute -top-10 left-0 text-white bg-red-800 rounded-2xl p-2">{
                    error.map((item, index) => <p key={index}>{item.message}</p>)
                }</p>
            )}
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
    )
}

export default LoginForm