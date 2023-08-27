import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/posts')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('/posts')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/posts/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put('/posts/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete('/posts/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
