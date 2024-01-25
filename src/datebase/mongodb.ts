import mongoose from "mongoose";
// track the connection
let isConnected = false;
export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect("mongodb+srv://dovgand887:OXglzPFllTEmQi8j@car-shop1.ze1jotg.mongodb.net/test", {
        dbName: 'Car_shop'
    });
    isConnected = true;
    console.log("DB connect");
  } catch (error) {
    console.log(error);
  }
};

// mongodb+srv://dovgand887:OXglzPFllTEmQi8j@car-shop1.ze1jotg.mongodb.net/Car_shop?retryWrites=true&w=majority
//mongodb+srv://dovgand887:OXglzPFllTEmQi8j@car-shop1.ze1jotg.mongodb.net/test


// import mongoose from 'mongoose';

// global.mongoose = {
//   conn: null,
//   promise: null,
// };

// export async function dbConnect() {
//   try {
//     if (global.mongoose && global.mongoose.conn) {
//       console.log('Connected from previous');
//       return global.mongoose.conn;
//     } else {
//       const conString = "mongodb+srv://dovgand887:OXglzPFllTEmQi8j@car-shop1.ze1jotg.mongodb.net/?retryWrites=true&w=majority";

//       const promise = mongoose.connect(conString, {
//         autoIndex: true,
//       });

//       global.mongoose = {
//         conn: await promise,
//         promise,
//       };

//       console.log('Newly connected');
//       return await promise;
//     }
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     throw new Error('Database connection failed');
//   }
// }