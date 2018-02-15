/*
 *轮播区整体
 */
//step初始值
var step=0;
//轮播效果
function change(){
    var li=$(".slide ul.banner li").eq(step);
    li.css({"display":"block"}).siblings().css({"display":"none"});
    li.animate({opacity: 1,zIndex:1}, 400);
    var $circle=$(".slide .circle li").eq(4-step);
    $circle.addClass("show").siblings().removeClass("show");
}
var timer=window.setInterval(move,3000);
function move(){
    if(step==$(".slide ul.banner li").length-1){
        step=-1;
    }
    step++;
    change();
}
//点击焦点轮播
var circles=$(".slide .circle li");
circles.on("click",function(){
    var value=$(this).index();
    step=4-value;
    change();
});
/*
 *轮播侧边导航栏事件绑定
 */
$(".slide .nav .navLi").on("mouseenter",function(){
    var top=0;
    $(this).children(".navLiDetail").css({"display":"block","top":top});
}).on("mouseleave",function(){
    $(this).children(".navLiDetail").css({"display":"none"});
});
/*
 *明星商品区点击商品滚动
 */
    var product=$("section.products>div div.products");
    var length=product.innerWidth();
    var a=0;
$("section.products .title .box2").on("click",function(){
    var value=$(this).index();
    if(value==1){
        if(a==0){
            product.stop().animate({left:-(length*.5)},500);
            a++;
            $(this).css("color","#ccc").siblings().css("color","black");
        }
    }else {
        if(a==1){
            product.stop().animate({left:0},500);
            a--;
            $(this).css("color","#ccc").siblings().css("color","black");
        }
    }
});
/*鼠标移动到商品上时，商品介绍从底部移出显示*/
$("section.page-main .first-floor .box2 .right>div>div.product").on("mouseover",function(){
    $(this).find("div.text").stop().animate({bottom:0},300);
}).on("mouseout",function(){
    $(this).find("div.text").stop().animate({bottom:-80},300);
})
/*楼层中鼠标移入小标题切换产品内容*/
var li=$("section.page-main .first-floor .box1 .type li");
li.on("mouseover",function(){
    $(this).children("a").css("color","#FF6700").parent().siblings().children("a").css("color","black");
    var value=$(this).index();
    $(this).parent().parent().parent().siblings(".box2").children().eq(1).children().eq(value).css("display","block").siblings().css("display","none");
});
/*底部小轮播*/
$(".forth-floor .content div.box ul>li").click(function(){
    var num=$(this).index();
    $(this).addClass('choose').siblings("li").removeClass('choose');
    $(this).parent().prev().children().each(function(){
        if($(this).attr('id')==num){
            $(this).siblings().css({left:"100%"});
            $(this).animate({left:"0px"},200).addClass("now");
        }
    });
});