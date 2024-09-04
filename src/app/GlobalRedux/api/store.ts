
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './authApi';
import { userApi } from './userApi';
import { carApi } from './carApi';
import { messageApi } from './messageApi';
import userReducer from './features/userSlice';
import carReducer from './features/carSlice';
import messageReducer from './features/messageSlice';
import { characteristicsApi } from './characteristicsApi';
import carCharacteristicsSlice from './features/carCharacteristicsSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [carApi.reducerPath]:carApi.reducer,
    [messageApi.reducerPath]:messageApi.reducer,
    [characteristicsApi.reducerPath]:characteristicsApi.reducer,
    
    userState: userReducer,
    carState:carReducer,
    messageState:messageReducer,
    characteristicsState:carCharacteristicsSlice,

  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware,carApi.middleware,characteristicsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




















// import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import counterReducer from "./feature/authSlice";
// import { userApi } from "./services/userApi";
// import { authApi } from "./authorization/authApi";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { useAppDispatch, useAppSelector } from "../GlobalRedux/hooks";
// import { useRegisterMutation } from "./authorization/authApi";


// const rootReducer = combineReducers({
//   [authApi.reducerPath]: authApi.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer
//     // [userApi.reducerPath]: userApi.reducer,
    
//   ,
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({}).concat([authApi.middleware]),
// });
// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

