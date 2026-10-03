import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TipoPadron } from '../enums/tipo-padron.enum';

export class CreatePadronDto {
  @ApiProperty({
    example: '1254',
    description: 'Número de padrón',
  })
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty({
    enum: TipoPadron,
    example: TipoPadron.URBANO,
    description: 'Tipo de padrón',
  })
  @IsEnum(TipoPadron)
  tipo: TipoPadron;

  @ApiPropertyOptional({
    example: 'Las Piedras',
    nullable: true,
    description:
      'Localidad del padrón. Obligatoria para padrones urbanos y suburbanos.',
  })
  @ValidateIf(
    (o) =>
      o.tipo === TipoPadron.URBANO ||
      o.tipo === TipoPadron.SUBURBANO,
  )
  @IsString()
  @IsNotEmpty()
  localidad?: string | null;
}