import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PublicationRepository } from 'src/publication/publication.repository';
import { PublicationModule } from 'src/publication/publication.module';

@Module({
  imports: [forwardRef(() => PublicationModule)],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PublicationRepository],
  exports: [PostsService]
})
export class PostsModule {}
