import { config } from '../config.js'
import mongoose from 'mongoose';

let db;

export async function connectDB(){
  return mongoose.connect(config.db.host);
}

export function useVirtualId(schema){
  schema.virtual('id').get(function(){
    return this._id.toString();
  })
  schema.set('toJSN', {virtuals:true});
  schema.set('toObject', {virtuals:true});
}

export function getUsers(){
  return db.collection('users')
}

export function getTweets(){
  return db.collection('tweets')
}