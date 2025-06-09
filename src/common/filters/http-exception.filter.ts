import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        const resObj = res as any;

        message = resObj.message || message;

        if (Array.isArray(resObj.message)) {
          errors = resObj.message.map((msg: string) => {
            const match = msg.match(/^(.+?)\s/); 
            return {
              field: match ? match[1] : null,
              message: msg,
            };
          });

          message = 'Validation failed';
        }
      }
    }

    response.status(status).json({
      success: false,
      message,
      errors,
    });
  }
}
