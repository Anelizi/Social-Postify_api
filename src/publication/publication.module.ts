import { Module, forwardRef } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { MediasRepository } from 'src/medias/medias.repository';
import { PostsModule } from 'src/posts/posts.module';
import { MediasModule } from 'src/medias/medias.module';

@Module({
  imports: [forwardRef(() => PostsModule), forwardRef(() => MediasModule)],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository, PostsRepository, MediasRepository],
  exports: [PublicationService],
})
export class PublicationModule {}
