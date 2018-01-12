var anchorArr = [0,-10,-10,-10,-10];

function createTab(){
  $(".tab li").click(function(i){
    var _index = $(this).index();
    $(this).addClass('selected').siblings().removeClass();
    $(this).parent().parent().find(".content"+_index).addClass('selected').siblings().removeClass("selected");
  });

  //비디오 실행
  $(".content-wrap .what_is_icon .sub0 .video-holder .left").click(function(){
    createVideo("https://www.youtube.com/embed/etdy-FT_e2k");
  });
  $(".content-wrap .what_is_icon .sub0 .video-holder .right").click(function(){
    createVideo("https://www.youtube.com/embed/QlAcZbaCebE");
  });

  //스크롤 이동
  $(".header-wrap .menu li, .logo-holder").click(function(){
    var _index = $(this).index();

    if(_index != 5){
      $("body, html").animate({
        scrollTop: $(" .screen"+_index).offset().top.toFixed(0) - anchorArr[_index]
      }, {duration : 800, easing: 'easeInOutQuad'});
    }
  });

  //비디오 닫기
  $(".movie .btnClose").click(function(){
    $(".movie .dimmed").removeClass("open");
    $('.movie .contents iframe').remove();
    $(".movie .movie-holder").css("display","none");
    $("body").css("overflow", "auto");
  });


  if($(".wrap").hasClass("main")){
    $("#acco0").accordionFx({
      _fullOpen:true
    });
    $("#acco1").accordionFx({
      _fullOpen:true
    });
    $("#acco2").accordionFx({
      _fullOpen:true
    });
    $("#acco3").accordionFx({
      _fullOpen:true
    });
    $("#acco4").accordionFx({
      _fullOpen:true
    });
    $(".moving").viewFx({
      _isOne : 0,
      _view:["moving"]
    });
  }

}

//언어선택 슬라이드 다운
function createLanguage(){
  $(".language").hover(
    function(){
      $("ul", this).slideDown(150);
    },
    function(){
      $("ul", this).slideUp(150);
    }
  );
}

//비디오 활성화 이벤트
function createVideo($str){
   var _video =' <iframe src="'+$str+'?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1" allowfullscreen="" height="360" width="640" frameborder="0"></iframe>'
  $(".movie .contents").append(_video);
  $(".movie .movie-holder").css("display","block");
  $(".movie .dimmed").addClass("open");
}


$(document).ready(function(){
  var init = function(){}

  createTab();
  createLanguage();
  timeFx();
  capFx(0);
  console.log("A")
});

$(window).ready(function(){
console.log("B")
});
