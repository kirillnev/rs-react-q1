import { useState, useCallback } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (options?: RequestInit) => Promise<void>;
}

function useFetch<T>(url: string, options?: RequestInit): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (overrideOptions?: RequestInit) => {
      setLoading(true);
      setError(null);
      try {
        const finalOptions = {
          ...options,
          ...overrideOptions,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers,
            ...overrideOptions?.headers,
          },
        };

        const response = await fetch(url, finalOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, execute };
}

export default useFetch;
