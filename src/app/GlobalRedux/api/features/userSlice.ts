import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null ,avatarURL:null,favoriteCar:null},
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log("registerUser111")
      const { user, token } = action.payload.data;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    logIn: (state, action) => {
      console.log("logIn111", state,"state",action,"action")
      const { user, token } = action.payload.data;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      console.log("state",state)
    },
    loginGoogle: (state, action) => {
      const { token, email } = action.payload;
      state.token = token;
      state.user.email = email;
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.user = { name: null, email: null ,avatarURL:null};
      state.token = null;
      state.isLoggedIn = false;
    },
    refreshUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
    },
    updateAvatarUser: (state, action) => {
      const { AvatarUrl } = action.payload;
      console.log('slice', AvatarUrl);

      state.user.avatarURL = AvatarUrl;
    },
    updateFavoriteList: (state, action) => {
      const { data } = action.payload;
      console.log('slice', data);

      state.user.favoriteCar= data.favoriteCar;
    },
  },
});

export const {
  registerUser,
  logIn,
  logOut,
  refreshUser,
  loginGoogle,
  updateAvatarUser,
  updateFavoriteList,

} = authSlice.actions;
export default authSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IUser } from '../types';

// interface IUserState {
//   user: IUser | null;
// }

// const initialState: IUserState = {
//   user: null,
// };

// export const userSlice = createSlice({
//   initialState,
//   name: 'userSlice',
//   reducers: {
//     logout: () => initialState,
//     setUser: (state, action: PayloadAction<IUser>) => {
//       state.user = action.payload;
//     },
//   },
// });

// export default userSlice.reducer;

// export const { logout, setUser } = userSlice.actions;

