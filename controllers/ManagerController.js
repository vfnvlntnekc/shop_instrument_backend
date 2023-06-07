import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {validationResult} from 'express-validator';

import ManagerModel from '../models/Manager.js';

export const register = async (req, res)=> {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const  salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new ManagerModel({
        fullName: req.body.fullName,
        passwordHash: hash,
        });

        const manager = await doc.save();

        const token = jwt.sign(
            {
            _id: manager._id,
            },
            'secret12',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ... managerData} = manager._doc;

        res.json({
            ... managerData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось зарегистрироваться',
        });

    }
    
}

export const login = async (req, res) => {
    try{
        const manager = await ManagerModel.findOne({fullName: req.body.fullName});

        if (!manager){
            return res.status(404).json({
                message: 'Пользователь не найден', // на практике лучше писать: "Неверный логин или пароль"
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, manager._doc.passwordHash);

        if (!isValidPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль', 
            });
        }

        const token = jwt.sign(
            {
            _id: manager._id,
            },
            'secret12',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ... managerData} = manager._doc;

        res.json({
            ... managerData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось авторизоваться',
        });
    }
}

export const getMe = async (req,res) => {
    try{
        const manager = await ManagerModel.findById(req.managerId);

        if (!manager){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const {passwordHash, ... managerData} = manager._doc;

        res.json(managerData);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
}