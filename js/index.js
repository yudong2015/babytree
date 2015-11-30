$(function(){
    var baseUrl = '';
    loadimg(baseUrl);

    var clicked = 0;

    //展开或收缩规则
    $('.btn-about').on('tap', function(){
        if(clicked == 0){
            $('.wrap-long').addClass('on');
            $('.about').show();
            $('.footer').addClass('on');
            $(this).children().attr({'src':'images/12.png'});
            clicked = 1;
        }else{
            $('.wrap-long').removeClass('on');
            $('.about').hide();
            $('.footer').removeClass('on');
            $(this).children().attr({'src':'images/12a.png'});
            clicked = 0;
        }
        
    });

    var d = document.documentElement;
    var b = document.body;

    window.onscroll = set;

    function set(){
        console.log(b.scrollTop);
        if((d.scrollTop + b.scrollTop > 300)){
            $('.s3 > .line1').addClass('line1ani');
            $('.s3 > .line2').addClass('line2ani');
            $('.s3 > .line3').addClass('line3ani');
        }
    }

});