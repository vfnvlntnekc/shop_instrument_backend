import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({min: 8}),
    body('fullName','Укажите имя').isLength({min: 3}),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({min: 8}),
]

export const registerValidationManager = [
    
]

export const loginValidationManager = [
    
]