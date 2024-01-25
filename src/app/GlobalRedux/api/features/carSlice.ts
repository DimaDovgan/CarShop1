import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter:null,
  
};

const carSlice = createSlice({
  name: 'carSlice',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      console.log("setfilter ",action.payload)
      state.filter = action.payload;
    },
}
    
});

export const {
  setFilter
} = carSlice.actions;
export default carSlice.reducer;