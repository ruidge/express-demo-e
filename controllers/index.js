/**
 * Created by ruidge on 2016/2/2.
 */
module.exports.indexRoot = function (req, res, next) {
    res.render('index', {title: 'ruidge'});
}


module.exports.indexBlog = function (req, res, next) {
    res.render('blog', {title: 'blog'});
}

module.exports.indexMock = function (req, res, next) {
    res.render('mock', {title: 'mock'});
}

module.exports.indexAbout = function (req, res, next) {
    res.render('about', {title: 'about'});
}