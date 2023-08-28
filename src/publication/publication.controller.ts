import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, Query, ParseIntPipe } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import * as httpStatus from 'http-status';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    return await this.publicationService.create(createPublicationDto);
  }

  @Get()
  async findAll(@Query('published') published: boolean | null, @Query('after') after: string | null,) {
    return await this.publicationService.findAll(published, after);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.publicationService.findOne(+id);
  }

  @Put('/:id')
  @HttpCode(httpStatus.NO_CONTENT)
  async update(@Param('id', ParseIntPipe) id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return await this.publicationService.update(+id, updatePublicationDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.publicationService.remove(+id);
  }
}
