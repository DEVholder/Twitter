import * as authRepository from "../data/auth.js";
import * as bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken'

const secret = 'abcde1234'

async function makeToken(id){
  const token = jwt.sign(
    {
      id:id,
      isAdmin:false
    }, secret, {expiresIn: '1h'}
  )
  return token
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
 */
export async function SignUp(req, res, next){
  const { username, password, name, email} = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  const auth = await authRepository.create(username, hashed, name, email);
  if(auth){
    const user = await authRepository.getByUsername(req.body.username)
    res.status(201).json(user);
    // res.status(201).json({message:"회원가입 완료!"})
  }else res.status(502).json({message:"회원가입 에러 발생!"})

}

/**
 * 로그인
 */
export async function login(req, res, next){
  const {username, password} = req.body;
  const user = await authRepository.login(username, password);
  if(user){
    res.status(201).header('token',makeToken(username)).json()
  }else{
    res.status(404).json({message:`${username} 아이디 또는 비밀번호를 확인하세요!`})
  }
}

export async function verify(req, res, next){
  const token = req.header('token');
  if(token){
    res.status(200).json(token)
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