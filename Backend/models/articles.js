const {Schema,model} = require('mongoose')

const Article = new Schema({
    label: {type: String, requires: true},
    author: {type: String, ref: 'user'},
    content: {type: String, requires: true},
    photo: {type: String}

})

module.exports = model('Article', Article)