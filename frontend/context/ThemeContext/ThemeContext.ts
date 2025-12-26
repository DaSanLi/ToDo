import { createContext } from 'react'
import { ThemeStateType } from '../types/types';
export const ThemeContext = createContext<ThemeStateType>({
    theme: 'dark', 
    setTheme: () => {} 
});