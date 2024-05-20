import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Niyo')
    .setDescription("The Niyo Task Manager App")
    .setVersion('0.1')
    .addTag('tasks')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
