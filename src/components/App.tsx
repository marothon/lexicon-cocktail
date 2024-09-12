import { NavLink, Outlet } from "react-router-dom";


export default function App() {


  return (
    <>
      <header>
        <nav>
          <h1>CocktailDB</h1>
          <section className="headerLinks">

            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  isActive ? "active" : ""
                ].join(" ")
              }
            >
              Home
            </NavLink>

            <NavLink
              to="search"
              className={({ isActive }) =>
                [
                  isActive ? "active" : ""
                ].join(" ")
              }
            >
              Search
            </NavLink>

          </section>

          <section id="burgerMenu" className="material-symbols-outlined">
            menu
          </section>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <h1>Robo Surfers</h1>
      </footer>
    </>
  )
}
