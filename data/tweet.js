import MongoDB from 'mongodb'
import { getTweets, getUsers } from '../db/database.js'
import * as authRepository from './auth.js'
import { Result } from 'express-validator';

const ObjectID = MongoDB.ObjectId;

function MapTweets(tweets){
  return tweets.map(MapOptionalTweet)
}
function MapOptionalTweet(tweet){
  return tweet ? { ...tweet, id: tweet.insertedId} : tweet;
}

// // 모든 트윗을 리턴
export async function getAll(){
  return getTweets().find().sort({ createdAt: -1}).toArray().then(MapTweets);
};

// // 아이디로 해당 아이디에 대한 트윗을 리턴
export async function getAllByusername(username){
  return getTweets().find({username}).sort({ createdAt: -1}).toArray().then(MapTweets)
}

// // 글 번호에 대한 트윗을 리턴
export async function getById(id){
  return getTweets().find({_id: new ObjectID(id)}).next().then(MapOptionalTweet)
}

// // 트윗을 작성
export async function create(text, userId){
  return authRepository.getById(userId).then((user)=> getTweets().insertOne({
    text,
    userId,
    username: user.username,
    url: user.url
  })).then((result)=>getById(result.insertedId)).then(MapOptionalTweet)
}

// // 트윗을 변경
export async function update(id, text){
  return getTweets().findOneAndUpdate({_id: new ObjectID(id)}, {$set: {text}},{
    returnDocument:'after'
  }).then((result)=>result).then(MapOptionalTweet)
}

// // 트윗을 삭제
export async function remove(id){
  return getTweets().deleteOne({_id: new ObjectID(id)});
}