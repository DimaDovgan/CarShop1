import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { connectToDataBase } from "../../../../datebase/mongodb";
import Users from "../../../models/user";
import { registerAuthSchema } from '@/helpers/joiValidation';
import createError from '@/helpers/createError';
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { json } from 'stream/consumers';


export const POST =async(req:NextResponse)=>{

   try {
              const body = await req.json();
              await connectToDataBase(); 
              console.log("body",body)
              const {error}=registerAuthSchema.validate(body)
              if (error) {
                throw createError(400,"Ошибка от Joi или другой библиотеки валидации")
                  }
                  const { email,password } = body;
                  console.log(email,"email")
                
               const auth = await Users.findOne({ email: email });
               console.log(auth,"auth")
              if (auth) {
                console.log("exist already")
                throw createError(409, `${email} is use`);
              }
              console.log(auth,"auth")
              console.log(password)
              const hashPassword = await bcrypt.hash(password,10);
               console.log("result",hashPassword)
               const avatarUrl=gravatar.url(email);
               
            const result = await Users.create({...body ,password:hashPassword,avatarUrl} );
            return new NextResponse(JSON.stringify({
               user: { email: result.email, name:result.name, subscription: result.subscription ,avatarUrl:result.avatarUrl} }),{status:201});
            } catch (error) {
              console.log("error")
              return new NextResponse("Error in fatching post sign in"+error,{status:500})
          
          }
}

