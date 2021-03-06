import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { UsersModule } from '../users/users.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [SequelizeModule.forFeature([Comment]), UsersModule, LikesModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
