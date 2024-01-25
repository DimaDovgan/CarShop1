import { NextResponse } from 'next/server';
import Users from "../../../models/user";
import jwt from "jsonwebtoken";

export const POST =async(res:string)=>{

    
    console.log('log out ')
    
//   try {
//     const body = await req.json();
//     console.log(body,"body lof out ooo")
//     const { _id } = body.user;
//     await Users.findOneAndUpdate(_id, { token: "" })
//     return new NextResponse(JSON.stringify("LogOut"),{status:204})
    
//   } catch (error) {
//     return new NextResponse("Error in fatching post sign in"+error,{status:500})
//   }
}