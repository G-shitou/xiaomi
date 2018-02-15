//邮箱验证
$(".content input.user").blur(function(){
    var reg=/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
    if(!$(".content input.user").val()){
        $("p.user").html("用户名不能为空,请输入用户名!");
    }else if(!reg.test($(".content input.user").val())){
        $("p.user").html("邮箱格式不正确!");
    }else{
        $.ajax({
            type:"POST",
            url:"/signup",
            data:{name:$(".content input.user").val()},
            success:function(data){
                if(data.code>0){
                    //大于0证明用户名重复,提示占用
                    $("p.user").html("您输入的用户名已存在，请重新输入!");
                }else{
                    $("p.user").html("");
                }
            },
            error:function(){
                console.log("网络出错故障，请重试");
            }
        });
    }
});




//密码是否一致
$(".content input.repwd").blur(function(){
    if($(".content input.repwd").val()!=$(".content input.pwd").val()){
        $("p.repwd").html("密码不一致,请重新输入!");
    }else{
        $("p.repwd").html("");
    }
});




//手机号码验证
$(".content input.tel").blur(function(){
    var reg=/^1[34578]\d{9}$/;
    if(!$(".content input.tel").val()){
        $("p.tel").html("电话不能为空,请输入电话!");
    }else if(!reg.test($(".content input.tel").val())){
        $("p.tel").html("手机格式不正确!");
    }else{
        $.ajax({
            type:"POST",
            url:"/signup",
            data:{tel:$(".content input.tel").val()},
            success:function(data){
                if(data.code>0){
                    $("p.tel").html("您输入的电话已注册，请重新输入!");
                }else{
                    $("p.tel").html("");
                }
            },
            error:function(){
                console.log("网络出错故障，请重试");
            }
        });
    }
});





//注册提交
$(".content>input.signup").on("click",function(){
    $.ajax({
        type:"POST",
        url:"/signup",
        data:{name:$(".content input.user").val(),pwd:$(".content input.pwd").val(),tel:$(".content input.tel").val()},
        success:function(data){
            if(data.code>0){
                $(function(){
                    window.location.href="/login";
                });
            }else{
                $("p.signup").html("注册失败,请稍后再试!");
            }
        },
        error:function(){
            console.log("网络出错故障，请重试");
        }
    });
});