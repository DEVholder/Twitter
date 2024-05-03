import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";

const AUTH_ERROR = {message:"인증에러"};

export const isAuth = async(req, res, next)=>{
  const authHeader = req.get('Authorization');
  console.log(authHeader)
  if(!(authHeader && authHeader.startsWith('Bearer '))){
    console.log('에러!')
    return res.status(401).json(AUTH_ERROR)
  }else{
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token, 'abcde1234', async(err, decoded)=>{
        if(err){
          console.log(`에러! ${err}`)
          return res.status(401).json(AUTH_ERROR)
        }
        const user = await authRepository.getByUsername(decoded.id);
        if(!user){
          console.log('에러3')
          return res.status(401).json(AUTH_ERROR);
        }
        req.token = authHeader
        req.body.username = user.username;
        next();
      }
    )
  }
}