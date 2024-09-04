import { createSlice } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';
interface Room {
  roomId: string;
  buyerId: string | null;
  sellerId: string | null;
  creationDate: string | null;
  messages: string[] | null;
}

interface User {
  id: string;
  name: string;
}

interface ChatState {
  room: Room;
  roomsForSeller: Record<string, Room>;
  user: User | null;
}

interface CreateRoomForSellerPayload {
  room: Room;
  user: User;
}

const initialState: ChatState = {
  room: {
    roomId: '',
    buyerId: null,
    sellerId: null,
    creationDate: null,
    messages: null,
  },
  roomsForSeller: {},
  user: null,
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    createRoom: (state, action) => {
        console.log("createRoom")
        const {room,user} = action.payload;
        const isObjectsEqual = isEqual(room, state.room);
        console.log(isObjectsEqual,"isObjectsEqual")
        console.log( isObjectsEqual,"isObjectsEqual",initialState.room.roomId,"initialState.room.roomId" ,"bool")
        if(!(isObjectsEqual && initialState.room.roomId)){
          console.log(room,"rebild chat")
         state.room = room;
         state.user = user;
        }
        
        
      },
      addMessage: (state, action) => {
        console.log("addMessage")
        const { messages} = action.payload.data;
        state.room.messages =  messages;
      },
    createRoomForSeller: (state, action) => {
      console.log("roomsForSeller")
      const {room,user} = action.payload;
      const isObjectsEqual = isEqual(room, state.roomsForSeller[room.roomId]);
      if(!isObjectsEqual){
        if (room.roomId) {
          state.roomsForSeller[room.roomId] = room;
        }
      }
    },
}
    
});


export const {
    createRoom,
    addMessage,
    createRoomForSeller
} = messageSlice.actions;
export default messageSlice.reducer;