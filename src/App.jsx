import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signin from "./pages/Signin";
import MainMenu from "./pages/MainMenu";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <MainMenu />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
