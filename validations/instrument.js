import { body } from 'express-validator';

export const instrumentValidation = [
    body('fullName', 'Введите название товара').isLength({min: 3}),
    body('category', 'Укажите категорию товара').isLength({min: 3}),
    body('dascription', 'Добавьте описание товара').isLength({min: 20}),
    body('price', 'Укажите стоимость товара').isNumeric({min: 1}),
    body('quantity', 'Укажите количество товара').isNumeric({min: 1}),
    //body('instrument_image', 'Неверная ссылка на изображение товара').optional().isURL(),
]