import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HijoService } from './hijo.service';
import { CreateHijoDto } from './dto/create-hijo.dto';
import { UpdateHijoDto } from './dto/update-hijo.dto';

@Controller('hijo')
export class HijoController {
  constructor(private readonly hijoService: HijoService) {}

  @Post()
  create(@Body() createHijoDto: CreateHijoDto) {
    return this.hijoService.create(createHijoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHijoDto: UpdateHijoDto) {
    return this.hijoService.update(+id, updateHijoDto);
  }
/* 
  @Get()
  findAll() {
    return this.hijoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hijoService.findOne(+id);
  } */

 

/*   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hijoService.remove(+id);
  } */
}
