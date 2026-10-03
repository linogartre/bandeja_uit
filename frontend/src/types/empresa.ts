export interface Empresa {
  empresa_id: number;
  razon_social_actual: string;
  rut_actual: string;
  nombre_fantasia: string;
}

export interface EmpresaFormData {
  razon_social_actual: string;
  rut_actual: string;
  nombre_fantasia: string;
}