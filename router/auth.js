import express from 'express';
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";

const router = express();

// username, password, name, email
const validateSignUp = [
  body('username').trim().isLength({min:3}).withMessage('최소 3글자 이상 입력!'), 
  body('password').trim().isLength({min:4, max:20}).withMessage('비밀번호는 4~20자리 압력!'),
  body('name').trim().isLength({min:2, max:10}).withMessage('이름은 2~10글자로 입력'),
  body('email').notEmpty().isEmail().withMessage('이메일을 입력하세요!'),
  validate
]
const validateSignin = [
  body('username').trim().isLength({min:3}).withMessage('최소 3글자 이상 입력!'), 
  body('password').trim().isLength({min:4, max:20}).withMessage('비밀번호는 4~20자리 압력!'),
]

// 모든 사용자 리스트를 출력
// http://localhost:8080/auth
router.get('/', authController.getAllUser)

// username에 해당하는 사용자 정보 출력
// http://localhost:8080/auth?username=
router.get('/:username', authController.getUser)

// 회원가입
// http://localhost:8080/auth/signup
router.post('/signup', validateSignUp, authController.SignUp)

// 로그인
// http://localhost:8080/auth/login
router.post('/login', validateSignin, authController.login)

// 회원정보 수정
// http://localhost:8080/auth
router.put('/', validateSignUp, authController.editUser)

// 회원탈퇴
// http://localhost:8080/auth
router.delete('/', authController.DeleteUser)

router.get('/me', authController.verify)

export default router