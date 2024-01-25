import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { sellCArShema } from '@/helpers/joiValidation';
import createError from '@/helpers/createError';
import { connectToDataBase } from "../../../datebase/mongodb";
import sellCar from "../../models/sellCar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// dovgand887221@gmail.com
import { hash } from 'bcryptjs';

export const POST =async(req:NextResponse)=>{


    try {
        const reqest = await req.json();
        await connectToDataBase();
        console.log("user id",reqest.user.id)
        const { error } = sellCArShema.validate(reqest.body)
        if (error) {
          console.log(error);
          throw createError(400, "missing required name field")
        }
        const { id: owner } = reqest.user
        console.log(owner);
        const list = await sellCar.find();
        if (list.some(elem => { 
          let a=elem.carLicenseplane === reqest.body.carLicenseplane;
          return a;
        })) {
          throw createError(400, `${reqest.body.carLicenseplane} іs already taken`)
        }
    
        const Car = await sellCar.create({...req.body, owner});
        return new NextResponse(JSON.stringify(Car),{status:201})
        
      } catch (error) {
        return new NextResponse("Error in fatching post sellCar in"+error)
      }
}