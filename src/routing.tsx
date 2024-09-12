import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App  from "./components/App";
import LandingPage from "./pages/LandingPage";


<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />


export const routing = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index element={<LandingPage />} />
  </Route>
));