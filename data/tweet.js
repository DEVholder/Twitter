import {db} from '../db/database.js';
import * as authRepository from "../data/auth.js";

const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userid, us.username, us.name, us.email, us.url from tweets as tw join users us on tw.userid = us.id'
const ORDER_DESC ='order by tw.createdAt desc'

// 모든 트윗을 리턴
export async function getAll(){
  // return tweets;
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
                    .then((result)=>{
                      // console.log(result)
                      return result[0]
                    })
};

// 아이디로 해당 아이디에 대한 트윗을 리턴
export async function getAllByusername(username){
  // return tweets.filter((tweet) => tweet.username == username)
  return db.execute(`${SELECT_JOIN} where username = ? ${ORDER_DESC}`, [username])
                  .then((result)=>{
                    return result[0]
                  })
}



// 글 번호에 대한 트윗을 리턴
export async function getById(id){
  // return tweets.find((tweet)=>tweet.id == id)
  return db.execute(`${SELECT_JOIN} where tw.id = ? ${ORDER_DESC}`, [id])
            .then((result)=>{
              // console.log(result)
              return result[0]
            })
}

// 트윗을 작성
export async function create(text, userid){
  return db.execute(`insert into tweets (text, userid) values (?, ?)`, [text, userid])
            .then((result)=>{
              // console.log(result);
              return getById(result[0].insertId)
            })
}

// 트윗을 변경
export async function update(id, text){
  // try{
  //   const tweet = tweets.find((tweet)=>tweet.id == id);
  //   if(tweet){
  //     tweet.text = text;
  //     return tweet;
  //   }
  //   else return false;
  // }catch(err){
  //   console.log(`트윗 변경 에러 발생 ${err}`)
  //   return false;
  // }
  return db.execute(`update tweets set text= ? where id= ?`, [text, id])
            .then((result)=>{
              console.log(result)
              return getById(id);
            })
}

// 트윗을 삭제
export async function remove(id){
  // const tweetslen = tweets.length;
  // tweets = tweets.filter((tweet)=>tweet.id != id);
  // if(tweets.length != tweetslen) return true;
  // else return false;
  return db.execute('delete from tweets where id = ?', [id])
            .then((result)=>{
              if(result[0].affectedRows == 1)
                console.log(result[0].affectedRows)
                return true
            });
}