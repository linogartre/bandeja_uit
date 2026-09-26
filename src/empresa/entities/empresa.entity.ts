import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn()
  empresa_id: number;

  @Column()
  razon_social_actual: string;

  @Column()
  rut_actual: string;

  @Column()
  nombre_fantasia: string;
}