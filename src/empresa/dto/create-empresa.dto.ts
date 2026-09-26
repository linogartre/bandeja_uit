import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Razón social de la empresa',
    example: 'Acme S.A.',
  })
  @IsString()
  @IsNotEmpty()
  razon_social_actual: string;
  
  @ApiProperty({
    description: 'RUT de la empresa',
    example: '111122220033',
  })
  @IsString()
  @Matches(/^\d{12}$/, {
    message: 'El RUT debe contener exactamente 12 dígitos',
  })
  rut_actual: string;

  @ApiProperty({
    description: 'Nombre de fantasía de la empresa',
    example: 'Acme',
  })
  @IsString()
  @IsNotEmpty()
  nombre_fantasia: string;
}