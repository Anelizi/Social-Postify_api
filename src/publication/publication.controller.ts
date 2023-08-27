import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('/publications')
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto);
  }

  @Get('/publications')
  findAll() {
    return this.publicationService.findAll();
  }

  @Get('/publications/:id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @Put('/publications/:id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @Delete('/publications/:id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
