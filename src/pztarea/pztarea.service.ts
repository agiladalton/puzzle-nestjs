import { PzTarea, PzTareaDocument } from './pztarea.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PzResult } from './../pzusuario/entities/pzusuario.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePztareaDto } from './dto/create-pztarea.dto';
import { UpdatePztareaDto } from './dto/update-pztarea.dto';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class PztareaService {

  constructor(
    @InjectModel(PzTarea.name) private PzTareaModel: Model<PzTareaDocument>,
  ) { }

  async create(createPztareaDto: CreatePztareaDto): Promise<PzResult> {
    const createdPzTarea = new this.PzTareaModel(createPztareaDto);
    try {
      return new PzResult({ success: true, message: 'Proceso realizado correctamente.', pzTarea: await createdPzTarea.save() });
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpException('Ya existe un registro definido como ' + err.keyValue[Object.keys(err.keyValue)[0]] + '.', HttpStatus.CONFLICT);
      }
    }
  }

  async findOne(id: ObjectId): Promise<PzTarea> {
    return await this.PzTareaModel.findById(id);
  }

  async porUsuario(pzUsuario: ObjectId): Promise<PzTarea[]> {
    return this.PzTareaModel.find({ pzUsuario: pzUsuario }).exec();
  }

  async update(id: ObjectId, updatePztareaDto: UpdatePztareaDto): Promise<PzResult> {
    const pzTarea = await this.findOne(id);

    if (pzTarea) {
      // Se valida que el objeto actualizar tenga por lo menos un campo diferente al ID
      if (Object.keys(updatePztareaDto).length > 1) {
        try {
          return new PzResult({ success: true, message: 'Proceso realizado correctamente.', pzTarea: await this.PzTareaModel.findByIdAndUpdate(id, updatePztareaDto, { returnOriginal: false }) });
        } catch (err) {
          if (err.code === 11000) {
            throw new HttpException('Ya existe un registro definido como ' + err.keyValue[Object.keys(err.keyValue)[0]] + '.', HttpStatus.CONFLICT);
          }
        }
      }

      return new PzResult({ success: true, message: 'Proceso realizado correctamente.', pzTarea });
    }
    return new PzResult({ success: false, message: 'El registro no existe.' });
  }

  async remove(id: ObjectId): Promise<PzResult> {
    await this.PzTareaModel.deleteOne({ _id: id });
    return new PzResult({ success: true, message: 'Proceso realizado correctamente' });
  }
}
