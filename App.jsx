import React from 'react'
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import  {useState} from 'react'

import './App.css';
import { ThemeContext } from './Context/ThemeContext';
 const  App = () => {
    const [isDark, setIsDark] = useState( JSON.parse(localStorage.getItem("isDarkMode")))
  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
    <Header/>
    <Outlet/>

    </ThemeContext.Provider>
  )
}
export default App;
