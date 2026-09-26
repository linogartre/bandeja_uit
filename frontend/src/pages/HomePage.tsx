import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Bandeja - UIT</h1>
      <p>texto.</p>

      <Link to="/empresas">
        <button>Empresas</button>
      </Link>
    </div>
  );
}

export default HomePage;