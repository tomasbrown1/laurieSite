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
		$content.delay(500).fadeIn(1000);
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
			text: tagName,
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

var modal = (function() {															//modal window start
	var $window = $(window);
	var $modal = $('<div class="modal"/>');
	var $content = $('<div class="modal-content"/>');
	var $close = $('<button role="button" class="modal-close">close</button>');
	
	$modal.append($content, $close);
	
	$close.on('click', function(e){
		e.preventDefault();
		modal.close();
	});
	
	return {
		center: function() {
			var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
			var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
			$modal.css({
				top: top + $window.scrollTop(),
				left: left + $window.scrollLeft()
			});
		},
		open: function(settings) {
			$content.empty().append(settings.content);
			
			$modal.css({
				width: settings.width || 'auto',
				height: settings.height || 'auto'
			}).appendTo('body');
			
			modal.center();
			$(window).on('resize', modal.center);
		},
		close: function() {
			$content.empty();
			$modal.detach();
			$(window).off('resize', modal.center);
		}
	};
}());																				//modal window end