import { UserInterface } from "@/app/auth/types/types";
import { changePassword } from "@/scripts.tsx/options-scripts/options-scripts";
import { SetStateAction, useEffect, useState } from "react";

type props = {
    setUser: React.Dispatch<SetStateAction<UserInterface | null>>;
    setBlackOptionScreen: React.Dispatch<SetStateAction<boolean>>;
    blackOptionScreen: boolean;
}

export default function PasswordBlackScreen({ setUser, setBlackOptionScreen }: props) {

    const [form, setForm] = useState<string>("")


    const saveForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const password: string = e.currentTarget.password.value
        const verifyPassword: string = e.currentTarget.verifyPassword.value
        if(password === verifyPassword){
            setForm(password)
        }
    }


    useEffect(()=>{
        changePassword(form)
    },[form])


    const exitButton = (e: React.FormEvent<HTMLButtonElement>) =>{
        e.preventDefault() 
        setBlackOptionScreen(prev => !prev)
    }


    return (
        <section className="absolute w-full h-full bg-black/85 flex items-center justify-center">
            <div className="relative w-64 h-78 bg-(--bg-secondary)/95 text-white rounded-3xl p-4">
                <h4>Ingresa tu nueva contraseña</h4>
                <form className="h-full w-full flex items-center flex-col my-2" 
                onSubmit={(e) => saveForm(e)}>
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
                            required
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
                            required
                        />
                    </div>
                    <div className="absolute bottom-4  right-4 flex flex-row gap-2">
                        <button className="p-2 bg-(--color-primary) hover:bg-(--color-primary)/50 rounded-2xl min-w-26"
                        >Modificar</button>
                        <button className="p-2 bg-(--color-secondary) hover:bg-(--color-secondary)/50 rounded-2xl min-w-26"
                        onClick={ (e) => exitButton(e)}
                        >Salir</button>
                    </div>
                </form>
            </div>
        </section>
    )
}