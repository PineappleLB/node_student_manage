var mysql = require('mysql');
var express = require('express');
var router = express.Router();
function mysql_util(db_host, db_root, db_password, db_base){

    var connection = mysql.createConnection({
        host     : db_host?db_host:'localhost',
        user     : db_root?db_root:'root',
        password : db_password?db_password:'123456',
        database : db_base?db_base:'student'
    });
    connection.connect();

    /**
     * 删除学生数据
     * @param sid 学生id
     * @param req request对象
     * @param resp response对象
     */
    function del(sid, req, resp){
        connection.query('DELETE FROM student WHERE sid=?', [sid], function(err, result){
            if(err){
                console.error('[DELETE ERROR]:' + err.message);
                resp.write({
                    code : 0,
                    message: err.message
                });
            }
            if(result.rowsAffected > 0){
                console.log('UPDATE SUCCESS!');
                resp.write({
                    dode : 200,
                    message:''
                });
            }
        })
    }

    /**
     * 查询学生信息
     * @param param 请求参数
     * @param req request对象
     * @param resp response对象
     */
    function select(param, req, resp){
        var sql = "SELECT * FROM student WHERE 1=1";
        var params = [];
        if(param.sid){
            sql += ' AND sid=?';
            params.push(param.sid);
        }
        if(param.name){
            sql += ' AND name=?';
            param.push(param.name);
        }

        connection.query(sql, params, function(err, result){
            resp.render('index', {
                students: result
            })
        });
    }

    /**
     * 更新学生数据
     * @param param 更新请求参数
     * @param req request对象
     * @param resp response对象
     */
    function upd(param, req, resp){
        //判断对象是否为空
        if(JSON.stringify(param) == "{}"){
            resp.write({
                code : 0,
                message : '更新参数为空！'
            })
        }
        //拼接sql
        var sql = "UPDATE student ";
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
        }
        sql = sql.substring(0, sql.lastIndexOf(','));
        connection.query(sql, params, function (err, result) {
            if(err){
                console.error('[UPDATE ERROR]:' + err.message);
                resp.write({
                    code : 0,
                    message: err.message
                });
            }
            if(result.rowsAffected > 0){
                console.log('UPDATE SUCCESS!');
                resp.write({
                    dode : 200,
                    message:''
                });
            }
        })
    }

    /**
     * 新增信息
     * @param param 新增参数
     * @param req request对象
     * @param resp response对象
     */
    function insert(param, req, resp){
        var sql = "INSERT INTO student (name, age, class) VALUES(?, ?, ?)";
        var params = [];
        //检验参数
        if(!param.name || !param.age || !param.class){
            resp.write({
                code : 0,
                message : '姓名， 年龄， 班级均不能为空！'
            })
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
                resp.write({
                    code : 0,
                    message: err.message
                });
            }
            if(result.rowsAffected){
                console.log('INSERT SUCCESS!');
                resp.write({
                    code : 200,
                    message : ''
                });
            }
        })
    }


}


