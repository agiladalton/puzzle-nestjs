import { AuthGuard } from './../pzusuario/pzusuario.guard';
import { ObjectId } from 'mongoose';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PztareaService } from './pztarea.service';
import { CreatePztareaDto } from './dto/create-pztarea.dto';
import { UpdatePztareaDto } from './dto/update-pztarea.dto';

@Controller('pztarea')
export class PztareaController {
  constructor(private readonly pztareaService: PztareaService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPztareaDto: CreatePztareaDto) {
    return this.pztareaService.create(createPztareaDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  porUsuario(@Param('id') id: ObjectId) {
    return this.pztareaService.porUsuario(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: ObjectId, @Body() updatePztareaDto: UpdatePztareaDto) {
    return this.pztareaService.update(id, updatePztareaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: ObjectId) {
    return this.pztareaService.remove(id);
  }
}
