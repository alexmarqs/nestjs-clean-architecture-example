import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exception-filter';
import helmet from 'helmet';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaConsumerService } from './infra/messaging/kafka/kafka-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.use(helmet());
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('Notifications REST API...')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const kafkaConsumerService = app.get(KafkaConsumerService);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
