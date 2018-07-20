var express = require('express');
var url = require('url');
var mysql_util = require('./mysql_util');
var router = express.Router();

/* GET home page. */
//get请求可以使用url.parse(req.url, true).query;获取请求参数， 或者是req.query获取请求参数
//post请求可以使用req.body获取请求参数
router.get('/', function(req, resp, next) {
    var params = url.parse(req.url, true).query;
    mysql_util.select(params, req, resp);
});

module.exports = router;
