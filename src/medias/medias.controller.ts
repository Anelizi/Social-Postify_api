import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpCode } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import * as httpStatus from 'http-status';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediasService.create(createMediaDto);
  }

  @Get()
  async findAll() {
    return await this.mediasService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.mediasService.findOne(+id);
  }

  @Put('/:id')
  @HttpCode(httpStatus.NO_CONTENT)
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return await this.mediasService.update(+id, updateMediaDto);
  }
  
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.mediasService.remove(+id);
  }
}
