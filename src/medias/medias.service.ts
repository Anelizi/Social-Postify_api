import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { PublicationRepository } from 'src/publication/publication.repository';

@Injectable()
export class MediasService {
  constructor(
      private readonly repository: MediasRepository,
      private readonly repositoryPublication: PublicationRepository
    ) {}

  async create(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;
    const media = await this.repository.mediaWithTitleName(title, username);

    if (media) {
      throw new ConflictException(
        'registro com a mesma combinação de title e username já existe!',
      );
    }
    return await this.repository.create(createMediaDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const media = await this.repository.findOne(id);

    if (!media) {
      throw new NotFoundException('Midia não encontrada!');
    }

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const { title, username } = updateMediaDto;
    const media = await this.repository.findOne(id);
    const mediaExist = await this.repository.mediaWithTitleName(title, username);

    if (!media) {
      throw new NotFoundException('Midia não encontrada!');
    }

    if (mediaExist) {
      throw new ConflictException(
        'registro com a mesma combinação de title e username já existe!',
      );
    }

    return await this.repository.update(id, { title, username });
  }

  async remove(id: number) {
    const media = await this.repository.findOne(id);
    const publication = await this.repositoryPublication.publicationByMedeaId(media.id);

    if (!media) {
      throw new NotFoundException('Midia não encontrada!');
    }

    if(publication > 0){
      throw new ForbiddenException('Esta mídia está vinculada a uma publicação!')
    }
    
    return await this.repository.remove(id);
  }
}
