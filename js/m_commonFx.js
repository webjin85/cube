var anchorArr = [60,45,45,45,45];

function createTab(){
	$(".tab li").click(function(i){
		console.log( $(this).index() )
		var _index = $(this).index();
		$(this).addClass('selected').siblings().removeClass();
		$(this).parent().parent().find(".content"+_index).addClass('selected').siblings().removeClass("selected");
	});

	//비디오 열기
	$(".content-wrap .what_is_icon .sub0 .video-holder .left").click(function(){
		document.location.href = "https://www.youtube.com/embed/etdy-FT_e2k";
	});
	$(".content-wrap .what_is_icon .sub0 .video-holder .right").click(function(){
		document.location.href = "https://www.youtube.com/embed/QlAcZbaCebE";
	});

	//로고 클릭시 상단으로 이동
	$('.scroll-top, .logo-holder .logo').click(function () {
		$('body,html').animate({scrollTop: 0}, 500);
		return false;
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


function resizeFx(){
	var _container = $(".contribution .box-holder");
	var _content    = _container.find(".box-txt");
	if(_container.height() > _content.height() ){
		_content.css("margin-top","calc( 50% - "+ _content.height()/2+"px");
	} else {
		 _content.css("margin-top","0px");
	}

	if($( window ).width() < $( window ).height() ){
		$(".popup.contribution .title.comp").css("padding-top", "90px");
		$(".popup.contribution .box-holder").css("padding", "15px");
	} else {
		$(".popup.contribution .title.comp").css("padding-top", "10px");
		$(".popup.contribution .box-holder").css("padding", "5px 15px");
	}
}

function createMenu(){
	$(".header-wrap .btn-menu").click(function(){
		$(".menu-wrap").css("display", "block");
		$(".menu-wrap").addClass("slideDown");
		$("body, html").css("overflow","hidden");
	});
	$(".menu-wrap .btn-menu").click(function(){
		$(".menu-wrap").removeClass("slideDown");
		$("body ,html").css("overflow","initial");
	});
	$(".menu-wrap .menu-holder li").click(function(i){
		var _index = $(this).index();
		$(".menu-wrap .btn-menu").trigger("click");
		if(_index != 5){
			$("body, html").delay(400).animate({
				scrollTop: $(" .screen"+_index).offset().top.toFixed(0) - anchorArr[_index]
			}, {duration : 800, easing: 'easeInOutQuad'});
		}
	});

	$(".popup-wrap .help").click(function(){
		$(".view-full").css("display","block");
		$(".view-full").addClass("slideUp");
	});

	$(".btn-close").click(function(){
		$(".view-full").removeClass("slideUp");
	});

}

var _isMovie = false;
var _scrollTop;

$(document).ready(function(){
	$(window).scroll(function(){
		_scrollTop = $(window).scrollTop();
		if(_scrollTop < 300  && _isMovie == false){
			// _isMovie = true;
			// ani_cnt = 0;
		}
		if (_scrollTop > 300) {
			$('.scroll-top').fadeIn();
		} else {
			$('.scroll-top').fadeOut();
		}
	});

	var init = function(){
			resizeFx();
	}

	$( window ).resize(function() {
		resizeFx();
	});

	init();
	createMenu();
	createTab();
	timeFx();
	capFx(0);
});
