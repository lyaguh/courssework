const {Router} = require('express')
const Article = require('../models/articles')
const router = Router()
const {cookieJwtAuth} = require('../middleware/cookieJwtAuth')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

//основные роуты сайта

router.get('/', (req, res) => {
    if (req.cookies.token){ //если токен есть в куки(т.е пользователь зашел в аккаунт)
        res.render('main', {
            title: 'Главная',
            layout: 'loggedIn', //отрисовываем страницу с шаблоном, где есть страница "Написать статью"
        })
    } else
    {res.render('main', {
        title: 'Главная', //отрисовываем страницу с шаблоном, где нет страницы "Написать статью"
    })}
    // res.sendFile('D:/course(3)work/Frontend/index.html');
});

router.get('/ring', (req, res) => {
    if (req.cookies.token){
        res.render('ring', {
            layout: 'loggedIn',

        })
    } else
    {res.render('ring')}
    // res.sendFile('D:/course(3)work/Frontend/ring.html')
})
  
router.get('/articles', async (req, res) => {
    const articless = await Article.find({}).lean()
    if (req.cookies.token){
        res.render('articles', {
            title: 'Статьи',
            isArticles: true,
            layout: 'loggedIn',
            articless
        })
    } else
    {res.render('articles', {
        title: 'Статьи',
        isArticles: true,
        articless
    })}
})

router.get('/article*', async (req,res) => {
    const currentId = req.url.replace('/article','')
    const currentArticle = await Article.findById(currentId).lean()
    if (req.cookies.token){
        res.render('article', {
            isArticles: true,
            title: currentArticle.label,
            layout: 'loggedIn',
            currentArticle
        })
    } else
    {res.render('article', {
        isArticles: true,
        title: currentArticle.label,
        currentArticle
    })}



    
    })




  
router.get('/writearticle',cookieJwtAuth, (req, res) => { //применяем middleware,который 
    //проверяет токен , если все нормально и ссработала функция next(), запрос продолжается
    res.render('writearticle', {
        title: 'Написать статью',
        isWrite: true,
        layout: 'loggedIn'
    })
})
  
router.get('/logout',(req,res) => {
    res.clearCookie('token')
    return res.redirect('/')
})



router.post('/writearticle',cookieJwtAuth, async (req, res) => {
    const payload = jwt.verify(req.cookies.token,secret)
    const article = new Article({
        label: req.body.articleLabel,
        author: payload.login,
        content: req.body.articleBody
    })
    await article.save()
    res.redirect('/articles')
  })

  

module.exports = router 