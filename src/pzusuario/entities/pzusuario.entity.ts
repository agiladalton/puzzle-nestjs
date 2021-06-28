import { PzUsuario } from './../pzusuario.schema';
export class Pzusuario {
    usuario: string;
    token: string;
}

export class PzResult {
    private readonly success: boolean
    private readonly message: string
    private readonly pzUsuario?: PzUsuario
  
    constructor(param: { success: boolean, message: string, pzUsuario?: any }) {
      this.success = param.success
      this.message = param.message
      this.pzUsuario = param.pzUsuario
    }
  
  }