import { Link } from 'react-router-dom';

const empresas = [
  { id: 1, nombre: 'Empresa A' },
  { id: 2, nombre: 'Empresa B' },
  { id: 3, nombre: 'Empresa C' },
];

function EmpresasPage() {
  return (
    <div>
      <h1>Empresas</h1>
      <p>texto</p>

      <Link to="/empresas/nueva">
        <button>Nueva empresa</button>
      </Link>

      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>
            <Link to={`/empresas/${empresa.id}/editar`}>
              {empresa.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmpresasPage;