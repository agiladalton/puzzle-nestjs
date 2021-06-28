import { ObjectId } from 'mongoose';
import { Pztarea } from './../../pztarea/entities/pztarea.entity';
export class Pzusuario {
    _id: ObjectId;
    usuario: string;
    token: string;
}

export class PzResult {
    private readonly success: boolean
    private readonly message: string
    private readonly pzUsuario?: Pzusuario
    private readonly pzTarea?: Pztarea
  
    constructor(param: { success: boolean, message: string, pzUsuario?: any, pzTarea?: any }) {
      this.success = param.success
      this.message = param.message
      this.pzUsuario = param.pzUsuario
      this.pzTarea = param.pzTarea
    }
  
  }