import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Unidad de Inspecciones Técnicas</h2>
          <span>Bandeja de tareas</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/empresas"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Empresas
          </NavLink>
        </nav>
      </aside>

      <div className="content-area">
        <header className="topbar">
          <span>Unidad de Inspecciones Técnicas</span>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;