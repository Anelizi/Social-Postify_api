import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publication.repository';
import { MediasRepository } from 'src/medias/medias.repository';
import { PostsRepository } from 'src/posts/posts.repository';

@Injectable()
export class PublicationService {
  constructor(
    private readonly repository: PublicationRepository,
    private readonly repositoryMedia: MediasRepository,
    private readonly repositoryPost: PostsRepository,
  ) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const { mediaId, postId } = createPublicationDto;
    const [mediaPublication, postPublication] = await Promise.all([
      this.repositoryMedia.findOne(mediaId),
      this.repositoryPost.findOne(postId),
    ]);

    if(!mediaPublication || !postPublication){
      throw new NotFoundException()
    }

    return await this.repository.create(createPublicationDto);
  }

  async findAll() {
    return `This action returns all publication`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  async remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
