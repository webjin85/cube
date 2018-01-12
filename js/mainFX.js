var _scrollTop;
var _winH;
var _isWheelMove = false;
var _isWheel = false;
var _isScroll = false;
var _current = 0;
var _length = 5;
var _topArr = [];
var _isMovie = false;


//스크롤이 100 이상이면 'change' 클래스를 주고 아니면 삭제한다.
function changeHead(){
	if(_scrollTop > 100){
		$(".header-wrap").addClass("change");
	} else {
		$(".header-wrap").removeClass("change");
	}
}

function loadFx(){
	var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0];
		_winH = w.innerHeight|| e.clientHeight|| g.clientHeight;

	//'.home'의 높이값을 브라우저 높이값에 맞춤
	$(".content-wrap .home").css("height", _winH);

	var _winW = $(window).width();
	var _marginleft;
	var m;

	//상단 메뉴 간격 조절
	if(_winW > 960 ){
		$(".header-wrap .menu li").css({"margin-left": "15px", "margin-right":"15px"});
	} else{
		var _percent = (1- ( 960 - _winW )/160) * 10 + 5;
		_percent = Math.max(_percent, 5);
		$(".header-wrap .menu li").css({"margin-left": _percent+"px", "margin-right":_percent+"px"});
	}
}

//현재 스크롤 높이 값 변수에 담음
function indiFx(){
	var _indi;
	var _content;
	var _marginBottom = 300;
	var _height = 0;
	var _top = 200;
	_scrollTop = $(window).scrollTop();
	for(var i=0; i<_length; i++) {
	}
}


function wheelFx($sign) {
	//글로벌 변수에 현재 스크롤 값 담음
	_scrollTop = $(window).scrollTop();

	//마우스 휠이 내려가면 0 올라가면 뷰 높이 사이즈
	var _targetPos = ($sign === 1) ? 0 : _winH;

	//현재 위치를 파악하여 메뉴 활성화
	currentFx();

	//휠을 움직일 수 있다면
	if(!_isWheelMove){
		//첫번째 영역 이라면
		if(_current === 0){
			//화면 높이값 만큼 이동
			bodyAnimateFx(_targetPos);

		//두번째 영역 이고,
		} else if(_current ===1){
			//화면 높이값이 현재 스크롤 top 보다 크고 
			if( _winH >= _scrollTop && $sign===1){
				bodyAnimateFx(0);
			}
		}
	}
	indiFx();
}

function bodyAnimateFx($targetPos){
	_isWheelMove = true;
	//스크롤 에니메이션을 인수값 만큼 움직인다.
	$('body,html').animate( { "scrollTop" : $targetPos+"px"}, {duration:500 , complete:function(){
		_isWheelMove = false;
	}});
}
//현재 위치를 파악하여 메뉴 활성화 시킴
function currentFx() {
	try{
		for(var i=0; i<_length; i++) {
			if(_scrollTop >= _topArr[i].t && _scrollTop < _topArr[i+1].t){
				break;
			} else if(_scrollTop < _topArr[i].t){
				break;
			}
		}
	} catch(err){}
	_current = i;
	$(".header-wrap .menu li:eq("+_current+")").addClass("on").siblings().removeClass();
}

$(document).ready(function(){
	loadFx();
});
$(window).load(function(){
	//스크롤 값 변수에 담음
	_scrollTop = $(window).scrollTop();

	//각 div 별 위치값 세팅
	var init = function(){
		for(var i=0; i<_length; i++) {
			_topArr[i] = ( {t: $(".content-wrap > div:eq("+i+")").offset().top+anchorArr[i], h: $(".content-wrap > div:eq("+i+")").height() });
		}

	}

	//휠이벤트
	$(document).on("mousewheel DOMMouseScroll",function(e){
		//현재 위치가 제일 상위 이거나 스크롤 에니메이션이 ture 일 때 마우스휠 막음
		if(_current ===0 || _isWheelMove){
			e.preventDefault();
		}
		var _sign 	= e.originalEvent.wheelDelta > 0 ? 1 : -1;
		_isWheel = true;
		wheelFx(_sign);
	});

	//리사이즈
	$( window ).resize(function() {
		loadFx();
		init();
	});

	//스크롤 이벤트
	$(window).scroll(function(){
		changeHead();
		currentFx();
		indiFx();
	});

	//초기 실행
	loadFx();
	init();
	changeHead();
});