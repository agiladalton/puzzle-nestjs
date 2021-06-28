import { ObjectId } from 'mongoose';
export class CreatePztareaDto {
    tarea: string;
    descripcion: string;
    estado: boolean;
    pzUsuario: ObjectId
}
