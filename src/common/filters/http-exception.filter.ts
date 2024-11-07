// src/common/filters/http-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.error('Error occurred:', exceptionResponse);

    response.status(status).json({
      statusCode: status,
      message: exceptionResponse['message'] || 'Something went wrong!',
      error: exceptionResponse['error'] || 'Internal Server Error',
    });
  }
}
