import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
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

            <NavLink
              to="favorites?p=1"
              className={({ isActive }) =>
                [
                  isActive ? "active" : ""
                ].join(" ")
              }
            >
              Favorites
            </NavLink>

          </section>
          <section id="burgerMenu" className="material-symbols-outlined">
            menu
          </section>
        </nav>
      </header>
  )
}
