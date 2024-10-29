export interface RequestOptions<T = undefined> {
  url: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: T;
}

export interface HttpResponse<T> {
  data: T;
  status?: number;
  statusMessage?: string;
  headers: Record<string, any>;
}

export interface HttpClient {
  get<R>(parameters: RequestOptions): Promise<HttpResponse<R>>;
  post<R, B>(parameters: RequestOptions<B>): Promise<HttpResponse<R>>;
  put<R, B>(parameters: RequestOptions<B>): Promise<HttpResponse<R>>;
  delete<R, B>(parameters: RequestOptions<B>): Promise<HttpResponse<R>>;
}
