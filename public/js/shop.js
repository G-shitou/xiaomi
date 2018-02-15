//发送AJAX请求购物车数据
window.onload=function(){
    $.ajax({
        type:"POST",
        url:"/shop",
        data:$.cookie(),
        success:function(data){
            bind(data);
            //计算函数
            sum();
            //点击单选框函数
            aloneClick();
            //点击加减号
            change();
            //删除商品
            deleteOne();
        },
        error:function(){
            console.log("网络出错故障，请重试");
        }
    });
}
//数据绑定
function bind(data){
    var str='';
    for(var value of data){
        var num=value.id.toString();
        str+='<div class="product"><ul><li><input type="checkbox" name="" class="choose" ><img src="'+value.url+'" alt=""></li><li>'+value.name+'</li><li>规格:默认 标配</li><li class="price">'+value.price+'</li><li><a href="javascript:;" class="down">-</a><span>'+$.cookie(num)+'</span><a href="javascript:;" class="add">+</a></li><li>￥'+value.price*$.cookie(num)+'</li><li><a href="javascript:;" class="'+value.id+'">移除商品</a></li></ul></div>';
    }
    $("section.shop div.shop").html(str);
}
//单个选取商品，sum函数计算
function aloneClick(){
    $("section.shop .shop input.choose").change(function(){
        if($(this).is(':checked')){
            $(this).prop("checked",true);
        }else{
            $(this).prop("checked",false);
        }
        sum();
    });
}
//点击加号减号事件
function change(){
    //点击减号
    $("section.shop .product a.down").click(function(event){
        var num=parseInt($(event.target).next("span").html());
        if(num>0){
            $(event.target).next("span").html(num-1);
            var price=parseInt($(event.target).parent().prev("li").html());
            $(event.target).parent().next("li").html('￥'+price*(num-1));
        }
        sum();
    });
    $("section.shop .product a.add").click(function(event){
        var num=parseInt($(event.target).siblings("span").html());
        $(event.target).siblings("span").html(num+1);
        var price=parseInt($(event.target).parent().prev("li").html());
        $(event.target).parent().next("li").html('￥'+price*(num+1));
        sum();
    });
}
//全选或者全不选
//attr会导致第二次以后选不上，改用prop
var checked=0;
$("section.shop .title .chooseAll").click(function(){
    if(checked==0){
        checked=1;
        $("section.shop .shop input.choose").each(function() {
            $(this).prop("checked", true);
        });
    }else{
        checked=0;
        $("section.shop .shop input.choose").each(function() {
            $(this).prop("checked", false);
        });
    }
    sum();
});
//计算商品件数和总价值sum函数
function sum(){
    var count=0,sum=0;
    $("section.shop div.product").each(function(){
            if($(this).children("ul").children("li:first-child").children("input.choose").is(':checked')){
                var a=parseInt($(this).children("ul").children("li:nth-child(5)").children("span").html());
                var b=parseInt($(this).children("ul").children("li:nth-child(4)").html());
                count+=a;
                sum+=a*b;
            };
        $("div.bottom .count strong").html(count);
        $("div.bottom .monny strong").html('￥'+sum);
    });
}
//移除商品
function deleteOne(){
    $("section.shop .product li:last-child a").click(function(){
        if(confirm("确定要删除此商品吗?")==true){
            $(this).parent().parent().parent().remove();
            var id=parseInt($(this).attr('class'));
            $.cookie(id, '', { expires: -1 });
            sum();
        }
    });
}
