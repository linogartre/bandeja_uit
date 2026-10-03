import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Local } from './entities/local.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Padron } from './entities/padron.entity';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Local,
      Empresa,
      Padron,
    ]),
  ],
  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule {}