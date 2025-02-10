import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { IdiomasService } from './idiomas.service';
import { CreateIdiomaDto } from './dto/create-idioma.dto'; 
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('idiomas')
export class IdiomasController {
  constructor(private readonly idiomasService: IdiomasService) {}

  @ApiOperation({
    summary: 'Obtiene todos los idiomas'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @Get()
  async findAll(@Res() res: Response) { 
    const data = await  this.idiomasService.findAll(); 

    return res.status(HttpStatus.OK).json({
      data,
      message: `Se obtuvieron ${data.length} idiomas`,
      status: 200
    })
  }

/*   @Post()
  create(@Body() createIdiomaDto: CreateIdiomaDto) {
    return this.idiomasService.create(createIdiomaDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdiomaDto: UpdateIdiomaDto) {
    return this.idiomasService.update(+id, updateIdiomaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idiomasService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idiomasService.remove(+id);
  } */
}
