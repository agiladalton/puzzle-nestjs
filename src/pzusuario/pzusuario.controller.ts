import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PzusuarioService } from './pzusuario.service';
import { CreatePzusuarioDto } from './dto/create-pzusuario.dto';
import { UpdatePzusuarioDto } from './dto/update-pzusuario.dto';

@Controller('pzusuario')
export class PzusuarioController {
  constructor(private readonly pzusuarioService: PzusuarioService) {}

  @Post()
  create(@Body() createPzusuarioDto: CreatePzusuarioDto) {
    return this.pzusuarioService.create(createPzusuarioDto);
  }

  @Post('autenticar')
  autenticar(@Body() createPzusuarioDto: CreatePzusuarioDto) {
    return this.pzusuarioService.autenticar(createPzusuarioDto);
  }
  
}
