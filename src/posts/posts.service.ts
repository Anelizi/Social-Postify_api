import { Injectable } from '@nestjs/common';
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
    return await `This action returns all posts`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} post`;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await `This action updates a #${id} post`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} post`;
  }
}
