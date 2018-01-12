function button_event(){
	$("#menu .m_btn").click(function(){
		if(!$(this).hasClass('close')) {
			$(this).addClass('close');
			$(".m_menu").css("display", "block").addClass("slideDown");
			$("body, html").css("overflow","hidden");
		} else {
			$(this).removeClass('close');
			$(".m_menu").removeClass("slideDown");
			$("body ,html").css("overflow","initial");
		}
		
	});

	$("#menu.on .nav li a").click(function(e){
		var _index = $(this).parent('li').index();

		console.log(_index);
		$(".menu-wrap .btn-menu").trigger("click");
		if(_index != 5){
			$("body, html").delay(400).animate({
				scrollTop: $(" .screen"+_index).offset().top.toFixed(0) - anchorArr[_index]
			}, {duration : 800, easing: 'easeInOutQuad'});
		}
	});
}


$(document).ready(function() {
	button_event();
});