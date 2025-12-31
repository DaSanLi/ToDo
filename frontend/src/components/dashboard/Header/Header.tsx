'use server'
import InteractiveHeaderBar from "./HeaderComponents/InteractiveHeaderBar"

const Header = () => {
    return (
        <header className="fixed w-full h-fit top-0 mb-8">
            <section className="bg-(--bg-secondary) w-full h-full text-(--color-primary)">
                <h1 className="text-3xl font-bold p-2">
                    To-Do App
                </h1>
                <InteractiveHeaderBar />
            </section>
        </header>
    )
}

export default Header