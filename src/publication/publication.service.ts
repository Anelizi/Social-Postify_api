import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publication.repository';
import { MediasRepository } from 'src/medias/medias.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import * as dayjs from 'dayjs';

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

    if (!mediaPublication || !postPublication) {
      throw new NotFoundException('Registros não encontrados');
    }

    return await this.repository.create(createPublicationDto);
  }

  async findAll(published: boolean | null, after: string | null) {
    return await this.repository.findAll(published, after);
  }

  async findOne(id: number) {
    const publication = await this.repository.findOne(id);

    if (!publication) {
      throw new NotFoundException('Publicação não existe!');
    }

    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const { mediaId, postId, date } = updatePublicationDto;
    const publication = await this.repository.findOne(id);
    const [mediaPublication, postPublication] = await Promise.all([
      this.repositoryMedia.findOne(mediaId),
      this.repositoryPost.findOne(postId),
    ]);
    const newDate = new Date(Date.now());
    const dateupdate = dayjs(newDate).isAfter(publication.date);

    if (!publication) {
      throw new NotFoundException('Publicação não existe!');
    }

    if (!mediaPublication || !postPublication) {
      throw new NotFoundException('Registros não encontrados');
    }

    if (dateupdate) {
      throw new ForbiddenException('não é possível atualizar a data!');
    }

    return await this.repository.update(id, { mediaId, postId, date });
  }

  async remove(id: number) {
    const publication = await this.repository.findOne(id);

    if(!publication){
      throw new NotFoundException('Publicação não existe!');
    }

    return await this.repository.remove(id);
  }
}
