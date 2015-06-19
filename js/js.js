$(function() {
	
	var introTimeout;
	var pageTimeout;
	var $splashImg = $('#splash-img');
	var $content = $('#content');
	var $flags = $('.flags');
	
	$content.addClass('hide')										//start splash
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
		
		buttonArray[currentIndex].removeClass('active');
		buttonArray[newIndex].addClass('active');
		
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
		var $button = $('<img src="' + src + '">');
		$button.on('click', function() {
			move(index);
		}).appendTo('.slide-selector');
		buttonArray.push($button);
	});
	
	advance();
});																				//end photo slider

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