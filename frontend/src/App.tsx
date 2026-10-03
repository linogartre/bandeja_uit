import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EmpresasPage from './pages/EmpresasPage';
import EmpresaFormPage from './pages/EmpresaFormPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/empresas/nueva" element={<EmpresaFormPage />} />
        <Route path="/empresas/:id/editar" element={<EmpresaFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;