import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function authenticateToken(req, res, next){
    try {
    const authHeader = req.headers ['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.sendStatud(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403);

        console.log('user', user);
        req.user = user;
        next();
    });
} catch (error){
    res.status(401).json({ message: 'Usuario no autorizado' });
}
};