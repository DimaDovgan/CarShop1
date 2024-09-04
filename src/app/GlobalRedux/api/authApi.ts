import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  {LogInInput} from "../../login/page"
import {SignInInput} from "../../signin/page"
import { IGenericResponse } from './types';
import { userApi } from './userApi';
type RootState = {
  userState:{
    token: string | null; 
    user:{
      name: string | null,
       email: string | null, 
       avatarURL: string | null
    }
}
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  }),
  tagTypes: ['auth'],
  endpoints: builder => ({
    registerUser: builder.mutation<IGenericResponse, SignInInput>({
      query(data) {
        return {
          url: 'signin',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<{ access_token: string; status: string },LogInInput>({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          // credentials: 'include',
        };
      },}),
      reLoginUser: builder.mutation<{ access_token: string; status: string },LogInInput>({
        query(data) {
          return {
            url: 'reLogin',
            method: 'POST',
            body: data,
          };
        },}),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        headers: {
          authorization: '',
        },
      }),
    }),
    googleLogin: builder.mutation({
      query: () => ({
        url: 'google',
        method: 'GET',
      }),
    }),
    getUser: builder.mutation({
      query: ({params}) => ({
        url: `getUser/${params}`,
        method: 'GET',
      }),
    }),
    addFavoriteCar: builder.mutation({
      query: ({params}) => ({
        url: `addFavoriteCar/${params}`,
        method: 'PATCH',
      }),
    }),
    // fetchCurrentUser: builder.query({
    //   async queryFn(_arg, { getState }, _extraOptions, baseQuery) {
    //     const persistedState = getState().auth.token;

    //     if (persistedState === null) {
    //       return persistedState;
    //     }

    //     const result = await baseQuery({
    //       url: 'users/current',
    //       method: 'GET',
    //       headers: { authorization: `Bearer ${persistedState}` },
    //       providesTags: ['user'],
    //     });

    //     return result;
    //   },
    // }),
    ForgotPassword: builder.mutation({
      query: userInfo => ({
        url: 'forgot-password',
        method: 'PATCH',
        body: userInfo,
      }),
    }),
    avatarChange: builder.mutation({
      query: data => ({
        url: 'avatars',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});


export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useAvatarChangeMutation,
  useLogoutMutation,
  useGetUserMutation,
  useAddFavoriteCarMutation,
  useReLoginUserMutation,
  
} = authApi;