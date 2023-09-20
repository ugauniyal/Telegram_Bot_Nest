import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join } from 'path';
import * as exphbs from 'express-handlebars';
import { handlebarsConfig } from './admin/handlebars.config';
import {resolve } from 'path';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.engine('hbs', exphbs.engine(handlebarsConfig));
  app.setViewEngine('hbs');

  // Set the views directory
  const viewsDir = join(__dirname, '..', handlebarsConfig.defaultLayout === 'main' ? '' : 'views');

  // Set the views directory
  app.set(viewsDir);

  app.use(session({
    secret: 'sahdkujanfahjsvckllmahacjadsnbiht',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000,
    },
  }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();

