import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  {LogInInput} from "../../login/page"
import {SignInInput} from "../../signin/page"
import { IGenericResponse } from './types';
import { userApi } from './userApi';

//const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const sellCarApi = createApi({
  reducerPath: 'sellCarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/`,
  }),
  endpoints: (builder) => ({
    createSellCar: builder.mutation<IGenericResponse, SignInInput>({
      query(data) {
        return {
          url: 'signin',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LogInInput
    >({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     await dispatch(userApi.endpoints.getMe.initiate(null));
      //   } catch (error) {}
      // },
    }),
    verifyEmail: builder.mutation<
      IGenericResponse,
      { verificationCode: string }
    >({
      query({ verificationCode }) {
        return {
          url: `verifyemail/${verificationCode}`,
          method: 'GET',
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
} = authApi;