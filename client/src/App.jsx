import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import loadable from "@loadable/component";
import BasicLayout from "./layouts/BasicLayout";


const Home = loadable(() => import("./pages/Home"));
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Route chính */}
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

        {/* Nếu muốn, thêm route 404 */}
        {/* <Route path="*" element={<h1>Page not found</h1>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
