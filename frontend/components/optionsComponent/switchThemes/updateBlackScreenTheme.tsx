import { SetStateAction } from "react";
import SwitchThemes from "./switchThemes"

type props = {
    setBlackOptionScreenTheme: React.Dispatch<SetStateAction<boolean>>;
}

const UpdateBlackScreenTheme = ({  setBlackOptionScreenTheme }: props) => {

const exitButton = () => {
    setBlackOptionScreenTheme(prev => !prev)
}

    return (
        <section className="absolute w-full h-full bg-black/85 flex items-center justify-center">
            <div className="flex flex-col items-center relative w-56 h-44 bg-(--bg-secondary)/95 text-white rounded-3xl p-4">
                <h4 className="flex-1">Selecciona un tema</h4>
                <div className="flex-2 flex justify-center items-center">
                    <SwitchThemes />
                </div>
                <button className="flex-1 max-h-10 p-2 bg-(--color-secondary) hover:bg-(--color-secondary)/50 rounded-2xl w-5/6"
                    onClick={() => exitButton()}
                >Salir</button>
            </div>
        </section>
    )
}

export default UpdateBlackScreenTheme