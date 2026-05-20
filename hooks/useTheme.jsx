import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

export function useTheme(){
     const [isDark, setIsDark] = useContext(ThemeContext)
     return [isDark, setIsDark]
}