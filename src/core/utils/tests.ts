import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BackendClient } from "@api/client/BackendClient";
import DTO from "@typing/http/DTO";
type HTTPVerbs = "get" | "post" | "put" | "delete" | "patch";

/**
 * Options for mocking an axios HTTP request while using _interceptRequest_ function.
 *
 * @param method the HTTP method of the request to be mocked
 * @param statusCode the HTTP status code you want to be returned. It's 200 by default
 * @param body the response body you want
 * @param error the error you want to return on the response - if defined, the return will the a Promise with rejection
 */
interface RequestInterceptionOption {
  method: HTTPVerbs;
  statusCode?: number;
  body?: DTO | DTO[];
  error?: Error | AxiosError;
}

const DEFAULT_STATUS_CODE = 200;

/**
 * Mocks once call of the next axios client HTTP request based on the type of the HTTP Method (get, post, put, patch or
 * delete). Behind of the scenes, it implements jest.spyOn on an axios HTTP client.
 *
 * @param {RequestInterceptionOption} options options with attributes that you want to return in the next call
 * @param {AxiosInstance} client axios instance you want to mock
 * @example
 * interceptRequest({ method: 'get', body: { 'name': 'Mary Jane' } })
 * @returns Promise.resolve({ status: 200, data: { 'name': 'Mary Jane' } })
 * @example
 * interceptRequest({ method: 'post', statusCode: 201})
 * @returns Promise.resolve({ status: 200, data: undefined })
 * @example
 * interceptRequest({ method: 'post', statusCode: 404, error: new Error('resource not found')})
 * @returns Promise.reject({ response: { status: 404, data: undefined }, error: AxiosError({ message: 'resource not found' })})
 */
function interceptRequest(
  options: RequestInterceptionOption,
  client: AxiosInstance = BackendClient
) {
  const clientSpy: jest.SpyInstance = jest.spyOn(client, options.method);
  clientSpy.mockImplementationOnce(() => {
    const { statusCode = DEFAULT_STATUS_CODE, body = {}, error } = options;
    const response = { status: statusCode, data: body } as AxiosResponse;
    if (error) {
      return Promise.reject(
        new AxiosError(
          error.message,
          statusCode?.toString(),
          undefined,
          response
        )
      );
    }
    return Promise.resolve(response);
  });
}

export { interceptRequest };
export type { RequestInterceptionOption };
