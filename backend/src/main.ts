import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 4000
  app.enableCors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true,
  });
  console.log(`servidor corriendo en : http://localhost:${port}, entra en: http://localhost:${port}/graphql`)
  await app.listen(port);
}
void bootstrap();
