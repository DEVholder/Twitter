import * as tweetRepository from "../data/tweet.js";

// 모든 트윗을 가져오는 함수
// const data = req.query.username 
//     ? tweets.filter((tweet) => tweet.username == req.query.username)
//     : tweets;
//   res.status(200).json(data);
export async function getTweets(req, res){
  const username = req.query.username;
  const data = await(username ? tweetRepository.getAllByusername(username) 
                              : tweetRepository.getAll());
  res.status(200).json(data);
}

// 하나의 트윗을 가져오는 함수
// const id = req.params.id;
//   const data = tweets.find((tweet)=>tweet.id == id)
//   if(!data){
//     res.status(200).json(data);
//   }else{
//     res.status(404).json({message:`${id}에 해당하는 트윗이 없습니다`});
//   }
export async function getTweet(req, res, next){
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if(tweet) res.status(200).json(tweet)
  else res.status(404).json({message:`${id}에 해당하는 트윗이 없습니다`});
}

// 트윗을 생성하는 함수
// const {text, name, username} = req.body
//   const tweet ={
//     id:'10',
//     text:text,
//     createAt:Date.now().toString(),
//     name:name,
//     username:username,
//     url:''
//   }
//   tweets = {tweet,...tweets};
//   res.status(201).json(tweets);
export async function createTweet(req, res, next){
  const {text, name, username} = req.body
  const tweet = await tweetRepository.create(text, name, username)
  if(tweet) res.status(201).json(tweet);
  else res.status(502).json({message:"오류발생",text:text,name:name,username:username});
}

// 트윗을 변경하는 함수
// const id = req.params.id;
//   const text = req.body.text;
//   const tweet = tweets.find((tweet)=>tweet.id == id);
//   if(tweet){
//     tweet.text = text;
//     res.status(201).json(tweet);
//   }else{
//     res.status(404).json({message:`${id}에 해당하는 트윗이 없습니다`});
//   }
export async function updateTweet(req, res, next){
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text)
  if(tweet) res.status(201).json(tweet);
  else res.status(404).json({message:"오류발생! 해당 트윗이 없습니다.",id:id,text:text});
}

// 트윗을 삭제하는 함수
// const id = req.params.id;
// tweets = tweets.filter((tweet)=>tweet.id != id);
// console.log(tweets)
// res.json(tweets).status(204);
export async function deleteTweet(req, res, next){
  const id = req.params.id;
  const result = await tweetRepository.remove(id)  // boolean 
  const tweets = await tweetRepository.getAll();  // tweets list
  if(result) res.json(tweets).status(204);
  else res.json({message:"오류발생! 해당 트윗이 없어 삭제 실패",id:id}).status(404);
}