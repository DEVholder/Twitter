import express from 'express';
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from '../middleware/auth.js';

const router = express();

const validateSignin = [
  body('username').trim().isLength({min:3}).withMessage('최소 3글자 이상 입력!'), 
  body('password').trim().isLength({min:4, max:20}).withMessage('비밀번호는 4~20자리 압력!'),
]
// username, password, name, email
const validateSignUp = [
  ...validateSignin,
  body('name').trim().isLength({min:2, max:10}).withMessage('이름은 2~10글자로 입력'),
  body('email').notEmpty().isEmail().withMessage('이메일을 입력하세요!'),
  validate
]

// 회원가입
// http://localhost:8080/auth/signup
router.post('/signup', validateSignUp, authController.SignUp)

// 로그인
// http://localhost:8080/auth/login
router.post('/login', validateSignin, authController.login)

// 로그인 상태 확인
router.get('/me', isAuth, authController.me)

export default router