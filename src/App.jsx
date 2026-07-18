import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signin from "./pages/Signin";
import MainMenu from "./pages/MainMenu";
import DetailMenu from "./pages/DetailMenu";
import SavedRecipes from "./pages/SavedRecipes";
import NotFound from "./pages/NotFound";

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

      <Route path="/menu/:id" element={<DetailMenu />} />
      <Route path="/saved-recipes" element={<SavedRecipes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
