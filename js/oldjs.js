				<div id="buttons"></div><!--#buttons-->
				<div id="gallery">
					<img src="img/p1.jpg" data-tags="Home" alt="Pets"/>
					<img src="img/p2.jpg" data-tags="Home" alt="Salmon"/>
					<img src="img/p3.jpg" data-tags="Work" alt="Child Using Laptop"/>
					<img src="img/p4.jpg" data-tags="Work" alt="Men In Office"/>
					<img src="img/p5.jpg" data-tags="Home" alt="Orange Car"/>
					<img src="img/p6.jpg" data-tags="Home" alt="Spiral Stairs"/>
					<img src="img/p7.jpg" data-tags="Home" alt="Child Playing Pots"/>
					<img src="img/p8.jpg" data-tags="Gym" alt="Man Working Out"/>
				</div><!--#gallery-->
				
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