'use client'
import { useState } from 'react'
import { ThemeContext } from './ThemeContext';

export default function ThemeProvider({ children, }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>('dark');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>)
}