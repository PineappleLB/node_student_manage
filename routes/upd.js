var express = require('express');
var url = require('url');
var router = express.Router();
var mysql_util = require('./mysql_util');

/* GET home page. */
//get请求可以使用url.parse(req.url, true).query;获取请求参数， 或者是req.query获取请求参数
router.get('/', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    console.log(params);
    mysql_util.upd(params, req, res);
});

//post请求可以使用req.body获取请求参数
router.post('/', function (req, res, next) {
    console.log('recived data')
    // 解析参数
    var params = req.body;
    console.log(params);
    mysql_util.upd(params, req, res);
})

module.exports = router;
