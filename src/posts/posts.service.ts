import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    return await this.repository.create(createPostDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const post = await this.repository.findOne(id);

    if(!post){
      throw new NotFoundException('Post não encontrado!')
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.repository.findOne(id);
    
    if(!post){
      throw new NotFoundException('Post não encontrado!')
    }
    return await this.repository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await `This action removes a #${id} post`;
  }
}
