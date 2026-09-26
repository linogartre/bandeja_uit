import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from './entities/empresa.entity';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = this.empresaRepository.create(createEmpresaDto);

    return this.empresaRepository.save(empresa);
  }

  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find();
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOneBy({
      empresa_id: id,
    });

    if (!empresa) {
      throw new NotFoundException(`Empresa ${id} no encontrada`);
    }

    return empresa;
  }

  async update(
    id: number,
    updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    const empresa = await this.findOne(id);

    Object.assign(empresa, updateEmpresaDto);

    return this.empresaRepository.save(empresa);
  }

  async remove(id: number): Promise<void> {
    const empresa = await this.findOne(id);

    await this.empresaRepository.remove(empresa);
  }
}