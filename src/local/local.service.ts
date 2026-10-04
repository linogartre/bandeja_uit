import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Local } from './entities/local.entity.js';
import { Padron } from './entities/padron.entity.js';
import { Empresa } from '../empresa/entities/empresa.entity.js';
import { CreateLocalDto } from './dto/create-local.dto.js';
import { UpdateLocalDto } from './dto/update-local.dto.js';
import { SuministroAgua } from './enums/suministro-agua.enum.js';
import { DisposicionEfluentes } from './enums/disposicion-efluentes.enum.js';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(Local)
    private readonly localRepository: Repository<Local>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(Padron)
    private readonly padronRepository: Repository<Padron>,
  ) {}

  async create(createLocalDto: CreateLocalDto): Promise<Local> {
    const empresa = await this.empresaRepository.findOne({
      where: {
        empresa_id: createLocalDto.empresa_id_actual,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        `No existe la empresa ${createLocalDto.empresa_id_actual}`,
      );
    }

    this.validarReglasEfluentes(createLocalDto);
    this.validarReglasSuministro(createLocalDto);

    const { padrones, ...datosLocal } = createLocalDto;

    const local = this.localRepository.create({
      ...datosLocal,
      empresa_actual: empresa,
    });

    const localGuardado = await this.localRepository.save(local);

    if (padrones) {
      const padronesEntity = padrones.map((padronDto) =>
        this.padronRepository.create({
          ...padronDto,
          local: localGuardado,
        }),
      );

      await this.padronRepository.save(padronesEntity);
    }

    return this.findOne(localGuardado.local_id);
  }

  async findAll(): Promise<Local[]> {
    return this.localRepository.find({
      relations: {
        empresa_actual: true,
      },
    });
  }

  async findOne(id: number): Promise<Local> {
    const local = await this.localRepository.findOne({
      where: {
        local_id: id,
      },
      relations: {
        empresa_actual: true,
      },
    });

    if (!local) {
      throw new NotFoundException(`No existe el local ${id}`);
    }

    return local;
  }

  async update(
    id: number,
    updateLocalDto: UpdateLocalDto,
  ): Promise<Local> {
    const localActual = await this.findOne(id);

    const datosFinales = {
      localidad:
        updateLocalDto.localidad !== undefined
          ? updateLocalDto.localidad
          : localActual.localidad,

      empresa_id_actual:
        updateLocalDto.empresa_id_actual !== undefined
          ? updateLocalDto.empresa_id_actual
          : localActual.empresa_actual.empresa_id,

      direccion:
        updateLocalDto.direccion !== undefined
          ? updateLocalDto.direccion
          : localActual.direccion,

      suministro_agua:
        updateLocalDto.suministro_agua !== undefined
          ? updateLocalDto.suministro_agua
          : localActual.suministro_agua,

      suministro_agua_otro:
        updateLocalDto.suministro_agua_otro !== undefined
          ? updateLocalDto.suministro_agua_otro
          : localActual.suministro_agua_otro,

      genera_efluentes:
        updateLocalDto.genera_efluentes !== undefined
          ? updateLocalDto.genera_efluentes
          : localActual.genera_efluentes,

      disposicion_efluentes:
        updateLocalDto.disposicion_efluentes !== undefined
          ? updateLocalDto.disposicion_efluentes
          : localActual.disposicion_efluentes,

      disposicion_efluentes_otro:
        updateLocalDto.disposicion_efluentes_otro !== undefined
          ? updateLocalDto.disposicion_efluentes_otro
          : localActual.disposicion_efluentes_otro,

      curso_agua_nombre:
        updateLocalDto.curso_agua_nombre !== undefined
          ? updateLocalDto.curso_agua_nombre
          : localActual.curso_agua_nombre,
    };

    this.validarReglasSuministro(datosFinales);
    this.validarReglasEfluentes(datosFinales);

    let empresa = localActual.empresa_actual;

    if (
      updateLocalDto.empresa_id_actual !== undefined &&
      updateLocalDto.empresa_id_actual !==
        localActual.empresa_actual.empresa_id
    ) {
      const nuevaEmpresa = await this.empresaRepository.findOne({
        where: {
          empresa_id: updateLocalDto.empresa_id_actual,
        },
      });

      if (!nuevaEmpresa) {
        throw new NotFoundException(
          `No existe la empresa ${updateLocalDto.empresa_id_actual}`,
        );
      }

      empresa = nuevaEmpresa;
    }

    Object.assign(localActual, {
      ...updateLocalDto,
      empresa_actual: empresa,
    });

    return this.localRepository.save(localActual);
  }

  async remove(id: number): Promise<void> {
    const local = await this.findOne(id);

    await this.localRepository.remove(local);
  }

  private validarReglasSuministro(local: {
    suministro_agua?: SuministroAgua | null;
    suministro_agua_otro?: string | null;
  }): void {
    if (
      local.suministro_agua === SuministroAgua.OTRA &&
      !local.suministro_agua_otro?.trim()
    ) {
      throw new BadRequestException(
        'Debe indicar cuál es el otro suministro de agua',
      );
    }

    if (
      local.suministro_agua !== SuministroAgua.OTRA &&
      local.suministro_agua_otro
    ) {
      throw new BadRequestException(
        'suministro_agua_otro solo puede informarse cuando el suministro es "otra"',
      );
    }
  }

  private validarReglasEfluentes(local: {
    genera_efluentes?: boolean | null;
    disposicion_efluentes?: DisposicionEfluentes | null;
    disposicion_efluentes_otro?: string | null;
    curso_agua_nombre?: string | null;
  }): void {
    if (local.genera_efluentes === true) {
      if (!local.disposicion_efluentes) {
        throw new BadRequestException(
          'Debe indicar la disposición de los efluentes',
        );
      }
    }

    if (local.genera_efluentes !== true) {
      if (
        local.disposicion_efluentes ||
        local.disposicion_efluentes_otro ||
        local.curso_agua_nombre
      ) {
        throw new BadRequestException(
          'No deben informarse datos de disposición de efluentes si el local no genera efluentes',
        );
      }

      return;
    }

    if (
      local.disposicion_efluentes ===
        DisposicionEfluentes.OTRO &&
      !local.disposicion_efluentes_otro?.trim()
    ) {
      throw new BadRequestException(
        'Debe indicar cuál es la otra disposición de efluentes',
      );
    }

    if (
      local.disposicion_efluentes !==
        DisposicionEfluentes.OTRO &&
      local.disposicion_efluentes_otro
    ) {
      throw new BadRequestException(
        'disposicion_efluentes_otro solo puede informarse cuando la disposición es "otro"',
      );
    }

    if (
      local.disposicion_efluentes ===
        DisposicionEfluentes.VERTIDO_CURSO_AGUA
    ) {
      if (!local.curso_agua_nombre?.trim()) {
        throw new BadRequestException(
          'Debe indicar el nombre del curso de agua',
        );
      }
    } else if (local.curso_agua_nombre) {
      throw new BadRequestException(
        'curso_agua_nombre solo puede informarse cuando la disposición es "vertido a curso de agua"',
      );
    }
  }
}