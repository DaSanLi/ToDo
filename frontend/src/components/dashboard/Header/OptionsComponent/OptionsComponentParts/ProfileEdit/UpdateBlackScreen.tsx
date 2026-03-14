'use client';
import { genderType } from "@/src/app/auth/types/types";
import { fetchApi } from "@/src/scripts.ts/scripts";
import { SetStateAction, useEffect, useState } from "react";
import { generalRes, updateOption } from "../../types/types";

type props = {
    setBlackOptionScreen: React.Dispatch<SetStateAction<boolean>>;
}

export default function UpdateBlackScreen({  setBlackOptionScreen }: props) {

    const [ menssage, setMessage ] = useState<string>("Los campos dejados en blanco no seran modificados")
    const [form, setForm] = useState<updateOption | null>(null)


    const saveForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const password: string = e.currentTarget?.password.value
        const verifyPassword: string = e.currentTarget?.verifyPassword.value
        const fullName: string = e.currentTarget?.fullName.value
        const gender: genderType = e.currentTarget?.gender.value
        const newForm: updateOption = {}
        if (password !== verifyPassword && password && verifyPassword) {
            alert("Las contaseñas no coinciden")
        } else if (password === verifyPassword && password) newForm.password = password
        if (fullName) newForm.fullName = fullName
        if (gender) newForm.gender = gender
        setForm(newForm)
    }


    useEffect(() => {
        if (form) {
            const changePassword = async (updateOption: updateOption): Promise<void> => {
                const endPoint: string = `user`
                const res = await fetchApi<generalRes|null>(endPoint, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateOption),
                    credentials: 'include'
                });
                if(res){
                    setMessage(res.message)
                }
            }
            changePassword(form)
        }
    }, [form])


    const exitButton = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setBlackOptionScreen(prev => !prev)
    }


    return (
        <section className="fixed inset-0 z-50 w-screen h-screen bg-black/85 flex items-center justify-center">
            <div className="relative w-64 h-126 bg-(--bg-secondary)/95 text-white rounded-3xl py-4 px-2">
                <h4>Ingresa tus datos</h4>
                <p className={`rounded-2xl my-2 p-1 text-center
                    ${menssage === "Los campos dejados en blanco no seran modificados" ? "bg-red-800" : "bg-green-800"}`}
                    >{menssage}</p>
                <form className="h-full w-full flex items-center flex-col my-2"
                    onSubmit={(e) => saveForm(e)}>
                    <div className="flex flex-col my-2 gap-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-(--text-primary">
                            Ingresa tu nombre completo
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="name and lastname"
                            className="w-56 bg-(--bg-primary) border border-(--border-color) text-(--text-primary) text-sm rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block p-2.5"
                        />
                    </div>
                    <div className="flex flex-col my-2 gap-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-(--text-primary">
                            Ingresa tu contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="off"
                            placeholder="••••••••"
                            className="w-56 bg-(--bg-primary) border border-(--border-color) text-(--text-primary) text-sm rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block p-2.5"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="verifyPassword" className="block mb-2 text-sm font-medium text-(--text-primary)">
                            Verifica tu contraseña
                        </label>
                        <input
                            type="password"
                            name="verifyPassword"
                            id="verifyPassword"
                            autoComplete="off"
                            placeholder="••••••••"
                            className="w-56 bg-(--bg-primary) border border-(--border-color) text-(--text-primary) text-sm rounded-lg focus:ring-(--color-primary) focus:border-(--color-primary) block p-2.5"
                        />
                        <div className="flex flex-col my-2 gap-2">
                            <select
                                name="gender"
                                id="gender"
                                className="text-(--text-primary) bg-(--bg-primary) border border-(--border-color) rounded-2xl w-full h-auto p-2.5 focus:border-(--color-primary) focus:ring-(--color-primary)"
                            >
                                <option value="">Selecciona tu género</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                        </div>
                    </div>
                    <div className="absolute bottom-4  right-4 flex flex-row gap-2">
                        <button className="p-2 bg-(--color-primary) hover:bg-(--color-primary)/50 rounded-2xl min-w-26"
                        >Modificar</button>
                        <button className="p-2 bg-(--color-secondary) hover:bg-(--color-secondary)/50 rounded-2xl min-w-26"
                            onClick={(e) => exitButton(e)}
                        >Salir</button>
                    </div>
                </form>
            </div>
        </section>
    )
}