import express from "express";

const router = express.Router();

let tweets =[
  {
    id:'1',
    text:'안녕하세요!',
    createdAt:Date.now().toString(),
    name:'김사과',
    username:'apple',
    url:'https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg'
  },
  {
    id:'2',
    text:'반갑습니다.',
    createAt:Date.now().toString(),
    name:'반하나',
    username:'banana',
    url:'https://img.freepik.com/premium-vector/banana-cute-kawaii-style-fruit-character-vector-illustration_787461-1772.jpg'
  }
]

// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
router.get('/',(req,res, next)=>{
  const data = req.query.username 
    ? tweets.filter((tweet) => tweet.username == req.query.username)
    : tweets;
  res.status(200).json(data);
})  

// 글 번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
router.get('/:id',(req,res,next)=>{
  const id = req.params.id;
  const data = tweets.find((tweet)=>tweet.id == id)

  if(!data){
    res.status(200).json(data);
  }else{
    res.status(404).json({message:`${id}에 해당하는 트윗이 없습니다`});
  }
})

// 트윗하기
// POST
// http://localhost:8080/tweets
// name, username, text
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/', (req, res, next)=>{
  const {text, name, username} = req.body
  const tweet ={
    id:'10',
    text:text,
    createAt:Date.now().toString(),
    name:name,
    username:username,
    url:''
  }
  tweets = {tweet,...tweets};
  res.status(201).json(tweets);
})

// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// id , username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
router.put('/:id', (req,res,next)=>{
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet)=>tweet.id == id);
  if(tweet){
    tweet.text = text;
    res.status(201).json(tweet);
  }else{
    res.status(404).json({message:`${id}에 해당하는 트윗이 없습니다`});
  }
})

// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id
// id
router.delete('/:id', (req,res,next)=>{
  const id = req.params.id;
  tweets = tweets.filter((tweet)=>tweet.id != id);
  console.log(tweets)
  res.json(tweets).status(204);
})

export default router