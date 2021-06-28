import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp().getRequest();
        if (!ctx.headers.authorization) {
            return false;
        }
        ctx.payload = this.validarToken(ctx.headers.authorization);
        return true;
    }

    validarToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new UnauthorizedException('Token invalido');
        }
        const token = auth.split(' ')[1];
        try {
            return Object.assign(jwt.verify(token, process.env.JWT_SECRET), { token });
        } catch (err) {
            throw new UnauthorizedException('Token invalido');
        }
    }
}