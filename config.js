import dotenv from "dotenv";

dotenv.config()

function required(key, defaultValue=undefined){
  // or: 앞의 값이 true이면 앞의 값이 대입, false면 뒤의 값이 대입
  const value = process.env[key] || defaultValue;

  if(value == null){
    throw new Error(`키 ${key}는 undefined!`)
  }
  return value
}

export const config = {
  jwt:{
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRESINDAYS', 172800))
  },
  bcrypt:{
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 10))
  },
  host:{
    port: parseInt(required('HOST_PROT', 8080))
  }
}

