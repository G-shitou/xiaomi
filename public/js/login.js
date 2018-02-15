$(".btn").on("click",function(){
    var namevalue=$(".name").val();
    var pwdvalue=$(".pwd").val();
    $.ajax({
        type:"POST",
        url:"/login",
        data:{name:namevalue,pwd:pwdvalue},
        success:function(data){
            if(data.code>0){
                sessionStorage['user']=data.name;
                //这是登录成功，跳转到首页
                $(function(){
                    window.location.href="/";
                });

            }else{
                console.log(data);
                alert("用户名或密码错误，请重新输入！");
            }
        },
        error:function(){
            console.log("网络出错故障，请重试");
        }
    });
});