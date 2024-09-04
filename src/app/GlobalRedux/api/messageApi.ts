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

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api/message',
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

  
  tagTypes: ['message'],
  endpoints: builder => ({
    addMessage: builder.mutation<IGenericResponse, SellcarImput>({
      query(data) {
        return {
          url: '/addMessage',
          method: 'POST',
          body: data,
        };
      },
    }),
    createRoom: builder.mutation({
      query: ({sellerId,carId}) => ({
        url: `createRoom/${sellerId}/${carId}`,
        method: 'GET',
      }),
    }),
    createRoomForSeller: builder.mutation({
      query: ({buyerId,carId}) => ({
        url: `createRoomForSeller/${buyerId}/${carId}`,
        method: 'GET',
      }),
    }),
    getRoomByCar: builder.mutation({
      query: ({carId}) => ({
        url: `getRoomByCar/${carId}`,
        method: 'GET',
      }),
    }),
  }),
});
export const{
 useCreateRoomMutation,
 useAddMessageMutation,
 useGetRoomByCarMutation,
 useCreateRoomForSellerMutation,
}=messageApi