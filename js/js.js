$(function() {
	
	var introTimeout;												//declare variables
	var $container = $('#container');
	var $content = $('#content');									//finish variables
	
	$content.addClass('hide')										//start splash
	$container.append('<img src="img/logo.png" id="logo">');
	introTimeout = setTimeout(function() {
		$('#logo').fadeOut(500);
		$content.delay(500).fadeIn(1000);
	}, 1000);														//end splash
	
});

var modal = (function() {															//modal window start
	var $window = $(window);
	var $modal = $('<div class="modal"/>');
	var $content = $('<div class="modal-content"/>');
	var $close = $('<button role="button" class="modal-close">Close</button>');
	
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

$('.slider').each(function() {														//start photo viewer
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
	
	var $thumbnails = $group.find('img').attr('src');
	
	$.each($slides, function(index) {
		var $button = $('<img src="' + $thumbnails + '">');  //here is where I need write script so the thumbnails so the correct picture
		$button.on('click', function() {
			move(index);
		}).appendTo('.slide-selector');
		buttonArray.push($button);
	});
	
	advance();
});																					//end photo viewer