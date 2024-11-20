import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LinkType,
  UserLoginDataType,
  UserRegisterDataType,
  UserUpdateDataType,
} from '../types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token?.access_token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser: UserRegisterDataType) => ({
        url: '/auth/register/',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (user: UserLoginDataType) => {
        const bodyFormData = new FormData();
        bodyFormData.append('username', user.username);
        bodyFormData.append('password', user.password);

        return {
          url: '/auth/login/',
          method: 'POST',
          body: bodyFormData,
        };
      },
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/users/me/',
        method: 'GET',
      }),
    }),
    addLinks: builder.mutation({
      query: (links: LinkType[]) => ({
        url: '/links/',
        method: 'POST',
        body: links,
      }),
    }),
    updateProfile: builder.mutation({
      query: (user: UserUpdateDataType) => {
        const bodyFormData = new FormData();
        bodyFormData.append('first_name', user.first_name);
        bodyFormData.append('last_name', user.last_name);
        bodyFormData.append('email', user.email);

        if (user.file) {
          bodyFormData.append('file', user.file);
        }

        return {
          url: '/users/update-user/',
          method: 'PUT',
          body: bodyFormData,
        };
      },
    }),
    getUserDataByUsername: builder.query({
      query: (username: string) => ({
        url: `/users/${username}`,
        method: 'GET',
      }),
    }),
    fetchAvatar: builder.query({
      query: (avatar_id: string) => ({
        url: `/users/get-avatar/${avatar_id}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAddLinksMutation,
  useUpdateProfileMutation,
  useGetCurrentUserQuery,
  useGetUserDataByUsernameQuery,
  useFetchAvatarQuery,
} = apiSlice;
