import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import loadable from "@loadable/component";
import BasicLayout from "./layouts/BasicLayout";
import BlankLayout from "./layouts/BlankLayout";
import { useAuthStore } from "./store/authStore";
import '../src/index.css'

const Login = loadable(() => import("./pages/Auth/Login"));
const Home = loadable(() => import("./pages/Home"));
const Register = loadable(() => import("./pages/Auth/Register"));
function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route chính với BasicLayout */}
        <Route element={<BasicLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<CircularProgress />}>
                <Home title="HomePage" />
              </Suspense>
            }
          />
        </Route>

        {/* Route login với BlankLayout */}
        <Route element={<BlankLayout />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Login title="LoginPage" />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Register title="RegisterPage" />
              </Suspense>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;