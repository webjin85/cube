var g = {};

// 버튼 클릭 이벤트
function buttonEvent(){
	//모바일메뉴 열고 닫기
	$('#menu .m_btn').click(function(){
		if(!$(this).hasClass('close')) {
			$(this).addClass('close');
			$('.m_menu').show().addClass('slideDown');
			$('body, html').css('overflow','hidden');
		} else {
			$(this).removeClass('close');
			$('.m_menu').removeClass('slideDown');
			$('body ,html').css('overflow','initial');
		}
	});

	//메뉴 클릭이벤트
	$('#menu .nav li a').click(function(e){
		var _index = $(this).parent('li').index();
		var	_scrolling = _index == 0 ? 0 : $('#section'+_index).offset().top.toFixed(0) - g.headH;

		$(this).parent('li').addClass('on').siblings('li').removeClass('on');	
		$('#menu .m_btn.close').trigger('click');

		if(_index < 7) {
			e.preventDefault();
			scrollMove(_scrolling);
		}
	});

	//로고 클릭 이벤트
	$('#menu .title a').click(function(e) {
		e.preventDefault();
		scrollMove(0);
	});

	//비디오 닫기 이벤트
	$('#video .btnClose').click(function(){
		$('#video .dimmed').removeClass('open');
		$('#video .contents iframe').remove();
		$('#video .movie-holder').css('display','none');
		$('body').css('overflow', 'auto');
	});

	//비디오 플레이 이벤트
	$('#section1 .video_wrap .play').click(function(e){
		if(g.winW > 700) {
			e.preventDefault();
			createVideo($(this).attr('href'));
		}
	});

	//FAQ 버튼 이벤트
	$('.faq_list a').click(function(e) {
		e.preventDefault();
		if($(this).hasClass('open')) {
			$(this).removeClass('open').siblings('div').slideUp({duration: 300, complete: function() { init(); }});
		} else {
			$(this).addClass('open').siblings('div').slideDown({duration: 300, complete: function() { init(); }}).parent('li').siblings('li').find('.open').removeClass('open').siblings('div').slideUp(300);
		}
	});

	//메인으로 가기 이벤트
	$('#overlay .top').click(function(e) {
		e.preventDefault();
		scrollMove(0)
	});
}

//스크롤링 이벤트
function scrollMove(_scrolling) {
	g.isWheelMove = true;

	var _duration = ($(window).scrollTop() - _scrolling) < 0 ? ($(window).scrollTop() - _scrolling) * -1 : $(window).scrollTop() - _scrolling,
		_delay = g.filter == 'pc' ? 0 : 500;


	$('body, html').delay(_delay).animate({
		scrollTop: _scrolling
	}, {duration : Math.floor(_duration / 7), easing: 'easeInOutQuad', complete: function() {g.isWheelMove = false;}});	
}

//메인에서 스크롤 벗어 났을 때 이벤트
function change(){
	if(g.scrollTop > 70) {
		$('#menu').addClass('on');
		$('#overlay').addClass('slideUp');
	} else {
		$('#menu').removeClass('on');
		$('#overlay').removeClass('slideUp');
	}
}

//비디오 활성화 이벤트
function createVideo($str){
  var _video ='<iframe src="'+$str+'?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1" allowfullscreen="" height="360" width="640" frameborder="0"></iframe>';
  $('#video .dimmed').addClass('open').siblings('.movie-holder').show().children('.contents').append(_video);
}

//언어선택 슬라이드 다운
function createLanguage(){
  $('#menu .lang').hover(
    function(e){
      $('ul', this).slideDown(150);
    },
    function(e){
      $('ul', this).slideUp(150);
    }
  );
}

//현재 위치를 파악하여 메뉴 활성화 시킴
function menuEvent() {
	try{
		for(var i = 0; i < g.length; i++) {
			
			if(g.scrollTop >= g.topArr[i].t && g.scrollTop < g.topArr[i+1].t){
				break;
			} else if(g.scrollTop < g.topArr[i].t){
				break;
			}
		}
	} catch(err){}

	$('#menu .nav li:eq('+i+'), #side_nav li:eq('+i+')').addClass('on').siblings().removeClass('on');
}

//이미지 움직임
function movingEvent() {
	try{
		for(var i = 0; i < $('.moving').length; i++) {
			if(g.scrollTop + (g.winH / 1.1) > g.movingArr[i].t){
				$('.moving').eq(i).addClass('animate');
			} else {
				$('.moving').eq(i).removeClass('animate');
			}
		}
	} catch(err){}
}

function rodeMapEvent() {
	try{
		for(var i = 0; i < $('.rodeMap li').length; i++) {
			if(g.scrollTop + (g.winH / 1.5) > g.rodeMapArr[i].t){
				$('#section1 .rodeMap li').eq(i).addClass('on');
			} else {
				$('#section1 .rodeMap li').eq(i).removeClass('on');
			}

			if(g.scrollTop + (g.winH / 1.5) > g.rodeMapArr[0].t) {
				$('#section1 .rodeMap').addClass('on');
			} else {
				$('#section1 .rodeMap').removeClass('on');
			}
		}
	} catch(err){}
}

//각 섹션 위치 및 높이값
function init() {
	//전체 섹션 위치값
	for(var i=0; i<g.length; i++) {
		g.topArr[i] = ( {t: $('#content > div:eq('+i+')').offset().top-g.headH});
	}

	//에니메이트 이미지 위치값
	for(var i=0; i<$('.moving').length; i++) {
		g.movingArr[i] = ( {t: $('.moving').eq(i).offset().top});
	}

	//로드맵 위치값
	for(var i=0; i<$('.rodeMap li').length; i++) {
		g.rodeMapArr[i] = ( {t: $('.rodeMap li').eq(i).offset().top});
	}	
}

//글로벌 변수 세팅
function setting() {
	g.headH = $('#menu').innerHeight();	
	g.winH = $(window).innerHeight();
	g.winW = $(window).innerWidth();
	g.scrollTop = $(window).scrollTop();
	g.topArr = [];
	g.movingArr = [];
	g.rodeMapArr = [];
	g.isWheelMove = false;
	g.length = 6;
	g.filter;
}

/* PC와 모바일 분기 */
if(navigator.platform) {
	if('win16|win32|win64|mac|macintel'.indexOf(navigator.platform.toLowerCase()) < 0) {
		g.filter = 'm';
	} else {
		g.filter = 'pc';
	}
};

//휠이벤트
$(document).on("mousewheel DOMMouseScroll",function(e){
	//현재 위치가 제일 상위 이거나 스크롤 에니메이션이 ture 일 때 마우스휠 막음
	if(g.isWheelMove){ e.preventDefault(); }
});

$(window).load(function() {
	setting();
	buttonEvent();
	createLanguage();
	init();

	movingEvent();
	rodeMapEvent();
})

$(window).scroll(function(){
	g.scrollTop = $(window).scrollTop();

	change();
	menuEvent();
	movingEvent();
	rodeMapEvent();
});

$(window).resize(function() {
	setting();
	init();
})