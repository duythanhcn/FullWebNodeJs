import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './base-exception.filter';

export class HttpExceptionFilter implements ExceptionFilter {
  public httpStatus: HttpStatus;
  constructor(response: object | string, httpStatus: HttpStatus) {
    this.httpStatus = httpStatus;
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const error = {
      statusCode: this.httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: '',
    };

    console.log(error);
    new Logger('ExceptionFilter').error(error);

    response.status(this.httpStatus).json({
      error,
    });
  }
}
