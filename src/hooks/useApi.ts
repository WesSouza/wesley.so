import ky from 'ky';
import { useEffect, useState } from 'react';

import { Async } from '~/src/constants/CommonTypes';

export function useApiRead<T extends object, U = unknown>(
  path: string,
  {
    data: requestData,
    onError,
    query,
  }: {
    data?: U;
    onError?: (error: Error) => void;
    query?: Record<string, string>;
  } = {},
): Async<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    ky(`/api${path}`, {
      method: requestData ? 'post' : 'get',
      json: requestData,
      searchParams: query,
      signal: abortController.signal,
    })
      .json<T>()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error: Error) => {
        setError(error);
        onError?.(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => abortController.abort();
  }, [onError, path, query, requestData]);

  return { data, error, loading };
}
