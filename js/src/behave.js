$( document ).ready(function() {

	$('.nav-icon').click(function(){
		$(this).toggleClass('open');
		$(this).siblings('nav').toggleClass('open');

	});

	$('.parallax-window').parallax({
		speed: 0.8
	});

});
