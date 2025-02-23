import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, ApiResponse } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ApiResponse,
      { page: number; searchQuery: string }
    >({
      query: ({ page, searchQuery }) => ({
        url: '/character',
        params: { page, name: searchQuery },
      }),
    }),
    getCharacterDetails: builder.query<Character, string>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterDetailsQuery } = apiSlice;
