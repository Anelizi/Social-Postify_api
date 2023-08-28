import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as httpStatus from 'http-status';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.postsService.findOne(+id);
  }

  @Put('/:id')
  @HttpCode(httpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postsService.update(+id, updatePostDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(+id);
  }
}
