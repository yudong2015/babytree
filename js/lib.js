$(function(){

    //调用竖屏判断
    orient();
    $('.orient').height(hei());

    $(window).bind( 'orientationchange', function(e){
        orient();
    });

    $(window).resize(function(){
        $('.orient').height(hei());
    });
});


//判断横竖屏
function orient() {
    if (window.orientation == 0 || window.orientation == 180) {
        $('.orient').hide();
        return false;
    }
    else if (window.orientation == 90 || window.orientation == -90) {
        $('.orient').show();
        return false;
    }
}


//页面高度
function hei(){
    var h1 = $(window).height();
    var h2 = $(document).height();
    var hei = h1 > h2 ? h1 : h2;
    return hei;
}


//微信分享
function wshare(sharetitle, shareurl){
    wx.ready(function(){            
        wx.onMenuShareTimeline({
            title: sharetitle, // 分享标题
            link: shareurl, // 分享链接
            imgUrl: shareurl + 'images/jsshare.png', // 分享图标
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
                
        wx.onMenuShareAppMessage({
            title: sharetitle, // 分享标题
            desc: sharetitle, // 分享描述
            link: shareurl, // 分享链接
            imgUrl: shareurl + 'images/jsshare.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (){ 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
    });
}


//是否音乐
function music(isbgmusic){
    if(isbgmusic){
        var htm = '<a class="u-btn-play"></a><audio id="bgmusic" src="images/bg.mp3" preload="auto" autoplay style="visibility: hidden;" loop="loop"></audio>';
        $('body').append(htm);

        //平常播放
        var bgmusic = document.getElementById('bgmusic');
        bgmusic.play();

        //ios兼容处理
        document.addEventListener("WeixinJSBridgeReady", function () {
            bgmusic.play();
        }, false);

        //切换音乐播放
        $(".u-btn-play").live('click', function(){
            if( bgmusic.paused ){
                bgmusic.play();
                $(this).removeClass("zanting");
            }else{
                bgmusic.pause();
                $(this).addClass("zanting");
            }
        });
    } 
}


//禁止滚动
function offmove(){
    document.addEventListener('touchmove', stopevent, false);
}


//解除区域滚动
function openmove(element){
    $(element).on('touchmove', function(){
        document.removeEventListener('touchmove', stopevent, false);
    }).on('touchend', function(){
        document.addEventListener('touchmove', stopevent, false);
    });
}


//阻止默认事件
function stopevent(e){
    var e = window.event || e;
    e.stopPropagation();
    e.preventDefault();
}


//图片加载
function loadimg(baseUrl){
    //初始化图片加载
    var baseUrl = baseUrl;
    var loader = new PxLoader();
    var LoadingImg = [];

    var loadnum = $('.load .num');

    //添加页面的图片
    $('img').each(function(){
        if(!$(this).attr('src')) return;
        LoadingImg.push($(this).attr('src'));
    });

    //添加背景的图片
    $('div').each(function(){
        if(!$(this).attr('data-src')) return;
        LoadingImg.push($(this).attr('data-src'));
    });

    var imgLength = LoadingImg.length; //获取图片的数量

    for(var i = 0; i < imgLength; i++){
        var pxImage = new PxLoaderImage(baseUrl + LoadingImg[i]);
        pxImage.imageNumber = i + 1;
        loader.add(pxImage);
    }

    //监听加载的过程
    loader.addProgressListener(function(e){
        var completedCount = e.completedCount; //完成图片的数量
        var percent = parseInt(completedCount*100/imgLength); //加载的百分比
        var cssLeft = parseInt(percent/100); //移动距离
        loadnum.text(percent +'%');
    });

    loader.addCompletionListener(function(){
        setTimeout(function(){
           $('.load').addClass('hide');
           $('.page').eq(0).removeClass('hide');
        },500);
    });

    loader.start();
}


//是否兼容iphone4
function iphone4(way){
    var hei = $(window).height();
    if(hei < 960){
        if(way == 1){
            $('html, body').removeClass('full');
            $('.wrap').addClass('wrap-long').removeClass('wrap');
        }else{
            $("#sheet").attr({'href': "css/style1.css"});
        }
    }  
}


//获取地址参数
//用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function get_get(){ 
    querystr = window.location.href.split("?")
    if(querystr[1]){
        GETs = querystr[1].split("&");
        GET = [];
        for(i=0;i<GETs.length;i++){
              tmp_arr = GETs.split("=")
              key=tmp_arr[0]
              GET[key] = tmp_arr[1]
        }
    }
    return querystr[1];
}


//判断手机号
function checkMobile(s){
    if(s.length != 11) return false;
    var partten = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    return partten.test(s);
}




