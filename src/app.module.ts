import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from './admin/admin.module';

@Module({

  imports: [TelegramModule, AuthModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'google_oauth2_app',
    entities: [User],
    synchronize: true
    }),
    PassportModule.register({ session: true }),
    AdminModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
