import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type PzTareaDocument = PzTarea & Document;

@Schema({ collection: 'pz_tarea' })
export class PzTarea {
  @Prop({ type: mongoose.Schema.Types.ObjectId, default: Types.ObjectId, required: true })
  _id: ObjectId;
  @Prop({ type: String, trim: true, required: true, unique: true, minlength: 2, maxlength: 45 })
  tarea: string;
  @Prop({ type: String, trim: true, required: true, maxlength: 500 })
  descripcion: string;
  @Prop({ type: Boolean })
  estado: boolean; // false: no completada | true: completada
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PzTarea' })
  pzUsuario: ObjectId;
}

export const PzTareaSchema = SchemaFactory.createForClass(PzTarea);