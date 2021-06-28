import { PzTarea, PzTareaSchema } from './pztarea.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PztareaService } from './pztarea.service';
import { PztareaController } from './pztarea.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PzTarea.name, schema: PzTareaSchema }]),
  ],
  controllers: [PztareaController],
  providers: [PztareaService]
})
export class PztareaModule {}
