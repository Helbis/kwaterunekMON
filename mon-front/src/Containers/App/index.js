import { createContext, useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home";
import PersonPage from "../../pages/PersonPage";

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="people" element={<PersonPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
