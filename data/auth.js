import { db } from '../db/database.js';

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
  return db.execute('select * from users where username = ?', [username])
            .then((result)=>{
              // console.log(`아이디 중복 체크 ${result[0]}`);
              return result[0][0];
            })
}

/**
 * id 중복검사
 */
export async function getById(id){
  console.log('getbyid')
  return db.execute('select * from users where id = ?', [id])
            .then((result)=>result[0][0])
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
  console.log('회원가입 호출')
  const {username, hashed, name, email, url} = user;
  return db.execute('insert into users (username, password, name, email, url) values (?,?,?,?,?)',[username, hashed, name, email, url])
            .then((result)=>{
              // console.log(`회원가입 ${result[0]}`);
              return result[0];
            })
           
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