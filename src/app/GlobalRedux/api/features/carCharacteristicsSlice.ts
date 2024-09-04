import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brends: null,
  models: null,
  modifications: null,
  characteristics:null,
};

const carCharacteristicsSliceSlice = createSlice({
  name: 'carCharacteristicsSliceSlice',
  initialState,
  reducers: {
    getBrend: (state, action) => {
        console.log("getBrend")
        const {cars} = action.payload;
        state.brends = cars;
        
      },
    getModel: (state, action) => {
      console.log("getModel")
      const { cars } = action.payload;
      state.models = cars;
    },
    getModifications: (state, action) => {
        console.log("getModifications")
        const { cars } = action.payload;
        state.modifications = cars;
        
      },
      getCharacteristics: (state, action) => {
        console.log("getCharacteristics")
        const { cars } = action.payload;
        state.characteristics = cars;
        
      },
  },
});

export const {
  getBrend,
  getModel,
  getCharacteristics,
  getModifications,

} = carCharacteristicsSliceSlice.actions;
export default carCharacteristicsSliceSlice.reducer;