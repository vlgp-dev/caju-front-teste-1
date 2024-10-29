import axios, { type AxiosInstance } from "axios";

import {
  type HttpClient,
  type HttpResponse,
  type RequestOptions,
} from "~/interfaces/httpClient";

export class AxiosHttpClient implements HttpClient {
  instance: AxiosInstance;

  constructor(private readonly baseUrl?: string) {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Accept: "application/json",
      },
    });
  }

  async get<R>(parameters: RequestOptions): Promise<HttpResponse<R>> {
    const response = await this.instance.request<R>({
      ...parameters,
      method: "GET",
      params: parameters.queryParams,
    });

    return {
      data: response.data,
      status: response.status,
      statusMessage: response.statusText,
      headers: response.headers,
    };
  }

  async post<R, B>(parameters: RequestOptions<B>): Promise<HttpResponse<R>> {
    const response = await this.instance.request<R>({
      ...parameters,
      method: "POST",
      data: parameters.body,
      params: parameters.queryParams,
    });

    return {
      data: response.data,
      status: response.status,
      statusMessage: response.statusText,
      headers: response.headers,
    };
  }

  async put<R, B>(parameters: RequestOptions<B>): Promise<HttpResponse<R>> {
    const response = await this.instance.request<R>({
      ...parameters,
      method: "PUT",
      data: parameters.body,
      params: parameters.queryParams,
    });

    return {
      data: response.data,
      status: response.status,
      statusMessage: response.statusText,
      headers: response.headers,
    };
  }

  async delete<R, B>(parameters: RequestOptions<B>): Promise<HttpResponse<R>> {
    const response = await this.instance.request<R>({
      ...parameters,
      method: "DELETE",
      data: parameters.body,
      params: parameters.queryParams,
    });

    return {
      data: response.data,
      status: response.status,
      statusMessage: response.statusText,
      headers: response.headers,
    };
  }
}
