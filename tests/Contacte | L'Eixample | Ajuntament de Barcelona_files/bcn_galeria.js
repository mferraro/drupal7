(function($) {
	$.fn.bcn_galeria = function(element) {
		var node_origin = $(" .node-type-bcn-pagina-interior");
		var node_gallery = $(container + ' .group-gallery');

		if (node_origin.length == 0 && node_gallery.length == 0) {
			return;
		}

		var container = element || bcn_context;

		$('.group-gallery .wrapper > div').wrap('<div></div>');
		loadCarrousel(container + ' .group-gallery');
		var i = 0
		if (node_origin.find(".group-gallery img").length) {
			node_origin.find(".wrapper .item-image a").each(function(e) {
				i++;
				var altlink = Drupal.t('Click to enlarge image')+' '+ i;
				if($(this).find('img').attr('alt') != ''){
					altlink +=': '+$(this).find('img').attr('alt');
				}

				$(this).append("<span>"+altlink+"</span><i class='bcn-icon-maximitzar'></i>");
			})
		}

		// hide thumnbails if there's only one
		var total = node_gallery.find(".nav-thumbs .item").length;
		if (total == 1) {
			node_gallery.find(".nav-thumbs .item").hide();
		}

		node_origin.on("click", ".nav-thumbs", function(e) {
			e.preventDefault();
		});

		// add videos to colorbox
		node_origin.find(".wrapper .item-video iframe").each(function() {
			$(this).wrap("<a tabindex='-1' href='" + $(this).attr("src") + "' class='video'></a>");
		});

		node_origin.find(".wrapper .item-image").on("click", "a", function(e) {
			e.preventDefault();
			$(this).addClass("cboxElement");
			var slick_slide = $(this).closest('.slick-slide');
			var image_item = $(this).closest('.image-item');
			if (slick_slide.length > 0) {
				slick_slide.siblings('.slick-slide').each(addClassCboxElementToLink);
			}
			if (image_item.length > 0) {
				image_item.siblings('.image-item').each(addClassCboxElementToLink);
			}

			function addClassCboxElementToLink() {
				$(this).find('a').addClass('cboxElement');
			}

			openColorboxGallery();
		});

	};

	function loadCarrousel(target) {
		nav = '<div class="nav-thumbs">';
		item_pre = '<div class="item">';
		item_suf = '</div>';

		$('.wrapper > div', target).each(function() {
			if ($('iframe', this).attr('src')) {
				var video_id = $('iframe', this).attr('src');
				var data = $.fn.bcn_video(video_id);
				var video_thumbnail = data.video;

				nav += data.nav;

				if (video_id.indexOf("vimeo") >= 0) {
					$('iframe', this).attr('src', video_id + "?title=0&amp;byline=0&amp;portrait=0");
				}

			} else {
				nav += item_pre + $(this).html() + item_suf;
			}

		}).promise().done(function() {

			nav += '</div>';

			try {
				$(target + ' .wrapper').slick({
					dots: false,
					infinite: false,
					autoplay: false,
					arrows: false,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					asNavFor: target + ' .nav-thumbs',
					responsive: [{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true
						}
					}]
				});
				$(target).append(nav);
				$(target + ' .nav-thumbs').slick({
					slidesToShow: 5,
					slidesToScroll: 1,
					asNavFor: target + ' .wrapper',
					arrows: true,
					infinite: false,
					nextArrow: '<div class="arrow arrow-right"><i class="bcn-icon-dreta-light"></i></div>',
					prevArrow: '<div class="arrow arrow-left"><i class="bcn-icon-esquerra-light"></i></div>',
					dots: false,
					focusOnSelect: true
				});
			} catch (e) {
				console.warn('Slick has been init before...');
			}

		});

	}

	function openColorboxGallery() {
		var colorboxSizes = getColorboxSizes();
		var colorbox_props = {
			width: colorboxSizes.width,
			maxWidth: colorboxSizes.maxWidth,
			maxHeight: colorboxSizes.maxHeight,
			rel: 'cboxElement',
			current: "{current} / {total}",
			transition: "none",
			scrolling: false,
			reposition: true,
			iframe: false,
			onOpen: openCallBack,
			onClosed: closeCallBack,
			onComplete: function() {
				var setTimeoutId;
				$(window).resize(function() {
					clearTimeout(setTimeoutId);
					setTimeoutId = setTimeout(function() {
						$.fn.colorbox.resize(getColorboxSizes());
					}, 50);
				});
			}
		}

		$('.item-image a.cboxElement').colorbox(colorbox_props);
		// add videos
		$.extend(colorbox_props, {
			iframe: true,
			innerWidth: "50%",
			innerHeight: "50%"
		});
		$(".item-video a.video").colorbox(colorbox_props);
	}

	function getColorboxSizes() {
		if ($(document).width() < 1024) {
			width_cbox = '80%';
			maxWidth = false,
				height = false;
		} else {
			width_cbox = false;
			maxWidth = "80%";
			height = "80%";
		}
		return {
			width: width_cbox,
			maxWidth: maxWidth,
			maxHeight: height
		};
	}

	// private functions
	function openCallBack() {
		$('.bcn-brand, #navbar, .main-container, .region-pre-footer, .footer').attr('aria-hidden', true);
		setTimeout(function() {
			var colorbox = $("#colorbox");
			if (colorbox.find("#cboxCurrent").css("display") == "block") {
				colorbox.addClass("title");
			}
		}, 1100);
	}

	function closeCallBack() {
		$('.bcn-brand, #navbar, .main-container, .region-pre-footer, .footer').attr('aria-hidden', false);
		$(this).removeClass("cboxElement");
		removeCboxElementFromItems('.slick-slide');
		removeCboxElementFromItems('.image-item');
	}

	function removeCboxElementFromItems(nodeItem) {
		var items = $(this).closest(nodeItem);
		if (items.length > 0) {
			items.siblings(nodeItem).each(function(e) {
				$(this).find('a').removeClass('cboxElement');
			});
		}
	}


})(jQuery);
