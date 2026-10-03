import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  actualizarEmpresa,
  crearEmpresa,
  obtenerEmpresa,
} from '../services/empresasService';

import type { EmpresaFormData } from '../types/empresa';

function EmpresaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editando = id !== undefined;

  const [formData, setFormData] = useState<EmpresaFormData>({
    razon_social_actual: '',
    rut_actual: '',
    nombre_fantasia: '',
  });

  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!editando) {
      return;
    }

    obtenerEmpresa(Number(id))
      .then((empresa) => {
        setFormData({
          razon_social_actual: empresa.razon_social_actual,
          rut_actual: empresa.rut_actual,
          nombre_fantasia: empresa.nombre_fantasia,
        });
      })
      .catch(() => {
        setError('No se pudo cargar la empresa.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, [editando, id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!/^\d{12}$/.test(formData.rut_actual)) {
      setError('El RUT debe contener exactamente 12 dígitos.');
      return;
    }

    try {
      setGuardando(true);

      if (editando) {
        await actualizarEmpresa(Number(id), formData);
      } else {
        await crearEmpresa(formData);
      }

      navigate('/empresas');
    } catch {
      setError(
        editando
          ? 'No se pudo modificar la empresa.'
          : 'No se pudo crear la empresa.',
      );
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Modificar empresa</h1>
            <p>Cargando los datos de la empresa...</p>
          </div>
        </div>

        <section className="card">
          <div className="empty-state">
            Cargando empresa...
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{editando ? 'Modificar empresa' : 'Nueva empresa'}</h1>

          <p>
            {editando
              ? 'Modificá los datos de la empresa.'
              : 'Ingresá los datos de la nueva empresa.'}
          </p>
        </div>
      </div>

      <section className="form-card">
        <div className="form-card-header">
          <h2>Datos de la empresa</h2>
        </div>

        <form className="empresa-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rut">RUT</label>

            <input
              id="rut"
              name="rut_actual"
              type="text"
              value={formData.rut_actual}
              onChange={handleChange}
              placeholder="Ej. 111122220033"
              maxLength={12}
            />

            <span className="form-help">
              Ingresá el RUT sin puntos ni guiones.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="razonSocial">Razón social</label>

            <input
              id="razonSocial"
              name="razon_social_actual"
              type="text"
              value={formData.razon_social_actual}
              onChange={handleChange}
              placeholder="Ej. Empresa S.A."
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombreFantasia">Nombre de fantasía</label>

            <input
              id="nombreFantasia"
              name="nombre_fantasia"
              type="text"
              value={formData.nombre_fantasia}
              onChange={handleChange}
              placeholder="Ej. Empresa"
            />
          </div>

          {error && (
            <div className="error-state">
              {error}
            </div>
          )}

          <div className="form-actions">
            <Link
              to="/empresas"
              className="button button-secondary"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="button button-primary"
              disabled={guardando}
            >
              {guardando
                ? 'Guardando...'
                : editando
                  ? 'Guardar cambios'
                  : 'Crear empresa'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EmpresaFormPage;