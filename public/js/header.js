$("#header").load("header.html",function(){
    var user=sessionStorage['user'];
    //已经登陆了，就加载登录状态
    if(user){
        $(".topNav .right ul .login").css("display","none").siblings(".user").css("display","block").parent("ul").children("li:last-child").children("a").html(user);
    }
    var navOffset=$("section.topNav").offset().top;
    $(window).scroll(function(){
        var scrollPos=$(window).scrollTop();
        if(scrollPos >=navOffset){
            $("section.topNav").addClass("fixed");
        }else{
            $("section.topNav").removeClass("fixed");
        }
    });
    $(".topNav .right div").click(function(){
        window.location.href="/shop";
    });
    $(".topNav .right li.turn a").on("click",function(){
        sessionStorage['user']="";
    });

});

