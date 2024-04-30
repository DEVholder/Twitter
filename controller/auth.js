import * as authRepository from "../data/auth.js";

/** 
 * 모든 사용자 리스트를 출력
 */
export async function getAllUser(){
  const data = await authRepository.getAll();
  
  res.status(200).json(data);
}

/**
 * username에 해당하는 사용자 정보 출력
 */
export async function getUser(req, res, next){
  const username = req.query.username;
}

/**
 * 회원가입 
 */
export async function SignUp(req, res, next){
  const { username, passwd, name, email} = req.body;
  const auth = await authRepository.create(username, passwd, name, email);
  if(auth){
    const user = await authRepository.getByUsername(username)
    res.status(201).json(user);
  }else res.status(502).json({message:"회원가입 에러 발생!"})

}

/**
 * 로그인
 */
export async function login(req, res, next){
  const {username, passwd} = req.body;
  const user = await authRepository.login(username);
  if(user){
    res.status(201).json(`${username} 로그인 성공`)
  }else{
    res.status(404).json({message:`${username} 아이디 또는 비밀번호를 확인하세요!`})
  }
}

/**
 * 회원정보 수정
 */
export async function editUser(req, res, next){
  const userid = req.param.userid
  const { username, passwd, name, email} = req.body;
}
/**
 * 회원탈퇴
 */
export async function DeleteUser(req, res, next){
  const userid = req.param.userid;
}