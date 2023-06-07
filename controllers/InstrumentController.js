import InstrumentModel from '../models/Instrument.js';

export const getLastTags = async (req, res)=>{
    try {
        const instrument = await InstrumentModel.find().limit(5).exec();
        const tags = instrument.map(obj => obj.tags).flat().slice(0, 5);
        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось получить список товаров',
        });
    }
}

export const changePrice = async (req,res)=> {
    try {
        const instrumentId = req.params.id;
        const instrument = await InstrumentModel.updateOne({
            _id: instrumentId,
        }, {
            price: req.body.price,
        })

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось изменить цену товара',
        });

    }
}

export const changeQuantity = async (req,res)=> {
    try {
        const instrumentId = req.params.id;
        const instrument = await InstrumentModel.updateOne({
            _id: instrumentId,
        }, {
            $set: {quantity: req.body.quantity},
            $inc: {quantity: -1}
        })

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось изменить количество товара',
        });

    }
}

export const remove = async(req,res)=>{
    try {

        const instrument = await InstrumentModel.findByIdAndDelete({_id: req.body._id});

        if (!instrument){
            return res.status(404).json({
                messege: 'Товара не существует',
            });
        }

        res.json(instrument);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            messege: 'Не удалось найти товар',
        });
    }
}

/* export const remove = async(req,res)=>{

    const instrumentId = req.params.id;

    InstrumentModel.findByIdAndDelete({
        _id: instrumentId,
    }, (err, doc)=>{
        if (err){
            console.log(err);
            return res.status(500).json({
                messege: 'Не удалось удалить товар',
            })
        }

        if (!doc){
            return res.status(404).json({
                messege: 'Не удалось найти товар',
            });
        }

        res.json({
            saccess: true,
        });
    })
} */

export const getOne = async(req,res)=>{
    try {

        const instrumentId = req.params.id;
        const instrument = await InstrumentModel.findOne({
            _id: instrumentId,
        })

        res.json(instrument);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            messege: 'Не удалось найти товар',
        });
    }
}

export const fromCategory_1 = async(req,res)=>{
    try {
        const category = await InstrumentModel.find({category: "Ударные инструменты"});

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось получить список товаров',
        });
    }
}

export const fromCategory_2 = async(req,res)=>{
    try {
        const category = await InstrumentModel.find({category: "Струнные инструменты"});

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось получить список товаров',
        });
    }
}

export const fromCategory_3 = async(req,res)=>{
    try {
        const category = await InstrumentModel.find({category: "Духовые инструменты"});

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось получить список товаров',
        });
    }
}

export const fromCategory_4 = async(req,res)=>{
    try {
        const category = await InstrumentModel.find({category: "Клавишные инструменты"});

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось получить список товаров',
        });
    }
}

export const getAll = async(req,res)=>{
    try {
        const instrument = await InstrumentModel.find();

        res.json(instrument);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось получить список товаров',
        });
    }
}

export const create = async (req, res) =>{
    try {

        const doc = new InstrumentModel({
        fullName: req.body.fullName,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        //image_instrument: req.body.image_instrument,
        });

        const instrument = await doc.save();

        res.json(instrument);


    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: 'Не удалось добавить товар',
        });
    }
};