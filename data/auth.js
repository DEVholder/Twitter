import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING(150),
      allowNull: false
    },
    name:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    url: DataTypes.STRING(1000)
  },
  { timestamps: false}
)

/**
 * 모든 사용자 리스트를 출력
 * @returns 
 */
export async function getAll(){
  return UserList;
}

/**
 * username에 해당하는 사용자 정보 출력
 * @param {string} username 
 * @returns 
 */
export async function getByUsername(username){
  return User.findOne({where:{username}})
}

/**
 * id 중복검사
 */
export async function getById(id){
  return User.findByPk(id);
}

/**
 * 회원가입
 * @param {string} username 
 * @param {string} password 
 * @param {string} name 
 * @param {string} email 
 * @param {string} url 
 * @returns 
 */
export async function create(user){
  return User.create(user).then((data)=>data.dataValues.id);
}

/**
 * 로그인
 * @param {string} username 
 * @returns 
 */
// export async function login(username, password){
//   const user = UserList.find((user)=>user.username == username);
//   const result = bcrypt.compareSync(password, user.password);
//   return result
// }

/**
 * 회원정보 수정
 * @param {string} username 
 * @param {string} password 
 * @param {string} name 
 * @param {string} email 
 * @returns 
 */
export async function edit(username, password, name, email){
  try{
    const user = UserList.find((user)=>user.username == username)
    if(user){
      user.password = password;
      user.name = name;
      user.email = email;
      return true;
    }else return false;
  }catch(err){
    console.log(`회원정보 수정 에러 발생 ${err}`)
    return false;
  }
}

/**
 * 회원탈퇴
 * @param {string} username 
 * @param {string} password 
 */
export async function remove(username, password){
  const user = UserList.find((user)=>user.username == username)
  if( user.password === password ){

  } 
}