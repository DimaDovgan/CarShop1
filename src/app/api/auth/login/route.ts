import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { loginAuthSchema } from '@/helpers/joiValidation';
import createError from '@/helpers/createError';
import { connectToDataBase } from "../../../../datebase/mongodb";
import Users from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// dovgand887221@gmail.com
import { hash } from 'bcryptjs'; // для хешування паролів


export const POST =async(req:NextResponse)=>{
  
     try {
        const body = await req.json();
        await connectToDataBase();
        const {error}=loginAuthSchema.validate(body)
        if (error) {
          console.log("joi errorr")
          throw createError(400,"Ошибка от Joi или другой библиотеки валидации")
            }
            const { email,password} = body;
          const auth = await Users.findOne({ email: email });
          if (!auth) {
            console.log("err no user")
            throw createError(401, `${email} wrong`);
            }
            
            const comparePassword = await bcrypt.compare(password, auth.password);
            if (!comparePassword) {
              console.log("incorect password")
                throw createError(401, "Email or password is wrong");
          }
          
            const payload = {
                id:auth._id
            }
            const token= jwt.sign(payload,"Dima",{expiresIn:"1h"})
            await Users.findByIdAndUpdate(auth._id,{token})
            console.log("token",token)
            return new NextResponse(JSON.stringify({
                token:token,
                user: { email: auth.email, subscription: auth.subscription,avatarUrl:auth.avatarUrl}
            }),{status:200})

        } catch (error) {
          console.log("error")
          return new NextResponse("Error in fatching post log in"+error)
      }
}