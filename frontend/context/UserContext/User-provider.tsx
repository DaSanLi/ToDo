'use client'
import { useState } from 'react'
import { UserContext } from './UserContext'
import { UserInterface } from '@/app/auth/types/types';

export default function UserProvider({ children, }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserInterface | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}