export interface ApiResponseOptions<T> {
  statusCode: number;
  message: string;
  error?: string;
  data?: T;
  path?: string;
  method?: string;
}

export class ApiResponseDto<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  data?: T;
  message: string;
  error?: string;

  constructor(options: ApiResponseOptions<T>) {
    const {
      statusCode,
      message,
      error,
      data,
      path = '',
      method = '',
    } = options;

    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.data = data;
    this.timestamp = new Date().toISOString();
    this.path = path;
    this.method = method;
  }
}
