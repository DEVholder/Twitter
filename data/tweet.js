import mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";
import * as authRepository from "./auth.js";

const tweetSchema = new mongoose.Schema({
  text: {type:String, require:true},
  userId: {type:String, require:true},
  username: {type:String, require:true},
  name: {type:String, require:true},
  url: String
}, {timestamps:true})

useVirtualId(tweetSchema);

const Tweet = mongoose.model('tweet', tweetSchema);

// // 모든 트윗을 리턴
export async function getAll(){
  return Tweet.find().sort({createdAt: -1})
};

// // 아이디로 해당 아이디에 대한 트윗을 리턴
export async function getAllByusername(username){
  return Tweet.find({username}).sort({createdAt: -1})
}

// // 글 번호에 대한 트윗을 리턴
export async function getById(id){
  return Tweet.findById(id);
}

// // 트윗을 작성
export async function create(text, userId){
  return authRepository.getById(userId).then((user)=>new Tweet({
    text, userId, username:user.username, name:user.name, url:user.url
  }).save())
}

// // 트윗을 변경
export async function update(id, text){
  return Tweet.findByIdAndUpdate(id, {text}, {returnDocument: "after"})
}

// // 트윗을 삭제
export async function remove(id){
  return Tweet.findByIdAndDelete(id)
}