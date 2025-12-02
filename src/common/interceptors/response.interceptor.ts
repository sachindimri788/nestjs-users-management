import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ApiResponseDto } from '../dtos/api-response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<unknown>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const { method, url } = request;

    return next.handle().pipe(
      map((data) => {
        // If the controller already returns ApiResponseDto, add metadata and return
        if (data instanceof ApiResponseDto) {
          data.path = url;
          data.method = method;
          return data;
        }

        let responseData = data;
        let message = 'Request successful';

        // Extract data/message from controller response object
        if (data && typeof data === 'object') {
          const responseObj = data as Record<string, unknown>;
          if ('data' in responseObj) {
            responseData = responseObj.data;
          }
          if ('message' in responseObj) {
            message = responseObj.message as string;
          }
        }

        return new ApiResponseDto({
          statusCode: response.statusCode,
          message,
          data: responseData,
          path: url,
          method,
        });
      }),
    );
  }
}
