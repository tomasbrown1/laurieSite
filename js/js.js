$(function() {
	
	var timeout;												//declare variables
	var $container = $('#container');
	var $content = $('#content');
	var $imgs = $('#gallery img');
	var $buttons = $('#buttons');
	var tagged = {};											//finish variables
	
	$content.addClass('hide')									//start splash
	$container.append('<img src="img/logo.png" id="logo">');
	timeout = setTimeout(function() {
		$('#logo').fadeOut(500);
			
		$content.delay(500).fadeIn(500);
	}, 1000);													//end splash
	
	$imgs.each(function() {										//start processing tags
		var img = this;
		var tags = $(this).data('tags');
		
		if (tags) {
			tags.split(',').forEach(function(tagName){
				if (tagged[tagName] == null) {
					tagged[tagName] = [];
				}
				tagged[tagName].push(img);
			});
		}
	});															//end processing tags
	
	$('<button/>', {											//show all button
		text: 'Show All',
		class: 'active',
		click: function() {
			$(this)
				.addClass('active')
				.siblings()
				.removeClass('active');
			$imgs.show();
		}
	}).appendTo($buttons);										//show all button
	
	$.each(tagged, function(tagName) {							//filter buttons
		$('<button/>', {
			text: tagName + ' (' + tagged[tagName].length + ')',
			click: function() {
				$(this)
					.addClass('active')
					.siblings()
					.removeClass('active');
				$imgs
					.hide()
					.filter(tagged[tagName])
					.show();
			}
		}).appendTo($buttons);
	});															//filter buttons

});