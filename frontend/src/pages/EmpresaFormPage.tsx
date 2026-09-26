import { useParams } from 'react-router-dom';

function EmpresaFormPage() {
  const { id } = useParams();

  const editando = id !== undefined;

  return (
    <div>
      <h1>{editando ? 'Modificar empresa' : 'Nueva empresa'}</h1>

      <form>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" />
        </div>

        <button type="submit">
          {editando ? 'Guardar cambios' : 'Crear empresa'}
        </button>
      </form>
    </div>
  );
}

export default EmpresaFormPage;