import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const BCRYPT_HASH_ROUND = 10;

export type PzUsuarioDocument = PzUsuario & Document;

@Schema({ collection: 'pz_usuario' })
export class PzUsuario {
  @Prop({ type: mongoose.Schema.Types.ObjectId, default: Types.ObjectId, required: true })
  _id: ObjectId;
  @Prop({ type: String, trim: true, required: true, unique: true, minlength: 2, maxlength: 45 })
  usuario: string;
  @Prop({ type: String, trim: true, required: true, minlength: 6, maxlength: 45 })
  clave: string;
  @Prop({ type: String })
  token?: string;

  compararClave: Function
}

export const PzUsuarioSchema = SchemaFactory.createForClass(PzUsuario);

//Encryting Passwords before Saving
PzUsuarioSchema.pre('save', async function (next) {
  this.set('clave', await bcrypt.hash(this.get('clave'), BCRYPT_HASH_ROUND));
});

PzUsuarioSchema.methods.compararClave = async function (clave: string): Promise<boolean> {
  return await bcrypt.compare(clave, this.get('clave'));
}