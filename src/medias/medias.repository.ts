import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createMediaDto: CreateMediaDto) {
    return this.prisma.media.create({
      data: {
        title: createMediaDto.title,
        username: createMediaDto.username,
      },
    });
  }

  mediaWithTitleName(title: string, username: string) {
    return this.prisma.media.findFirst({
      where: {
        title,
        AND: {
          username,
        },
      },
    });
  }

  findAll() {
    return this.prisma.media.findMany();
  }

  findOne(id: number) {
    return this.prisma.media.findFirst({
      where: { id },
    });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.prisma.media.update({
      where: { id },
      data: updateMediaDto,
    });
  }

  remove(id: number) {
    return this.prisma.media.delete({
      where: {
        id,
        AND: {
          NOT: {
            Publication: { some: {} },
          },
        },
      },
    });
  }
}
