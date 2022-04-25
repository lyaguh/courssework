const jwt = require('jsonwebtoken')
const {secret} = require('../config')


//проверка токена
exports.cookieJwtAuth = (req,res,next) => {
    const token = req.cookies.token //достаем токен из cookie
    try {
        const user = jwt.verify(token,secret)  //проверяем токен
        req.user = user
        next() //идем дальше 
    } catch(er) {
        res.clearCookie('token') //если токен не сошелся, удаляем 
        return res.redirect('/')
    }

}