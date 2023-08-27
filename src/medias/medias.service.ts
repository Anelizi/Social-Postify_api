import { ConflictException, Injectable } from '@nestjs/common';
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
      throw new ConflictException('registro com a mesma combinação de title e username já existe!');
    }
    return await this.repository.create(createMediaDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    return await this.repository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}
