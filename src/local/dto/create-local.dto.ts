import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';


import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreatePadronDto } from './create-padron.dto';
import { SuministroAgua } from '../enums/suministro-agua.enum.js';
import { DisposicionEfluentes } from '../enums/disposicion-efluentes.enum.js';

export class CreateLocalDto {
  @ApiProperty({
    example: 'Las Piedras',
    description: 'Localidad donde se encuentra el local',
  })
  @IsString()
  @IsNotEmpty()
  localidad: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la empresa a la que pertenece actualmente el local',
  })
  @IsInt()
  @IsPositive()
  empresa_id_actual: number;

  @ApiPropertyOptional({
    type: () => [CreatePadronDto],
    description: 'Padrones asociados al local',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePadronDto)
  padrones?: CreatePadronDto[];

  @ApiPropertyOptional({
    example: 'Av. Artigas 123',
    nullable: true,
    description: 'Dirección del local',
  })
  @IsOptional()
  @IsString()
  direccion?: string | null;

  @ApiPropertyOptional({
    enum: SuministroAgua,
    example: SuministroAgua.OSE_DIRECTO,
    nullable: true,
    description: 'Fuente de suministro de agua',
  })
  @IsOptional()
  @IsEnum(SuministroAgua)
  suministro_agua?: SuministroAgua | null;

  @ApiPropertyOptional({
    example: 'Agua de lluvia recolectada',
    nullable: true,
    description:
      'Descripción del suministro cuando suministro_agua es "otra"',
  })
  @ValidateIf(
    (o) => o.suministro_agua === SuministroAgua.OTRA,
  )
  @IsString()
  @IsNotEmpty()
  suministro_agua_otro?: string | null;

  @ApiPropertyOptional({
    example: true,
    nullable: true,
    description:
      'Indica si el local genera efluentes. null significa no informado.',
  })
  @IsOptional()
  @IsBoolean()
  genera_efluentes?: boolean | null;

  @ApiPropertyOptional({
    enum: DisposicionEfluentes,
    example: DisposicionEfluentes.VERTIDO_CURSO_AGUA,
    nullable: true,
    description:
      'Forma de disposición de los efluentes. Requerido si genera_efluentes es true.',
  })
  @ValidateIf(
    (o) => o.genera_efluentes === true,
  )
  @IsEnum(DisposicionEfluentes)
  disposicion_efluentes?: DisposicionEfluentes | null;

  @ApiPropertyOptional({
    example: 'Tratamiento mediante sistema propio',
    nullable: true,
    description:
      'Descripción de la disposición cuando disposicion_efluentes es "otro"',
  })
  @ValidateIf(
    (o) =>
      o.disposicion_efluentes ===
      DisposicionEfluentes.OTRO,
  )
  @IsString()
  @IsNotEmpty()
  disposicion_efluentes_otro?: string | null;

  @ApiPropertyOptional({
    example: 'Arroyo Canelón',
    nullable: true,
    description:
      'Nombre del curso de agua cuando la disposición es vertido a curso de agua',
  })
  @ValidateIf(
    (o) =>
      o.disposicion_efluentes ===
      DisposicionEfluentes.VERTIDO_CURSO_AGUA,
  )
  @IsString()
  @IsNotEmpty()
  curso_agua_nombre?: string | null;
}