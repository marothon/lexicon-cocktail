import { LandingPage } from "../pages/LandingPage.tsx";
import { Link, Outlet } from "react-router-dom";


export function App() {
  return (
    <>
      <header>
        <Link to={"home"}>Home</Link>
        <Link to={"search"}>Search</Link>
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
