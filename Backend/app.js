const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const authRouter = require('./authRoute')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const mustheRoutes = require('./routes/musthe')

const app = express();
const host = '127.0.0.1';
const port = process.env.PORT || 7000;

app.use(express.static('D:/course(3)work/Frontend')) //подклюяаем static файлы(js,css)
app.use(express.json()) //используем json
app.use(cookieParser()) //используем cookieParser для добавления токена в cookie
app.use(express.urlencoded({ extended: true })) //позволяет использовать req.body?

// настраиваем шаблонизатор
const hbs = exphbs.create({
  defaultLayout:'mainArticle',
  extname:'hbs' 
})
 

app.engine('hbs',hbs.engine) //активируем шаблонизатор
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use('/auth', authRouter) //используем роутер после url /auth
app.use(mustheRoutes) //используем основной роутер




const start = async () => {
  try {
    await mongoose.connect(''); //подключаемся к бд
    //запускаем сервер
    app.listen(port, host , () => console.log(`Server listens http://${host}:${port}`))
  }catch(er) {
    console.log(er)
  }
}


// app.use(passport.initialize())
// require('./middleware/passport')(passport)





start()