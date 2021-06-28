import { ObjectId } from 'mongoose';
import { Pzusuario } from './../../pzusuario/entities/pzusuario.entity';
export class Pztarea {
    _id: ObjectId;
    tarea: string;
    descripcion: string;
    estado: boolean;
    pzUsuario: Pzusuario
}
