import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  {LogInInput} from "../../login/page"
import {SignInInput} from "../../signin/page"
import { IGenericResponse } from './types';
import { userApi } from './userApi';
import { SellcarImput } from '@/app/sellcar/page';
// import { getBrend } from './features/carCharacteristicsSlice';
// type RootState = {
//   userState:{
//     token: string | null; 
//     user:{
//       name: string | null,
//        email: string | null, 
//        avatarURL: string | null
//     }
// }
// };

export const characteristicsApi = createApi({
  reducerPath: 'characteristicsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api/carcharacteristycs',
    
  }),
  tagTypes: ['characteristics'],
  endpoints: builder => ({
    getBrends: builder.mutation({
      query: () => ({
        url: '/getBrends',
        method: 'GET',
      }),
    }),
    getModels: builder.mutation({
      query: ({params}) => ({
        url: `/getModel/${params}`,
        method: 'GET',
      }),
    }),
    // getModelsById: builder.mutation({
    //   query: ({params}) => ({
    //     url: `/getModelsById/${params}`,
    //     method: 'GET',
    //   }),
    // }),
    getModification: builder.mutation({
        query: ({brandId,modelId,generationId}) => ({
          url: `/getModification/${brandId}/${modelId}/${generationId}`,
          method: 'GET',
        }),
      }),
      getCharacteristics: builder.mutation({
        query: ({brandId,modelId,modificationId,generationId}) => ({
          url: `/getCharacteristics/${brandId}/${modelId}/${modificationId}/${generationId}`,
          method: 'GET',
        }),
      }),
    
  }),
});
export const{
    useGetBrendsMutation,
    useGetModelsMutation,
    useGetCharacteristicsMutation,
    useGetModificationMutation,
 
}=characteristicsApi