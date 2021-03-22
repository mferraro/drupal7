(function($) {
	$(document).ready( function(){
		/*$('img[usemap="#map-organigrama"]').rwdImageMaps();
			var altura = '554';
			var maxample = '80%';
			if ($(window).width() < 767) {
				altura = '435';
			}else if($(window).width() < 375){
				altura = '475';
				maxample = '90%';
			}

		$('.colorbox-fitxa').colorbox({
				title: false,
				current: "{current} / {total}",
				transition: "none",
				maxWidth: maxample,
				width:'1000',
				height: altura,
				maxHeight:'85%',
				iframe:true,
				title: function() { return $(this).attr('title'); },
		});

		 $('body.incolorbox').find('.contact').removeClass('colorbox-load cboxElement');



		$('map#map-organigrama area').on('click', function (e) {
			e.preventDefault();
			//Treiem el possible Popup d'un altre
			if($('.popupRegidor')) $('.popupRegidor').remove();

			var area_this = $(this);

			var url_web = "http://ajuntament.barcelona.cat/";
			var url =  url_web +  $(this).attr('data-regidor-id') + "?v=embed";


			var __close = $('<div />').addClass('close').on('click', function (e) { $('.popupRegidor').remove(); });
			var __html = $('<div />').addClass('popupRegidor spinner').attr('id', 'spinner').append(__close);
			__html.css('top', (parseInt(area_this.attr('coords').split(',')[1]) + 86) + 'px');
			area_this.closest('#map-organigrama').append(__html);


			$('.spinner').append(spinner.el);


			$.get( url, function(data) {
				var _close = $('<div />').addClass('close').on('click', function (e) { $('.popupRegidor').remove(); });
				var _html = $('<div />').addClass('popupRegidor tupla-regidor').append(data).append(_close); //aixo es lo que fa apareixer el regidor

				_html.css('top', (parseInt(area_this.attr('coords').split(',')[3])) + 'px');

		    	$(_html).find("a.retribucions-ficha-gran").on('mouseover', function(){
					$(this).siblings('.retribucions-explicacio').addClass('retribucions-on');
				});
		    	$(_html).find("a.retribucions-ficha-gran").on('mouseout', function(){
					$(this).siblings('.retribucions-explicacio').removeClass('retribucions-on');
				});
				$(_html).find("a.retribucions-ficha-gran").on('click', function (e){
		    		e.preventDefault();
				});

				$('.spinner').remove();

				area_this.closest('#map-organigrama').append(_html);

			});


		});

		$('.organigrama-mobile .link-fitxa').on('click', function (e) {
			e.preventDefault();
			if($('.popupRegidor')) $('.popupRegidor').remove();

			if($(this).attr('data-regidor-id').length) {

				var link_this = $(this);

				var url_web = "http://ajuntament.barcelona.cat/";
				var url =  url_web +  $(this).attr('data-regidor-id') + "?v=embed";




				var _close = $('<div />').addClass('close').on('click', function (e) { $('.popupRegidor').remove(); });
				var _html = $('<div />').addClass('popupRegidor spinner').attr('id', 'spinner').append(_close); //aixo es lo que fa apareixer el regidor
				link_this.closest('.organigrama-mobile').append(_html);

				$('.spinner').append(spinner.el);

				$.get( url, function(data) {

					var _close = $('<div />').addClass('close').on('click', function (e) { $('.popupRegidor').remove(); });
					var _html = $('<div />').addClass('popupRegidor tupla-regidor').append(data).append(_close); //aixo es lo que fa apareixer el regidor
					_html.css('top',(link_this.offset().top - 322)+'px');

			    	$(_html).find("a.retribucions-ficha-gran").on('mouseover', function(){
						$(this).siblings('.retribucions-explicacio').addClass('retribucions-on');
					});
			    	$(_html).find("a.retribucions-ficha-gran").on('mouseout', function(){
						$(this).siblings('.retribucions-explicacio').removeClass('retribucions-on');
					});
					$(_html).find("a.retribucions-ficha-gran").on('click', function (e){
			    		e.preventDefault();
					});

					$('.spinner').remove();

					link_this.closest('.organigrama-mobile').append(_html);

				});
			}

    	});*/
    });
})(jQuery);

