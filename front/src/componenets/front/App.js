import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Accueil from "../sidebar/Accueil";
import Projets from "../sidebar/projets";
import Taches from "../sidebar/taches";
import Equipe from "../sidebar/equipe";
import Utilisateurs from "../sidebar/utilisateurs";
import SprintCraftHome from "../components/Home1";
//import Login from "./components/Login";
import Signup from "../components/Signup";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SprintCraftHome />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Accueil />} />
        <Route path="accueil" element={<Accueil />}/>
        <Route path="projets" element={<Projets />} />
        <Route path="taches" element={<Taches />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="utilisateurs" element={<Utilisateurs />} />
      </Route>
    </Routes>
  );
}
