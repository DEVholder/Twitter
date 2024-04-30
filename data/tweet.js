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

// 모든 트윗을 리턴
export async function getAll(){
  return tweets;
};

// 아이디로 해당 아이디에 대한 트윗을 리턴
export async function getAllByusername(username){
  return tweets.filter((tweet) => tweet.username == username)
}

// 글 번호에 대한 트윗을 리턴
export async function getById(id){
  return tweets.find((tweet)=>tweet.id == id)
}

// 트윗을 작성
export async function create(text, name, username){
  try{
    const tweet = {
      id:tweets.length+1,
      text,
      createAt:Date.now().toString(),
      name,
      username,
      url:''
    }
    tweets = [...tweets,tweet];
    return tweets
  }catch(err){
    console.log(`트윗 작성 에러 발생 ${err}`)
    return false;
  }
}

// 트윗을 변경
export async function update(id, text){
  try{
    const tweet = tweets.find((tweet)=>tweet.id == id);
    if(tweet){
      tweet.text = text;
      return tweet;
    }
    else return false;
  }catch(err){
    console.log(`트윗 변경 에러 발생 ${err}`)
    return false;
  }
}

// 트윗을 삭제
export async function remove(id){
  const tweetslen = tweets.length;
  tweets = tweets.filter((tweet)=>tweet.id != id);
  if(tweets.length != tweetslen) return true;
  else return false;
}