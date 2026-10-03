import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Local } from './local.entity';
import { TipoPadron } from '../enums/tipo-padron.enum';

@Entity('padron')
export class Padron {
  @PrimaryGeneratedColumn()
  padron_id: number;

  @Column({
    type: 'varchar',
  })
  numero: string;

  @Column({
    type: 'enum',
    enum: TipoPadron,
  })
  tipo: TipoPadron;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  localidad: string | null;

  @ManyToOne(() => Local, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'local_id' })
  local: Local;
}