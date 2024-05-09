import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";
import {config} from '../config.js'

const AUTH_ERROR = {message:"인증에러"};

export const isAuth = async(req, res, next)=>{
  const authHeader = req.get('Authorization');
  // console.log(authHeader)
  if(!(authHeader && authHeader.startsWith('Bearer '))){
    console.log(authHeader)
    console.log('에러!')
    return res.status(401).json(AUTH_ERROR)
  }else{
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token, config.jwt.secretKey, async(err, decoded)=>{
        if(err){
          console.log(`에러! ${err}`)
          return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded.id)
        const user = await authRepository.getById(decoded.id);
        if(!user){
          console.log(user)
          console.log('에러3')
          return res.status(401).json(AUTH_ERROR);
        }
        req.token = authHeader
        req.body.id = user.id;
        next();
      }
    )
  }
}