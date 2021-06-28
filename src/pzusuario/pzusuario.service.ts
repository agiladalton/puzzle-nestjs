import { PzUsuario, PzUsuarioDocument } from './pzusuario.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePzusuarioDto } from './dto/create-pzusuario.dto';
import { UpdatePzusuarioDto } from './dto/update-pzusuario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PzResult } from './entities/pzusuario.entity';
import * as jwt from 'jsonwebtoken';
const BCRYPT_HASH_ROUND = 10;

@Injectable()
export class PzusuarioService {

  constructor(
    @InjectModel(PzUsuario.name) private PzUsuarioModel: Model<PzUsuarioDocument>,
  ) { }

  async obtenerPorUsuario(usuario: string): Promise<PzUsuario> {
    const jsonQueryCs = { $regex: usuario, $options: 'i' };

    return await this.PzUsuarioModel.findOne({ usuario: jsonQueryCs });
  }

  async autenticar(createPzusuarioDto: CreatePzusuarioDto): Promise<PzResult> {
    const pzUsuario = await this.obtenerPorUsuario(createPzusuarioDto.usuario);

    if (pzUsuario && await pzUsuario.compararClave(createPzusuarioDto.clave)) {
      return new PzResult({ success: true, message: 'Proceso realizado correctamente.', pzUsuario: await this.PzUsuarioModel.findByIdAndUpdate(pzUsuario._id, { token: this.crearToken(pzUsuario) }, { returnOriginal: false }) });
    }
    return new PzResult({ success: false, message: 'Credenciales de acceso incorrectas.' });
  }

  async renovarToken(payload: PzUsuario): Promise<PzResult> {
    const pzUsuario = await this.PzUsuarioModel.findOne({ _id: payload._id, token: payload.token });
    if (pzUsuario) {
      return new PzResult({ success: true, message: 'Proceso realizado correctamente.', pzUsuario: await this.PzUsuarioModel.findByIdAndUpdate(pzUsuario._id, { token: this.crearToken(pzUsuario) }, { returnOriginal: false }) });
    }
    return new PzResult({ success: false, message: 'Credenciales de renovación incorrectas.' });
  }

  async create(createPzusuarioDto: CreatePzusuarioDto): Promise<PzResult> {
    const createdPzUsuario = new this.PzUsuarioModel(createPzusuarioDto);
    try {
      return new PzResult({ success: true, message: 'Proceso realizado correctamente.', pzUsuario: await createdPzUsuario.save() });
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpException('Ya existe un registro definido como ' + err.keyValue[Object.keys(err.keyValue)[0]] + '.', HttpStatus.CONFLICT);
      }
    }
  }

  crearToken({ _id, usuario }: PzUsuario) {
    return jwt.sign({ _id, usuario }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
    });
  }
}
