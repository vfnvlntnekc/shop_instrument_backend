import OrderModel from '../models/Order.js';
import InsrtumentModel from '../models/Instrument.js';

export const changeCost = async (req,res)=> {
    try {

        const orderId = req.params.id;
        //const productId = req.body.productId; 

        const updatedOrder = await OrderModel.findOneAndUpdate(
        { _id: orderId },
        { products: [] },
        { new: true }
        );

        const product = await InsrtumentModel.findById(productId);

        const newCost = 0;
        const updatedOrderWithCost = await OrderModel.findOneAndUpdate(
        { _id: orderId },
        { cost: newCost },
        { new: true }
        );

        res.json(updatedOrderWithCost);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось изменить заказ',
        });

    }
}

export const update = async (req,res)=> {
    try {

        const orderId = req.params.id;
        const productId = req.body.productId; 

        const updatedOrder = await OrderModel.findOneAndUpdate(
        { _id: orderId },
        { $push: { products: productId } },
        { new: true }
        );

        const product = await InsrtumentModel.findById(productId);

        const newCost = updatedOrder.cost + product.price;
        const updatedOrderWithCost = await OrderModel.findOneAndUpdate(
        { _id: orderId },
        { cost: newCost },
        { new: true }
        );

        res.json(updatedOrderWithCost);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось изменить заказ',
        });

    }
}

export const remove = async(req,res)=>{
    try {

        const order = await OrderModel.findByIdAndDelete({_id: req.params.id});

        if (!order){
            return res.status(404).json({
                messege: 'Заказа не существует',
            });
        }

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            messege: 'Не удалось удалить заказ',
        });
    }
}

export const getOrder = async (req,res)=> {
    try {

        const orderId = req.params.id;
        const order = await OrderModel.findOne({
            clientId: orderId,
        })

        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось найти заказ',
        });

    }
}

export const changeStatus = async (req,res)=> {
    try {

        const orderId = req.params.id;
        const order = await OrderModel.updateOne({
            _id: orderId,
        }, {
            statusId: req.body.statusId,
        })

        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось изменить статус заказа',
        });

    }
}

export const create = async (req, res) =>{
    try {
        const doc = new OrderModel({
        statusId: false,
        clientId: req.body.clientId,
        managerId: req.body.managerId,
        cost: 0,
        products: [],
        });

        const order = await doc.save();

        res.json(order);
        //res.json('Корзина пуста');

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось создать заказ',
        });
    }
};