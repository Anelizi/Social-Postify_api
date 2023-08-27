import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post('/medias')
  async create(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediasService.create(createMediaDto);
  }

  @Get('/medias')
  async findAll() {
    return await this.mediasService.findAll();
  }

  @Get('/medias/:id')
  async findOne(@Param('id') id: string) {
    return await this.mediasService.findOne(+id);
  }

  @Put('/medias/:id')
  async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return await this.mediasService.update(+id, updateMediaDto);
  }
  
  @Delete('/medias/:id')
  async remove(@Param('id') id: string) {
    return await this.mediasService.remove(+id);
  }
}
