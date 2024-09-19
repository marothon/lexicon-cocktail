import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App  from "./components/App";
import LandingPage, { loaderLandingPage } from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import CocktailPage, { cocktailPageLoader } from "./pages/CocktailPage";
import FavoritesPage from "./pages/FavoritesPage";
import PageNotFoundPage from "./pages/PageNotFoundPage"
import IngredientPage, { ingredientPageLoader } from "./pages/IngredientPage";

export const routing = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index element={<LandingPage />} loader={loaderLandingPage}/>
    <Route path='search' element={<SearchPage/>} />
    <Route path='cocktail/:id' element={<CocktailPage/>} loader={cocktailPageLoader}/>
    <Route path="favorites" element={<FavoritesPage />} />
    <Route path="*" element={<PageNotFoundPage />} />
    <Route path='ingredient/:name' element={<IngredientPage/>} loader={ingredientPageLoader}/>
  </Route>
));