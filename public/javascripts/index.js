/**
 * 根据{by} 查询条件查询学生信息
 * @param by
 */
function selectStudent(by){
    var path = '';
    if(by){
        if(by === 'sid'){
            var sid = parseInt($('#search')[0].value);
            path +='?sid=' + sid;
        }
        if(by === 'name'){
            var name = $('#search').val();
            path +='?name=' + name;
        }
        location.href="/" + path;
    }
}


/**
 * 根据id删除学生信息
 * @param sid
 */
function del(sid){
    $.get("/del", {sid:sid}, function(resp){
        console.log(resp)
        if(resp.code == 200){
            alert('删除成功!')
            location.reload();
        } else {
            alert(resp.message);
        }
    })
}

/**
 * 添加学生信息
 * @returns {boolean}
 */
function addSubmit(){
    $.get($(this).attr('action'), $(this).serialize(), function(data){
        if(data.code == 200){
            alert('添加成功！');
            location.reload();
        } else {
            alert(data.message);
        }
    });
    return false;
}

/**
 * 更新学生信息
 * @returns {boolean}
 */
function updSubmit(){
    $.post($(this).attr('action'), $(this).serialize(), function(data){
        if(data.code == 200){
            alert('修改成功！');
            location.reload();
        } else {
            alert(data.message);
        }
    });
    return false;
}

$(function(){
    //模态框显示事件
    $('#stuModel').on("show.bs.modal", function (e) {
        var source = $(e.relatedTarget);
        if(source.attr('id') == 'addBtn'){
            $('#myForm').attr('action', '/add');
            $('#sid_div').hide();
            $('#sid').removeAttr('readonly');
            $('#sid').val('');
            $('#name').val('');
            $('#age').val('');
            $('#class').val('');
            $('#myForm').submit(addSubmit);
        } else {
            var sourceTds = source.parent().parent().children('td');
            $('#myForm').attr('action', '/upd');
            $('#sid_div').show();
            $('#sid').attr('readonly', true);
            $('#sid').val(sourceTds.eq(0).html());
            $('#name').val(sourceTds.eq(1).html());
            $('#age').val(sourceTds.eq(2).html());
            $('#class').val(sourceTds.eq(3).html());
            $('#myForm').submit(updSubmit);
        }
    });
});

