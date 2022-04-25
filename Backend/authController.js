const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./config')

//создание токена
const generateAccessToken = (id,login) => {
    const payload = {
        id,
        login
    }
    return jwt.sign(payload,secret, {expiresIn: '15min'})
}

//класс для удобного экспортирования функций
class authController {
    async signup(req,res) { //регистрация
        try {

            const error = validationResult(req)
            if (!error.isEmpty){        //проверяется наличие ошибки
                return res.redirect('/') //если есть, вереводит на главную сайта
                // return res.status(400).json({message:'Ошибка при регистрации'})
            } 
            const {login,email,password} = req.body //достаем из тела запроса поля

            const candidate = await User.findOne({login}) //проверка, есть литакой пользователь уже
            if (candidate) {
                return res.redirect('/')
                // return res.status(400).json({message:`Пользователь ${login} уже существует!`})
            }
            const hashPassword = bcrypt.hashSync(password,7) //хэшируем(зашифровываем пароль)
            const user = new User({login,email,password:hashPassword})  //заполняем таблицу введенными данными
            await user.save()  //сохраняем таблицу
            return res.redirect('/')
            // return res.json({message:'Пользователь успешно создан'})
            
            
        } catch (er) {
            console.log(er)
            return res.redirect('/')
            // res.status(400).json({message: 'Ошибка регистрации'})

        }

    }

    
    async signin(req,res) { //вход
        try {
            const {login,password} = req.body //достаем поля
            // console.dir(req)
            const user = await User.findOne({login}) //ищем пользователя в бд
            if (!user) {
                return res.redirect('/')
                // res.status(400).json({message: `Пользователя ${login} не существует! Зарегистрируйтесь`})
            }
            const validPassword = bcrypt.compareSync(password,user.password) //сравниваем пароли 
            if (!validPassword) {
                return res.redirect('/')
                // res.status(400).json({message: `Неверный пароль`})
            }
            const token = generateAccessToken(user._id,user.login) //создаем токен

            res.cookie('token',token,{  //сохраняем его в cookie
                httpOnly: true
            })

            return res.redirect('/')

            // return res.json({token: token})
            
            
        } catch (er) {
            console.log(er)
            return res.redirect('/')
            res.status(400).json({message: 'Ошибка авторизации'})
        }
    }

}

module.exports = new authController()