import Link from "next/link"

const ReturnDashBoard = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-(--text-primary)">Salir del panel de configuración</h3>
            <div className="flex flex-col gap-3">
                <Link href='/dashboard' className="w-full text-left px-4 py-2 rounded-xl border border-(--border-color) text-(--text-primary) bg-(--bg-primary) hover:bg-(--bg-secondary) transition text-sm font-medium">
                    Ir a inicio
                </Link>
            </div>
        </div>
    )
}

export default ReturnDashBoard