(function() {
	var $content = $('#about').detach();
	
	$('#about-button').on('click', function() {
		modal.open({content: $content, width:600, height:750});
	});
}());