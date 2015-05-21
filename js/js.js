$(function() {
	
	var timeout;
	var $text = $('#text');
	
	$text.hide();
	
	$('#content').append('<img src="img/logo.png" id="logo">');
		
	timeout = setTimeout(function() {
		$('#logo').fadeOut(500);
			
		$text.delay(500).fadeIn(500);
	}, 1000);
});