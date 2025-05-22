import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the frontend
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite dev server default
      'http://localhost:3001', // Alternative
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(process.env.API_ADMIN_PORT || 3001);
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
