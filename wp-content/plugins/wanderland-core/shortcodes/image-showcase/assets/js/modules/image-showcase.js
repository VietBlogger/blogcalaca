(function($) {
	'use strict';
	
	var imageShowcase = {};
	mkdf.modules.imageShowcase = imageShowcase;

	imageShowcase.mkdfInitImageShowcase = mkdfInitImageShowcase;

	imageShowcase.mkdfOnWindowLoad = mkdfOnWindowLoad;

	$(window).on('load', mkdfOnWindowLoad);

	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfInitImageShowcase();
	}

	/*
	 **	Init Image Showcase shortcode
	 */
	function mkdfInitImageShowcase(){
		var imageShowcase = $('.mkdf-image-showcase');

		if(imageShowcase.length) {
			imageShowcase.each(function() {

				var thisImageShowcase = $(this);

				if (mkdf.windowWidth > 1024 && thisImageShowcase.hasClass('mkdf-is-full-height')) {
					thisImageShowcase.closest('.vc_column_container').css({
						'position': 'fixed',
						'top': 0,
						'right': 0
					});
					thisImageShowcase.find('.mkdf-is-image').css('height', mkdf.windowHeight);
					thisImageShowcase.find('.mkdf-owl-slider').trigger('refresh.owl.carousel');
				}
				else if (mkdf.windowWidth <= 680) {
					var infoHeight = thisImageShowcase.find('.mkdf-is-image').outerHeight();
					thisImageShowcase.find('.owl-nav').css({
						'bottom': 'auto',
						'top': infoHeight,
						'transform': 'translateY(-100%)'
					});
				}
			});
		}
	}
	
})(jQuery);