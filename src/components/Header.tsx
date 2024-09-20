import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom'

function HeaderLinks ( { show } : { show?: boolean}) : ReactNode {
  return (
    <section className={`headerLinks ${show ? "": 'hide'}`}>
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
  )
}

export default function Header() {
  const [ showMobileNavigation, setShowMobileNavigation ] = useState<boolean>(false);

  function showMobileNavigationMenu() {
    setShowMobileNavigation(!showMobileNavigation);
  }

  return (
    <header> 
      <div className="headerContainer desktop">
        <nav className="headerNavigation">
          <h1>CocktailDB</h1>
          <HeaderLinks />
        </nav>
      </div>
      
      <div className="headerContainer mobile">
        <nav className="headerNavigation">
          <h1>CocktailDB</h1>
          <section id="burgerMenu" className="material-symbols-outlined" onClick={ showMobileNavigationMenu }>
            menu
          </section>
        </nav>
        <HeaderLinks show={showMobileNavigation}/>
      </div>

    </header>
  );
}
