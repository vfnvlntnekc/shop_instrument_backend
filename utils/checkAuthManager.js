import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded1 = jwt.verify(token, 'secret12');
            req.managerId = decoded1._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет Доступа',
            });
        }
    }else{
        return res.status(403).json({
            message: 'Нет Доступа',
        });
    }

}