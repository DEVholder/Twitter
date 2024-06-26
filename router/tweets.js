import express from "express";
import * as tweetController from "../controller/tweet.js"
import { body, param, validationResult } from 'express-validator';

const router = express.Router();
const validate = (req, res, next) =>{
  const errors = validationResult(req);
  if(errors.isEmpty()){
    return next();
  }
  return res.status(400).json({message:errors.array()[0].msg});
}

// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
router.get('/', tweetController.getTweets)

// 글 번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
router.get('/:id', tweetController.getTweet)

// 트윗하기
// POST
// http://localhost:8080/tweets
// name, username, text
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/',
  [body('text').trim().isLength({min:3}).withMessage('text는 3글자 이상 입력하세요!'),validate], 
  tweetController.createTweet
)

// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// id , username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
router.put('/:id', 
  [body('text').trim().isLength({min:3}).withMessage('text는 3글자 이상 입력하세요!'),validate], 
  tweetController.updateTweet
);

// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id
// id
router.delete('/:id', tweetController.deleteTweet);

export default router