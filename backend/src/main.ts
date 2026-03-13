import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 4000
  console.log(`servidor corriendo en : http://localhost:${port}, entra en: http://localhost:${port}/graphql`)
  await app.listen(port);
}
void bootstrap();
