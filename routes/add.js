var express = require('express');
var url = require('url');
var router = express.Router();
var mysql_util = require('./mysql_util');

/* GET home page. */
//get请求可以使用url.parse(req.url, true).query;获取请求参数， 或者是req.query获取请求参数
//post请求可以使用req.body获取请求参数
router.get('/', function(req, res, next) {
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    console.log(params);
    mysql_util.insert(params, req, res);
});

module.exports = router;
