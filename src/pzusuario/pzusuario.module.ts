import { PzUsuario, PzUsuarioSchema } from './pzusuario.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PzusuarioService } from './pzusuario.service';
import { PzusuarioController } from './pzusuario.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PzUsuario.name, schema: PzUsuarioSchema }]),
  ],
  controllers: [PzusuarioController],
  providers: [PzusuarioService]
})
export class PzusuarioModule {}
