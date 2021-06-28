import { ObjectId } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePztareaDto } from './create-pztarea.dto';

export class UpdatePztareaDto extends PartialType(CreatePztareaDto) {
    id: ObjectId;
}
