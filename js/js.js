$(function() {
	
	var introTimeout;
	var pageTimeout;
	var $splashImg = $('#splash-img');
	var $content = $('#content');
	var $page = $('#page-content');
	var $flags = $('.flags');
	
	$content.addClass('hide');										//start splash
	$splashImg.append('<img src="img/logo.png" id="logo">');
	introTimeout = setTimeout(function() {
		$('#logo').fadeOut(500);
		$content.delay(500).fadeIn(1000);
	}, 1000);														//end splash							

	$flags.click(function(e) {										//start script for flag event listener
		e.preventDefault();
		$img = $(this);
		$link = $img.closest('a');
		var link = $link.attr('href');
		$content.fadeOut(1000);
		pageTimeout = setTimeout(function() {
			window.location.href = link;
		}, 1000);
	});																//end script for flag event listener

	$page.fadeIn(1000);
	
}());


$('.slider').each(function() {														//start photo slider
	var $this = $(this);
	var $group = $this.find('.slide-group');
	var $slides = $this.find('.slide');
	var buttonArray = [];
	var currentIndex = 0;
	var timeout;
	
	function move(newIndex) {
		var animateLeft, slideLeft;
		
		advance();
		
		if ($group.is(':animated') || currentIndex === newIndex) {
			return;
		}
		
		if (newIndex > currentIndex) {
			slideLeft = '100%';
			animateLeft = '-100%';
		} else {
			slideLeft = '-100%';
			animateLeft = '100%';
		}
		
		$slides.eq(newIndex).css( { left: slideLeft, display: 'block'} );
		$group.animate( { left: animateLeft} , function() {
			$slides.eq(currentIndex).css( { display: 'none'} );
			$slides.eq(newIndex).css( {left: 0} );
			$group.css( {left: 0} );
			currentIndex = newIndex;
		});
	}
	
	function advance() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			if (currentIndex < ($slides.length - 1)) {
				move (currentIndex + 1);
			} else {
				move (0);
			}
		}, 8000);
	}
	
	$slides.each(function(index) {
		var src = $(this).find('img').attr('src');
		var tags = $(this).find('img').attr('data-tags');
		var $button = $('<img src="' + src + '" data-tags="' + tags + '">');
		$button.on('click', function() {
			move(index);
		}).appendTo('.slide-selector');
		buttonArray.push($button);
	});
	
	advance();
});																				//end photo slider

(function() {																	//start tags
	
	var $imgs = $('.slide-selector img');
	var $buttons = $('#buttons');
	var tagged = {};
	
	$imgs.each(function() {
		var img = this;
		var tags = $(this).data('tags');
		
		if (tags) {
			tags.split(',').forEach(function(tagName) {
				if (tagged[tagName] == null) {
					tagged[tagName] = [];
				}
				tagged[tagName].push(img);
			});
		}
	});
	
	if (window.location.href.indexOf("fr") > -1){
		var all = 'Tous';
	} else {
		var all = 'All';
	}
	
	
	$('<button/>', {		
		text: all,
		class: 'active',
		click: function() {
			$(this)
				.addClass('active')
				.siblings()
				.removeClass('active');
			$imgs.show();
		}
	}).appendTo($buttons);
	
	$.each(tagged, function(tagName) {
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
	});
	
}());																				//end tags

var modal = (function() {															//modal window start
	var $window = $(window);
	var $modal = $('<div class="modal"/>');
	var $content = $('<div class="modal-content"/>');
	var $close = $('<button role="button" class="modal-close">Close</button>');
	var $fermer = $('<button role="button" class="modal-close">Fermer</button>');
	
	if (window.location.href.indexOf("fr") > -1){
		$modal.append($content, $fermer);
	} else {
		$modal.append($content, $close);
	}
	
	$close.on('click', function(e){
		e.preventDefault();
		modal.close();
	});
	
	$fermer.on('click', function(e){
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