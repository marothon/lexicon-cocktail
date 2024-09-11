import { LandingPage } from "../pages/LandingPage.tsx";
import { Link, Outlet } from "react-router-dom";


export function App() {
  return (
    <>
      <header>
        <h2 className="roboto-regular">CocktailDB</h2>
        <Link to={"home"} className="roboto-regular">Home</Link>
        <Link to={"search"} className="roboto-regular">Search</Link>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        Robo Surfers
      </footer>
    </>
  )
}

export default App;
