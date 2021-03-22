(function($) {
	$.fn.bcn_video = function(url) {
		var data = get_video_thumb(url);

		// HACK (districtes) pel problema dels vídeos amagats
		var file_video = $('.file-video');
		if (file_video.length) {
			file_video.css("position", "initial");
		}
		return data;
	};

	function get_video_id(url) {
		var id, data;
		if (url.indexOf('youtube.com') > -1 || url.indexOf('youtu.be') > -1) {
			id = get_video_id_youtube(url);
			if (!id) {
				throw new Error('Unsupported YouTube URL');
			}
			data = { type: 'y', id: id }; // default.jpg OR hqdefault.jpg
		} else if (url.indexOf('vimeo.com') > -1) {
			var id = get_video_id_vimeo(url);
			if (!id) {
				throw new Error('Unsupported Vimeo URL');
			}
			data = { type: 'v', id: id };
		} else {
			throw new Error('Unrecognised URL');
		}
		return data;
	}

	function get_video_id_vimeo(url) {
		var id;

		if (url.match(/https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/)) {
			id = url.split('/')[3];
		} else if (url.match(/^vimeo.com\/channels\/[\d\w]+#[0-9]+/)) {
			id = url.split('#')[1];
		} else if (url.match(/vimeo.com\/groups\/[\d\w]+\/videos\/[0-9]+/)) {
			id = url.split('/')[4];
		} else if (url.match(/player.vimeo.com\/video\/[0-9]+/)) {
			id = url.split('/')[4];
		}

		 if(id.indexOf('?') != -1){
			id = id.split('?')[0];
		}
		//console.log('id->'+id);
		return id;
	}

	function get_video_id_youtube(url) {
		var id;
		if (url.indexOf('v=') > -1) {
			id = url.split('v=')[1].split('&')[0];
		} else if (url.indexOf('embed') > -1) {
			id = url.split('embed/')[1].split('?')[0];
		} else {
			id = url.split('/')[1];
		}
		return id;
	}

	function get_video_thumb(url) {
		var video = new get_video_id(url);
		var id = video.id;
		var type = video.type;
		var url, nav;
		if (type == 'y') {
			if (!id) {
				throw new Error('Unsupported YouTube URL');
			}

			url = 'https://i2.ytimg.com/vi/' + id + '/mqdefault.jpg';
			nav = '<div class="item video" data-video="' + url + '"><i class="bcn-icon-reprodueix"></i><img src="' + url + '"></div>';
		} else if (type == 'v') {

			nav = '<div class="item video"><i class="bcn-icon-reprodueix"></i> <img id="' + id + '" src="#"></div>';

			$.ajax({
				url: 'https://vimeo.com/api/v2/video/' + id + '.json',
				dataType: 'jsonp',
				async: false,
				success: function(data) {
					$("#" + id).attr("src", data[0].thumbnail_large);
				}
			});


		}

		return {
			video: video,
			nav: nav
		};
	}
})(jQuery);
