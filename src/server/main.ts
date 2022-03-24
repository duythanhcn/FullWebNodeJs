import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from './vendors/pipes/validation.pipe';
import { Logger } from './common/logger/logger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
    cors: true,
  });
  // app.setGlobalPrefix('api');
  const options = new DocumentBuilder().setTitle('Rest API template').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.APP_PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    new Logger().debug(`Service started successfully at port ${port} in mode ${process.env.NODE_ENV}`);
  });
}

// tslint:disable-next-line: no-floating-promises
bootstrap();
