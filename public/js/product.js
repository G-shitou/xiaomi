//记载当前页数nowpage
var nowpage=1;
//首次加载得到首页数据
window.onload=function(){
    ajax(1,9);
};
//ajax函数
function ajax(Page,Rows){
    nowpage=Page;
    $.ajax({
        type:"POST",
        url:"/product",
        data:{page:Page,rows:Rows},
        success:function(data){
            bind(data);
        },
        error:function(){
            console.log("网络出错故障，请重试");
        }
    });
}
//数据绑定函数
//绑定事件：点击加入购物车，保存商品id  点击立即购买，跳转到相应的商品详情页
function bind(data){
    var str='';
    for(var value of data){
        str+='<div class="product"><img src="'+value.url+'"><h3 class="name">'+value.name+'</h3><p class="title">'+value.title+'</p><p class="price">'+value.price+'</p><a href="/detail" class="'+value.id+'">立即购买</a><a href="javascript:;" class="'+value.id+'">加入购物车</a></div>';
    }
    $("section.product .right .bind").html(str);

    $("div.bind>.product a").on("click",function(event){
        //点击立即购买，跳转到相应的商品详情页
        if($(event.target).attr('href')=="/detail"){
            sessionStorage['id']=parseInt($(event.target).attr("class"));
        }else{
            //点击加入购物车，cookie保存商品id和数量
            var classname=$(event.target).attr("class");
            //先判断有没有此商品
            //如果存在,数量加1
            if($.cookie(classname)){
                var num=parseInt($.cookie(classname))+1;
                $.cookie(classname,num,{expires:15,path:'/'});
            }else{
                //如果是不存在，就保存这个ID，数量是1
                $.cookie(classname,1, { expires: 15, path: '/' });
            }
            // alert("添加成功");
            //加入购物车的特效
            var offset = $("section.topNav .right a:last-child").offset();  //结束的地方的元素
            var addcar = $(event.target);
            var scrollTop=$(window).scrollTop();
            var img = addcar.parent().find('img').attr('src');
            var flyer = $('<img class="u-flyer" src="'+img+'">');
            flyer.fly({
                start: {
                    left: event.clientX-160,
                    top: event.clientY-280
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
        }
            //阻止事件冒泡
            // event.stopPropagation();
    });
}

//页码点击更改数据
$("section.product .right .page li").on("click",function(){
    var classname=$(this).attr('class');
    if(classname!="page"){
        if(classname=="first"){
            ajax(1,9);
        }else if(classname=="last"){
            ajax(5,4);
        }else if(classname=="pre"){
            if(nowpage>1){
                ajax(nowpage-1,9);
            }
        }else{
            if(nowpage<4){
                ajax(nowpage+1,9);
            }else if(nowpage==4){
                ajax(5,4);
            }
        }
    }else{
        var index=$(this).html();
        if(index==1){
            ajax(1,9);
        }else if(index==2){
            ajax(2,9);
        }else if(index==3){
            ajax(3,9);
        }else if(index==4){
            ajax(4,9);
        }else{
            ajax(5,4);
        }
    }
    $("section.product .right div.page li.page").eq(nowpage-1).css("color","#FF6709").siblings().css("color","black");
});