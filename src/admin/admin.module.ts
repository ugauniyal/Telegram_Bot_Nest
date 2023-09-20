import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { User } from 'src/typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],

})
export class AdminModule {}
