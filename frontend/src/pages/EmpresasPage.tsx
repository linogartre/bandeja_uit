import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { obtenerEmpresas } from '../services/empresasService';
import type { Empresa } from '../types/empresa';

function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerEmpresas()
      .then((datos) => {
        setEmpresas(datos);
      })
      .catch(() => {
        setError('No se pudieron cargar las empresas.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Empresas</h1>
            <p>Gestión de empresas registradas en el sistema.</p>
          </div>
        </div>

        <section className="card">
          <div className="empty-state">
            Cargando empresas...
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Empresas</h1>
            <p>Gestión de empresas registradas en el sistema.</p>
          </div>
        </div>

        <section className="card">
          <div className="error-state">
            {error}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Empresas</h1>
          <p>Gestión de empresas registradas en el sistema.</p>
        </div>

        <Link to="/empresas/nueva" className="button button-primary">
          + Nueva empresa
        </Link>
      </div>

      <section className="card">
        <div className="card-header">
          <h2>Empresas registradas</h2>
          <span>{empresas.length} empresas</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>RUT</th>
                <th>Razón social</th>
                <th>Nombre de fantasía</th>
                <th className="actions-column">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {empresas.map((empresa) => (
                <tr key={empresa.empresa_id}>
                  <td>{empresa.rut_actual}</td>

                  <td>{empresa.razon_social_actual}</td>

                  <td>{empresa.nombre_fantasia}</td>

                  <td className="actions">
                    <Link
                      to={`/empresas/${empresa.empresa_id}/editar`}
                      className="button button-secondary"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default EmpresasPage;