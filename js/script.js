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
	$(document).on('click', 'a[href^="#"]', function (e) {
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
	$(document).on('click', '.navbar-collapse', function (e) {
		if ($(e.target).is('a')) {
			$(this).collapse('hide');
		}
	});
	//
	//


});