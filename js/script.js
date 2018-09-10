$(document).ready(function () {

	///
	$("#my-projects-menu").click(function () {
		if ($('p.click-here').text() == "Click to expand ") {
			$('p.click-here').text("Click to hide ");
		} else {
			$('p.click-here').text("Click to expand ");
		};
	});
	///
	///
	$(document).scroll(function () {
		var $nav = $('.navbar-fixed-top');
		$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
	})
	///
	///
	$(document).on('click', 'a[href^="#_"]', function (e) {
		var id = $(this).attr('href');
		var $id = $(id);
		if ($id.length === 0) {
			return;
		}
		e.preventDefault();
		var pos = $id.offset().top - 75;
		$('body, html').animate({
			scrollTop: pos
		}).offset();
	});
	///
	///
	$(document).on('click', '.navbar-collapse-menu', function (e) {
		if ($(e.target).is('a')) {
			$(this).collapse('hide');
		}
	});
	//
	//
	var btn = $('#button');

	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});
	btn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, '300');
	});
	///
	///
	


});