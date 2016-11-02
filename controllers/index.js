/**
 * Created by ruidge on 2016/2/2.
 */
module.exports.indexRoot = function (req, res, next) {
    //res.render('index/index', {title: 'ruidge'});
    res.render('index', {title:'ruidge'});
}


module.exports.indexBlog = function (req, res, next) {
    //res.render('index/blog', {title: 'blog'});
    res.redirect('/md');
}

module.exports.indexMock = function (req, res, next) {
    res.render('index/mock', {title: 'mock'});
}

module.exports.indexAbout = function (req, res, next) {
    res.render('index/about', {title: 'about'});
}