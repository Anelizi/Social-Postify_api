import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository) {}

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
    const mediaExist = await this.repository.mediaWithTitleName(
      title,
      username,
    );

    if (!media) {
      throw new NotFoundException(
        'Mídia não encontrada, não foi possivel atualizar mídia!',
      );
    }

    if (mediaExist) {
      throw new ConflictException('Essa mídia já existe!');
    }

    return await this.repository.update(id, { title, username });
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}
