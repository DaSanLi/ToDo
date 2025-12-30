'use client';
import React from 'react'
import UpdateBlackScreen from './UpdateBlackScreen'

function ProfileSection() {
    const [ blackOptionScreen, setBlackOptionScreen ] = React.useState<boolean>(false)
    return (
        <>
            {blackOptionScreen && <UpdateBlackScreen setBlackOptionScreen={setBlackOptionScreen} />}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-(--text-primary)">Perfil</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                    <button onClick={() => setBlackOptionScreen(prev => !prev)}
                    className="w-full text-left px-4 py-2 rounded-xl border border-(--border-color) text-(--text-primary) bg-(--bg-primary) hover:bg-(--bg-secondary) transition text-sm font-medium">
                        Modificar datos de perfil
                    </button>
                </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSection