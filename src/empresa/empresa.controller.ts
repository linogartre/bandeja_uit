import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { EmpresaService } from './empresa.service';

import { Empresa } from './entities/empresa.entity';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll(): Promise<Empresa[]> {
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Empresa> {
    return this.empresaService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    return this.empresaService.update(Number(id), updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.empresaService.remove(Number(id));
  }
}