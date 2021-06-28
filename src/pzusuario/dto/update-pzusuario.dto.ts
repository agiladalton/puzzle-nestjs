import { PartialType } from '@nestjs/mapped-types';
import { CreatePzusuarioDto } from './create-pzusuario.dto';

export class UpdatePzusuarioDto extends PartialType(CreatePzusuarioDto) {}
