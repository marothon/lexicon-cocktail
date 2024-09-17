import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App  from "./components/App";
import LandingPage, { loaderLandingPage } from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";

export const routing = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index element={<LandingPage />} loader={loaderLandingPage}/>
    <Route path='search' element={<SearchPage/>} />
  </Route>
));