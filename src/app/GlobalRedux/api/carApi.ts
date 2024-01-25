import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  {LogInInput} from "../../login/page"
import {SignInInput} from "../../signin/page"
import { IGenericResponse } from './types';
import { userApi } from './userApi';
import { SellcarImput } from '@/app/sellcar/page';
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

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api/car',
    prepareHeaders: (headers, { getState }) => {
      console.log(getState(),"getState",headers,"headers")
      const token = (getState() as RootState).userState.token;
      
      if (token) {
        console.log(token ,"pppptoken");
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  }),
  tagTypes: ['car'],
  endpoints: builder => ({
    createSellCar: builder.mutation<IGenericResponse, SellcarImput>({
      query(data) {
        return {
          url: 'createCar',
          method: 'POST',
          body: data,
        };
      },
    }),
    getAllCar: builder.mutation({
      query: (params) => ({
        url: 'getCar',
        method: 'GET',
        params,
      }),
    }),
    getCarById: builder.mutation({
      query: ({params}) => ({
        url: `getCar/${params}`,
        method: 'GET',
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
  }),
});
export const{
 useCreateSellCarMutation,
 useGetAllCarMutation,
 useGetCarByIdMutation,
}=carApi