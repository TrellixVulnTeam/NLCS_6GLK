const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const Authorization = req.header('authorization');
    if(Authorization === undefined){
        console.log("dsadsd");
    }else{
        console.log("11111111111");
    }
    
    if(!Authorization){
        // Error: Unauthorized
        const err = new Error('Unauthorized!');
        err.statusCode = 401;
        return next(err);
    }
    // Get token
    const token = Authorization.replace('Bearer ','');
    // verify token
    const {userId} = jwt.verify(token, process.env.APP_SECRET);
    console.log(userId);
    // Assign req
    req.user = {userId};
    next();
}