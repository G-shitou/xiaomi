//首次加载得到首页数据
window.onload=function(){
    //console.log(sessionStorage['id']);
    var id=sessionStorage['id'];
    ajax(id);
};
//ajax函数
function ajax(num){
    $.ajax({
        type:"POST",
        url:"/detail",
        data:{id:num},
        success:function(data){
            bind(data);
        },
        error:function(){
            console.log("网络出错故障，请重试");
        }
    });
}
//数据绑定函数
//绑定事件：点击加入购物车，保存商品id  点击立即购买，跳转到购物车页购买
function bind(data){
    var str='<div class="left box"><img src="'+data[0].url1+'"/><div class="mark"></div></div><div class="boxDetail"><img src="'+data[0].url2+'"/></div><div class="right"><h3 class="name">'+data[0].name+'</h3><p class="title">'+data[0].title+'</p><p class="count">库存:'+data[0].count+'</p><p class="price">'+data[0].price+'元</p><input type="button" name="" value="立即购买" class="buy"><input type="button" name="" value="加入购物车" class="shop"></div>';
    $("section.box").html(str);
    //点击加入购物车，cookie保存商品id和数量
    $("section.box .right .shop").on("click",function(event){
        addCookie();
        //加入购物车的特效
            var offset = $("section.topNav .right a:last-child").offset();  //结束的地方的元素
            var scrollTop=$(window).scrollTop();
            var box=$(event.target).parent().parent().children(".left");
            var img = box.children("img").attr('src');
            var flyer = $('<img class="u-flyer" src="'+img+'">');
            console.log(document.body.clientWidth);
            console.log(window.screen.width);
            flyer.fly({
                start: {
                    left: 150,
                    top: event.clientY-300
                },
                end: {
                    left: offset.left+10,
                    top: offset.top-scrollTop+10,
                    width: 0,
                    height: 0
                },
                onEnd: function(){
                    $("section.topNav .right>div").addClass('change');
                    this.destory();
                }
            });
    });
    //点击立即购买，跳转到购物车结算页，并且添加到cookie
    $("section.box .right .buy").on("click",function(){
        addCookie();
        //判断是否登录再跳转，没有登录就跳转到登录页
        if(sessionStorage['user']){
            window.location.href='/shop';
        }else{
            window.location.href='/login';
        }
    });
    //放大镜效果
    glass();
}
//添加cookie
function addCookie(){
    var classname=sessionStorage['id'];
    //先判断有没有此商品
    //如果存在,数量加1
    if($.cookie(classname)){
        var num=parseInt($.cookie(classname))+1;
        $.cookie(classname,num,{expires:15,path:'/'});
    }else{
        //如果是不存在，就保存这个ID，数量是1
        $.cookie(classname,1, { expires: 15, path: '/' });
    }
}
//放大镜
function glass(){
    var $mark = $("div.box>.mark");
    var $box = $("div.box");
    var $boxDetail = $(".boxDetail");
    $box.on("mouseenter", function (e) {
        $mark.stop().show();
        $boxDetail.stop().show();
        move(e);
    }).on("mousemove", move).on("mouseleave", function (e) {
        $mark.stop().hide();
        $boxDetail.stop().hide();
    });
    //move:计算MARK这个盒子的位置信息
    function move(e) {
        var boxOffset = $("div.box").offset();
        var curT = e.pageY - boxOffset.top- $mark.innerHeight() / 2;
        var curL = e.pageX - boxOffset.left - $mark.innerWidth() / 2;
        var minL = 0, minT = 0, maxL = $("div.box").innerWidth() - $mark.innerWidth()+1, maxT = $("div.box").innerHeight() - $mark.innerHeight();
        curL = curL <= minL ? minL : (curL >= maxL ? maxL : curL);
        curT = curT <= minT ? minT : (curT >= maxT ? maxT : curT);
        $mark.css({
            top: curT,
            left: curL
        });
        $boxDetail.children("img").css({
            top: -curT * 1.9,
            left: -curL * 2
        });
    }
}