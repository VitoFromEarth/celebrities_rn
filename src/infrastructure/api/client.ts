import Config from 'react-native-config';
import {composeURLWithQueryParams} from './helpers.ts';

export interface IResponse<T> {
  errorMessage?: string;
  data?: T | null;
}

interface IErrorResponse {
  message: string;
}

const DEFAULT_QUERY_PARAMS: Record<string, string> = {
  api_key: Config.API_KEY || '',
};

export const action = async <T>(
  url: string,
  init?: RequestInit,
  queryParams?: Record<string, string | number>,
): Promise<IResponse<T>> => {
  const composedQueryParams = queryParams
    ? {...DEFAULT_QUERY_PARAMS, ...queryParams}
    : DEFAULT_QUERY_PARAMS;
  const composedUrl = composeURLWithQueryParams(
    `${Config.BASE_URL}/${url}`,
    composedQueryParams,
  );

  try {
    const response: Response = await fetch(composedUrl, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });

    if (!response.ok) {
      const responseData: IErrorResponse = await response.json();
      return {
        errorMessage: responseData.message,
      };
    }

    const responseData: T = await response.json();

    return {
      data: responseData,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        data: null,
        errorMessage: error.message,
      };
    }

    return {
      errorMessage: 'Internal server error',
    };
  }
};

async function get<T>(
  url: string,
  init?: RequestInit,
  queryParams?: Record<string, string | number>,
): Promise<IResponse<T>> {
  return await action<T>(url, {...init, method: 'GET'}, queryParams);
}

async function post<T>(url: string, init?: RequestInit): Promise<IResponse<T>> {
  return await action<T>(url, {...init, method: 'POST'});
}

async function put<T>(url: string, init?: RequestInit): Promise<IResponse<T>> {
  return await action<T>(url, {...init, method: 'PUT'});
}

async function del<T>(url: string, init?: RequestInit): Promise<IResponse<T>> {
  return await action<T>(url, {...init, method: 'DELETE'});
}

export const api = {
  get,
  post,
  put,
  del,
};
