const {Schema,model} = require('mongoose')

const User = new Schema({
    login: {type: String, unique: true, requires: true},
    email: {type: String, requires: true},
    password: {type: String, requires: true},
    favorites: [{type: String, ref: 'articles'}]

})
 
module.exports = model('User', User)