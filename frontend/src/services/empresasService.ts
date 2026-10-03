import type { Empresa, EmpresaFormData } from '../types/empresa';

const API_URL = 'http://localhost:3000/empresa';

export async function obtenerEmpresas(): Promise<Empresa[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('No se pudieron obtener las empresas');
  }

  return response.json();
}

export async function obtenerEmpresa(id: number): Promise<Empresa> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('No se pudo obtener la empresa');
  }

  return response.json();
}

export async function crearEmpresa(
  datos: EmpresaFormData,
): Promise<Empresa> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    throw new Error('No se pudo crear la empresa');
  }

  return response.json();
}

export async function actualizarEmpresa(
  id: number,
  datos: Partial<EmpresaFormData>,
): Promise<Empresa> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    throw new Error('No se pudo actualizar la empresa');
  }

  return response.json();
}

export async function eliminarEmpresa(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar la empresa');
  }
}