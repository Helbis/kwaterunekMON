import logo from './../../logo.svg';
import { createContext, useState } from "react";
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div className='App-header'>
          <p>Darko mode</p><ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
        </div>
    
      </div>
    </ThemeContext.Provider>
    
  );
}

export default App;
