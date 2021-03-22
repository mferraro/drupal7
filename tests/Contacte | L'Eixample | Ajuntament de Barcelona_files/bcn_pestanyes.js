(function($) {
	$.fn.bcn_pestanyes = function(element) {

		/////////////////////////
		// Pestanyes Node load //
		/////////////////////////
		var $pestanyes = $(".parag-pestanyes");


		if ($(window).width() < 767) {
		//mobile
		if( $pestanyes.find('.llistat-referencia').length)	{
			$pestanyes.find('.llistat-referencia').bcn_convertSelect({
				'action' : 'load',
			});
			var url = $pestanyes.find("#bcn-select1").find("option:first").attr('value') + " .main-container";
			$pestanyes.find("#bcn-select1").find("option:first").attr("selected","selected");
			loadContent(url);
			$pestanyes.find("#bcn-select1").change(function (e) {
				e.preventDefault();
				url = this.value + " .main-container";
				loadContent(url);
			});
		}
	}else{
		// escritori
		var url = $pestanyes.find("li:first a").attr("href") + " .main-container";
		$pestanyes.find("li:first a").addClass("active");
		loadContent(url);

		$pestanyes.find("li a").on("click", function(e) {
			e.preventDefault();
			$(".parag-pestanyes li a").removeClass("active");
			$(this).addClass("active");
			url = $(this).attr("href") + " .main-container";
			loadContent(url);
		});

	}

	function loadContent(url) {
		var load_content = ".loaded-content";
		var numLoadContent = 0;
		$(load_content).load(url, function(response, status, xhr) {
			if (numLoadContent == 0) {
					// només s'ha d'executar un cop... (pot haver més d'un loaded-content!!)
					initContent(load_content);
				} else {
					console.warn('[loadContent] class="loaded-content" duplicated', numLoadContent);
				}
				numLoadContent++;
			});
	}

	function initContent (load_content) {
			// Falta contextualizar a partir de .loaded-content
			$.fn.bcn_read_more(load_content);
			$.fn.bcn_galeria(load_content);
			$.fn.bcn_preguntes(load_content);
			$.fn.bcn_grup_destacats(load_content);
			$.fn.bcn_carrousel_links(load_content);
			$.fn.bcn_cartipas();
			$.fn.bcn_img_promocional();
			$.fn.galeria_imatges(load_content);
			$.fn.galeria_videos(load_content);
			$.fn.bcn_flickr();
			$.fn.bcn_addthis();
		}

	};
	$.fn.bcn_addthis = function(element){
		$('.region-pre-footer #atstbx > .at4-visually-hidden').text(Drupal.t('AddThis Sharing Buttons'));
		$('.region-pre-footer .at-share-tbx-element').find('.at-share-btn').each(function(i){
			$(this).attr('tabindex','0');
			var lit = $(this).children('.at4-visually-hidden').text().split(" ");
			$(this).children('.at4-visually-hidden').text(Drupal.t('Share to')+' '+Drupal.t(lit[2]));
		});
	}


$.fn.bcn_convertSelect = function (options) {
 i = 0;
    // Default settings
    var settings = $.extend({
      'active' : 'selected', // String: Set the "active" class
      'header' : '', // String: Specify text for "header" and show header instead of the active item
      'indent' : '- ', // String: Specify text for indenting sub-items
      'label'  : '', // String: sets the <label> text for the <select> (if not set, no label will be added)
      'action' : '' // Load o link

    }, options);

    return this.each(function () {

      // Used for namespacing
      i++;

      var $nav = $(this),
        // Namespacing
        namespace = 'bcn-select',
        namespace_i = namespace + i,
        l_namespace_i = '.l_' + namespace_i,
        $select = $('<select/>').attr("id", namespace_i).addClass(namespace + ' ' + namespace_i);


     if ($nav.is('ul,ol')) {
        if (settings.header !== '') {
          $select.append(
            $('<option/>').text(settings.header)
          );
        }

        // Build options
        var options = '';

        $nav
          .addClass('l_' + namespace_i)
          .find('a')
          .each(function () {
            options += '<option value="' + $(this).attr('href') + '">';
            var j;
            for (j = 0; j < $(this).parents('ul, ol').length - 1; j++) {
              options += settings.indent;
            }
            options += $(this).text() + '</option>';
          });

        // Append options into a select
        $select.append(options);


        // Select the active item
        if (!settings.header) {
          $select
            .find(':eq(' + $(l_namespace_i + ' li')
            .index($(l_namespace_i + ' li.' + settings.active)) + ')')
            .attr('selected', true);
        }

        // Change window location
        if (settings.action !== 'load') {
        	$select.change(function () {
          		window.location.href = $(this).val();
        	});
        }
        // Inject select
        $(l_namespace_i).after($select);
        // Inject label
        if (settings.label) {
          $select.before(
            $("<label/>")
              .attr("for", namespace_i)
              .addClass(namespace + '_label ' + namespace_i + '_label')
              .append(settings.label)
          );
        }
        $('#'+namespace_i).wrap('<p class="select-custom"></p>');
        $(l_namespace_i).hide();
      }

    });

  };



})(jQuery);
