import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components/App";
import LandingPage from "./pages/LandingPage";


export const routing = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
      <Route index element={<LandingPage/>} />
  </Route>
));