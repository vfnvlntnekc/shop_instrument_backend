import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import multer from 'multer'
import fs from 'fs';

import {registerValidation, loginValidation, registerValidationManager, loginValidationManager} from './validations/auth.js';
import {instrumentValidation} from './validations/instrument.js';

import checkAuth from './utils/checkAuth.js';
import checkAuthManager from './utils/checkAuthManager.js';


import * as UserController from './controllers/UserController.js';
import * as InstrumentController from './controllers/InstrumentController.js';
import * as ManagerController from './controllers/ManagerController.js';
import * as OrderController from './controllers/OrderController.js';

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.ap7dfe0.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads') )

app.get('/', (req, res) => {
    res.send('ПРИВЕТ)))');
});

app.post('/auth/login', loginValidation, UserController.login );
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/auth/login_manager', loginValidationManager, ManagerController.login ); 
app.post('/auth/register_manager', registerValidationManager, ManagerController.register);  
app.get('/auth/me_manager', checkAuthManager, ManagerController.getMe);

app.get('/tags', instrumentValidation, InstrumentController.getLastTags);

app.post('/instrument', instrumentValidation, InstrumentController.create); // добавить проверку на менеджера
app.get('/instrument', instrumentValidation, InstrumentController.getAll);
app.get('/instrument/tags', instrumentValidation, InstrumentController.getLastTags);
app.get('/instrument/:id', instrumentValidation, InstrumentController.getOne);
app.delete('/instrument/:id', instrumentValidation, InstrumentController.remove);
app.patch('/instrument/:id', InstrumentController.changeQuantity);
app.patch('/instrument/price/:id', InstrumentController.changePrice);

app.post('/order',  OrderController.create);
app.patch('/status/:id', OrderController.changeStatus);
app.patch('/cost/:id', OrderController.changeCost);
app.get('/order/:id', OrderController.getOrder);
app.delete('/order/:id', OrderController.remove);
app.patch('/order/:id', OrderController.update);

//добавить удаление товара из корзины

app.get('/category_1', instrumentValidation, InstrumentController.fromCategory_1); // выбор по категориям
app.get('/category_2', instrumentValidation, InstrumentController.fromCategory_2); // выбор по категориям
app.get('/category_3', instrumentValidation, InstrumentController.fromCategory_3); // выбор по категориям
app.get('/category_4', instrumentValidation, InstrumentController.fromCategory_4); // выбор по категориям


app.listen(4444, (err)=>{
    if (err) {
        return console.log(err);
    }

    console.log('Server ok');
});
