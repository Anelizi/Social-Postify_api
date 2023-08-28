import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createPublicationDto: CreatePublicationDto) {
    return this.prisma.publication.create({
      data: createPublicationDto,
    });
  }

  findAll(published: boolean | null, after: string | null) {
    const date = new Date();

    return this.prisma.publication.findMany({
      where: {
        date: {
          lt: published ? date : undefined,
        },
        AND: {
          date: {
            gte: after ? new Date(after) : undefined,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.publication.findFirst({
      where: { id },
    });
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.prisma.publication.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  remove(id: number) {
    return this.prisma.publication.delete({
      where: { id },
    });
  }

  publicationByMedeaId(mediaId: number) {
    return this.prisma.publication.count({
      where: { mediaId },
    });
  }
}
