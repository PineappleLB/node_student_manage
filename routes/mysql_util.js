var mysql = require('mysql');
var express = require('express');
var router = express.Router();//需要在其他router使用此文件需要引入此模块，并且在文件末尾声明module.exports = router;导出

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'student'
    });
    connection.connect();

    /**
      * 查询学生信息
      * @param param 请求参数
      * @param req request对象
      * @param resp response对象
      */
    router.select = function (param, req, resp){
        var sql = "SELECT * FROM student WHERE 1=1";
        var params = [];
        if(param.sid){
            sql += ' AND sid=?';
            params.push(param.sid);
        }
        if(param.name){
            sql += " AND name LIKE CONCAT('%', ?, '%')";
            params.push(param.name);
        }
        connection.query(sql, params, function(err, result){
            resp.render('index', {
                students: result,
            })
        });
    }

    /**
      * 删除学生数据
      * @param sid 学生id
      * @param req request对象
      * @param resp response对象
      */
    router.del = function(sid, req, resp){
        connection.query('DELETE FROM student WHERE sid=?', [sid], function(err, result){
            if(err){
                console.error('[DELETE ERROR]:' + err.message);
                resp.send({
                    code : 0,
                    message: err.message
                });
                resp.end();
            }
            if(result.affectedRows > 0){
                console.log('UPDATE SUCCESS!');
                resp.send({
                    code : 200,
                    message:''
                });
                resp.end();
            }
        })
    }

    /**
     * 新增信息
     * @param param 新增参数
     * @param req request对象
     * @param resp response对象
     */
    router.insert = function (param, req, resp){
        var sql = "INSERT INTO student (name, age, class) VALUES(?, ?, ?)";
        var params = [];
        //检验参数
        if(!param.name || !param.age || !param.class){
            resp.send({
                code : 0,
                message : '姓名， 年龄， 班级均不能为空！'
            })
            resp.end();
        }
        if(param.name){
            params.push(param.name);
        }
        if(param.age){
            params.push(param.age);
        }
        if(param.class){
            params.push(param.class);
        }
        connection.query(sql, params, function (err, result) {
            if(err){
                console.error('[DELETE ERROR]:' + err.message);
                resp.send({
                    code : 0,
                    message: err.message
                });
                resp.end();
            }
            if(result.affectedRows){
                console.log('INSERT SUCCESS!');
                resp.send({
                    code : 200,
                    message : ''
                });
                resp.end();
            }
        })
    }

    /**
     * 更新学生数据
     * @param param 更新请求参数
     * @param req request对象
     * @param resp response对象
     */
    router.upd = function (param, req, resp){
        //判断对象是否为空
        if(JSON.stringify(param) == "{}"){
            resp.send({
                code : 0,
                message : '更新参数为空！'
            })
            resp.end();
        }
        //拼接sql
        var sql = "UPDATE student SET ";
        var params = [];
        if(param.name){
            sql += ' name=?,';
            params.push(param.name);
        }
        if(param.age){
            sql += 'age=?,';
            params.push(param.age);
        }
        if(param.class){
            sql += ' class=?,';
            params.push(param['class']);
        }
        sql = sql.substring(0, sql.lastIndexOf(','));
        sql += 'WHERE sid=?';
        params.push(param.sid);
        console.log(sql)
        connection.query(sql, params, function (err, result) {
            if(err){
                console.error('[UPDATE ERROR]:' + err.message);
                resp.send({
                    code : 0,
                    message: err.message
                });
                resp.end();
            }
            if(result.affectedRows > 0){
                console.log('UPDATE SUCCESS!');
                resp.send({
                    code : 200,
                    message:''
                });
                resp.end();
            }
        })
    }

module.exports = router;


