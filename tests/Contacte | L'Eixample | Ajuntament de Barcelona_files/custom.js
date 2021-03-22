(function($) {
	$(document).ready(function(e) {

		$.fn.bcn_read_more();
		$.fn.bcn_galeria();
		$.fn.bcn_preguntes();
		$.fn.bcn_pestanyes();
		$.fn.bcn_grup_destacats();
		$.fn.bcn_carrousel_links();
		$.fn.bcn_cartipas();
		$.fn.bcn_img_promocional();
		$.fn.galeria_imatges();
		$.fn.galeria_videos();
		$.fn.bcn_flickr();
		$.fn.bcn_submenu();
		$.fn.bcn_guide();
		$.fn.bcn_distribuidora_front();
		$.fn.capcalera();
		$.fn.barri_actual();
		$.fn.sitemap();

		bcn_stadistiques();
		cbox_lupa();
		bcn_gallery_detail();
		initAvisos();
		xxssTranslateTitle();
		titleGeneric();
		titleNewWindow();
		viewsAcordion();
		tabindexCalendar();
		$.fn.bcn_addthis();
		arrowspromos();
		classcontingut();

		Drupal.behaviors.betterExposedFilters = {
			attach: function(context, settings) {
				titleGeneric();
				titleNewWindow();
			}
		};
	});
	function classcontingut(){
		if($('.group-paragraph-grup-sup .paragraphs-items .parag-item').last().hasClass('box-gris') && $('.group-contingut')){
			$('.group-contingut').addClass('contingut-intermig');
		}
	}
	function arrowspromos(){
		var btprev ='<span>' + Drupal.t("Move promos to the left") + '</span>';
		var btnext ='<span>' + Drupal.t("Move promos to the right") + '</span>';

		$('.node-carousel-de-promos .owl-nav .owl-prev').html(btprev);
		$('.node-carousel-de-promos .owl-nav .owl-next').html(btnext);
		$('.node-carousel-de-promos .owl-nav .owl-prev span').hide();
		$('.node-carousel-de-promos .owl-nav .owl-next span').hide();

	}

	function tabindexCalendar(){
		$('.view-calendari-de-districte .date-nav .pager li.title a').attr('tabindex', '-1').attr('aria-hidden','true');
		$('#bcn_districtes_double_calendar_wrapper button[name=arrera]').attr('value',Drupal.t('Previous months'));
		$('#bcn_districtes_double_calendar_wrapper button[name=avant]').attr('value',Drupal.t('Next months'));
	}
	function viewsAcordion(){
		$('.block-bcn-custom-districtes .title-accordion').click(function(){
			$(this).toggleClass('active');

		});
	}
	function createNavTabs() {
		var $navTabsDropdown = $('.nav-tabs-dropdown');
		$navTabsDropdown.each(function(i, elm) {
			$('span', elm).text($(elm).next('ul').find('li.active a').text());
		});
		$navTabsDropdown.on('click', function(e) {
			e.preventDefault();
			$(e.target).toggleClass('open').next('ul').slideToggle();
		});
		$('a[data-toggle="tab"]').on('click', function(e) {
			e.preventDefault();
			$(e.target).closest('ul').hide().prev('a').removeClass('open').find('span').text($(this).text());
		});
	}

	function bcn_stadistiques() {
		$('.parag-estadistica-barri').find('#img-stadistica').each(function(i) {
			if ($(window).width() >= 768) {
				$(this).attr('src', $(this).attr('data-screen'));
			} else {
				$(this).attr('src', $(this).attr('data-mobile'));
			}
		});
	}
	//afegir la lupa als elements colorbox
	function cbox_lupa() {
		var gallery = $(".node-p-gina-2.view-mode-full .field-name-field-bcn-img-gallery");
		var read_more = '<div class="readmore">' + Drupal.t('ALL IMAGES') + ' <i class="bcn-icon-baix-medium"></i></div>';
		var max_height = $(".node-p-gina-2.view-mode-full .field-name-body").height();

		$(".node-p-gina-2 .field-name-field-bcn-img-gallery .init-colorbox-processed").each(function(i){
			$(this).append('<span>'+Drupal.t('Click to enlarge image')+'</span>');
		});
		$(".node-p-gina-2 .field-name-field-bcn-img-gallery .init-colorbox-processed").mouseenter(function() {
			$(this).append('<i class=" bcn-icon-amplia"></i>');
		}).mouseleave(function() {
			$(this).find('i').remove();
		});
		$(".node-p-gina-2 .field-name-field-bcn-img-gallery .init-colorbox-processed").on('focus', function(){
			$(this).append('<i class=" bcn-icon-amplia"></i>');
			$(".readmore", gallery).remove();
			$(gallery).removeClass("readmore");


		});
		$(".node-p-gina-2 .field-name-field-bcn-img-gallery .init-colorbox-processed").on('blur', function(){
			$(this).find('i').remove();
			//$(gallery).append(read_more);
			//$(gallery).addClass("readmore");

		});
	}

	//comportament galeria pagina detall
	function bcn_gallery_detail() {
		var $gallery = $(".node-p-gina-2.view-mode-full .field-name-field-bcn-img-gallery");
		var max_height = $(".node-p-gina-2.view-mode-full .field-name-body").height();
		var height = $($gallery).height();
		//disable for xs
		if ($(window).width() < 768) {
			height = 0;
		}
		if (height > max_height && !$($gallery).hasClass("readmore")) {
			$($gallery).height(max_height);
			read_more = '<div class="readmore">' + Drupal.t('ALL IMAGES') + ' <i class="bcn-icon-baix-medium"></i></div>';
			$($gallery).append(read_more);
			$($gallery).addClass("readmore");
			$(".readmore", $gallery).click(function() {
				$($gallery).height('auto');
				$(".readmore", $gallery).remove();
				$($gallery).removeClass("readmore");
			});
		} else if (height == 0 || height < max_height) {
			$($gallery).height('auto');
			$(".readmore", $gallery).remove();
			$($gallery).removeClass("readmore");
		}
		if (height == 0) {
			if ($(window).width() < 767) {
				$('>div', $gallery).owlCarousel({
					items: 1,
					loop: true,
					center: true,
					margin: 10,
					dots: true,
				});
			}
		}
	}

	function initAvisos() {
		if (typeof Avisos != 'undefined') {
			var avisos = new Avisos({
				'id': 'bcn-avisos',
				'token': '8776e36c4a50a412fddb4d24e7dc4730',
				'lang': $('html').attr('lang'),
				'bootstrap': true
			});
		}
	}

	function xxssTranslateTitle () {
		var lang = $('html').attr('lang');
		var title = {
			ca: "Obre en una finestra nova",
			es: "Abrir en una nueva ventana",
			en: "Open in a new window",
		};
		$('.header-xxss').each(function( index ){
			var titlelink = '';
			if($(this).attr('title') != null && $(this).attr('title') != ''){
				titlelink = $(this).attr('title')+'. '+title[lang];
			}
			$(this).attr('title', titlelink);
		});
	}

	function titleNewWindow(){
		var lang = $('html').attr('lang');
		var linkExternTitle = {
			'ca': 'Obre en una finestra nova',
			'es': 'Abrir en una ventana nueva',
			'en': 'Open in a new window',
		};

		$('.capcalera-promocio-links a').each(function( index ){
			var titlelink = '';
			var prelink = '';
			var postlink = '';
			var textlink = $(this).text().trim();

			if($(this).attr('target') == '_blank'){
				if($(this).attr('title') != null && $(this).attr('title') != '' ){
					titlelink = $(this).attr('title')+'. '+linkExternTitle[lang];
				}else{
					var caplink ='';
					console.log($(this).attr('href'));
					if($(this).parents('.capcalera-promocio-fitxa').children('h2').length){
						caplink = $(this).parents('.capcalera-promocio-fitxa').children('h2').text().trim()+'. ';
					}
					titlelink = caplink+$(this).text().trim()+'. '+linkExternTitle[lang];
				}
				$(this).append('<span class="sr-only">. '+linkExternTitle[lang]+'</span>');
				$(this).attr('title', titlelink);
				if(caplink!='' && caplink!=undefined){
					$(this).prepend('<span class="sr-only">'+caplink+'</span>');
				}
			}




		});

		$('.parag-item a').each(function( index ){
			var titlelink = '';
			var prelink = '';
			var postlink = '';
			var textlink = $(this).text().trim();

			if($(this).attr('target') == '_blank'){
				if($(this).attr('title') != null  && $(this).attr('title') != ''){
					titlelink = $(this).attr('title')+'. '+linkExternTitle[lang];
				}else{
					var caplink ='';
					//console.log($(this).closest('div.parag-item').attr('class'));

					if(!$(this).closest('div.parag-item').hasClass('parag-mes-consultat')){
						if($(this).closest('div').children('h3,h2').length){
							caplink = $(this).closest('div').children('h3,h2').text().trim()+'. ';

						}

						titlelink = caplink+$(this).text().trim()+'. '+linkExternTitle[lang];
					}else{
						titlelink = caplink+$(this).children('span').text().trim()+'. '+linkExternTitle[lang];

					}

				}
				$(this).append('<span class="sr-only">. '+linkExternTitle[lang]+'</span>');
				if(caplink!='' && caplink!=undefined){
					$(this).prepend('<span class="sr-only">'+caplink+'</span>');
				}
				$(this).attr('title', titlelink);
			}
		});

		$('.group-contingut .group-left a').each(function( index ){
			var titlelink = '';
			if($(this).attr('target') == '_blank'){
				if($(this).attr('title') != null){
					titlelink = $(this).attr('title')+'. '+linkExternTitle[lang];
				}else{
					var caplink ='';
					titlelink = caplink+$(this).text().trim()+'. '+linkExternTitle[lang];
				}
				$(this).append('<span class="sr-only">. '+linkExternTitle[lang]+'</span>');
				$(this).attr('title', titlelink);
			}
		});
		$('.group-contingut .group-right .links a').each(function( index ){
			var titlelink = '';
			if($(this).attr('target') == '_blank'){
				$(this).append('<span class="sr-only">. '+linkExternTitle[lang]+'</span>');
			}
		});
		$('.group-contingut .group-right .files a').each(function( index ){

			if($(this).attr('target') == '_blank'){

				$(this).append('<span class="sr-only">. '+linkExternTitle[lang]+'</span>');

			}
		});
		$('.capcalera-xarxes a').each(function( index ){
			$(this).append('<span class="sr-only">'+$(this).attr('title')+'</span>');
		});

	}
	function titleGeneric(){
		var lang = $('html').attr('lang');


		$('.capcalera-promocio-links a').each(function( index ){

			var titlelink = '';
			if($(this).attr('target') != '_blank'){
				if($(this).attr('title') != null && $(this).attr('title') != '' ){
					titlelink = $(this).attr('title');
				}else{
					titlelink = $(this).parents('.capcalera-promocio-fitxa').children('h2').text().trim()+'. '+$(this).text().trim();

				}
				$(this).prepend('<span class="sr-only">'+$(this).parents('.capcalera-promocio-fitxa').children('h2').text().trim()+'. '+'</span>');
				$(this).attr('title', titlelink);


			}
		});

		$('.parag-distribuidora-home a').each(function( index ){
			var titlelink = '';
			if($(this).attr('target') != '_blank'){
				if($(this).attr('title') != null){
					titlelink = $(this).attr('title');
				}else{
					titlelink = $(this).closest('p.box-content').children('strong').text().trim()+'. '+$(this).text().trim();
				}
				$(this).prepend('<span class="sr-only">'+$(this).closest('p.box-content').children('strong').text().trim()+'. '+'</span>');
				$(this).attr('title', titlelink);
			}
		});

		$('.node-carrec .social a').each(function( index ){
			var person = $(this).closest('.caption').children('p.name').children('a').text().trim();
			var linkcontact = {
				'ca': 'Contacta amb ',
				'es': 'Contacta con ',
				'en': 'Contact with ',
			};


			if($(this).hasClass('contact')){
				titlelink = linkcontact[lang] + person;
			}else{
				titlelink = person +' '+$(this).attr('class');
			}
			$(this).prepend('<span class="sr-only">'+titlelink+'</span>');
			$(this).attr('title', titlelink);
		});
	}
	var resizeTimer;
	$(window).on('resize', function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			$.fn.bcn_img_promocional();
			bcn_stadistiques();
			bcn_gallery_detail();
		}, 250);
	});
	$(window).load(function () {
		$.fn.bcn_addthis();
	});

})(jQuery);
