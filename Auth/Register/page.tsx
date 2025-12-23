"use client"
import React, { useEffect, useState } from 'react'
import type { registerForm } from '../types/types'

function RegisterPage() {

    const [form, setForm] = useState<registerForm|null>(null)
    //actualizar la interface registerForm con tasks[]
    const [User, setUser] = useState<registerForm|null>(null)
    const URL: string = "http://localhost:4000/auth/register"


    const saveForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const password: string = e.currentTarget.password.value
        const verifyPassword: string = e.currentTarget.verifyPassword.value
        //podria colocarse una pop encima del form para mejorar la visualización del la adventencia
        if(password !== verifyPassword){
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

    useEffect(()=>{
        console.log(User, "se entregan los datos del usuario")
    },[User])

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Registro
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={((e) => saveForm(e))}>
                            <div className='h-full w-fulll grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre y apellidos</label>
                                    <input type="text" name="fullName" id="fullName" autoComplete='off' placeholder="Nombre completo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingresa tu email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingresa tu contraseña</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="verifyPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verifica tu contraseña</label>
                                    <input type="password" name="verifyPassword" id="verifyPassword" autoComplete='off' placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className='col-span-2'>
                                    <select name="gender" id="gender" className="text-white bg-gray-50 border border-gray-300 rounded-2xl w-full max-full h-auto p-0.5 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-white" required >
                                        <option value="">Selecciona tu género</option>
                                        <option value="male">masculino</option>
                                        <option value="female">femenino</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Crear cuenta</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya tienes cuenta? Ingresa aqui <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Iniciar sesión</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage