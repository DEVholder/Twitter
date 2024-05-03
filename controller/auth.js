import * as authRepository from "../data/auth.js";
import * as bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken'

const secretkey = 'abcde1234'
const jwtExpiresInDays = '2d'
const bcryptSaltRounds = 10


// async function makeToken(id){
//   const token = jwt.sign(
//     {
//       id:id,
//       isAdmin:false
//     }, secret, {expiresIn: '1h'}
//   )
//   return token
// }

function createjwtToken(id){
  return jwt.sign(({id}), secretkey, {expiresIn:jwtExpiresInDays})
}

/** 
 * 모든 사용자 리스트를 출력
 */
export async function getAllUser(req, res, next){
  const data = await authRepository.getAll();
  res.status(200).json(data);
}

/**
 * username에 해당하는 사용자 정보 출력
 */
export async function getUser(req, res, next){
  const username = req.params.username;
  console.log(`유저네임: ${username}`)
  const data = await authRepository.getByUsername(username)
  res.status(200).json(data);
}

/**
 * 회원가입 
 * 아이디 중복 체크
 */
export async function SignUp(req, res, next){
  const { username, password, name, email, url} = req.body;
  const isDuplicate = await authRepository.getByUsername(username)
  if(isDuplicate){
    res.status(409).json({message:"이미 있는 아이디입니다."})
  }else{
    const hashed = bcrypt.hashSync(password, bcryptSaltRounds);
    const userid = await authRepository.create({username, hashed, name, email, url});
    if(!userid){
      res.status(502).json({message:"회원가입 에러 발생!"})
    }else{
      const user = await authRepository.getByUsername(req.body.username)
      const token = createjwtToken(user)
      res.status(201).json({user:user,token:token});
    }
  }
}

/**
 * 로그인
 */
export async function login(req, res, next){
  const {username, password} = req.body;
  // const user = await authRepository.login(username, password);
  const user = await authRepository.getByUsername(username);
  if(!user){
    return res.status(401).json({message:"아이디를 찾을수 없음"})
  }else{
    const isValidpassword = bcrypt.compareSync(password, user.hashed);
    console.log(isValidpassword)
    if(!isValidpassword){
      return res.status(401).json({message:`${username} 아이디 또는 비밀번호를 확인하세요!`})
    }else{
      const token = createjwtToken(user.username)
      res.status(201).header('token',token).json({user,token})
    }
  }
}

// export async function verify(req, res, next){
//   const token = req.header('token');
//   if(token){
//     res.status(200).json(token)
//   }
// }

export async function me(req,res,next){
  const username = req.body.username
  console.log(username)
  const user = await authRepository.getByUsername(username)
  console.log(user)
  if(!user){
    return res.status(404).json({message:"일치하는 사용작가 없음"})
  }else{
    res.status(200).json({token:req.token, username:user.username})
  }
}

/**
 * 회원정보 수정
 */
export async function editUser(req, res, next){
  const userid = req.param.userid
  const { username, password, name, email} = req.body;
}
/**
 * 회원탈퇴
 */
export async function DeleteUser(req, res, next){
  const userid = req.param.userid;
}