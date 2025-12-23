"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loginForm } from '../types/types'

function LoginPage() {

    const [ form, setForm ] = useState<loginForm|null>(null)
    //actualizar la interface registerForm con tasks[]
    const [User, setUser] = useState<loginForm|null>(null)
    const URL: string = "http://localhost:4000/auth/login"


    const saveForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newForm: loginForm = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }
        setForm(newForm)
    }


    useEffect(()=>{
        if(form){
            fetch(URL, {
                headers:{"Content-Type": "application/json"},
                method: 'POST',
                body: JSON.stringify(form),
            })
            .then((res)=>{
                const respuesta = res.json()
                if(!res.ok){
                    //aqui podria setearse algun estado que muestre el error en el formulario
                    console.error(respuesta)
                    throw new Error("Error en la respuesta del servidor")
                }
                return respuesta
            })
            .then((data)=> setUser(data))
            .catch((e) => (console.error("Ha ocurrido un error al recibir los datos:", e)))
        }
    },[form])


    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Flowbite
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Iniciar sesión
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => (saveForm(e))}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingresa email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recuerdame</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-blue-500">¿Olvidaste tu contraseña?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Entrar</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    ¿No tienes cuenta aún? <Link href="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginPage