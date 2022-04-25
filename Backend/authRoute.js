const Router = require('express');
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const passport = require('passport')

//post запрос по адресу /signin обслуживает контроллер signup
router.post('/signup',[
    check('login','Имя пользователя не может быть пустым').notEmpty(), //ограничения на ввод данных
    check('email','Электронная почта не может быть пустjq').notEmpty(),
    check('password','Пароль должен иметь минимум 8 символов').isLength({min:8})

], controller.signup)

//post запрос по адресу /signin обслуживает контроллер signin
router.post('/signin', controller.signin)


module.exports = router