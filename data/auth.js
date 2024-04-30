import * as bcrypt from 'bcrypt';

let Users = [
  {
    id:'1',
    username:'apple',
    password:'$2b$10$oTwQKzSRDS4dCk6iPFhibeOJaSzzpyto.wbDu.UvfwBK0tm3Ndioi',
    name:'김사과',
    email:'apple@apple.com',
    url: 'URL'
  },
  {
    id:'2',
    username:'banana',
    password:'2222',
    name:'반하나',
    email:'banana@banana.com',
    url: 'URL'
  },
  {
    id:'3',
    username:'orange',
    password:'3333',
    name:'오랜지',
    email:'orange@orange.com',
    url: 'URL'
  }
]

/**
 * 모든 사용자 리스트를 출력
 * @returns 
 */
export async function getAll(){
  return Users;
}

/**
 * username에 해당하는 사용자 정보 출력
 * @param {string} username 
 * @returns 
 */
export async function getByUsername(username){
  return Users.find((user)=>user.username == username)
}

/**
 * 회원가입
 * @param {string} username 
 * @param {string} password 
 * @param {string} name 
 * @param {string} email 
 * @returns 
 */
export async function create(username, password, name, email){
  try{
    const user = {
      id:Users.length+1,
      username,
      password,
      name,
      email,
      url:""
    }
    Users = {...Users,user}
    return true
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
export async function login(username, password){
  const user = Users.find((user)=>user.username = username);
  const result = bcrypt.compareSync(password, user.password);
  return result
}

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
    const user = Users.find((user)=>user.username == username)
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
  const user = Users.find((user)=>user.username == username)
  if( user.password === password ){

  } 
}