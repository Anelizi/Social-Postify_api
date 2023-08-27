import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post('/medias')
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.create(createMediaDto);
  }

  @Get('/medias')
  findAll() {
    return this.mediasService.findAll();
  }

  @Get('/medias/:id')
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(+id);
  }

  @Put('/medias/:id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.update(+id, updateMediaDto);
  }
  
  @Delete('/medias/:id')
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}
