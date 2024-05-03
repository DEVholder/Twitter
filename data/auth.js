import * as bcrypt from 'bcrypt';

let UserList = [
  {
    id:"1",
    username:"apple",
    hashed:"$2b$10$oTwQKzSRDS4dCk6iPFhibeOJaSzzpyto.wbDu.UvfwBK0tm3Ndioi",
    name:"김사과",
    email:"apple@apple.com",
    url:""
  },
  {
    id:"2",
    username:"banana",
    hashed:"$2b$10$oTwQKzSRDS4dCk6iPFhibeOJaSzzpyto.wbDu.UvfwBK0tm3Ndioi",
    name:"반하나",
    email:"banana@banana.com",
    url:""
  },
  {
    id:"3",
    username:"orange",
    hashed:"$2b$10$oTwQKzSRDS4dCk6iPFhibeOJaSzzpyto.wbDu.UvfwBK0tm3Ndioi",
    name:"오랜지",
    email:"orange@orange.com",
    url:""
  }
]

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
  return UserList.find((user)=>user.username == username)
}

/**
 * id 중복검사
 */
export async function getById(id){
  return UserList.find((user)=>user.id == id)
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
  try{
    const created = {id:(UserList.length+1).toString(),...user}
    UserList.push(created)
    return created.username
  }catch(err){
    console.log(`회원가입중 에러발생! ${err}`)
    return false;
  }
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