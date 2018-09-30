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


	$("#contact_body").submit(function (e) {
		e.preventDefault(); //prevent default action 
		proceed = true;

		//simple input validation
		$($(this).find("input[data-required=true], textarea[data-required=true]")).each(function () {
			if (!$.trim($(this).val())) { //if this field is empty 
				$(this).css('border-color', 'red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
				$(this).css('border-color', 'red'); //change border color to red   
				proceed = false; //set do not proceed flag              
			}
		}).on("input", function () { //change border color to original
			$(this).css('border-color', border_color);
		});


		//if everything's ok, continue with Ajax form submit
		if (proceed) {
			var post_url = $(this).attr("action"); //get form action url
			var request_method = $(this).attr("method"); //get form GET/POST method
			var form_data = new FormData(this); //Creates new FormData object

			$.ajax({ //ajax form submit
				url: post_url,
				type: request_method,
				data: form_data,
				dataType: "json",
				contentType: false,
				cache: false,
				processData: false
			}).done(function (res) { //fetch server "json" messages when done
				if (res.type == "error") {
					$("#contact_results").html('<div class="error">' + res.text + "</div>");
					$("#contact_results").attr('disabled', 'disabled');
				}
				if (res.type == "done") {
					$("#contact_results").html('<div class="success">' + res.text + "</div>");
					$("#contact_results").attr('disabled', 'disabled');
				}
			});
		}
	});
});