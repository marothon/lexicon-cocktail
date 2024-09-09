import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./components/App";

export const routing = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
  </Route>
));