import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Empresa } from '../../empresa/entities/empresa.entity';
import { Padron } from './padron.entity';
import { SuministroAgua } from '../enums/suministro-agua.enum';
import { DisposicionEfluentes } from '../enums/disposicion-efluentes.enum';

@Entity('local')
export class Local {
  @PrimaryGeneratedColumn()
  local_id: number;

  @Column({
    type: 'varchar',
  })
  localidad: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  direccion: string | null;

  @ManyToOne(() => Empresa, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'empresa_id_actual' })
  empresa_actual: Empresa;

  @OneToMany(
    () => Padron,
    (padron) => padron.local,
  )
  padrones: Padron[];

  @Column({
    type: 'enum',
    enum: SuministroAgua,
    nullable: true,
  })
  suministro_agua: SuministroAgua | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  suministro_agua_otro: string | null;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  genera_efluentes: boolean | null;

  @Column({
    type: 'enum',
    enum: DisposicionEfluentes,
    nullable: true,
  })
  disposicion_efluentes: DisposicionEfluentes | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  disposicion_efluentes_otro: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  curso_agua_nombre: string | null;
}