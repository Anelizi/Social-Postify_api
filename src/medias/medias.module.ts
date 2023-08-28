import { Module, forwardRef } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { MediasRepository } from './medias.repository';
import { PublicationModule } from 'src/publication/publication.module';
import { PublicationRepository } from 'src/publication/publication.repository';

@Module({
  imports: [forwardRef(() => PublicationModule)],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository, PublicationRepository],
  exports: [MediasService]
})
export class MediasModule {}
