import axios from "axios";

import { AxiosHttpClient } from "./axiosHttpClient";

jest.mock("axios");

const baseUrl = "http://example.com";

const mockedAxiosResponse = {
  data: {},
  status: 200,
  statusText: "OK",
  headers: {},
};

const mockAxiosInstance = {
  request: jest.fn().mockResolvedValue(mockedAxiosResponse),
};

describe("AxiosHttpClient", () => {
  it("should initialize axios instance with correct base URL and headers", () => {
    const baseUrl = "http://example.com";
    const mockAxiosInstance = {
      defaults: {
        baseURL: "",
        headers: {
          common: {},
        },
      },
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const httpClient = new AxiosHttpClient(baseUrl);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseUrl,
      headers: {
        Accept: "application/json",
      },
    });

    expect(httpClient.instance).toBe(mockAxiosInstance);
  });

  it("should adapt queryParams to params in get method", async () => {
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const httpClient = new AxiosHttpClient(baseUrl);
    const parameters: Parameters<typeof httpClient.get>[0] = {
      url: "/test",
      queryParams: { q: "search" },
    };

    const response = await httpClient.get(parameters);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith({
      ...parameters,
      method: "GET",
      params: parameters.queryParams,
    });
    expect(response).toEqual({
      data: {},
      status: 200,
      statusMessage: "OK",
      headers: {},
    });
  });

  it("should adapt queryParams to params and body to data in post method", async () => {
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const httpClient = new AxiosHttpClient(baseUrl);
    const parameters = {
      url: "/test",
      queryParams: { q: "search" },
      body: { key: "value" },
    };

    const response = await httpClient.post(parameters);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith({
      ...parameters,
      method: "POST",
      data: parameters.body,
      params: parameters.queryParams,
    });
    expect(response).toEqual({
      data: {},
      status: 200,
      statusMessage: "OK",
      headers: {},
    });
  });

  it("should adapt queryParams to params and body to data in put method", async () => {
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const httpClient = new AxiosHttpClient(baseUrl);
    const parameters = {
      url: "/test",
      queryParams: { q: "search" },
      body: { key: "value" },
    };

    const response = await httpClient.put(parameters);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith({
      ...parameters,
      method: "PUT",
      data: parameters.body,
      params: parameters.queryParams,
    });
    expect(response).toEqual({
      data: {},
      status: 200,
      statusMessage: "OK",
      headers: {},
    });
  });

  it("should adapt queryParams to params and body to data in delete method", async () => {
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const httpClient = new AxiosHttpClient(baseUrl);
    const parameters = {
      url: "/test",
      queryParams: { q: "search" },
      body: { key: "value" },
    };

    const response = await httpClient.delete(parameters);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith({
      ...parameters,
      method: "DELETE",
      data: parameters.body,
      params: parameters.queryParams,
    });
    expect(response).toEqual({
      data: {},
      status: 200,
      statusMessage: "OK",
      headers: {},
    });
  });
});
