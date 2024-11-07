import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('My API documentation')
      .setVersion('1.0')
      .addTag('API')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    app.useGlobalFilters(new HttpExceptionFilter());


    await app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

start();
