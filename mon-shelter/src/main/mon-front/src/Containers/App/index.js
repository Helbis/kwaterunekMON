import { createContext, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "../../Pages/Layout";
import Home from "../../Pages/Home";
import ShelteringPage from "../../Pages/ShelteringPage"
import PersonPage from "../../Pages/PersonPage";
import { ToastContainer } from "react-toastify";
import AssignmentsPage from "../../Pages/AssignmentsPage";
import CreatePersonPage from "../../Pages/CreatePersonPage";
import CreateLocationPage from "../../Pages/CreateLocationPage";
import ReportPage from "../../Pages/ReportPage";

export const ThemeContext = createContext(null);

const App = () => {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

    return (
        <HashRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="people" element={<PersonPage />} />
                    <Route path="shelter" element={<ShelteringPage />} />
                    <Route path="shelters" element={<AssignmentsPage />} />
                    <Route path="create-person" element={<CreatePersonPage />} />
                    <Route path="create-institution" element={<CreateLocationPage />} />
                    <Route path="report" element={<ReportPage />}/>
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
