export interface ApiControllerResponse<T> {
  data: T;
  message?: string;
}
