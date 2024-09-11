import { NavLink, Outlet } from "react-router-dom";


export function App() {

    
    return (
        <>
        <header>
            <h1>CocktailDB</h1>
            <section className="headerLinks">

                <NavLink 
                    to="/" 
                    style={({isActive}) => { 
                        return {
                            fontWeight: isActive ? "800" : "",
                            fontSize: isActive ? "30px" : undefined
                        };
                    }}
                >
                Home
                </NavLink>

                <NavLink to="search" style={({isActive}) => { 
                        return {
                            fontWeight: isActive ? "800" : "",
                            fontSize: isActive ? "30px" : undefined
                        };
                    }}
                >
                Search
                </NavLink>

            </section>
            
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

export default App;
