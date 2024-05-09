import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

// const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userid, us.username, us.name, us.email, us.url from tweets as tw join users us on tw.userid = us.id'
// const ORDER_DESC ='order by tw.createdAt desc'

const DataTypes = SQ.DataTypes;
const Sequelize = sequelize;
const INCLUDE_USER = {
  attributes:[
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('User.name'), 'name'],
    [Sequelize.col('User.username'), 'username'],
    [Sequelize.col('User.url'), 'url']
  ], 
  include:{
    model: User,
    attributes: [],
  }
}
const ORDER_DESC = {
  order:[['createdAt', 'DESC']]
}

const Tweet = sequelize.define('tweet',{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  text:{
    type:DataTypes.STRING(2000),
    allowNull: false,
  }
}, { timestamps: false})
Tweet.belongsTo(User);

// export const Tweet = sequelize.define(
//   'tweet',
//   {
//     id:{
//       type:DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     userid:{
//       type:DataTypes.INTEGER,
//       references:{
//         model:'user',
//         key:'id',
//       },
//       allowNull: false
//     },
//     text:{
//       type:DataTypes.STRING(2000)
//     }
//   },
//   { timestamps: false}
// )

// Tweet.belongsTo(User,{
//   foreignKey: 'userid'
// })

// 모든 트윗을 리턴
export async function getAll(){
  return Tweet.findAll({...INCLUDE_USER,...ORDER_DESC});
};

// 아이디로 해당 아이디에 대한 트윗을 리턴
export async function getAllByusername(username){
  // return Tweet.findOne({include:[{model:User,where:{username}}]})
  return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC, include:{
    ...INCLUDE_USER.include, where:{username}
  }})
}

// 글 번호에 대한 트윗을 리턴
export async function getById(id){
  return Tweet.findOne({where:{id}, ...INCLUDE_USER});
}

// 트윗을 작성
export async function create(text, userId){
//   return db.execute(`insert into tweets (text, userid) values (?, ?)`, [text, userid])
//             .then((result)=>{
//               // console.log(result);
//               return getById(result[0].insertId)
//             })
  // return Tweet.create({userid, text}).then((data)=>getById(data.dataValues.id))
  console.log(userId)
  return Tweet.create({text, userId}).then((data)=>this.getById(data.dataValues.id));
}

// 트윗을 변경
export async function update(id, text){
  return Tweet.findByPk(id, INCLUDE_USER).then((tweet)=>{
    tweet.text = text;
    return tweet.save();
  })
}

// 트윗을 삭제
export async function remove(id){
  return Tweet.findByPk(id).then((tweet)=>{
    tweet.destroy();
  })
}