(function ($) {
    "use strict";

    window.mkdf = {};
    mkdf.modules = {};

    mkdf.scroll = 0;
    mkdf.window = $(window);
    mkdf.document = $(document);
    mkdf.windowWidth = $(window).width();
    mkdf.windowHeight = $(window).height();
    mkdf.body = $('body');
    mkdf.html = $('html, body');
    mkdf.htmlEl = $('html');
    mkdf.menuDropdownHeightSet = false;
    mkdf.defaultHeaderStyle = '';
    mkdf.minVideoWidth = 1500;
    mkdf.videoWidthOriginal = 1280;
    mkdf.videoHeightOriginal = 720;
    mkdf.videoRatio = 1.61;

    mkdf.mkdfOnDocumentReady = mkdfOnDocumentReady;
    mkdf.mkdfOnWindowLoad = mkdfOnWindowLoad;
    mkdf.mkdfOnWindowResize = mkdfOnWindowResize;
    mkdf.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad);
    $(window).resize(mkdfOnWindowResize);
    $(window).scroll(mkdfOnWindowScroll);

    /* 
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdf.scroll = $(window).scrollTop();
        mkdfBrowserDetection();

        //set global variable for header style which we will use in various functions
        if (mkdf.body.hasClass('mkdf-dark-header')) {
            mkdf.defaultHeaderStyle = 'mkdf-dark-header';
        }
        if (mkdf.body.hasClass('mkdf-light-header')) {
            mkdf.defaultHeaderStyle = 'mkdf-light-header';
        }
    }

    /* 
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {

    }

    /* 
     All functions to be called on $(window).resize() should be in this function
     */
    function mkdfOnWindowResize() {
        mkdf.windowWidth = $(window).width();
        mkdf.windowHeight = $(window).height();
    }

    /* 
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
        mkdf.scroll = $(window).scrollTop();
    }

    //set boxed layout width variable for various calculations

    switch (true) {
        case mkdf.body.hasClass('mkdf-grid-1300'):
            mkdf.boxedLayoutWidth = 1350;
            //mkdf.gridWidth = 1300;
            break;
        case mkdf.body.hasClass('mkdf-grid-1200'):
            mkdf.boxedLayoutWidth = 1250;
            //mkdf.gridWidth = 1200;
            break;
        case mkdf.body.hasClass('mkdf-grid-1000'):
            mkdf.boxedLayoutWidth = 1050;
            //mkdf.gridWidth = 1000;
            break;
        case mkdf.body.hasClass('mkdf-grid-800'):
            mkdf.boxedLayoutWidth = 850;
            //mkdf.gridWidth = 800;
            break;
        default:
            mkdf.boxedLayoutWidth = 1150;
            //mkdf.gridWidth = 1100;
            break;
    }

    mkdf.gridWidth = function () {
        var gridWidth = 1100;

        switch (true) {
            case mkdf.body.hasClass('mkdf-grid-1300') && mkdf.windowWidth > 1400:
                gridWidth = 1300;
                break;
            case mkdf.body.hasClass('mkdf-grid-1200') && mkdf.windowWidth > 1300:
                gridWidth = 1200;
                break;
            case mkdf.body.hasClass('mkdf-grid-1000') && mkdf.windowWidth > 1200:
                gridWidth = 1200;
                break;
            case mkdf.body.hasClass('mkdf-grid-800') && mkdf.windowWidth > 1024:
                gridWidth = 800;
                break;
            default:
                break;
        }

        return gridWidth;
    };

    mkdf.transitionEnd = (function () {
        var el = document.createElement('transitionDetector'),
            transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
                'MozTransition': 'transitionend', // only for FF < 15
                'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
            };

        for (var t in transEndEventNames) {
            if (el.style[t] !== undefined) {
                return transEndEventNames[t];
            }
        }
    })();

    mkdf.animationEnd = (function () {
        var el = document.createElement("animationDetector");

        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };

        for (var t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    })();

    /*
     * Browser detection
     */
    function mkdfBrowserDetection() {
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
            isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
            isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
            isIE = window.navigator.userAgent.indexOf("MSIE ");

        if (isChrome) {
            mkdf.body.addClass('mkdf-chrome');
        }
        if (isSafari) {
            mkdf.body.addClass('mkdf-safari');
        }
        if (isFirefox) {
            mkdf.body.addClass('mkdf-firefox');
        }
        if (isIE > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            mkdf.body.addClass('mkdf-ms-explorer');
        }
        if (/Edge\/\d./i.test(navigator.userAgent)) {
            mkdf.body.addClass('mkdf-edge');
        }
    }

})(jQuery);
(function($) {
	"use strict";

    var common = {};
    mkdf.modules.common = common;

    common.mkdfFluidVideo = mkdfFluidVideo;
    common.mkdfEnableScroll = mkdfEnableScroll;
    common.mkdfDisableScroll = mkdfDisableScroll;
    common.mkdfOwlSlider = mkdfOwlSlider;
    common.mkdfInitParallax = mkdfInitParallax;
    common.mkdfInitSelfHostedVideoPlayer = mkdfInitSelfHostedVideoPlayer;
    common.mkdfSelfHostedVideoSize = mkdfSelfHostedVideoSize;
    common.mkdfBlogListZigZagParallax = mkdfBlogListZigZagParallax;
    common.mkdfAddTiltFxClasses = mkdfAddTiltFxClasses;
    common.mkdfPrettyPhoto = mkdfPrettyPhoto;
	common.mkdfStickySidebarWidget = mkdfStickySidebarWidget;
    common.getLoadMoreData = getLoadMoreData;
    common.setLoadMoreAjaxData = setLoadMoreAjaxData;
    common.setFixedImageProportionSize = setFixedImageProportionSize;
    common.mkdfInitPerfectScrollbar = mkdfInitPerfectScrollbar;

    common.mkdfOnDocumentReady = mkdfOnDocumentReady;
    common.mkdfOnWindowLoad = mkdfOnWindowLoad;
    common.mkdfOnWindowResize = mkdfOnWindowResize;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad);
    $(window).resize(mkdfOnWindowResize);
    
    /*
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfIconWithHover().init();
	    mkdfDisableSmoothScrollForMac();
	    mkdfInitAnchor().init();
	    mkdfInitBackToTop();
	    mkdfBackButtonShowHide();
	    mkdfInitSelfHostedVideoPlayer();
	    mkdfSelfHostedVideoSize();
	    mkdfFluidVideo();
	    mkdfOwlSlider();
	    mkdfPreloadBackgrounds();
	    mkdfPrettyPhoto();
	    mkdfSearchPostTypeWidget();
	    mkdfDashboardForm();
		mkdfInitGridMasonryListLayout();
		mkdfSmoothTransition();
		mkdfAddTiltFxClasses();
		mkdfBlogListZigZagParallax();
		mkdfScrollToContent();
		mkdfUncoveringRowLanding();
    }

    /*
        All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
		mkdfInitParallax();
		mkdfBlogSliderCenterNav();
	    mkdfStickySidebarWidget().init();
    }

    /*
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdfOnWindowResize() {
	    mkdfInitGridMasonryListLayout();
    	mkdfSelfHostedVideoSize();
    }
	
	/*
	 ** Disable smooth scroll for mac if smooth scroll is enabled
	 */
	function mkdfDisableSmoothScrollForMac() {
		var os = navigator.appVersion.toLowerCase();
		
		if (os.indexOf('mac') > -1 && mkdf.body.hasClass('mkdf-smooth-scroll')) {
			mkdf.body.removeClass('mkdf-smooth-scroll');
		}
	}
	
	function mkdfDisableScroll() {
		if (window.addEventListener) {
			window.addEventListener('wheel', mkdfWheel, {passive: false});
		}
		
		// window.onmousewheel = document.onmousewheel = mkdfWheel;
		document.onkeydown = mkdfKeydown;
	}
	
	function mkdfEnableScroll() {
		if (window.removeEventListener) {
			window.removeEventListener('wheel', mkdfWheel, {passive: false});
		}
		
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	}
	
	function mkdfWheel(e) {
		mkdfPreventDefaultValue(e);
	}
	
	function mkdfKeydown(e) {
		var keys = [37, 38, 39, 40];
		
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				mkdfPreventDefaultValue(e);
				return;
			}
		}
	}
	
	function mkdfPreventDefaultValue(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}
	
	/*
	 **	Anchor functionality
	 */
	var mkdfInitAnchor = function() {
		/**
		 * Set active state on clicked anchor
		 * @param anchor, clicked anchor
		 */
		var setActiveState = function(anchor){
			var headers = $('.mkdf-main-menu, .mkdf-mobile-nav, .mkdf-fullscreen-menu, .mkdf-vertical-menu');
			
			headers.each(function(){
				var currentHeader = $(this);
				
				if (anchor.parents(currentHeader).length) {
					currentHeader.find('.mkdf-active-item').removeClass('mkdf-active-item');
					anchor.parent().addClass('mkdf-active-item');
					
					currentHeader.find('a').removeClass('current');
					anchor.addClass('current');
				}
			});
		};
		
		/**
		 * Check anchor active state on scroll
		 */
		var checkActiveStateOnScroll = function(){
			var anchorData = $('[data-mkdf-anchor]'),
				anchorElement,
				siteURL = window.location.href.split('#')[0];
			
			if (siteURL.substr(-1) !== '/') {
				siteURL += '/';
			}
			
			anchorData.waypoint( function(direction) {
				if(direction === 'down') {
					if ($(this.element).length > 0) {
						anchorElement = $(this.element).data("mkdf-anchor");
					} else {
						anchorElement = $(this).data("mkdf-anchor");
					}
				
					setActiveState($("a[href='"+siteURL+"#"+anchorElement+"']"));
				}
			}, { offset: '50%' });
			
			anchorData.waypoint( function(direction) {
				if(direction === 'up') {
					if ($(this.element).length > 0) {
						anchorElement = $(this.element).data("mkdf-anchor");
					} else {
						anchorElement = $(this).data("mkdf-anchor");
					}
					
					setActiveState($("a[href='"+siteURL+"#"+anchorElement+"']"));
				}
			}, { offset: function(){
				return -($(this.element).outerHeight() - 150);
			} });
		};
		
		/**
		 * Check anchor active state on load
		 */
		var checkActiveStateOnLoad = function(){
			var hash = window.location.hash.split('#')[1];
			
			if(hash !== "" && $('[data-mkdf-anchor="'+hash+'"]').length > 0){
				anchorClickOnLoad(hash);
			}
		};
		
		/**
		 * Handle anchor on load
		 */
		var anchorClickOnLoad = function ($this) {
			var scrollAmount,
				anchor = $('.mkdf-main-menu a, .mkdf-mobile-nav a, .mkdf-fullscreen-menu a, .mkdf-vertical-menu a'),
				hash = $this,
				anchorData = hash !== '' ? $('[data-mkdf-anchor="' + hash + '"]') : '';
			
			if (hash !== '' && anchorData.length > 0) {
				var anchoredElementOffset = anchorData.offset().top;
				scrollAmount = anchoredElementOffset - headerHeightToSubtract(anchoredElementOffset) - mkdfGlobalVars.vars.mkdfAddForAdminBar;
				
				if(anchor.length) {
					anchor.each(function(){
						var thisAnchor = $(this);
						
						if(thisAnchor.attr('href').indexOf(hash) > -1) {
							setActiveState(thisAnchor);
						}
					});
				}
				
				mkdf.html.stop().animate({
					scrollTop: Math.round(scrollAmount)
				}, 1000, function () {
					//change hash tag in url
					if (history.pushState) {
						history.pushState(null, '', '#' + hash);
					}
				});
				
				return false;
			}
		};
		
		/**
		 * Calculate header height to be substract from scroll amount
		 * @param anchoredElementOffset, anchorded element offset
		 */
		var headerHeightToSubtract = function (anchoredElementOffset) {
			
			if (mkdf.modules.stickyHeader.behaviour === 'mkdf-sticky-header-on-scroll-down-up') {
				mkdf.modules.stickyHeader.isStickyVisible = (anchoredElementOffset > mkdf.modules.header.stickyAppearAmount);
			}
			
			if (mkdf.modules.stickyHeader.behaviour === 'mkdf-sticky-header-on-scroll-up') {
				if ((anchoredElementOffset > mkdf.scroll)) {
					mkdf.modules.stickyHeader.isStickyVisible = false;
				}
			}
			
			var headerHeight = mkdf.modules.stickyHeader.isStickyVisible ? mkdfGlobalVars.vars.mkdfStickyHeaderTransparencyHeight : mkdfPerPageVars.vars.mkdfHeaderTransparencyHeight;
			
			if (mkdf.windowWidth < 1025) {
				headerHeight = 0;
			}
			
			return headerHeight;
		};
		
		/**
		 * Handle anchor click
		 */
		var anchorClick = function () {
			mkdf.document.on("click", ".mkdf-main-menu a, .mkdf-fullscreen-menu a, a.mkdf-btn, .mkdf-anchor, .mkdf-mobile-nav a, .mkdf-vertical-menu a", function () {
				var scrollAmount,
					anchor = $(this),
					hash = anchor.prop("hash").split('#')[1],
					anchorData = hash !== '' ? $('[data-mkdf-anchor="' + hash + '"]') : '';
				
				if (hash !== '' && anchorData.length > 0) {
					var anchoredElementOffset = anchorData.offset().top;
					scrollAmount = anchoredElementOffset - headerHeightToSubtract(anchoredElementOffset) - mkdfGlobalVars.vars.mkdfAddForAdminBar;
					
					setActiveState(anchor);
					
					mkdf.html.stop().animate({
						scrollTop: Math.round(scrollAmount)
					}, 1000, function () {
						//change hash tag in url
						if (history.pushState) {
							history.pushState(null, '', '#' + hash);
						}
					});
					
					return false;
				}
			});
		};
		
		return {
			init: function () {
				if ($('[data-mkdf-anchor]').length) {
					anchorClick();
					checkActiveStateOnScroll();
					
					$(window).on('load', function () {
						checkActiveStateOnLoad();
					});
				}
			}
		};
	};
	
	function mkdfInitBackToTop() {
		var backToTopButton = $('#mkdf-back-to-top');
		backToTopButton.on('click', function (e) {
			e.preventDefault();
			mkdf.html.animate({scrollTop: 0}, mkdf.window.scrollTop() / 3, 'easeInOutCubic');
		});
	}
	
	function mkdfBackButtonShowHide() {
		mkdf.window.scroll(function () {
			var b = $(this).scrollTop(),
				c = $(this).height(),
				d;
			
			if (b > 0) {
				d = b + c / 2;
			} else {
				d = 1;
			}
			
			if (d < 1e3) {
				mkdfToTopButton('off');
			} else {
				mkdfToTopButton('on');
			}
		});
	}
	
	function mkdfToTopButton(a) {
		var b = $("#mkdf-back-to-top");
		b.removeClass('off on');
		if (a === 'on') {
			b.addClass('on');
		} else {
			b.addClass('off');
		}
	}
	
	function mkdfInitSelfHostedVideoPlayer() {
		var players = $('.mkdf-self-hosted-video');
		
		if (players.length) {
			players.mediaelementplayer({
				audioWidth: '100%'
			});
		}
	}
	
	function mkdfSelfHostedVideoSize(){
		var selfVideoHolder = $('.mkdf-self-hosted-video-holder .mkdf-video-wrap');
		
		if(selfVideoHolder.length) {
			selfVideoHolder.each(function(){
				var thisVideo = $(this),
					videoWidth = thisVideo.closest('.mkdf-self-hosted-video-holder').outerWidth(),
					videoHeight = videoWidth / mkdf.videoRatio;
				
				if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
					thisVideo.parent().width(videoWidth);
					thisVideo.parent().height(videoHeight);
				}
				
				thisVideo.width(videoWidth);
				thisVideo.height(videoHeight);
				
				thisVideo.find('video, .mejs-overlay, .mejs-poster').width(videoWidth);
				thisVideo.find('video, .mejs-overlay, .mejs-poster').height(videoHeight);
			});
		}
	}
	
	function mkdfFluidVideo() {
        fluidvids.init({
			selector: ['iframe'],
			players: ['www.youtube.com', 'player.vimeo.com']
		});
	}
	
	function mkdfSmoothTransition() {

		if (mkdf.body.hasClass('mkdf-smooth-page-transitions')) {

			//check for preload animation
			if (mkdf.body.hasClass('mkdf-smooth-page-transitions-preloader')) {
				var loader = $('body > .mkdf-smooth-transition-loader.mkdf-mimic-ajax'),
					mainRevHolder = $('#mkdf-main-rev-holder'),
					wanderlandSpinner = $('.mkdf-wanderland-spinner');

				if (wanderlandSpinner.length) {
					loader.addClass('mkdf-smooth-transition-loader-wanderland');
				}

				/**
				 * Loader Fade Out function
				 *
				 * @param {number} speed - fade out duration
				 * @param {number} delay - fade out delay
				 * @param {string} easing - fade out easing function
				 */
				var fadeOutLoader = function(speed, delay, easing) {
					speed = speed ? speed : 600;
					delay = delay ? delay : 0;
					easing = easing ? easing : 'easeOutSine';

					loader.delay(delay).fadeOut(speed, easing);
					$(window).on('bind', 'pageshow', function (event) {
						if (event.originalEvent.persisted) {
							loader.fadeOut(speed, easing);
						}
					});
				};
				
				$(window).on('load', function() {
					if (wanderlandSpinner.length) {
						setTimeout(function() {
							loader.addClass('mkdf-smooth-transition-loader-wanderland-out');
						}, 1000);
						setTimeout(function() {
							if(mainRevHolder.length) {
								mainRevHolder.find('rs-module').revstart();
							}
						}, 2200);
					} else {
						fadeOutLoader();
					}
				});
			}
			
			//if back button is pressed, than show content to avoid state where content is on display:none
			window.addEventListener( "pageshow", function ( event ) {
				var historyPath = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
				if ( historyPath ) {
					$('.mkdf-wrapper-inner').show();
				}
			});
			
			//check for fade out animation
			if (mkdf.body.hasClass('mkdf-smooth-page-transitions-fadeout')) {
				var linkItem = $('a');
				
				linkItem.on('click', function (e) {
					var a = $(this);

					if ((a.parents('.mkdf-shopping-cart-dropdown').length || a.parent('.product-remove').length) && a.hasClass('remove')) {
						return;
					}
					
					if (a.parents('.woocommerce-product-gallery__image').length) {
						return;
					}

					if (
						e.which === 1 && // check if the left mouse button has been pressed
						a.attr('href').indexOf(window.location.host) >= 0 && // check if the link is to the same domain
						(typeof a.data('rel') === 'undefined') && //Not pretty photo link
						(typeof a.attr('rel') === 'undefined') && //Not VC pretty photo link
                        (!a.hasClass('lightbox-active')) && //Not lightbox plugin active
						(typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && // check if the link opens in the same window
						(a.attr('href').split('#')[0] !== window.location.href.split('#')[0]) // check if it is an anchor aiming for a different page
					) {
						e.preventDefault();
						$('.mkdf-wrapper-inner').fadeOut(600, 'easeOutSine', function () {
							window.location = a.attr('href');
						});
					}
				});
			}
		}
	}
	
	/*
	 *	Preload background images for elements that have 'mkdf-preload-background' class
	 */
	function mkdfPreloadBackgrounds(){
		var preloadBackHolder = $('.mkdf-preload-background');
		
		if(preloadBackHolder.length) {
			preloadBackHolder.each(function() {
				var preloadBackground = $(this);
				
				if(preloadBackground.css('background-image') !== '' && preloadBackground.css('background-image') !== 'none') {
					var bgUrl = preloadBackground.attr('style');
					
					bgUrl = bgUrl.match(/url\(["']?([^'")]+)['"]?\)/);
					bgUrl = bgUrl ? bgUrl[1] : "";
					
					if (bgUrl) {
						var backImg = new Image();
						backImg.src = bgUrl;
						$(backImg).load(function(){
							preloadBackground.removeClass('mkdf-preload-background');
						});
					}
				} else {
					$(window).on('load', function(){ preloadBackground.removeClass('mkdf-preload-background'); }); //make sure that mkdf-preload-background class is removed from elements with forced background none in css
				}
			});
		}
	}
	
	function mkdfPrettyPhoto() {
		/*jshint multistr: true */
		var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="'+mkdfGlobalVars.vars.ppExpand+'">'+mkdfGlobalVars.vars.ppExpand+'</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a> \
                                            <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">'+mkdfGlobalVars.vars.ppPrev+'</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">'+mkdfGlobalVars.vars.ppNext+'</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">'+mkdfGlobalVars.vars.ppClose+'</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';
		
		$("a[data-rel^='prettyPhoto']").prettyPhoto({
			hook: 'data-rel',
			animation_speed: 'normal', /* fast/slow/normal */
			slideshow: false, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			horizontal_padding: 0,
			default_width: 960,
			default_height: 540,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			deeplinking: false,
			custom_markup: '',
			social_tools: false,
			markup: markupWhole
		});
	}

    function mkdfSearchPostTypeWidget() {
        var searchPostTypeHolder = $('.mkdf-search-post-type');

        if (searchPostTypeHolder.length) {
            searchPostTypeHolder.each(function () {
                var thisSearch = $(this),
                    searchField = thisSearch.find('.mkdf-post-type-search-field'),
                    resultsHolder = thisSearch.siblings('.mkdf-post-type-search-results'),
                    searchLoading = thisSearch.find('.mkdf-search-loading'),
                    searchIcon = thisSearch.find('.mkdf-search-icon');

                searchLoading.addClass('mkdf-hidden');

                var postType = thisSearch.data('post-type'),
                    keyPressTimeout;

                searchField.on('keyup paste', function() {
                    var field = $(this);
                    field.attr('autocomplete','off');
                    searchLoading.removeClass('mkdf-hidden');
                    searchIcon.addClass('mkdf-hidden');
                    clearTimeout(keyPressTimeout);

                    keyPressTimeout = setTimeout( function() {
                        var searchTerm = field.val();
                        
                        if(searchTerm.length < 3) {
                            resultsHolder.html('');
                            resultsHolder.fadeOut();
                            searchLoading.addClass('mkdf-hidden');
                            searchIcon.removeClass('mkdf-hidden');
                        } else {
                            var ajaxData = {
                                action: 'wanderland_mikado_search_post_types',
                                term: searchTerm,
                                postType: postType,
	                            search_post_types_nonce: $('input[name="mkdf_search_post_types_nonce"]').val()
                            };

                            $.ajax({
                                type: 'POST',
                                data: ajaxData,
                                url: mkdfGlobalVars.vars.mkdfAjaxUrl,
                                success: function (data) {
                                    var response = JSON.parse(data);
                                    if (response.status === 'success') {
                                        searchLoading.addClass('mkdf-hidden');
                                        searchIcon.removeClass('mkdf-hidden');
                                        resultsHolder.html(response.data.html);
                                        resultsHolder.fadeIn();
                                    }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("Status: " + textStatus);
                                    console.log("Error: " + errorThrown);
                                    searchLoading.addClass('mkdf-hidden');
                                    searchIcon.removeClass('mkdf-hidden');
                                    resultsHolder.fadeOut();
                                }
                            });
                        }
                    }, 500);
                });

                searchField.on('focusout', function () {
                    searchLoading.addClass('mkdf-hidden');
                    searchIcon.removeClass('mkdf-hidden');
                    resultsHolder.fadeOut();
                });
            });
        }
    }
	
	/**
	 * Initializes load more data params
	 * @param container with defined data params
	 * return array
	 */
	function getLoadMoreData(container){
		var dataList = container.data(),
			returnValue = {};
		
		for (var property in dataList) {
			if (dataList.hasOwnProperty(property)) {
				if (typeof dataList[property] !== 'undefined' && dataList[property] !== false) {
					returnValue[property] = dataList[property];
				}
			}
		}
		
		return returnValue;
	}
	
	/**
	 * Sets load more data params for ajax function
	 * @param container with defined data params
	 * @param action with defined action name
	 * return array
	 */
	function setLoadMoreAjaxData(container, action) {
		var returnValue = {
			action: action
		};
		
		for (var property in container) {
			if (container.hasOwnProperty(property)) {
				
				if (typeof container[property] !== 'undefined' && container[property] !== false) {
					returnValue[property] = container[property];
				}
			}
		}
		
		return returnValue;
	}
	
	/*
	 ** Init Masonry List Layout
	 */
	function mkdfInitGridMasonryListLayout() {
		var holder = $('.mkdf-grid-masonry-list');
		
		if (holder.length) {
			holder.each(function () {
				var thisHolder = $(this),
					masonry = thisHolder.find('.mkdf-masonry-list-wrapper'),
					size = thisHolder.find('.mkdf-masonry-grid-sizer').width();
				
				masonry.waitForImages(function () {
					masonry.isotope({
						layoutMode: 'packery',
						itemSelector: '.mkdf-item-space',
						percentPosition: true,
						masonry: {
							columnWidth: '.mkdf-masonry-grid-sizer',
							gutter: '.mkdf-masonry-grid-gutter'
						}
					});
					
					if (thisHolder.find('.mkdf-fixed-masonry-item').length || thisHolder.hasClass('mkdf-fixed-masonry-items')) {
						setFixedImageProportionSize(masonry, masonry.find('.mkdf-item-space'), size, true);
					}
					
					setTimeout(function () {
						mkdfInitParallax();
					}, 600);
					
					masonry.isotope('layout').css('opacity', 1);
				});
			});
		}
	}
	
	/**
	 * Initializes size for fixed image proportion - masonry layout
	 */
	function setFixedImageProportionSize(container, item, size, isFixedEnabled) {
		if (container.hasClass('mkdf-masonry-images-fixed') || isFixedEnabled === true) {
			var padding = parseInt(item.css('paddingLeft'), 10),
				newSize = size - 2 * padding,
				defaultMasonryItem = container.find('.mkdf-masonry-size-small'),
				largeWidthMasonryItem = container.find('.mkdf-masonry-size-large-width'),
				largeHeightMasonryItem = container.find('.mkdf-masonry-size-large-height'),
				largeWidthHeightMasonryItem = container.find('.mkdf-masonry-size-large-width-height');

			defaultMasonryItem.css('height', newSize);
			largeHeightMasonryItem.css('height', Math.round(2 * (newSize + padding)));

			if (mkdf.windowWidth > 680) {
				largeWidthMasonryItem.css('height', newSize);
				largeWidthHeightMasonryItem.css('height', Math.round(2 * (newSize + padding)));
			} else {
				largeWidthMasonryItem.css('height', Math.round(newSize / 2));
				largeWidthHeightMasonryItem.css('height', newSize);
			}
		}
	}

	/**
	 * Object that represents icon with hover data
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdfIconWithHover = function() {
		//get all icons on page
		var icons = $('.mkdf-icon-has-hover');
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var hoverColor = icon.data('hover-color'),
					originalColor = icon.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: icon, color: originalColor}, changeIconColor);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconHoverColor($(this));
					});
				}
			}
		};
	};

	function mkdfBlogListZigZagParallax() {
		var blogList = $('.mkdf-bl-zig-zag');

		if (blogList.length) {
			blogList.each(function() {
				var thisBlogList = $(this),
					evenItems = thisBlogList.find('.mkdf-bl-item:nth-child(even) .mkdf-bli-inner');

				evenItems.attr('data-parallax', '{"y": -50, "smoothness": 30}');
			});
			setTimeout(function() {
				mkdfParallaxElements();
			}, 300);
		}
	}

	/**
	 * Init Parallax Items
	 */
	function mkdfParallaxElements() {
		var parallaxIntances = $("[data-parallax]");
		
		if (parallaxIntances.length && !mkdf.htmlEl.hasClass('touch')) {
			ParallaxScroll.init(); //initialzation removed from plugin js file to have it run only on non-touch devices
		}
	}

	function mkdfBlogSliderCenterNav() {
		var blogSlider = $('.mkdf-blog-slider');

		if (blogSlider.length) {
			blogSlider.each(function() {
				var thisBlogSlider = $(this);

				thisBlogSlider.waitForImages(function() {
					var thisBlogImage = thisBlogSlider.find('.mkdf-item-image'),
						thisBlogImageHeight = thisBlogImage.outerHeight();
					// Nav arrows positioning (middle of image)
					thisBlogSlider.find('.owl-next, .owl-prev').css('top', thisBlogImageHeight/2 + 10);
				});
			});
		}
	}

	function mkdfAddTiltFxClasses() {
		var tiltElements = $('.mkdf-bl-item .mkdf-post-image, .mkdf-blog-slider-item-inner > .mkdf-item-image, .mkdf-bs-carousel-centered .mkdf-blog-slider-item-inner, .mkdf-destination-list-holder .mkdf-dl-item-inner, .mkdf-team-holder .mkdf-team-image, .mkdf-image-behavior-custom-link, .mkdf-blwd-item-inner');

		// Different Tilt Amount for big images
		var bigImages = $('.mkdf-image-behavior-custom-link, .mkdf-blwd-item-inner, .mkdf-grid-masonry-list.mkdf-bl-zig-zag.mkdf-two-columns .mkdf-bl-item .mkdf-post-image'),
			hugeImages = $('.mkdf-destination-slider-holder .mkdf-one-columns .mkdf-dl-item-inner');

		if (bigImages.length) {
			bigImages.each(function() {
				var thisItem = $(this);

				thisItem.attr('data-tilt-amount', 180);
			});
		}

		if (hugeImages.length) {
			hugeImages.each(function() {
				var thisItem = $(this);

				thisItem.attr('data-tilt-amount', 350);
			});
		}

		if (tiltElements.length) {
			tiltElements.each(function() {
				var thisItem = $(this);
				if (!thisItem.hasClass('mkdf-tilt-trigger')) {
					thisItem.addClass('mkdf-tilt-trigger');
					thisItem.find('>:first-child').addClass('mkdf-tilt-target');
				}
			});
	
			setTimeout(function() {
				mkdfTiltFx().init();
			}, 300)
		}
	}

	function mkdfTiltFx() {
		var tilts = $('.mkdf-tilt-trigger');
		
        var enter = function(e, tr, ta, tiltAmount) {
            var aFx = tiltAmount,
                trF = 4,
                cH = tr.innerHeight(),
                cW = tr.innerWidth(),
                eX = (e.originalEvent.type === 'touchmove') ? e.originalEvent.touches[0].pageX : e.offsetX,
                eY = (e.originalEvent.type === 'touchmove') ? e.originalEvent.touches[0].pageY : e.offsetY;
            $.each(ta, function(i, el) {
                TweenLite.set($(el), {
                    transformOrigin: ((eX / (cW * trF) / 100 * 10000) + (trF * 10)) + '% ' + ((eY / (cH * trF) / 100 * 10000) + (trF * 10)) + '%',
                    transformPerspective: 1000 + (i * 500)
                });
                TweenLite.to($(el), 0.5, {
                    rotationX: ((eY - cH / 2) / aFx) - i * 2,
                    rotationY: ((eX - cW / 2) / aFx * -1) - i * 2,
                    y: (eY - (cH / 2)) / (70 - i * 20),
                    x: (eX - (cW / 2)) / (70 - i * 20)
                });
            });
        }
        var leave = function(ta) {
            $.each(ta, function(i, el) {
                TweenLite.to($(el), 1, {
                    delay: .2,
                    y: 0,
                    x: 0,
                    rotationX: 0,
                    rotationY: 0,
                    transformPerspective: '1500'
                });
            });
        }
        var init = function() {
            tilts.each(function() {
                var tiltTrigger = $(this),
					tiltTargets = tiltTrigger.find('.mkdf-tilt-target'),
					tiltAmountData = tiltTrigger.attr('data-tilt-amount');
				
				// Read Tilt Amount data
				if (tiltAmountData === undefined) {
					tiltAmountData = 70;
				}
					
                tiltTrigger.on('mousemove touchmove', function(e) {
                    enter(e, tiltTrigger, tiltTargets, tiltAmountData);
                }).on('mouseout touchend', function(e) {
                    leave(tiltTargets);
                });
            });
        }
        return {
            init: function() {
                tilts.length && !Modernizr.touch && init();
            }
        }
    }
	
	/*
	 ** Init parallax
	 */
	function mkdfInitParallax(){
		var parallaxHolder = $('.mkdf-parallax-row-holder');
		
		if(parallaxHolder.length){
			parallaxHolder.each(function() {
				var parallaxElement = $(this),
					image = parallaxElement.data('parallax-bg-image'),
					speed = parallaxElement.data('parallax-bg-speed') * 0.4,
					height = 0;
				
				if (typeof parallaxElement.data('parallax-bg-height') !== 'undefined' && parallaxElement.data('parallax-bg-height') !== false) {
					height = parseInt(parallaxElement.data('parallax-bg-height'));
				}
				
				parallaxElement.css({'background-image': 'url('+image+')'});
				
				if(height > 0) {
					parallaxElement.css({'min-height': height+'px', 'height': height+'px'});
				}
				
				parallaxElement.parallax('50%', speed);
			});
		}
	}
	
	/*
	 **  Init sticky sidebar widget
	 */
	function mkdfStickySidebarWidget(){
		var sswHolder = $('.mkdf-widget-sticky-sidebar'),
			headerHolder = $('.mkdf-page-header'),
			headerHeight = headerHolder.length ? headerHolder.outerHeight() : 0,
			widgetTopOffset = 0,
			widgetTopPosition = 0,
			sidebarHeight = 0,
			sidebarWidth = 0,
			objectsCollection = [];
		
		function addObjectItems() {
			if (sswHolder.length) {
				sswHolder.each(function () {
					var thisSswHolder = $(this),
						mainSidebarHolder = thisSswHolder.parents('aside.mkdf-sidebar'),
						widgetiseSidebarHolder = thisSswHolder.parents('.wpb_widgetised_column'),
						sidebarHolder = '',
						sidebarHolderHeight = 0;
					
					widgetTopOffset = thisSswHolder.offset().top;
					widgetTopPosition = thisSswHolder.position().top;
					sidebarHeight = 0;
					sidebarWidth = 0;
					
					if (mainSidebarHolder.length) {
						sidebarHeight = mainSidebarHolder.outerHeight();
						sidebarWidth = mainSidebarHolder.outerWidth();
						sidebarHolder = mainSidebarHolder;
						sidebarHolderHeight = mainSidebarHolder.parent().parent().outerHeight();
						
						var blogHolder = mainSidebarHolder.parent().parent().find('.mkdf-blog-holder');
						if (blogHolder.length) {
							sidebarHolderHeight -= parseInt(blogHolder.css('marginBottom'));
						}
					} else if (widgetiseSidebarHolder.length) {
						sidebarHeight = widgetiseSidebarHolder.outerHeight();
						sidebarWidth = widgetiseSidebarHolder.outerWidth();
						sidebarHolder = widgetiseSidebarHolder;
						sidebarHolderHeight = widgetiseSidebarHolder.parents('.vc_row').outerHeight();
					}
					
					objectsCollection.push({
						'object': thisSswHolder,
						'offset': widgetTopOffset,
						'position': widgetTopPosition,
						'height': sidebarHeight,
						'width': sidebarWidth,
						'sidebarHolder': sidebarHolder,
						'sidebarHolderHeight': sidebarHolderHeight
					});
				});
			}
		}
		
		function initStickySidebarWidget() {
			
			if (objectsCollection.length) {
				$.each(objectsCollection, function (i) {
					var thisSswHolder = objectsCollection[i].object,
						thisWidgetTopOffset = objectsCollection[i].offset,
						thisWidgetTopPosition = objectsCollection[i].position,
						thisSidebarHeight = objectsCollection[i].height,
						thisSidebarWidth = objectsCollection[i].width,
						thisSidebarHolder = objectsCollection[i].sidebarHolder,
						thisSidebarHolderHeight = objectsCollection[i].sidebarHolderHeight;
					
					if (mkdf.body.hasClass('mkdf-fixed-on-scroll')) {
						var fixedHeader = $('.mkdf-fixed-wrapper.fixed');
						
						if (fixedHeader.length) {
							headerHeight = fixedHeader.outerHeight() + mkdfGlobalVars.vars.mkdfAddForAdminBar;
						}
					} else if (mkdf.body.hasClass('mkdf-no-behavior')) {
						headerHeight = mkdfGlobalVars.vars.mkdfAddForAdminBar;
					}
					
					if (mkdf.windowWidth > 1024 && thisSidebarHolder.length) {
						var sidebarPosition = -(thisWidgetTopPosition - headerHeight),
							sidebarHeight = thisSidebarHeight - thisWidgetTopPosition + 100; // 40 is bottom margin of widget holder
						
						//move sidebar up when hits the end of section row
						var rowSectionEndInViewport = thisSidebarHolderHeight + thisWidgetTopOffset - headerHeight - thisWidgetTopPosition - mkdfGlobalVars.vars.mkdfTopBarHeight;
						
						if ((mkdf.scroll >= thisWidgetTopOffset - headerHeight) && thisSidebarHeight < thisSidebarHolderHeight) {
							if (thisSidebarHolder.hasClass('mkdf-sticky-sidebar-appeared')) {
								thisSidebarHolder.css({'top': sidebarPosition + 'px'});
							} else {
								thisSidebarHolder.addClass('mkdf-sticky-sidebar-appeared').css({
									'position': 'fixed',
									'top': sidebarPosition + 'px',
									'width': thisSidebarWidth,
									'margin-top': '-10px'
								}).animate({'margin-top': '0'}, 200);
							}
							
							if (mkdf.scroll + sidebarHeight >= rowSectionEndInViewport) {
								var absBottomPosition = thisSidebarHolderHeight - sidebarHeight + sidebarPosition - headerHeight;
								
								thisSidebarHolder.css({
									'position': 'absolute',
									'top': absBottomPosition + 'px'
								});
							} else {
								if (thisSidebarHolder.hasClass('mkdf-sticky-sidebar-appeared')) {
									thisSidebarHolder.css({
										'position': 'fixed',
										'top': sidebarPosition + 'px'
									});
								}
							}
						} else {
							thisSidebarHolder.removeClass('mkdf-sticky-sidebar-appeared').css({
								'position': 'relative',
								'top': '0',
								'width': 'auto'
							});
						}
					} else {
						thisSidebarHolder.removeClass('mkdf-sticky-sidebar-appeared').css({
							'position': 'relative',
							'top': '0',
							'width': 'auto'
						});
					}
				});
			}
		}
		
		return {
			init: function () {
				addObjectItems();
				initStickySidebarWidget();
				
				$(window).scroll(function () {
					initStickySidebarWidget();
				});
			},
			reInit: initStickySidebarWidget
		};
	}

	/*
	 * Slide to content on scroll - one scroll to page content
	*/
	function mkdfScrollToContent() {
		var revSliderLanding = $(".mkdf-rev-slider-landing");
		if (revSliderLanding.length && !mkdf.htmlEl.hasClass('touch')) {
			var sliderHolderHeight = revSliderLanding.height(),
				sliderHolderOffset = revSliderLanding.offset().top,
				sliderArea = sliderHolderHeight - sliderHolderOffset,
				revSlider = revSliderLanding.find('.rev_slider'),
				pageJump = false,
				normalScroll = true,
				set = false;

			var mkdfScrollHandler = function () {
				if ($(window).scrollTop() < sliderArea) {
					normalScroll = false;
				}

				function mkdfScrollTo() {
					if (!mkdf.body.hasClass('mkdf-fp-opened')) {
						pageJump = true;
						$('html, body').animate({
							scrollTop: sliderArea
						}, 1000, 'easeInOutQuint', function () {
							pageJump = false;
							normalScroll = true;
						});
					}
				}

				window.addEventListener('wheel', function (event) {
					var scroll = event.deltaY,
						scrollingForward = false,
						reInitOneScroll = false;

					if (scroll > 0) {
						scrollingForward = true;
					} else {
						scrollingForward = false;
					}

					if ($(window).scrollTop() - sliderHolderOffset <= Math.round(sliderHolderHeight * 0.5)) {
						reInitOneScroll = true;
					}

					if (!pageJump && !normalScroll) {
						if (scrollingForward && ($(window).scrollTop() < sliderArea)) {
							event.preventDefault();
							mkdfScrollTo();
						}
					} else {
						if (!normalScroll) {
							event.preventDefault();
						}

						if (normalScroll && !scrollingForward && reInitOneScroll) {
							pageJump = false;
							normalScroll = false;
							event.preventDefault();
						}
					}
				}, {
					passive: false
				});

				//scrollbar click
				$(document).on('mousedown', function (event) {
					if ($(window).outerWidth() <= event.pageX) {
						if ($(window).scrollTop() == sliderHolderOffset) {
							event.preventDefault();
							mkdfScrollTo();
						}
					}
				});
			}

			//prevent mousewheel scroll
			window.addEventListener('wheel', function (event) {
				if (!set) {
					event.preventDefault();
				}
			});

			//prevent scrollbar scroll
			window.addEventListener('scroll', function () {
				if (!set) {
					$(window).scrollTop(sliderHolderOffset);
				}
			})

			//init
			if (revSlider.length) {
				revSlider.bind('revolution.slide.onchange', function (e, data) {
					set = true;
					mkdfScrollHandler();
				});
			} else {
				$(window).on('load', function () {
					set = true;
					mkdfScrollHandler();
				});
			}
		}
	}

	function mkdfUncoveringRowLanding() {
		var uncoveringRow = $('.mkdf-uncovering-row-landing');

		if (uncoveringRow.length) {
			var closestContent = uncoveringRow.closest('.mkdf-content'),
				prevRow = uncoveringRow.prev();
			
			closestContent.append(uncoveringRow);
			prevRow.css({'margin-bottom': '100vh', 'position': 'relative'});
			uncoveringRow.css({
				'position': 'fixed',
				'width': '100vw',
				'height': '100vh',
				'bottom': '0',
				'left': '0',
			});

			var svgTest = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1922 52"><path d="M283.8 39.4zM227.6 39.2c-.1 0 0 0 0 0zM200.2 37.6zM374.6 33.2zM267.8 40.3s-.1 0 0 0zM373.2 31.3zM287.8 39.5c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c-.1 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3 0 .3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.4 0-.8.1-1.1.3zM360.5 39.7c-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5 0-.1 0-.2-.1-.2-.4-.3-.6-.3-.9-.3zM229.7 42.7c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.8-1 1zM230.6 41.7s0-.1 0 0c0-.1 0-.1 0 0zM231.6 40.5zM230.2 39.1zM230.2 39.1c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.5-.7-1-1-1.4zM267.7 41.5v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.8-.8-.2-1.6-.5zM336.9 41.6c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.4-.5-1-.8-1.6-.7zM342.1 42.9c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM256.4 42.1c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.3-.2-.5-.3-.7-.3zM327.2 37.4c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.2.6.2 1.1.3 1.6zM259.8 42c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4-.1-.2-.3-.3-.4-.4zM185.9 33.4c0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.2-.5 0-.9-.5-.9h-.2c0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.3 0-.6.1-.9.2.1.7.6.3.9.5-.1.4-.2.8-.2 1.2zM342 39.4c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3h3.1zM224.6 44.3c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.3-.1-.4-.4-.5-.6z"/><path d="M228.1 39.7c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM221 43c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.3 0-.6-.3-.8zM385.8 43.1c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1.1-.3.1-.5.2-.8.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.2-.6-.4-1.2-1.2-1.5zM245.6 42.5c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.2-.4.1-.6-.2zM365.3 40c-.6-.1-1.2-.1-1.8-.2-.1 0-.2.2-.2.3l.1.2c.2.1.3.2.5.2.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.2-.9-.2-1.3-.2zM248.5 42.9c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5.1-.6-.4-.8-.8-1.2zM233.5 44.3c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.5-.3-.9zM331.1 39.6c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4.1-.2-.2-.4-.4-.6zM349.2 39.5c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.9-.3-4.2.1zM223.9 39.5c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.5-1 .5-1-.7-2.1zM262.1 43c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.2.1-.5.2-.4.5zM262.5 42.5zM345 37.5c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-1-.4-1.4zM183.5 37.6c-.3.3-.5.6-.3.8.2.2.5.4.8.4.4 0 .6-.3.5-.8-.2-.1-.6-.2-1-.4zM229.8 46.2c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.4.6-.4 1.1-.4 1.7zM374.5 36.2c.2-.5.4-.9.1-1.3-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.4 0 .6.1.8.2zM207.6 44.7s.1 0 0 0c.1-.2 0-.3-.1-.4-.1 0-.2.1-.2.1-.1-.1-.2-.2-.4-.3l-.2.1s0 .2.1.2h.4c.1.1.1.1.1.2v.7c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1 0-.8-.1-.8-.6-1.2zM361.8 42.5c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.2-1.1.3-1.9.6zM234.8 42.5c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5-.1-.3-.2-.5-.4-.5zm.1.8c0 .1 0 .1 0 0l.1.1c-.1 0-.1 0-.1-.1zM249.7 43c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1-.4.3-.7.6-1 1zM194.8 39.8c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.2-.7-.5-.6zM196.3 40.9h-.2V42c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.8-.5-1.3zM191.5 41.7c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4 0-.3-.3-.5-.6-.2zM231.6 44.4c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.5.1-.7.3-.7.5zM381.7 43.5c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6.2-.2.5-.4.6-.6.1-.4-.3-.8-.6-.7zM184.1 35.5c-.1.2.1.5.3.6.3 0 .4-.2.4-.4.1-.4.1-.9-.1-1.3l-.1-.1-.1.1v.1c-.1.2-.3.6-.4 1zM356.6 35.3c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.2-.5-.3-.7-.4zM331.6 35.6c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.1.2.2.7.6.6zM331.8 34.2zM269.5 44.2c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1 0-.1.3-.1.5zM221.8 45.3c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.5-.4.8-1 .8zM226.8 45.6c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .8.3 1.2.5 1.9zM375.4 40.6c-.2 0-.4.1-.6.2v.4c.2.3.7.4.9.3.1 0 .1-.2.1-.2 0-.3-.1-.6-.4-.7zM363.5 39.3c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4-.4 0-.9-.1-1.3-.1-.1 0-.2.2-.2.3-.1.1 0 .3.1.4zM192.5 39.6c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.1-.4-.3-.6-.5zM192.5 39.6zM360.8 34.9c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.5.2-.6.5-.6 1zM365.5 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM365.6 36.1c.4-.9.3-1.3-.1-2.5-.2 1.8-.2 1.8.1 2.5zM293.1 42.4c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.1-.3-.1zM281.6 42.9c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5s-.2-.6-.5-.6zM392 47.4c.7 1.2.8 1.3 1.7 1.3-.6-.5-.8-1.1-1.7-1.3zM326.6 34.4c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM391.8 48.6c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.5.2-1-.3-1.1zM244.2 44.4c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 .1.2.1.4.1zM335.8 37.3c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.1-.1-.4 0-.5.2zM360.1 36.3c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM281.7 41.4c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.1.1-.3zM243.9 45.4c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.3.5-.4.6zM241.3 39.1c-.1 0-.2.1-.2.2 0 .4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM372.2 36.2c.1-.1.2-.3 0-.5-.1-.1-.3-.1-.5-.1-.1.1-.3.2-.3.4s.1.4.2.7c.3-.2.4-.3.6-.5zM376.7 41.7c.1 0 .3.1.4 0 .3-.3.8-.4 1-.8-.8-.1-.8-.1-1.4.8zM283.7 41.1c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.2-.2-.2-.2zM181.2 36.3c-.1 0-.1 0 0 0zM331.3 37.3c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.1-.3-.2-.6-.3-1z"/><path d="M246.2 41.9c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.2.6-.4.6-.7zM197.6 40.3l.3.6c.2-.1.5-.2.7-.3-.5-.9-.5-.9-1-.3zM267.8 40.9c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2v.6zM267.8 40.3c-.1 0 0 0 0 0zM376.7 33.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM375.4 33.2c0 .3-.2.6.2.9.4-.3.9-.4 1.1-.9-.4.2-.9.1-1.3 0zM333.4 34.9v.1c.3.3.6.2 1-.1-.4-.2-.7-.3-1 0zM227.2 42.9c.1.8.1.8.9.4-.3-.4-.5-.6-.9-.4zM355.1 35.7c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2-.1.3-.3.3-.4zM221.9 40.3c0-.1-.2-.2-.3-.3-.1.1-.3.3-.3.4 0 .2.2.5.3.9.2-.5.3-.7.3-1zM381.5 41.1c-.2 0-.4-.1-.5 0-.2.1-.3.4-.4.6l.2.2c.2-.3.6-.2.7-.8zM327.6 33.9c.3-.6.1-1.2.1-1.8-.4.7-.5 1-.1 1.8zM186.6 36.5c0-.1-.2-.2-.2-.3l-.5.5c.2.1.3.3.4.3.2-.1.3-.3.3-.5zM266.1 43.6c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.2-.3-.3-.5-.1zM236.4 44.8c.3-.4.2-.8 0-1.4-.4.7-.4.7 0 1.4zM362.5 37.3c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.3-.1-.3-.1zM187.3 41v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3.1-.6-.4-.8zM370 35c0 .8 0 .8.8.9-.3-.3-.5-.5-.8-.9zM345.9 38.1c.4.3.7.4 1.1.2-.3-.3-.6-.3-1.1-.2zM342.2 38.1c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.1 0 .2-.1.6-.2zM190.6 43.2c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM367.6 34.7c-.1 0-.3.2-.3.2 0 .1.1.3.2.5.2-.2.3-.3.3-.4.1-.2 0-.4-.2-.3zM407.3 33.4c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM408.7 33.5c-.1 0-.2-.1-.4-.1v-.2c0-.1-.2-.2-.2-.3l-.4.4c-.1 0-.3.1-.4.1.4.3.9.5 1.4.1zM181.3 38.9c.5-.6.3-1.2.4-1.7-.3.4-.5.9-.4 1.7zM181.7 37.2s0-.1 0 0c0-.1 0-.1 0 0zM274.9 43.5c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.3-.3-.5-.4zM219.2 45.3c0 .4.1.6.1 1 .5-.5.5-.7-.1-1zM228.3 44.6c-.1 0-.1.1-.1.2 0 .3.1.5.4.6.2-.3 0-.5 0-.7-.1 0-.3-.1-.3-.1zM273.1 41.6c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0 0-.1 0-.2.1zM203.9 45.5c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.2.1-.2.1zM247.6 44.6c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM389.2 43.9c.1 0 .1-.1.1-.2 0-.4-.3-.6-.7-.7.1.3.2.6.3.8 0 .1.2.1.3.1zM388.6 43zM191.7 40.8c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7-.1.1-.1.4.2.4z"/><path d="M197.5 41.3c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM197.9 40.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM353.6 35.8c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM189 43c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM359.4 37.5c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4c0 .1.1.1.1 0zM201.3 40.1s0 .1 0 0c.1 0 0 0 0 0z"/><path d="M200.9 39.5s-.1 0 0 0c-.2.5.2.5.4.7 0-.3.1-.7-.4-.7zM191.5 39.2c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM192.5 39.6zM192 39.6s0 .1 0 0c0 .1 0 .1 0 0zM238.1 45.8l.2.2c.1-.1.2-.3.3-.4l-.2-.2c-.2.1-.2.3-.3.4zM201.3 38.6c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 .1.2 0 .3-.1zM198.5 38.4c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2 0-.4-.2-.4zM309.4 42.5c0 .1.1.2.2.4.1-.2.2-.4.1-.4 0-.1-.2-.1-.3-.2 0 .1-.1.2 0 .2zM179.7 38.6c0 .1.1.2.2.4.1-.2.1-.3.1-.4 0-.1-.1-.1-.1-.2 0 0-.2.1-.2.2zM211 45.6c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3 0 0-.1 0-.3.1zM291.9 41.6c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7l-.3-.3zM240.5 43.1s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.1.2-.3.3zM212.9 44.3c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3-.1 0 .1-.1.1-.2zM211.4 44.3s0 .1 0 0c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM193.2 43.4s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.2.3-.2.5zM372.9 43.2c.2-.1.3-.4 0-.5l-.4.4c.2 0 .4.1.4.1zM372.5 43zM179.7 35.8c0 .1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.2-.1-.3c-.1 0-.3.1-.3.2zM242.3 44.6c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3-.1-.1-.2-.1-.2-.2zM290 42.6c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1 0-.1.2-.2.3zM279 41.9h.1zM278.5 42.3s.1.1 0 0c.4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM370.6 37.4s.2-.1.2-.2-.1-.2-.2-.3c-.1.1-.2.1-.3.2.2.2.2.3.3.3zM364 36.2zM363.4 36.2c.1.1.1.2.2.3l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1zM362.4 36.3c0 .1.1.2.3.3.1-.2.1-.3.1-.4 0-.1-.2-.1-.3-.1-.1 0-.2.1-.1.2zM199.9 41.8c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM289.6 43.1c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM205.6 46s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.2.3-.2.4-.2.6zM204.7 44c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c-.1.1-.1.1-.1.2zM181 33.7h.2c0-.1.1-.3.1-.4v-.1c.1 0 .1 0 .2-.1v-.2s-.1 0-.1.1l-.1.1c0-.1.1-.2 0-.2 0-.1-.2-.1-.3-.1l-.1.2c0 .1.1.2.2.3l-.3.3c.2 0 .2.1.2.1zM194.1 39.3c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0-.1 0-.2.1-.2zM217.8 43.5s.1.1.2.1v-.2h-.2v.1zM208.7 43.8s0 .1 0 0c0 .1 0 .1.1.1l-.1-.1c.1.1 0 0 0 0zM197.2 43.8c.1.1.1.3.2.4h.2v-.1c-.1-.1-.3-.2-.4-.3zM253.3 41.9h.1c.2-.2 0-.4-.1-.5-.1.2-.3.3 0 .5zM253.3 41.4zM204.3 40.3s0-.1 0 0c-.1 0-.1.1-.1.1s.1 0 .1.1v-.2zM201.3 40.2c.1 0 .1 0 0 0 .1 0 .1 0 0 0zM201.4 40.2c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1-.2-.1-.3-.1-.3 0zM375.4 33.2zM374.6 33.2zM374.6 33.2c.3.2.5.1.8 0-.3-.2-.6-.1-.8 0zM200.2 37.6v.7c.3-.3.1-.5 0-.7zM372.7 31.3s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1 0 0-.1.1-.2.1zM373.2 31.3zM190.8 34.2s.1 0 .1.1c0-.1.1-.1.1-.2 0 0-.1-.1-.1 0 0-.1 0 0-.1.1zM182.3 32.2l-.1.1s0 .1.1.1c-.1 0 0 0 0-.2 0 .1 0 0 0 0zM404.3 39.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM404.3 39.9c-.1.2-.2.4-.2.6.2-.2.4-.3.2-.6zM405.8 37.5zM406 37.7s0-.1 0 0c-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM211.4 43.9v.4c.1-.1.1-.2.2-.4 0 .1-.1 0-.2 0zM197.2 43.7c0 .1 0 .1 0 0 0 .1 0 0 0 0zM197.1 43.4c0 .1-.1.1-.1.2s.1.1.1.2v-.2c.1-.1 0-.2 0-.2zM295.5 39.2s.1 0 .1-.1c.1-.1.1-.1.1-.2-.1 0-.2 0-.2.1s.1.2 0 .2zM283.5 39.7h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2 0-.1 0 0-.1 0zM283.8 39.4zM329.7 36.8c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM330 36.6h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2 0 .1 0 0 .1 0zM181.1 36.3zM180.8 36.4c.1 0 .2 0 .2-.1l-.2.1c.1-.1.1 0 0 0zM336.9 29.7l-.2-.2c0 .1.1.1.1.2h.1zM199.2 34.2V34c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2.1 0 .1.1.1.1zM399.7 48.7h0c-.1 0-.1 0 0 0zM399.5 48.6zM402.4 44.3v.1c-.1.1-.1 0 0-.1 0 .1 0 .1 0 0zM388.6 43c0-.2 0-.3.1-.5-.1 0-.1-.1-.2-.1-.2.2-.1.4.1.6zM339.8 43.3c0-.1 0-.1.1-.2l-.1.1v.1zM243.2 42.9c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM343.4 39.2h.1-.1zM273.6 39.9v-.1.1zM345 37.3v0zM225.7 41.4s0-.1.1-.1c-.1 0-.1 0-.1.1zM225.7 41.3s.1 0 0 0c.1 0 .1-.1 0 0 .1-.1.1-.1 0 0zM364 36.2s.1 0 .1-.1c-.1 0-.1 0-.1.1zM250.4 40.2c.1 0 .1-.1.2-.1 0 0-.1 0-.2.1.1-.1.1-.1 0 0zM327.7 32.1zM327.8 31.9c0 .1 0 .1-.1.2l.1-.1v-.1zM181.5 29.3s.1 0 .1.1l-.1-.1c.1 0 .1 0 0 0zM300.3 30.2c-.1 0-.1 0 0 0-.1.1-.2.2-.2.3.1 0 .1-.1.2-.1v-.2zM300.1 30.5c-.1 0-.1 0 0 0zM343.7 29.1s0-.1-.1-.1l.1.1zM287.1 29.9c-.1 0-.1-.1-.2-.1l-.1.1h.3zM279.4 30.2c.1 0 .2-.1.3-.1-.1-.1-.1-.2-.2-.3h-.4v.1l.3.3zM196.5 34.2v.1h.1v-.1h-.1zM319.2 35.4c0-.1 0-.1.1-.2-.1.1-.1.1-.1.2-.1 0 0 0 0 0zM276.6 29.5s0-.1.1-.1l-.1.1zM229.4 39.4zM272 31.3l.2.2c0-.1-.1-.1-.1-.2h-.1zM317.2 34.4l-.1.1s0-.1.1-.1zM293.8 37.7l-.2.2c.1 0 .1-.1.2-.1s0-.1 0-.1zM298.4 33.5c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1c-.1-.1-.2-.1-.2-.2zM233.8 26.8c-.1 0-.1 0 0 0-.1.1 0 .1 0 0 0 .1 0 0 0 0zM102.5 36.1zM33.5 32.3zM46.2 35.9zM18.9 34.3zM193.3 29.9zM86.4 37zM191.9 27.9c-.1 0-.1 0 0 0zM106.5 36.2c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c-.1 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3-.1.3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.5-.1-.8 0-1.1.3zM180 36.4c-.3 0-.5-.1-.8 0-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5-.2-.3-.2-.4-.2-.5zM23.5 30.1c.1 0 .1 0 0 0 .1 0 0 0 0 0zM22.5 30.1v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 .1.1.1.2.1 0 .4 0 .8-.2 1.2 0-.1-.1-.1-.1-.2 0 .1.1.1.1.2-.3.1-.5.2-.8.3.2.5.2.5-.3 1.3.3.1.6.1.9.2.5-.2.5-.2.7.2.1.2 0 .4.4.3v-.8c-.1-.5 0-.9.2-1.4.2-.4.2-.8.3-1.2-.1-.2-.3-.4-.4-.6-.4.1-.6.3-.8.5zM48.4 39.4c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.7-1 1zM49.3 38.3zM7.4 28.7zM6.4 31.7c-.1.1-.1.2-.2.3.2.3.4.5.6.8.4-.1.6-.5.8-.9.2.1.4.4.8 0-.2-.3-.3-.6-.5-.8l.3-.3c.1-.9-.6-1.4-.8-2.1-.1.1-.2.3-.1.4.3 1.1-.2 1.8-.9 2.6zm1.1.1c-.1-.1-.2-.1-.3-.2 0-.1.1-.1.1-.2.1.2.2.3.2.4zM50.3 37.1zM48.9 35.8zM48.9 35.8c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.6-.7-1-1-1.4zM86.4 38.2v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.9-.9-.2-1.6-.5zM155.6 38.3c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.5-.5-1-.8-1.6-.7zM160.8 39.6c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM75.1 38.7c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.3-.1-.5-.3-.7-.3zM145.9 34c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.1.6.2 1.1.3 1.6zM78.4 38.7c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4 0-.2-.2-.4-.4-.4zM5.4 28.1c-.5 0-1 0-1.5.2.1.7.6.3.9.5-.1.4-.1.8-.1 1.2 0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5 0-.5-.2-.8-.6-.9zM160.6 36c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3c1.1.1 2.1 0 3.1 0zM43.2 40.9c-.2-.3-.2-.5 0-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.3-.1-.4-.3-.6-.6zM30.9 34.6c-.1-.1-.2-.3-.2-.4-.2.3-.4.7-.9.7l-.9-.6c0 .4.1.8.4 1.1.4.3.5.8.5 1.4.1-.3.3-.5.4-.8.9.2.9.2 1.1-.7-.2-.2-.3-.5-.4-.7zM29.7 36.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM46.8 36.4c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM39.7 39.7c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.4 0-.7-.3-.8zM204.5 39.8c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1v-.1c.1.2.3.3.4.5.1-.4 0-.6-.4-.6 0-.2.1-.4.1-.5.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.1-.7-.4-1.3-1.1-1.6zM10.2 27.1c-.3 0-.6.3-.6.8s.3.8.8.8c.4 0 .7-.3.7-.7 0-.5-.5-.9-.9-.9zM64.3 39.2c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.1-.4 0-.6-.2zM184 36.6c-.6-.1-1.2-.1-1.8-.2l-.1-.1c-.1.3-.2.6-.3.8.2 0 .4.2.4.1s.1-.1.1-.2c.1 0 .2.1.3.1.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.1-.9-.1-1.3-.2zM67.2 39.6c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5.1-.6-.5-.8-.8-1.2zM52.2 41c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.6-.3-.9zM149.8 36.3c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4 0-.3-.2-.4-.4-.6zM11.9 31h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8-.1.2-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.6 1.1.9 1.5zM1.7 29.7c-.3.5-.6.9-.8 1.4.4.5.6.7 1 1 .1-.9.2-1.6-.2-2.4zM167.9 36.2c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.9-.4-4.2.1zM42.6 36.2c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.4-1 .4-1-.7-2.1z"/><path d="M80.8 39.6c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.3.1-.5.3-.4.5zM81.2 39.2zM163.7 34.1c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-.9-.4-1.4zM2.2 34.3c-.3.3-.5.6-.3.8.2.2.5.4.8.4.4 0 .6-.3.5-.8-.3-.1-.6-.2-1-.4zM48.5 42.8c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.5.6-.4 1.2-.4 1.7zM193.4 31.5c-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.2 0 .5.1.7.2-.1.1-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.5 1 .9 1.4h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8.2-.4.5-.8.2-1.2zM36.6 36.6c0 .6 0 1.2.1 1.9.5-.4.7-.6.8-.8.1-.6-.2-.9-.9-1.1zM26 41.2v.8c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1 0-.9-.1-.8-.9-1.4zM180.5 39.2c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.1-1.1.3-1.9.6zM53.5 39.1c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5-.1-.2-.2-.4-.4-.5zm0 .9c.1 0 .1 0 0 0l.1.1s0-.1-.1-.1zM68.4 39.6c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1l-1 1zM15.4 33.6zM14.8 33.8c.3.6.7 1.1.7 1.8.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1l-.3-.9h-.6c-.1.1-.1.2-.1.2zM13.5 36.5c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.3-.7-.5-.6zM28.8 34.2zM28.7 32.4s-.1-.3-.1-.4c-.2 0-.3 0-.5.1-.1 0-.1.2-.1.2 0 .4 0 .9.1 1.3.1.3.4.4.7.6-.1-.6-.6-1.2-.1-1.8zM15 37.6h-.2v1.1c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.9-.5-1.3zM10.1 38.3c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4.1-.3-.2-.4-.6-.2zM26.7 38.3c-.1-.4-.1-.6-.2-.9v-.9c-.5.3-.8.5-.7 1 .1.5.3.8.9.8zM50.3 41.1c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.6 0-.7.2-.7.5zM200.4 40.1c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6l.1-.1.1.1c0-.1 0-.2.1-.2.1-.1.3-.3.3-.4.1-.4-.3-.7-.6-.7zM21.4 34.1c0-.3-.2-.4-.4-.5-.3-.3-.6-.6-.9-1-.4.3-.4.7-.3 1.1.1.4.3.5.7.5 0 .1 0 .2-.1.3-.1.3.1.6.4.7.2.1.4-.1.5-.5.1-.2.1-.4.1-.6zM11.8 28.1c.7-.7.6-1-.3-1.9 0 .7-.2 1.3.3 1.9zM3.2 31c-.1.4-.3.8-.4 1.2-.1.2.1.5.3.6.3 0 .4-.2.4-.4.1-.5.1-.9-.1-1.4h-.2zM175.3 31.9c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.1-.5-.3-.7-.4zM150.2 32.3c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.2.2.3.7.6.6zM150.5 30.9zM88.2 40.8c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1.1-.1.4-.1.5zM35.2 36.9c-.2.2-.3.4-.1.6.1.2.2.3.4.4 0 .1 0 .1.1.2v-.2c.2.1.3.1.5.2.2-.5 0-.8-.2-1.1-.3-.2-.5-.2-.7-.1zM40.5 41.9c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.6-.4.9-1 .8zM45.5 42.3c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .7.2 1.2.5 1.9zM182.2 35.9c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4h-.3c.2-.8.2-1.6-.1-2.3-.3.5-.6.9-.8 1.4.4.4.6.7 1 .9h-.9s-.1 0-.1.1c-.7-.2-.8-.1-.9.4v.5c.3-.2.6-.4.9-.7-.4.2-.3.3-.2.3zM11.2 36.3c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.2-.4-.3-.6-.5zM11.2 36.3zM179.5 31.6c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.5.2-.6.5-.6 1zM184.2 30.2zM184.3 32.7c.4-.9.3-1.3-.1-2.5-.2 1.9-.2 1.9.1 2.5zM111.8 39.1c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.2-.3-.1zM100.3 39.6c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5 0-.4-.2-.6-.5-.6zM211.4 44.4c0-.1-.1-.1-.1-.1-.2-.1-.3-.2-.5-.2 0 .1.1.1.1.2-.2 0-.3.1-.2.2.1.1.2.1.3.1.4.7.7.8 1.4.8-.4-.3-.7-.7-1-1zM8.9 35.8c-.1.5-.2 1-.4 1.6.3 0 .5.1.7 0 .1-.1.2-.3.2-.5-.1-.4-.2-.7-.5-1.1zM145.3 31.1c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM10 33.3c-.3-.3-.6-.4-.9-.4-.1 0-.2.1-.5.3.4.1.6.2.8.3.2.1.4.3.6.4.3-.2.2-.4 0-.6zM210.5 45.3c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.6.2-1-.3-1.1zM62.9 41.1c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 0 .2.1.4.1zM154.5 34c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.2-.1-.4 0-.5.2zM178.8 33c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM100.4 38.1c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.2.1-.3zM62.6 42.1c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.3.4-.4.6zM60 35.8c-.1 0-.2.1-.2.2 0 .4 0 .7.4 1.1.3-.5.2-.9 0-1.3H60zM102.3 37.8c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3.1-.1-.1-.2-.2-.2zM34.7 41.3c.6.2.9.2 1.3-.2-.4-.3-.8-.3-1.3.2zM150 34c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.2-.3-.2-.6-.3-1zM64.9 38.5c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.1.6-.3.6-.7zM16.3 36.9l.3.6c.2-.1.5-.2.7-.3-.5-.8-.5-.8-1-.3zM86.5 37.5c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2-.1.2-.1.4 0 .6zM86.4 37zM152.1 31.6v.1c.3.3.6.2 1-.1-.4-.3-.7-.3-1 0zM45.9 39.5c.1.8.1.8.9.4-.3-.3-.5-.5-.9-.4zM173.8 32.3c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2 0 .3-.2.3-.4zM40.3 36.6c-.1.2-.3.3-.3.4 0 .2.2.5.3.9.1-.5.3-.7.3-1 0 0-.2-.1-.3-.3zM146.2 30.5c.3-.6.1-1.2.1-1.8-.4.7-.4 1.1-.1 1.8zM5 32.9l-.5.5c.2.1.3.3.4.3.2 0 .4-.2.3-.4 0-.3-.1-.3-.2-.4zM24.8 33c-.2-.2-.5-.3-.7-.5-.1 0-.1.1-.2.1.1.2.1.4.2.6.2.2.7.1.7-.2zM84.8 40.3c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.3-.3-.3-.5-.1zM55.1 41.5c.3-.4.2-.8 0-1.4-.4.6-.4.6 0 1.4zM181.2 34c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.2-.1-.3-.1-.3-.1zM6 37.7v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3 0-.6-.4-.8zM164.6 34.8c.4.3.7.4 1.1.2-.3-.4-.6-.4-1.1-.2zM160.9 34.7c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.1 0 .2-.1.6-.2zM9.3 39.9c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM39.5 37.4c0-.1-.1-.3-.2-.6-.2.2-.3.4-.4.5-.1.2 0 .4.2.4s.4-.2.4-.3zM24.8 35.6c.3-.6.1-.9-.3-1.2 0 .4-.1.8.3 1.2zM31.2 32.7c.1.3.1.6.2.9h.6c0-.6-.3-.8-.8-.9zM31.4 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM206.5 41.4zM206.5 40.5l-.2-.2c0-.1-.1-.2-.2-.2 0 0-.1.1-.2.1 0 .1.1.1.1.2l-.1.1c.1.3.3.6.5.9.2-.3.3-.6.1-.9zM164.7 40.4c-.2 0-.4.1-.3.3 0 .1.2.2.4.3.1-.1.3-.2.3-.3-.1-.2-.3-.3-.4-.3zM93.6 40.2c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.4-.3-.5-.4zM37.9 42c0 .4.1.6.1 1 .5-.6.5-.7-.1-1zM47.2 42.1c.2-.3 0-.5 0-.7l-.2-.1c-.1 0-.1.1-.1.2-.1.3 0 .6.3.6zM91.8 38.3c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0-.1-.1 0-.2.1zM31.4 42c-.1.2-.3.3-.4.5.1.1.2.2.3.2.2-.1.3-.3.4-.5 0 0 0-.2-.1-.2 0-.1-.2-.1-.2 0zM22.5 42.2c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2 0 .1-.1.1-.2.1zM66.3 41.3c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM163.2 39.4c-.1.4-.1.7.4 1 0-.4 0-.8-.4-1zM207.3 39.7zM10.3 37.5c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7 0 .1 0 .3.2.4zM16.2 38c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM16.6 37.5zM172.3 32.5c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM7.7 39.7c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM178.1 34.2c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4h.1zM209 44.4c.1.1.2.2.3.2.1-.1.1-.2.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2.2-.2.3zM20 36.8zM19.6 36.1s-.1.1 0 0c-.2.5.2.5.4.7 0-.3.1-.6-.4-.7zM10.2 35.9c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM11.2 36.3zM10.7 36.3c-.1 0-.1 0 0 0zM171.7 38c-.1.2-.1.3-.2.5.1.1.1.2.2.2s.2-.1.2-.1c0-.2 0-.4-.1-.5 0-.1-.1-.1-.1-.1zM20 35.3c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 0 .2-.1.3-.1zM17.2 35.1c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2 0-.4-.2-.4zM166.6 37.9c-.1 0-.2 0-.2.1-.1.1-.1.2-.2.3.1 0 .2.1.3.1.2 0 .3-.1.3-.4 0 0-.1-.1-.2-.1zM70.7 41.9l.2.2c.1-.2.2-.4.3-.5-.1 0-.2-.1-.2-.1-.1.1-.2.2-.3.4zM32.9 42.1s-.1 0 0 0c0 .2 0 .4.1.6h.2c-.1-.2-.1-.3-.2-.5 0-.1-.1-.1-.1-.1zM29.7 42.3c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3 0 0-.2 0-.3.1zM110.6 38.3c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7-.1-.2-.2-.2-.3-.3zM59.2 39.8s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.1.2-.3.3zM31.5 41c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3 0 0 .2-.2.1-.2zM29.3 41.1c.1.1.3.1.5.1.1 0 .2-.1.3-.2-.1 0-.2-.1-.3-.1-.3-.1-.6.1-.5.2zM30.1 41zM11.9 40.1s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.2.2-.2.3-.2.5zM23.1 38.8l.6.6c.1-.5 0-.7-.6-.6zM150.8 33.4l.2-.1v-.4c-.1 0-.2.1-.4.1 0 .2.1.3.2.4zM165.8 31.9c-.1 0-.2.2-.3.3.1.1.2.2.3.2.1 0 .2-.2.2-.3 0-.1-.1-.3-.2-.2zM208.4 46.1l.2.2c.1 0 .2-.1.2-.2-.1-.1-.2-.1-.3-.2 0 .1 0 .1-.1.2zM63.9 51.6c.1 0 .1.1.2.1v-.2l-.1-.1s0 .1-.1.2zM222.2 41.4h-.4c-.1 0-.1.2-.1.3.1 0 .2.1.2 0 .1 0 .1-.1.3-.3zM191.6 39.9c.2-.1.3-.4 0-.5l-.4.4c.2 0 .4.1.4.1zM191.2 39.7zM47 43h.3s.1-.1.1-.2c-.1 0-.2-.1-.3 0-.1 0-.1.1-.1.2zM76.6 41.4c0 .1.1.3.1.3.1 0 .2-.1.3-.1-.1-.1-.1-.3-.1-.3-.1 0-.2.1-.3.1zM60.9 41.3c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3 0-.1-.1-.2-.2-.2zM34.9 42.7c.4-.3.4-.3.3-.7-.1.3-.2.4-.3.7zM36.6 41.9c0 .1.1.2.2.3.1-.1.2-.1.2-.2-.1-.1-.1-.2-.2-.3 0 .1-.2.2-.2.2zM108.7 39.2c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1.1-.1.2-.2.3zM97.7 38.6v-.1zM97.2 38.9c0 .1.1.1 0 0 .4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM25.4 40.9s0 .2.1.2c.2 0 .4 0 .6.1-.1-.1-.3-.3-.5-.4 0 0-.1 0-.2.1zM26.1 41.2zM171.4 35.1c-.3 0-.5-.1-.8-.1.3.3.5.3.8.1zM182.6 32.8s0 .1 0 0c0 .1.1.1 0 0zM182.3 33.2l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1.1.1.1.2.2.3zM18.6 38.5c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM19.2 37.4c0 .2-.1.3-.1.4 0 .1.1.1.2.2 0-.1.1-.2.1-.4l-.2-.2zM22.2 34.4c-.1.7.4.9 1 1.3v-.8c-.1-.4-.5-.5-.8-.7.1-.4.1-.8-.2-1.2-.2.5-.4 1 0 1.4zM206.5 42c-.2 0-.5.1-.9.1.6.4.8.2.9-.1zM193.9 40.4c0 .1.1.1.1.2.1 0 .1-.1.2-.1 0 0 0-.1-.1-.1 0-.1-.1-.1-.2 0zM44.7 42.7c0 .1.1.1.1.2.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3-.1 0-.1.1-.1.2zM108.3 39.8c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM24.3 42.6s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.2.4-.2.5-.2.6zM23.3 40.7c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c0 .1 0 .1-.1.2zM66.5 38.2h.3c-.1-.1-.1-.2-.2-.3h-.2s-.1.1 0 .1c0 .1.1.2.1.2zM81.7 37.2c-.1 0-.1 0-.2.1 0 .1.1.1.1.2l.2-.2-.1-.1zM173.3 33.8s.1-.1.1-.2c-.1 0-.2-.1-.3-.1 0 0-.1.1-.1.2.1 0 .2.1.3.1zM80.6 36.8c-.1 0-.2.1-.3.1l.2.2c.1 0 .2-.1.3-.2-.1 0-.2-.1-.2-.1zM33.3 38.2c.1 0 .2.1.2.1s.1-.1.1-.2c-.1 0-.2-.1-.2-.1s-.1.1-.1.2zM30.5 38.3c.1.1.1.2.1.2l.2-.2v-.2c-.1.1-.2.1-.3.2zM21.3 38.7c0 .1.1.1.2.2.1-.1.1-.2.2-.3-.1 0-.1-.1-.2-.1-.1.1-.2.1-.2.2zM34.1 36.9c0 .1.1.1.1.2.1 0 .2-.1.2-.1 0-.1-.1-.1-.1-.2-.1 0-.1.1-.2.1zM24.9 36.8s-.1.1-.2.1c.1.1.1.2.2.3.1-.1.2-.2.1-.2 0-.1-.1-.2-.1-.2zM12.8 35.9c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0 0 0-.1.1-.2 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM40.6 41.2s-.1 0 0 0c-.1 0-.1 0-.1.1l.1-.1c0 .1 0 0 0 0zM72 38.6h.1c.2-.2 0-.4-.1-.5-.1.2-.3.3 0 .5zM72 38.1zM43.9 39.5c0-.1-.1-.1-.1-.2-.1 0-.1.1-.1.1 0 .1.1.1.1.2 0 0 .1 0 .1-.1z"/><path d="M193.9 32.8c-.1 0-.2 0-.2.1l.1.1c.1-.1.1-.1.1-.2zM82.9 37.1c0 .1-.1.2-.1.3.1-.1.2-.1.3-.2l-.2-.1zM82.7 37.4zM21.4 37.1h-.2v.1s.1.1.2.1v-.2zM28.3 36.9c.1 0 .1 0 .1-.1 0 0-.1-.1-.1.1 0-.1 0-.1 0 0zM22.9 37c0 .1 0 .1 0 0 .1 0 .1 0 .1-.1h-.1v.1zM20 36.8zM20.1 36.8c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1h-.3zM194 29.9c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1-.1.1 0 0 0zM193.3 29.9z"/><path d="M193.3 29.9c.3.2.5.1.8 0-.3-.2-.6-.1-.8 0zM27.2 35.7l.1.1c0-.1 0-.1-.1-.1 0-.1 0-.1 0 0zM18.9 34.3v.7c.3-.4.1-.5 0-.7zM191.4 28s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1s-.1 0-.2.1zM191.9 27.9c-.1 0-.1 0 0 0-.1 0 0 0 0 0zM24.4 34.2h-.2s0 .1.1.1.1.1.2.1c0-.1-.1-.2-.1-.2zM24.5 34.4zM6.8 32.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM6.7 33.3c.1-.1.2-.1.2-.2s0-.2-.1-.4c-.1.1-.1.2-.2.3 0 .1 0 .2.1.3zM9.6 30.6c0 .1-.1.1-.1.2 0 0 .1 0 .1.1 0-.1.1-.1.1-.2l-.1-.1zM205.4 42.9v.1l.1-.1c0-.1 0-.1-.1 0 .1-.1 0-.1 0 0zM200.3 42.1v.1h.2v-.1h-.2zM197.3 40.5c0-.1-.1-.1-.1-.2h-.1c0 .1.1.1.2.2-.1 0 0 0 0 0zM43.3 42.9s.1.1.1 0v-.1h-.1v.1zM224.5 34.2zM224.7 34.4c0-.1 0-.1 0 0-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM30.1 41c.1-.1.1-.2.2-.4-.1 0-.1 0-.2-.1v.5zM45 39.6c0 .1-.1.1 0 0 0 .1 0 .1.1.1-.1 0 0 0-.1-.1zM102.2 36.4h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2 0-.1-.1-.1-.1 0zM102.5 36.1zM38.7 38.4c.1.1.1.1.2 0v-.1c-.1 0-.2 0-.2.1zM148.4 33.5c0 .1 0 .1 0 0zM148.6 33.2h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2.1.1.1.1.1 0zM17.5 33.5zM17.2 33.2v.2c.1 0 .1 0 .2.1 0-.1-.1-.1-.1-.2l-.1-.1zM7.8 32.9c0-.1-.1-.1 0 0-.1-.1-.1 0-.1 0h.1c-.1 0 0 0 0 0zM155.6 26.4l-.2-.2c0 .1.1.1.1.2h.1zM17.9 30.8v-.2c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2l.1.1zM3.4 29.6v.1zM11.8 24.5zM11.6 24.8h.2c0-.1 0-.2.1-.2l-.2.2c-.1-.1-.1 0-.1 0zM206.5 41.4v.5c.3-.1.2-.3 0-.5zM221 41v0c.1.1 0 0 0 0zM207.2 39c-.2.2-.1.4.1.6 0-.2 0-.3.1-.5-.1 0-.2 0-.2-.1zM158.5 39.9c0-.1 0-.1.1-.2l-.1.1v.1zM61.9 39.6c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM162 35.9h0zM82.7 37.4zM82.5 37.5l.1-.1-.1.1c.1-.1.1 0 0 0zM92.3 36.6v-.1.1zM163.7 34v0zM44.4 38.1s0-.1.1-.1c-.1 0-.1 0-.1.1 0-.1 0 0 0 0zM44.4 38s0-.1 0 0c.1-.1.1-.1 0 0 .1-.1 0-.1 0 0 0-.1 0 0 0 0zM182.6 32.8s.1 0 .1-.1c0 .1 0 .1-.1.1zM69.1 36.8c.1 0 .1-.1.2-.1 0 0-.1 0-.2.1.1 0 0 0 0 0zM29.7 36.8zM29.6 37c0-.1 0-.1.1-.2l-.1.1v.1zM41.8 36.4l.1-.1h-.1zM30.6 34.1c0 .1 0 .1 0 0 .1.1.1 0 0 0 .1 0 0 0 0 0zM30.6 34l.1.1c-.1 0-.1 0-.1-.1zM31.4 33.6l-.1.1.1-.1zM17.8 33.5h-.2c0 .2.1.2.2 0zM17.8 33.5zM146.4 28.7c0 .1 0 .1 0 0 0 .1 0 .1 0 0zM146.5 28.6c0 .1 0 .1-.1.2l.1-.1v-.1zM118.9 26.9s-.1 0-.1.1-.1.1-.1.2c.1 0 .1-.1.2-.1.1-.1 0-.2 0-.2zM118.8 27.2c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0 0zM162.4 25.8s0-.1-.1-.1l.1.1c0-.1 0-.1 0 0zM15.2 30.9h-.1v.1h.1c.1-.1.1-.1 0-.1zM137.8 32.1c0-.1 0-.1.1-.2 0 .1 0 .1-.1.2 0-.1 0 0 0 0zM95.3 26.2s0-.1.1-.1c0 0-.1 0-.1.1 0-.1 0 0 0 0zM47.9 35.9c.1 0 .1.1.2.1 0-.1-.1-.1-.1-.2l-.1.1zM48.1 36c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM90.7 28l.2.2c0-.1-.1-.1-.1-.2h-.1zM135.9 31.1l-.1.1c0-.1 0-.1.1-.1zM117.1 30.2c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1l-.2-.2zM52.5 23.5c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0 0zM686.9 39.4zM630.7 39.2zM603.3 37.6zM777.7 33.2zM670.9 40.3zM776.3 31.3zM690.9 39.5c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c0 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3 0 .3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.4 0-.8.1-1.1.3zM763.6 39.7c-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5 0-.1 0-.2-.1-.2-.4-.3-.6-.3-.9-.3zM632.8 42.7c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.8-1 1zM633.7 41.7s0-.1 0 0c0-.1 0-.1 0 0zM634.7 40.5zM633.3 39.1c.1 0 .1 0 0 0 .1 0 .1 0 0 0zM633.3 39.1c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.3-.5-.6-1-1-1.4zM670.8 41.5v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.8-.8-.2-1.6-.5zM740 41.6c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.4-.5-1-.8-1.6-.7zM745.2 42.9c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM659.5 42.1c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.3-.2-.5-.3-.7-.3zM730.4 37.4c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.1.6.1 1.1.3 1.6zM662.9 42c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4-.1-.2-.3-.3-.4-.4zM589 33.4c0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.2-.5 0-.9-.5-.9h-.2c0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.3 0-.6.1-.9.2.1.7.6.3.9.5-.1.4-.2.8-.2 1.2zM745.1 39.4c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3h3.1zM627.7 44.3c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.3-.1-.4-.4-.5-.6zM631.2 39.7c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM624.1 43c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.3 0-.6-.3-.8zM788.9 43.1c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1.1-.3.1-.5.2-.8.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.2-.6-.4-1.2-1.2-1.5zM648.7 42.5c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.2-.4.1-.6-.2zM768.4 40c-.6-.1-1.2-.1-1.8-.2-.1 0-.2.2-.2.3l.1.2c.2.1.3.2.5.2.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.2-.9-.2-1.3-.2zM651.7 42.9c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5 0-.6-.5-.8-.8-1.2zM636.6 44.3c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.5-.3-.9zM734.2 39.6c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4.1-.2-.2-.4-.4-.6zM752.3 39.5c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.8-.3-4.2.1zM627.1 39.5c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.4-1 .4-1-.7-2.1z"/><path d="M665.2 43c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.2.1-.4.2-.4.5zM665.6 42.5zM748.1 37.5c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.1-.5-.3-1-.4-1.4zM586.6 37.6c-.3.3-.5.6-.3.8.2.2.5.4.8.4.4 0 .6-.3.5-.8-.2-.1-.6-.2-1-.4zM632.9 46.2c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.4.6-.4 1.1-.4 1.7zM777.7 36.2c.2-.5.4-.9.1-1.3-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.3 0 .5.1.8.2zM610.7 44.7c.1 0 .1 0 0 0 .1-.2 0-.3-.1-.4-.1 0-.2.1-.2.1-.1-.1-.2-.2-.4-.3l-.2.1s0 .2.1.2h.4c.1.1.1.1.1.2v.7c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1 0-.8 0-.8-.6-1.2zM809.8 20.8c-.5.2-.7 1-.5 1.4.1.2.5.2.6.1.3-.3.4-.7.3-1.2 0-.1-.1-.2-.2-.3h-.2zM764.9 42.5c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.2-1.1.3-1.9.6zM637.9 42.5c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5 0-.3-.1-.5-.4-.5zm.1.8c0 .1 0 .1 0 0l.1.1c-.1 0-.1 0-.1-.1zM652.8 43c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1-.4.3-.6.6-1 1zM598 39.8c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4-.1-.3-.3-.7-.5-.6zM599.4 40.9h-.2V42c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.8-.5-1.3zM594.6 41.7c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4 0-.3-.2-.5-.6-.2zM634.7 44.4c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.5.1-.7.3-.7.5zM784.8 43.5c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6.2-.2.5-.4.6-.6.1-.4-.3-.8-.6-.7zM587.2 35.5c-.1.2.1.5.3.6.3 0 .4-.2.4-.4.1-.4.1-.9-.1-1.3l-.1-.1-.1.1v.1c-.1.2-.3.6-.4 1zM759.7 35.3c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.2-.5-.3-.7-.4zM734.7 35.6c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.1.2.2.7.6.6zM734.9 34.2zM672.6 44.2c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1 0-.1.3-.1.5zM624.9 45.3c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.5-.4.8-1 .8zM629.9 45.6c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .8.3 1.2.5 1.9zM778.5 40.6c-.2 0-.4.1-.6.2v.4c.2.3.7.4.9.3.1 0 .1-.2.1-.2 0-.3-.1-.6-.4-.7zM766.6 39.3c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4-.4 0-.9-.1-1.3-.1-.1 0-.2.2-.2.3-.1.1 0 .3.1.4zM595.6 39.6c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.1-.4-.3-.6-.5zM595.6 39.6zM763.9 34.9c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.4.2-.6.5-.6 1zM768.6 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM768.7 36.1c.4-.9.3-1.3-.1-2.5-.2 1.8-.2 1.8.1 2.5zM696.2 42.4c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.1-.3-.1zM684.7 42.9c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5s-.2-.6-.5-.6zM795.1 47.4c.7 1.2.8 1.3 1.7 1.3-.5-.5-.8-1.1-1.7-1.3zM729.7 34.4c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM794.9 48.6c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.5.3-1-.3-1.1zM647.3 44.4c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 .1.3.1.4.1zM739 37.3c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.2-.1-.4 0-.5.2zM763.2 36.3c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8.1.1.2.1.2.1zM684.8 41.4c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.1.1-.3zM647.1 45.4c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.4.5-.4.6zM644.4 39.1c-.1 0-.2.1-.2.2 0 .4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM775.3 36.2c.1-.1.2-.3 0-.5-.1-.1-.3-.1-.5-.1-.1.1-.3.2-.3.4s.1.4.2.7c.3-.2.5-.3.6-.5zM779.8 41.7c.1 0 .3.1.4 0 .3-.3.8-.4 1-.8-.8-.1-.8-.1-1.4.8zM686.8 41.1c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.2-.2-.2-.2zM584.3 36.3zM734.4 37.3c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.1-.3-.2-.6-.3-1zM649.4 41.9c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.2.5-.4.6-.7zM600.7 40.3l.3.6c.2-.1.5-.2.7-.3-.4-.9-.5-.9-1-.3zM809.2 27.8c.2-1.3.2-1.3-.2-2.3 0 .6-.1 1.3-.1 1.9 0 .2.1.5.3.4zM670.9 40.9c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2v.6zM670.9 40.3zM779.8 33.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM778.5 33.2c0 .3-.2.6.2.9.4-.3.9-.4 1.1-.9-.4.2-.9.1-1.3 0zM736.6 34.9v.1c.3.3.6.2 1-.1-.4-.2-.8-.3-1 0zM630.4 42.9c.1.8.1.8.9.4-.4-.4-.6-.6-.9-.4zM758.3 35.7c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.1-.1.3-.3.3-.4zM625 40.3c0-.1-.2-.2-.3-.3-.1.1-.3.3-.3.4 0 .2.2.5.3.9.2-.5.3-.7.3-1zM784.6 41.1c-.2 0-.4-.1-.5 0-.2.1-.3.4-.4.6l.2.2c.2-.3.7-.2.7-.8zM730.7 33.9c.3-.6.1-1.2.1-1.8-.4.7-.5 1-.1 1.8zM589.7 36.5c0-.1-.2-.2-.2-.3l-.5.5c.2.1.3.3.4.3.2-.1.4-.3.3-.5zM669.2 43.6c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.2-.3-.3-.5-.1zM639.5 44.8c.3-.4.2-.8 0-1.4-.4.7-.4.7 0 1.4zM765.6 37.3c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.3-.1-.3-.1zM590.4 41v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3.1-.6-.4-.8zM773.1 35c0 .8 0 .8.8.9-.3-.3-.5-.5-.8-.9zM749.1 38.1c.4.3.7.4 1.1.2-.4-.3-.7-.3-1.1-.2zM745.3 38.1c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.1 0 .2-.1.6-.2zM593.7 43.2c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM770.7 34.7c-.1 0-.3.2-.3.2 0 .1.1.3.2.5.2-.2.3-.3.3-.4.1-.2 0-.4-.2-.3zM810.4 33.4c-.1 0-.1 0 0 0-.1 0 0 0 0 0zM811.8 33.5c-.6-.2-1-.3-1.5 0 .5.2 1 .4 1.5 0zM584.4 38.9c.5-.6.3-1.2.4-1.7-.3.4-.5.9-.4 1.7zM584.8 37.2s0-.1 0 0c0-.1 0-.1 0 0zM678 43.5c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.3-.3-.5-.4zM622.3 45.3c0 .4.1.6.1 1 .6-.5.5-.7-.1-1zM631.4 44.6c-.1 0-.1.1-.1.2 0 .3.1.5.4.6.2-.3 0-.5 0-.7-.1 0-.3-.1-.3-.1zM676.3 41.6c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2-.1 0-.2 0-.2.1zM607 45.5c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.2.1-.2.1zM650.7 44.6c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM792.3 43.9c.1 0 .1-.1.1-.2 0-.4-.3-.6-.7-.7.1.3.2.6.3.8.1.1.2.1.3.1zM791.7 43zM594.8 40.8c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7-.1.1-.1.4.2.4z"/><path d="M600.6 41.3c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.2.1-.5.2-.3.5zM601 40.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM756.7 35.8c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM592.1 43c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM762.5 37.5c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4c0 .1.1.1.1 0zM604.5 40.1s0 .1 0 0zM604.1 39.5c-.1 0-.1 0 0 0-.2.5.2.5.4.7-.1-.3 0-.7-.4-.7zM594.6 39.2c.2.2.4.3.5.4h.5c-.2-.4-.4-.6-1-.4zM595.6 39.6zM595.1 39.6s0 .1 0 0c0 .1 0 .1 0 0zM641.2 45.8l.2.2c.1-.1.2-.3.3-.4l-.2-.2c-.1.1-.2.3-.3.4zM604.4 38.6c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4.1.1.2 0 .3-.1zM601.6 38.4c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2 0-.4-.2-.4zM712.5 42.5c0 .1.1.2.2.4.1-.2.2-.4.1-.4 0-.1-.2-.1-.3-.2v.2zM582.9 38.6c0 .1.1.2.2.4.1-.2.1-.3.1-.4 0-.1-.1-.1-.1-.2-.1 0-.2.1-.2.2zM614.2 45.6c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3-.1 0-.2 0-.3.1zM695 41.6c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7l-.3-.3zM643.7 43.1s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1-.3.3zM616 44.3c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3-.1 0 .1-.1.1-.2zM614.5 44.3s0 .1 0 0c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM596.3 43.4s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.2.3-.2.5zM776.1 43.2c.2-.1.3-.4 0-.5l-.4.4c.1 0 .3.1.4.1zM775.6 43zM582.9 35.8c0 .1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.2-.1-.3c-.2 0-.3.1-.3.2zM645.4 44.6c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM693.1 42.6c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1 0-.1.2-.2.3zM682.2 41.9zM681.6 42.3s.1.1 0 0c.4.2.4 0 .5-.3v-.1h-.1c-.1.1-.4.1-.4.4zM773.7 37.4s.2-.1.2-.2-.1-.2-.2-.3c-.1.1-.2.1-.3.2l.3.3zM767.1 36.2zM766.5 36.2c.1.1.1.2.2.3l.3-.3c-.1 0-.2-.1-.3-.1 0 0-.1.1-.2.1zM765.5 36.3c0 .1.1.2.3.3.1-.2.1-.3.1-.4 0-.1-.2-.1-.3-.1-.1 0-.2.1-.1.2zM603 41.8c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2.1-.1-.1-.3-.1-.3zM692.8 43.1c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.2-.1-.2-.2zM608.7 46s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.1.3-.2.4-.2.6zM607.8 44c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c0 .1-.1.1-.1.2zM584.1 33.7h.2c0-.1.1-.3.1-.4v-.1c.1 0 .1 0 .2-.1v-.2s-.1 0-.1.1l-.1.1c0-.1.1-.2 0-.2 0-.1-.2-.1-.3-.1l-.1.2c0 .1.1.2.2.3l-.3.3c.2 0 .2.1.2.1zM597.2 39.3c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0-.1.1-.2.1-.2zM620.9 43.5s.1.1.2.1v-.2h-.2v.1zM611.8 43.8s0 .1 0 0c0 .1 0 .1.1.1l-.1-.1c.1.1 0 0 0 0zM600.3 43.8c.1.1.1.3.2.4h.2v-.1c-.1-.1-.2-.2-.4-.3zM656.4 41.9h.1c.2-.2 0-.4-.1-.5 0 .2-.2.3 0 .5zM656.4 41.4c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0zM607.5 40.3c-.1 0-.1-.1 0 0-.1 0-.1.1-.1.1s.1 0 .1.1c-.1-.1-.1-.2 0-.2zM604.5 40.2zM604.5 40.2c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1-.2-.1-.2-.1-.3 0zM778.5 33.2zM777.7 33.2zM777.7 33.2c.3.2.5.1.8 0-.3-.2-.5-.1-.8 0zM603.3 37.6v.7c.3-.3.1-.5 0-.7zM775.9 31.3s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1s-.2.1-.2.1zM776.3 31.3zM593.9 34.2s.1 0 .1.1c0-.1.1-.1.1-.2 0 0-.1-.1-.1 0 0-.1 0 0-.1.1zM585.4 32.2l-.1.1s0 .1.1.1v-.2c.1.1 0 0 0 0zM807.4 39.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM807.4 39.9c-.1.2-.2.4-.2.6.2-.2.4-.3.2-.6zM808.9 37.5zM809.2 37.7c-.1 0-.1-.1 0 0-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM614.6 43.9v.4c.1-.1.1-.2.2-.4-.1.1-.2 0-.2 0zM655.6 41.3s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1v.1c-.1.1 0 .2.1.2zM600.3 43.7c0 .1 0 .1 0 0 0 .1 0 0 0 0zM600.2 43.4c0 .1-.1.1-.1.2s.1.1.1.2v-.2c.1-.1 0-.2 0-.2zM698.7 39.2s.1 0 .1-.1c.1-.1.1-.1.1-.2-.1 0-.2 0-.2.1v.2zM686.7 39.7h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2-.1-.1-.1 0-.1 0zM686.9 39.4zM732.9 36.8c0 .1 0 .1 0 0-.1.1-.1.1 0 0-.1.1 0 .1 0 0 0 .1 0 .1 0 0zM733.1 36.6h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2.1.1.1 0 .1 0zM584.3 36.3c-.1 0-.1 0 0 0-.1 0 0 0 0 0zM584 36.4c.1 0 .2 0 .2-.1 0 0-.1 0-.2.1 0-.1 0 0 0 0zM740 29.7l-.2-.2c0 .1.1.1.1.2h.1zM602.4 34.2V34c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2 0 0 0 .1.1.1zM802.8 48.7h-.1.1c-.1 0-.1 0 0 0zM802.6 48.6zM805.5 44.3v.1c-.1.1 0 0 0-.1 0 .1 0 .1 0 0zM791.7 43c0-.2 0-.3.1-.5-.1 0-.1-.1-.2-.1-.2.2-.1.4.1.6zM742.9 43.3c0-.1 0-.1.1-.2l-.1.1v.1zM646.3 42.9c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM746.5 39.2h0zM676.7 39.9v-.1.1zM748.2 37.3v.1c-.1 0 0 0 0-.1zM628.8 41.4s0-.1.1-.1c-.1 0-.1 0-.1.1zM628.9 41.3s0-.1 0 0c0-.1 0-.1 0 0zM767.1 36.2s.1 0 .1-.1c0 0-.1 0-.1.1zM653.6 40.2c.1 0 .1-.1.2-.1-.1 0-.2 0-.2.1 0-.1 0-.1 0 0zM730.8 32.1zM730.9 31.9c0 .1 0 .1-.1.2l.1-.1v-.1zM584.6 29.3s.1 0 .1.1c.1 0 0 0-.1-.1.1 0 .1 0 0 0zM703.4 30.2c-.1 0-.1 0 0 0-.1.1-.2.2-.2.3.1 0 .1-.1.2-.1v-.2zM703.2 30.5zM746.8 29.1s0-.1-.1-.1c.1 0 .1 0 .1.1zM690.2 29.9c-.1 0-.1-.1-.2-.1l-.1.1h.3zM682.5 30.2c.1 0 .2-.1.3-.1-.1-.1-.1-.2-.2-.3h-.4v.1l.3.3zM599.6 34.2v.1h.1v-.1h-.1zM722.3 35.4c0-.1 0-.1.1-.2-.1.1-.1.1-.1.2zM679.8 29.5s0-.1.1-.1c-.1 0-.1 0-.1.1zM632.5 39.4c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0zM675.1 31.3l.2.2c0-.1-.1-.1-.1-.2h-.1zM720.3 34.4l-.1.1.1-.1zM697 37.7l-.2.2c.1 0 .1-.1.2-.1v-.1zM701.5 33.5c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1l-.2-.2zM636.9 26.8c0 .1 0 .1 0 0 0 .1 0 0 0 0zM505.6 36.1zM436.6 32.3s.1 0 0 0c.1 0 .1 0 0 0zM449.4 35.9zM422 34.3zM596.4 29.9zM489.6 37zM595 27.9zM509.6 36.2c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c0 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3-.1.3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.4-.1-.8 0-1.1.3zM583.1 36.4c-.3 0-.5-.1-.8 0-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5-.2-.3-.2-.4-.2-.5zM426.7 30.1zM425.6 30.1v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 .1.1.1.2.1 0 .4 0 .8-.2 1.2 0-.1-.1-.1-.1-.2 0 .1.1.1.1.2-.3.1-.5.2-.8.3.2.5.2.5-.3 1.3.3.1.6.1.9.2.5-.2.5-.2.7.2.1.2 0 .4.4.3v-.8c-.1-.5 0-.9.2-1.4.2-.4.2-.8.3-1.2-.1-.2-.3-.4-.4-.6-.4.1-.6.3-.8.5zM451.5 39.4c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.7-1 1zM452.4 38.3zM410.5 28.7s.1 0 0 0c.1 0 .1 0 0 0 .1 0 0 0 0 0zM409.5 31.7c-.1.1-.1.2-.2.3.2.3.4.5.6.8.4-.1.6-.5.8-.9.3.1.5.5.9.1-.2-.3-.3-.6-.5-.8l.3-.3c.1-.9-.6-1.4-.8-2.1-.1.1-.2.3-.1.4.2 1-.3 1.7-1 2.5zm1.2.1c-.1-.1-.2-.1-.3-.2 0-.1.1-.1.1-.2.1.2.1.3.2.4zM453.4 37.1zM452 35.8zM452 35.8c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.6-.7-1-1-1.4zM489.5 38.2v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.9-.8-.2-1.6-.5zM558.7 38.3c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.4-.5-1-.8-1.6-.7zM563.9 39.6c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM478.2 38.7c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.3-.1-.5-.3-.7-.3zM549 34c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.2.6.2 1.1.3 1.6zM481.6 38.7c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4-.1-.2-.3-.4-.4-.4zM408.5 28.1c-.5 0-1 0-1.5.2.1.7.6.3.9.5-.1.4-.1.8-.1 1.2 0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.1-.5-.1-.8-.6-.9zM563.8 36c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3c1 .1 2 0 3.1 0zM446.4 40.9c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.3-.1-.4-.3-.5-.6zM434 34.6c-.1-.1-.2-.3-.2-.4-.2.3-.4.7-.9.7l-.9-.6c0 .4.1.8.4 1.1.4.3.5.8.5 1.4.1-.3.3-.5.4-.8.9.2.9.2 1.1-.7-.2-.2-.3-.5-.4-.7zM432.8 36.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM433.8 34.2s0-.1 0 0zM449.9 36.4c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM442.8 39.7c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.4 0-.7-.3-.8z"/><path d="M607.6 39.8c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1v-.1c.1.2.3.3.4.5.1-.4 0-.6-.4-.6 0-.2.1-.4.1-.5.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.1-.7-.3-1.3-1.1-1.6zM413.3 27.1c-.3 0-.6.3-.6.8s.3.8.8.8c.4 0 .7-.3.7-.7 0-.5-.5-.9-.9-.9zM467.4 39.2c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.1-.4 0-.6-.2zM587.1 36.6c-.6-.1-1.2-.1-1.8-.2l-.1-.1c-.1.3-.2.6-.3.8.2 0 .4.2.4.1s.1-.1.1-.2c.1 0 .2.1.3.1.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.1-.9-.1-1.3-.2zM470.4 39.6c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5 0-.6-.5-.8-.8-1.2zM455.3 41c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.6-.3-.9zM552.9 36.3c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4.1-.3-.2-.4-.4-.6zM415 31h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8-.1.2-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.6 1.1.9 1.5zM571 36.2c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.9-.4-4.2.1zM445.7 36.2c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.5-1 .5-1-.7-2.1zM483.9 39.6c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.2.1-.4.3-.4.5zM484.3 39.2zM566.8 34.1c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-.9-.4-1.4zM451.6 42.8c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.4.6-.4 1.2-.4 1.7zM596.5 31.5c-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.2 0 .5.1.7.2-.1.1-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.5 1 .9 1.4h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8.3-.4.5-.8.2-1.2zM439.7 36.6c0 .6 0 1.2.1 1.9.5-.4.7-.6.8-.8.1-.6-.1-.9-.9-1.1zM429.2 41.2v.8c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1-.1-.9-.2-.8-.9-1.4zM583.6 39.2c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.1-1.1.3-1.9.6zM456.6 39.1c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5-.1-.2-.2-.4-.4-.5zm.1.9l.1.1c-.1 0-.1-.1-.1-.1zM471.5 39.6c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1l-1 1zM418.5 33.6zM417.9 33.8c.3.6.7 1.1.7 1.8.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1l-.3-.9h-.6c-.1.1-.1.2-.1.2zM416.6 36.5c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.2-.7-.5-.6zM431.9 34.2zM431.8 32.4s-.1-.3-.1-.4c-.2 0-.3 0-.5.1-.1 0-.1.2-.1.2 0 .4 0 .9.1 1.3.1.3.4.4.7.6-.1-.6-.6-1.2-.1-1.8zM418.1 37.6h-.2v1.1c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.9-.5-1.3zM413.3 38.3c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4 0-.3-.3-.4-.6-.2zM429.8 38.3c-.1-.4-.1-.6-.2-.9v-.9c-.5.3-.8.5-.7 1 .1.5.3.8.9.8zM453.4 41.1c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.5 0-.7.2-.7.5zM603.5 40.1c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6l.1-.1.1.1c0-.1 0-.2.1-.2.1-.1.3-.3.3-.4.1-.4-.3-.7-.6-.7zM424.5 34.1c0-.3-.2-.4-.4-.5-.3-.3-.6-.6-.9-1-.4.3-.4.7-.3 1.1.1.4.3.5.7.5 0 .1 0 .2-.1.3-.1.3.1.6.4.7.2.1.4-.1.5-.5.1-.2.1-.4.1-.6zM414.9 28.1c.7-.7.6-1-.3-1.9.1.7-.2 1.3.3 1.9zM578.4 31.9c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.1-.5-.3-.7-.4zM553.4 32.3c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.1.2.2.7.6.6zM553.6 30.9zM491.3 40.8c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1.1-.1.4-.1.5zM438.3 36.9c-.2.2-.3.4-.1.6.1.2.2.3.4.4 0 .1 0 .1.1.2v-.2c.2.1.3.1.5.2.2-.5 0-.8-.2-1.1-.3-.2-.5-.2-.7-.1zM443.6 41.9c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.6-.4.9-1 .8zM448.6 42.3c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .7.3 1.2.5 1.9zM585.3 35.9c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4h-.3c.2-.8.2-1.6-.1-2.3-.3.5-.6.9-.8 1.4.4.4.6.7 1 .9h-.9s-.1 0-.1.1c-.7-.2-.8-.1-.9.4v.5c.3-.2.6-.4.9-.7-.4.2-.3.3-.2.3zM414.3 36.3c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.2-.4-.3-.6-.5zM414.3 36.3zM582.6 31.6c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.5.2-.6.5-.6 1zM587.3 30.2zM587.4 32.7c.4-.9.3-1.3-.1-2.5-.2 1.9-.2 1.9.1 2.5zM514.9 39.1c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.2-.3-.1zM503.4 39.6c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5 0-.4-.2-.6-.5-.6zM614.5 44.4c0-.1-.1-.1-.1-.1-.2-.1-.3-.2-.5-.2 0 .1.1.1.1.2-.2 0-.3.1-.2.2.1.1.2.1.3.1.4.7.7.8 1.4.8-.4-.3-.6-.7-1-1zM412 35.8c-.1.5-.2 1-.4 1.6.3 0 .5.1.7 0 .1-.1.2-.3.2-.5-.1-.4-.1-.7-.5-1.1zM548.4 31.1c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM413.2 33.3c-.3-.3-.6-.4-.9-.4-.1 0-.2.1-.5.3.4.1.6.2.8.3.2.1.4.3.6.4.2-.2.1-.4 0-.6zM613.6 45.3c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.6.2-1-.3-1.1zM466 41.1c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 0 .3.1.4.1zM557.6 34c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.1-.1-.4 0-.5.2zM581.9 33c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM503.5 38.1c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.2.1-.3zM465.7 42.1c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.1.3-.3.4-.4.6zM463.1 35.8c-.1 0-.2.1-.2.2 0 .4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM505.5 37.8c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.2-.2-.2-.2zM437.8 41.3c.6.2.9.2 1.3-.2-.4-.3-.8-.3-1.3.2zM553.1 34c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.1-.3-.2-.6-.3-1zM468 38.5c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.1.6-.3.6-.7zM419.4 36.9l.3.6c.2-.1.5-.2.7-.3-.4-.8-.5-.8-1-.3zM489.6 37.5c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2v.6zM489.6 37zM555.2 31.6v.1c.3.3.6.2 1-.1-.4-.3-.7-.3-1 0zM449 39.5c.1.8.1.8.9.4-.3-.3-.5-.5-.9-.4zM576.9 32.3c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2 0 .3-.2.3-.4zM443.4 36.6c-.1.1-.3.3-.3.4 0 .2.2.5.3.9.1-.5.3-.7.3-1 0 0-.2-.1-.3-.3zM549.4 30.5c.3-.6.1-1.2.1-1.8-.4.7-.5 1.1-.1 1.8zM427.9 33c-.2-.2-.5-.3-.7-.5-.1 0-.1.1-.2.1.1.2.1.4.2.6.2.2.7.1.7-.2zM487.9 40.3c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.3-.3-.3-.5-.1zM458.2 41.5c.3-.4.2-.8 0-1.4-.4.6-.4.6 0 1.4zM584.3 34c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.3-.1-.3-.1zM409.1 37.7v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3.1-.6-.4-.8zM567.8 34.8c.4.3.7.4 1.1.2-.4-.4-.7-.4-1.1-.2zM564 34.7c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.1 0 .2-.1.6-.2zM412.4 39.9c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM442.7 37.4c0-.1-.1-.3-.2-.6-.2.2-.3.4-.4.5-.1.2 0 .4.2.4.1 0 .3-.2.4-.3zM427.9 35.6c.3-.6.1-.9-.3-1.2 0 .4-.1.8.3 1.2zM434.4 32.7c.1.3.1.6.2.9h.6c-.1-.6-.4-.8-.8-.9zM434.6 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM609.7 41.4s-.1 0 0 0zM609.6 40.5l-.2-.2c0-.1-.1-.2-.2-.2 0 0-.1.1-.2.1 0 .1.1.1.1.2l-.1.1c.1.3.3.6.5.9.2-.3.3-.6.1-.9zM567.8 40.4c-.2 0-.4.1-.3.3 0 .1.2.2.4.3.1-.1.3-.2.3-.3 0-.2-.2-.3-.4-.3zM496.7 40.2c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.3-.3-.5-.4zM441 42c0 .4.1.6.1 1 .5-.6.5-.7-.1-1zM450.3 42.1c.2-.3 0-.5 0-.7l-.2-.1c-.1 0-.1.1-.1.2-.1.3 0 .6.3.6zM494.9 38.3c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0-.1-.1 0-.2.1zM434.5 42c-.1.2-.3.3-.4.5.1.1.2.2.3.2.2-.1.3-.3.4-.5 0 0 0-.2-.1-.2 0-.1-.2-.1-.2 0zM425.7 42.2c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.2.1-.2.1zM469.4 41.3c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM566.3 39.4c-.1.4-.1.7.4 1 0-.4 0-.8-.4-1zM610.4 39.7zM413.5 37.5c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7-.1.1-.1.3.2.4zM419.3 38c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM419.7 37.5zM575.4 32.5c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM410.8 39.7c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM581.2 34.2c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4h.1zM612.1 44.4c.1.1.2.2.3.2.1-.1.1-.2.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2.2-.2.3zM423.1 36.8s.1 0 0 0c.1 0 .1 0 0 0zM422.7 36.1s-.1.1 0 0c-.2.5.2.5.4.7 0-.3.1-.6-.4-.7zM413.3 35.9c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM414.3 36.3zM413.8 36.3zM574.8 38c-.1.2-.1.3-.2.5.1.1.1.2.2.2s.2-.1.2-.1c0-.2 0-.4-.1-.5 0-.1-.1-.1-.1-.1zM423.1 35.3c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 0 .2-.1.3-.1zM420.3 35.1c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2 0-.4-.2-.4zM569.8 37.9c-.1 0-.2 0-.2.1-.1.1-.1.2-.2.3.1 0 .2.1.3.1.2 0 .3-.1.3-.4-.1 0-.2-.1-.2-.1zM473.8 41.9l.2.2c.1-.2.2-.4.3-.5-.1 0-.2-.1-.2-.1-.1.1-.2.2-.3.4zM436 42.1s-.1 0 0 0c0 .2 0 .4.1.6h.2c-.1-.2-.1-.3-.2-.5 0-.1 0-.1-.1-.1zM432.9 42.3c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3-.1 0-.2 0-.3.1zM513.7 38.3c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7-.1-.2-.2-.2-.3-.3zM462.3 39.8s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.1.2-.3.3zM434.7 41c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3-.1 0 .1-.2.1-.2zM432.4 41.1c.1.1.3.1.5.1.1 0 .2-.1.3-.2-.1 0-.2-.1-.3-.1-.3-.1-.6.1-.5.2zM433.2 41zM415 40.1s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.2.3-.2.5zM426.3 38.8l.6.6c0-.5-.1-.7-.6-.6zM553.9 33.4l.2-.1v-.4c-.1 0-.2.1-.4.1.1.2.1.3.2.4zM568.9 31.9c-.1 0-.2.2-.3.3.1.1.2.2.3.2.1 0 .2-.2.2-.3.1-.1-.1-.3-.2-.2zM611.5 46.1l.2.2c.1 0 .2-.1.2-.2-.1-.1-.2-.1-.3-.2 0 .1 0 .1-.1.2zM467.1 51.6c.1 0 .1.1.2.1v-.2l-.1-.1c-.1 0-.1.1-.1.2zM625.3 41.4h-.4c-.1 0-.1.2-.1.3.1 0 .2.1.2 0 .1 0 .1-.1.3-.3zM594.7 39.9c.2-.1.3-.4 0-.5l-.4.4c.2 0 .4.1.4.1zM594.3 39.7zM450.1 43h.3s.1-.1.1-.2c-.1 0-.2-.1-.3 0 0 0-.1.1-.1.2zM479.7 41.4c0 .1.1.3.1.3.1 0 .2-.1.3-.1-.1-.1-.1-.3-.1-.3-.1 0-.2.1-.3.1zM464.1 41.3c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3 0-.1-.2-.2-.2-.2zM438 42.7c.4-.3.4-.3.3-.7-.1.3-.1.4-.3.7zM439.7 41.9c0 .1.1.2.2.3.1-.1.2-.1.2-.2-.1-.1-.1-.2-.2-.3 0 .1-.2.2-.2.2zM511.8 39.2c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1.1-.1.2-.2.3zM500.9 38.6v-.1zM500.3 38.9c0 .1.1.1 0 0 .4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM428.5 40.9s0 .2.1.2c.2 0 .4 0 .6.1-.1-.1-.3-.3-.5-.4 0 0-.1 0-.2.1zM429.2 41.2zM574.5 35.1c-.3 0-.5-.1-.8-.1.3.3.5.3.8.1zM585.8 32.8s0 .1 0 0c0 .1 0 .1 0 0zM585.4 33.2l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1.1.1.2.2.2.3zM421.7 38.5c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM422.3 37.4c0 .2-.1.3-.1.4 0 .1.1.1.2.2 0-.1.1-.2.1-.4l-.2-.2zM425.3 34.4c-.1.7.4.9 1 1.3v-.8c-.1-.4-.5-.5-.8-.7.1-.4.1-.8-.2-1.2-.1.5-.4 1 0 1.4zM609.7 42c-.2 0-.5.1-.9.1.5.4.7.2.9-.1zM597.1 40.4c0 .1.1.1.1.2.1 0 .1-.1.2-.1 0 0 0-.1-.1-.1-.1-.1-.2-.1-.2 0zM447.8 42.7c0 .1.1.1.1.2.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0 0-.1.1-.1.2zM511.4 39.8c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM427.4 42.6s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.1.4-.2.5-.2.6zM426.5 40.7c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c-.1.1-.1.1-.1.2zM469.6 38.2h.3c-.1-.1-.1-.2-.2-.3h-.2s-.1.1 0 .1c0 .1.1.2.1.2zM484.8 37.2c-.1 0-.1 0-.2.1 0 .1.1.1.1.2l.2-.2-.1-.1zM576.4 33.8s.1-.1.1-.2c-.1 0-.2-.1-.3-.1 0 0-.1.1-.1.2.1 0 .2.1.3.1zM483.7 36.8c-.1 0-.2.1-.3.1l.2.2c.1 0 .2-.1.3-.2-.1 0-.2-.1-.2-.1zM436.4 38.2c.1 0 .2.1.2.1s.1-.1.1-.2c-.1 0-.2-.1-.2-.1s0 .1-.1.2zM433.6 38.3c.1.1.1.2.1.2l.2-.2v-.2c-.1.1-.2.1-.3.2zM424.4 38.7c0 .1.1.1.2.2.1-.1.1-.2.2-.3-.1 0-.1-.1-.2-.1-.1.1-.2.1-.2.2zM437.2 36.9c0 .1.1.1.1.2.1 0 .2-.1.2-.1 0-.1-.1-.1-.1-.2-.1 0-.1.1-.2.1zM428 36.8s-.1.1-.2.1c.1.1.1.2.2.3.1-.1.2-.2.1-.2 0-.1 0-.2-.1-.2zM415.9 35.9c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0 0 0-.1.1-.2 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM443.7 41.2c-.1 0-.1 0-.1.1 0 0 .1 0 .1-.1 0 .1 0 0 0 0zM475.1 38.6h.1c.2-.2 0-.4-.1-.5-.1.2-.2.3 0 .5zM475.1 38.1zM447 39.5c0-.1-.1-.1-.1-.2-.1 0-.1.1-.1.1 0 .1.1.1.1.2 0 0 .1 0 .1-.1z"/><path d="M597 32.8c-.1 0-.2 0-.2.1l.1.1c.1-.1.1-.1.1-.2zM486 37.1c0 .1-.1.2-.1.3.1-.1.2-.1.3-.2-.1-.1-.2-.1-.2-.1zM485.8 37.4zM424.5 37.1h-.2v.1s.1.1.2.1v-.2zM431.4 36.9s.1 0 0 0c.1 0 .1 0 .1-.1 0 0 0-.1-.1.1 0-.1 0-.1 0 0zM426 37c0 .1.1.1 0 0 .1 0 .1 0 .1-.1h-.1v.1zM423.2 36.8zM423.2 36.8c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1h-.3zM597.2 29.9c0-.1 0 0 0 0zM596.4 29.9zM596.4 29.9c.3.2.5.1.8 0-.3-.2-.6-.1-.8 0zM430.3 35.7l.1.1c0-.1 0-.1-.1-.1 0-.1 0-.1 0 0zM422 34.3v.7c.3-.4.1-.5 0-.7zM594.5 28s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1 0 0-.1 0-.2.1zM595 27.9zM427.5 34.2h-.2s0 .1.1.1.1.1.2.1c0-.1 0-.2-.1-.2zM427.6 34.4zM409.9 32.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM409.8 33.3c.1-.1.2-.1.2-.2s0-.2-.1-.4c-.1.1-.1.2-.2.3 0 .1.1.2.1.3zM412.8 30.6c0 .1-.1.1-.1.2 0 0 .1 0 .1.1 0-.1.1-.1.1-.2-.1 0-.1-.1-.1-.1zM608.5 42.9v.1l.1-.1c.1-.1 0-.1-.1 0 .1-.1 0-.1 0 0zM603.4 42.1v.1h.2v-.1h-.2zM600.4 40.5c0-.1-.1-.1-.1-.2h-.1c0 .1.1.1.2.2-.1 0 0 0 0 0zM446.4 42.9s.1.1.1 0v-.1h-.1v.1zM627.6 34.2zM627.9 34.4c-.1-.1-.1-.1 0 0-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM433.2 41c.1-.1.1-.2.2-.4-.1 0-.1 0-.2-.1v.5zM448.1 39.6c0 .1 0 .1 0 0 0 .1 0 .1.1.1-.1 0 0 0-.1-.1.1 0 0 0 0 0zM505.3 36.4h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2 0-.1 0-.1-.1 0zM505.6 36.1zM441.8 38.4c.1.1.1.1.2 0v-.1c-.1 0-.2 0-.2.1zM551.6 33.5c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1.1-.1.1 0 0-.1 0-.1 0 0 0zM551.8 33.2h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2 0 .1.1.1.1 0zM420.6 33.5zM420.3 33.2v.2c.1 0 .1 0 .2.1 0-.1-.1-.1-.1-.2l-.1-.1zM410.9 32.9c0-.1 0-.1 0 0-.1-.1-.1 0-.1 0h.1zM558.7 26.4l-.2-.2c0 .1.1.1.1.2h.1zM421 30.8v-.2c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2l.1.1zM406.6 29.7l-.1-.1v.1zM414.9 24.5zM414.7 24.8h.2c0-.1 0-.2.1-.2l-.2.2c-.1-.1-.1 0-.1 0zM609.7 41.4v.5c.2-.1.1-.3 0-.5zM624.2 41v.1c-.1 0-.1 0 0-.1 0 .1 0 0 0 0zM610.3 39c-.2.2-.1.4.1.6 0-.2 0-.3.1-.5-.1 0-.2 0-.2-.1zM561.6 39.9c0-.1 0-.1.1-.2l-.1.1v.1zM465 39.6c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM565.2 35.9h.1-.1zM485.8 37.4zM485.7 37.5l.1-.1s-.1 0-.1.1c0-.1 0 0 0 0zM495.4 36.6v-.1.1zM566.9 34v.1c-.1 0-.1-.1 0-.1zM447.5 38.1s0-.1.1-.1c-.1 0-.1 0-.1.1 0-.1 0 0 0 0zM447.5 38s.1-.1 0 0c.1-.1.1-.1 0 0 .1-.1.1-.1 0 0 0-.1 0 0 0 0zM585.8 32.8s.1 0 .1-.1l-.1.1zM472.3 36.8c.1 0 .1-.1.2-.1-.1 0-.2 0-.2.1zM432.8 36.8zM432.7 37c0-.1 0-.1.1-.2l-.1.1v.1zM445 36.4v-.1h-.1zM433.8 34.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM433.7 34l.1.1s-.1 0-.1-.1zM434.6 33.6l-.1.1c0-.1 0-.1.1-.1zM420.9 33.5h-.2c0 .2.1.2.2 0zM420.9 33.5zM549.5 28.7c0 .1 0 .1 0 0 0 .1 0 .1 0 0zM549.6 28.6c0 .1 0 .1-.1.2l.1-.1v-.1zM522.1 26.9c-.1 0-.1 0 0 0-.1.1-.2.2-.2.3.1 0 .1-.1.2-.1v-.2zM521.9 27.2zM565.5 25.8s0-.1-.1-.1c0 0 .1 0 .1.1 0-.1 0-.1 0 0zM418.4 30.9h-.1v.1h.1v-.1zM541 32.1c0-.1 0-.1.1-.2-.1.1-.1.1-.1.2 0-.1 0 0 0 0zM498.4 26.2s0-.1.1-.1l-.1.1c0-.1 0 0 0 0zM451 35.9l.2.2c0-.1-.1-.1-.1-.2s0 0-.1 0zM451.2 36c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM493.8 28l.2.2c0-.1-.1-.1-.1-.2h-.1zM539 31.1l-.1.1c0-.1 0-.1.1-.1zM520.2 30.2c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1c-.1-.1-.1-.2-.2-.2zM455.6 23.5c-.1 0-.1 0 0 0zM1093.9 39.4zM1037.6 39.2zM1010.3 37.6zM1184.7 33.2h-.1.1zM1077.8 40.3zM1183.3 31.3s-.1 0 0 0c-.1 0-.1 0 0 0zM1097.9 39.5c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c-.1 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3 0 .3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.5 0-.8.1-1.1.3zM1170.6 39.7c-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5 0-.1 0-.2-.1-.2-.4-.3-.7-.3-.9-.3zM1039.8 42.7c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.3.4-.5.8-1 1zM1040.7 41.7s0-.1 0 0c0-.1 0-.1 0 0zM1041.7 40.5zM1040.3 39.1zM1040.3 39.1c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.5-.7-1-1-1.4zM1077.8 41.5v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.8-.9-.2-1.6-.5zM1147 41.6c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.5-.5-1-.8-1.6-.7zM1152.2 42.9c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM1066.5 42.1c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.4-.2-.5-.3-.7-.3zM1137.3 37.4c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.1.6.2 1.1.3 1.6zM1069.8 42c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4 0-.2-.2-.3-.4-.4zM996 33.4c0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.2-.5 0-.9-.5-.9h-.2c0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.3 0-.6.1-.9.2.1.7.6.3.9.5-.1.4-.2.8-.2 1.2zM1152 39.4c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3h3.1zM1034.6 44.3c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.2-.1-.3-.4-.5-.6z"/><path d="M1038.2 39.7c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM1031.1 43c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.3 0-.6-.3-.8zM1195.9 43.1c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1.1-.3.1-.5.2-.8.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.2-.6-.5-1.2-1.2-1.5zM1055.7 42.5c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.2-.4.1-.6-.2zM1175.4 40c-.6-.1-1.2-.1-1.8-.2-.1 0-.2.2-.2.3l.1.2c.2.1.3.2.5.2.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.2-.9-.2-1.3-.2zM1058.6 42.9c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5.1-.6-.5-.8-.8-1.2zM1043.6 44.3c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.5-.3-.9zM1141.2 39.6c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4 0-.2-.2-.4-.4-.6zM1159.3 39.5c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.9-.3-4.2.1zM1034 39.5c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.4-1 .4-1-.7-2.1zM1072.2 43c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.3.1-.5.2-.4.5zM1072.6 42.5c-.1 0 0 0 0 0zM1155.1 37.5c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-1-.4-1.4zM993.6 37.6c-.3.3-.5.6-.3.8.2.2.5.4.8.4.4 0 .6-.3.5-.8-.3-.1-.6-.2-1-.4zM1039.9 46.2c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.5.6-.4 1.1-.4 1.7zM1184.6 36.2c.2-.5.4-.9.1-1.3-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.3 0 .6.1.8.2zM1017.7 44.7s.1 0 0 0c.1-.2 0-.3-.1-.4-.1 0-.2.1-.2.1-.1-.1-.2-.2-.4-.3l-.2.1s0 .2.1.2h.4c.1.1.1.1.1.2v.7c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1 0-.8-.1-.8-.6-1.2zM1171.9 42.5c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.2-1.1.3-1.9.6zM1044.9 42.5c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5-.1-.3-.2-.5-.4-.5zm0 .8c.1.1.1.1 0 0l.1.1-.1-.1zM1059.8 43c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1-.4.3-.7.6-1 1zM1004.9 39.8c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.3-.7-.5-.6zM1006.4 40.9h-.2V42c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.8-.5-1.3zM1001.5 41.7c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4.1-.3-.2-.5-.6-.2zM1041.7 44.4c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.6.1-.8.3-.7.5zM1191.8 43.5c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6.2-.2.5-.4.6-.6 0-.4-.3-.8-.6-.7zM994.2 35.5c-.1.2.1.5.3.6.3 0 .4-.2.4-.4.1-.4.1-.9-.1-1.3l-.1-.1-.1.1v.1c-.2.2-.3.6-.4 1zM1166.7 35.3c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.2-.5-.3-.7-.4zM1141.6 35.6c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.2.2.3.7.6.6zM1141.9 34.2s-.1 0 0 0c-.1 0-.1 0 0 0zM1079.6 44.2c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1 0-.2.3-.1.5zM1031.9 45.3c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.5-.4.8-1 .8zM1036.9 45.6c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .8.2 1.2.5 1.9zM1185.5 40.6c-.2 0-.4.1-.6.2v.4c.2.3.7.4.9.3.1 0 .1-.2.1-.2 0-.3-.1-.6-.4-.7zM1173.6 39.3c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4-.4 0-.9-.1-1.3-.1-.1 0-.2.2-.2.3-.1.1 0 .3.1.4zM1002.6 39.6c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.1-.4-.3-.6-.5zM1002.6 39.6zM1170.9 34.9c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.5.2-.6.5-.6 1zM1175.6 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1175.7 36.1c.4-.9.3-1.3-.1-2.5-.3 1.8-.3 1.8.1 2.5zM1103.2 42.4c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7-.1-.1-.2-.1-.3-.1zM1091.7 42.9c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5s-.2-.6-.5-.6zM1202.1 47.4c.7 1.2.8 1.3 1.7 1.3-.6-.5-.9-1.1-1.7-1.3zM1136.7 34.4c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM1201.9 48.6c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.5.2-1-.3-1.1zM1054.3 44.4c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 .1.2.1.4.1zM1145.9 37.3c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.2-.1-.4 0-.5.2zM1170.2 36.3c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM1091.8 41.4c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.1.1-.3zM1054 45.4c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.4.5-.4.6zM1051.4 39.1c-.1 0-.2.1-.2.2-.1.4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM1182.3 36.2c.1-.1.2-.3 0-.5-.1-.1-.3-.1-.5-.1-.1.1-.3.2-.3.4s.1.4.2.7c.3-.2.4-.3.6-.5zM1186.8 41.7c.1 0 .3.1.4 0 .3-.3.8-.4 1-.8-.8-.1-.9-.1-1.4.8zM1093.7 41.1c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.1-.2-.2-.2zM991.2 36.3zM1141.4 37.3c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.2-.3-.2-.6-.3-1z"/><path d="M1056.3 41.9c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.2.5-.4.6-.7zM1007.7 40.3l.3.6c.2-.1.5-.2.7-.3-.5-.9-.5-.9-1-.3zM1077.9 40.9c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2-.1.2-.1.4 0 .6zM1077.8 40.3zM1186.8 33.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1185.5 33.2c0 .3-.2.6.2.9.4-.3.9-.4 1.1-.9-.4.2-.9.1-1.3 0zM1143.5 34.9v.1c.3.3.6.2 1-.1-.4-.2-.7-.3-1 0zM1037.3 42.9c.1.8.1.8.9.4-.3-.4-.5-.6-.9-.4zM1165.2 35.7c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2-.1.3-.3.3-.4zM1032 40.3c0-.1-.2-.2-.3-.3-.1.1-.3.3-.3.4 0 .2.2.5.3.9.2-.5.3-.7.3-1zM1191.5 41.1c-.2 0-.4-.1-.5 0-.2.1-.3.4-.4.6l.2.2c.3-.3.7-.2.7-.8zM1137.6 33.9c.3-.6.1-1.2.1-1.8-.4.7-.4 1-.1 1.8zM996.6 36.5c0-.1-.2-.2-.2-.3l-.5.5c.2.1.3.3.4.3.2-.1.4-.3.3-.5zM1076.1 43.6c0 .3.1.6.1 1.1.6-.2.5-.6.4-1 0-.2-.2-.3-.5-.1zM1046.5 44.8c.3-.4.2-.8 0-1.4-.4.7-.4.7 0 1.4zM1172.5 37.3c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.2-.1-.3-.1zM997.4 41v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3 0-.6-.4-.8zM1180.1 35c0 .8 0 .8.8.9-.3-.3-.5-.5-.8-.9zM1156 38.1c.4.3.7.4 1.1.2-.3-.3-.6-.3-1.1-.2zM1152.2 38.1c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.2 0 .3-.1.6-.2zM1000.7 43.2c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM1177.7 34.7c-.1 0-.3.2-.3.2 0 .1.1.3.2.5.2-.2.3-.3.3-.4.1-.2 0-.4-.2-.3zM1217.3 33.4zM1218.8 33.5c-.1 0-.2-.1-.4-.1v-.2c0-.1-.2-.2-.2-.3l-.4.4c-.1 0-.3.1-.4.1.4.3.8.5 1.4.1zM991.4 38.9c.5-.6.3-1.2.4-1.7-.3.4-.5.9-.4 1.7zM991.8 37.2s0-.1 0 0c0-.1 0-.1 0 0zM1085 43.5c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.4-.3-.5-.4zM1029.3 45.3c0 .4.1.6.1 1 .5-.5.5-.7-.1-1zM1038.3 44.6c-.1 0-.1.1-.1.2 0 .3.1.5.4.6.2-.3 0-.5 0-.7-.1 0-.2-.1-.3-.1zM1083.2 41.6c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0 0-.1 0-.2.1zM1013.9 45.5c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.1.1-.2.1zM1057.7 44.6c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1-.1-.2-.2-.4zM1199.2 43.9c.1 0 .1-.1.1-.2 0-.4-.3-.6-.7-.7.1.3.2.6.3.8.1.1.3.1.3.1zM1198.7 43zM1001.7 40.8c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7 0 .1 0 .4.2.4z"/><path d="M1007.6 41.3c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM1008 40.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM1163.7 35.8c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM999.1 43c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3-.1-.2-.1-.4-.3-.4zM1169.5 37.5c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4c0 .1.1.1.1 0zM1011.4 40.1s0 .1 0 0zM1011 39.5s-.1 0 0 0c-.2.5.2.5.4.7 0-.3.1-.7-.4-.7zM1001.6 39.2c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM1002.6 39.6zM1002 39.6s0 .1 0 0c0 .1.1.1 0 0 .1 0 .1 0 0 0zM1048.2 45.8l.2.2c.1-.1.2-.3.3-.4l-.2-.2c-.2.1-.3.3-.3.4zM1011.4 38.6c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 .1.2 0 .3-.1zM1008.6 38.4c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2-.1-.4-.2-.4zM1119.4 42.5c0 .1.1.2.2.4.1-.2.2-.4.1-.4 0-.1-.2-.1-.3-.2.1.1 0 .2 0 .2zM989.8 38.6c0 .1.1.2.2.4.1-.2.1-.3.1-.4 0-.1-.1-.1-.1-.2-.1 0-.2.1-.2.2zM1021.1 45.6c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3 0 0-.2 0-.3.1zM1102 41.6c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7-.1-.1-.3-.2-.3-.3zM1050.6 43.1s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.2.2-.3.3zM1022.9 44.3c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3 0 0 .1-.1.1-.2zM1021.5 44.3s0 .1 0 0c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM1003.2 43.4s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.1.3-.2.5zM1183 43.2c.2-.1.3-.4 0-.5l-.4.4c.2 0 .4.1.4.1zM1182.6 43zM989.8 35.8c0 .1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.2-.1-.3c-.2 0-.3.1-.3.2zM1052.3 44.6c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM1100.1 42.6c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1 0-.1.2-.2.3zM1089.1 41.9zM1088.6 42.3s.1.1 0 0c.4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM1180.7 37.4s.2-.1.2-.2-.1-.2-.2-.3c-.1.1-.2.1-.3.2.1.2.2.3.3.3zM1174 36.2zM1173.5 36.2c.1.1.1.2.2.3l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1zM1172.4 36.3c0 .1.1.2.3.3.1-.2.1-.3.1-.4 0-.1-.2-.1-.3-.1 0 0-.1.1-.1.2zM1010 41.8c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM1099.7 43.1c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM1015.7 46s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.2.3-.2.4-.2.6zM1014.7 44c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c0 .1 0 .1-.1.2zM991.1 33.7h.2c0-.1.1-.3.1-.4v-.1c.1 0 .1 0 .2-.1v-.2s-.1 0-.1.1l-.1.1c0-.1.1-.2 0-.2 0-.1-.2-.1-.3-.1l-.1.2c0 .1.1.2.2.3l-.3.3c.1 0 .2.1.2.1zM1004.2 39.3c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0-.1 0-.2.1-.2zM1027.9 43.5s.1.1.2.1v-.2h-.2v.1zM1018.8 43.8s0 .1 0 0c0 .1 0 .1.1.1-.1 0 0 0-.1-.1 0 .1 0 0 0 0zM1007.3 43.8c.1.1.1.3.2.4h.2v-.1c-.2-.1-.3-.2-.4-.3zM1063.4 41.9h.1c.2-.2 0-.4-.1-.5-.1.2-.3.3 0 .5zM1063.4 41.4zM1014.4 40.3s-.1-.1 0 0c-.1 0-.1.1-.1.1s.1 0 .1.1v-.2zM1011.4 40.2zM1011.4 40.2c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1-.1-.1-.2-.1-.3 0zM1185.4 33.2s.1 0 0 0c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0zM1184.6 33.2s.1 0 0 0c.1 0 .1 0 0 0zM1184.7 33.2c.3.2.5.1.8 0-.3-.2-.6-.1-.8 0zM1010.3 37.6v.7c.3-.3.1-.5 0-.7zM1182.8 31.3s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1s-.2.1-.2.1zM1183.3 31.3c-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM1000.9 34.2s.1 0 .1.1c0-.1.1-.1.1-.2 0 0-.1-.1-.1 0 0-.1-.1 0-.1.1zM992.4 32.2l-.1.1s0 .1.1.1c-.1 0 0 0 0-.2 0 .1 0 0 0 0zM1214.3 39.9c.1 0 .1-.1 0 0 .1-.1 0-.1 0 0 0-.1 0 0 0 0zM1214.3 39.9c-.1.2-.2.4-.2.6.3-.2.4-.3.2-.6zM1215.9 37.5zM1216.1 37.7s0-.1 0 0c-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM1021.5 43.9v.4c.1-.1.1-.2.2-.4-.1.1-.1 0-.2 0zM1062.5 41.3s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1v.1c0 .1 0 .2.1.2zM1007.3 43.7c0 .1 0 .1 0 0 0 .1 0 0 0 0zM1007.2 43.4c0 .1-.1.1-.1.2s.1.1.1.2v-.2-.2zM1105.6 39.2s.1 0 .1-.1c.1-.1.1-.1.1-.2-.1 0-.2 0-.2.1v.2zM1093.6 39.7h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2-.1-.1-.1 0-.1 0zM1093.9 39.4zM1139.8 36.8c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM1140 36.6h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2.1.1.1 0 .1 0zM991.2 36.3zM990.9 36.4c.1 0 .2 0 .2-.1l-.2.1c.1-.1.1 0 0 0zM1147 29.7l-.2-.2c0 .1.1.1.1.2h.1zM1009.3 34.2V34c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2l.1.1zM1209.7 48.7h-.1.1zM1209.6 48.6zM1212.4 44.3v0c0 .1 0 .1 0 0zM1198.7 43c0-.2 0-.3.1-.5-.1 0-.1-.1-.2-.1-.2.2-.1.4.1.6zM1149.9 43.3c0-.1 0-.1.1-.2l-.1.1v.1zM1053.3 42.9c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM1153.4 39.2h0zM1083.7 39.9v-.1.1zM1155.1 37.3v0zM1035.8 41.4s0-.1.1-.1c-.1 0-.1 0-.1.1zM1035.8 41.3s0-.1 0 0c0-.1 0-.1 0 0zM1174 36.2s.1 0 .1-.1l-.1.1zM1060.5 40.2c.1 0 .1-.1.2-.1-.1 0-.1 0-.2.1.1-.1 0-.1 0 0zM1137.8 32.1zM1137.8 31.9c0 .1 0 .1-.1.2l.1-.1c.1 0 0-.1 0-.1zM991.6 29.3s.1 0 .1.1l-.1-.1c.1 0 0 0 0 0zM1110.3 30.2s-.1 0-.1.1-.1.1-.1.2c.1 0 .1-.1.2-.1s0-.1 0-.2zM1110.1 30.5zM1153.8 29.1s0-.1-.1-.1l.1.1c-.1 0 0 0 0 0zM1089.5 30.2c.1 0 .2-.1.3-.1-.1-.1-.1-.2-.2-.3h-.4v.1l.3.3zM1006.5 34.2v.1h.1v-.1h-.1zM1129.2 35.4c0-.1 0-.1.1-.2 0 .1 0 .1-.1.2zM1086.7 29.5s0-.1.1-.1c0 0-.1 0-.1.1zM1039.5 39.4zM1082.1 31.3l.2.2c0-.1-.1-.1-.1-.2h-.1zM1127.3 34.4l-.1.1s0-.1.1-.1zM1103.9 37.7l-.2.2c.1 0 .1-.1.2-.1v-.1zM1108.5 33.5c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1c-.1-.1-.2-.1-.2-.2zM1043.9 26.8c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1.1-.1.1 0 0-.1.1-.1 0 0 0zM912.6 36.1s-.1 0 0 0c-.1 0-.1 0 0 0zM843.6 32.3zM856.3 35.9zM829 34.3zM1003.3 29.9zM896.5 37zM1001.9 27.9zM916.6 36.2c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c-.1 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3 0 .3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.5-.1-.8 0-1.1.3zM990 36.4c-.3 0-.5-.1-.8 0-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5-.1-.3-.1-.4-.2-.5zM833.6 30.1zM832.6 30.1v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4-.1.1.1.1.2.1 0 .4 0 .8-.2 1.2 0-.1-.1-.1-.1-.2 0 .1.1.1.1.2-.3.1-.5.2-.8.3.2.5.2.5-.3 1.3.3.1.6.1.9.2.5-.2.5-.2.7.2.1.2 0 .4.4.3v-.8c-.1-.5 0-.9.2-1.4.2-.4.2-.8.3-1.2-.1-.2-.3-.4-.4-.6-.4.1-.6.3-.8.5zM858.5 39.4c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.3.4-.5.7-1 1zM859.4 38.3zM817.5 28.7zM816.5 31.7c-.1.1-.1.2-.2.3.2.3.4.5.6.8.4-.1.6-.5.8-.9.3.1.5.5.9.1-.2-.3-.3-.6-.5-.8l.3-.3c.1-.9-.6-1.4-.8-2.1-.1.1-.2.3-.1.4.2 1-.3 1.7-1 2.5zm1.1.1c-.1-.1-.2-.1-.3-.2 0-.1.1-.1.1-.2.1.2.2.3.2.4zM860.4 37.1zM859 35.8zM859 35.8c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.6-.7-1-1-1.4zM896.5 38.2v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.9-.9-.2-1.6-.5zM965.7 38.3c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.5-.5-1-.8-1.6-.7zM970.9 39.6c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5-.1-.1-.2-.3-.4-.4zM885.2 38.7c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.4-.1-.5-.3-.7-.3zM956 34c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.1.6.2 1.1.3 1.6zM888.5 38.7c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4-.1-.2-.2-.4-.4-.4zM815.4 28.1c-.5 0-1 0-1.5.2.1.7.6.3.9.5-.1.4-.1.8-.1 1.2 0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.1-.5-.1-.8-.6-.9zM970.7 36c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3c1.1.1 2.1 0 3.1 0zM853.3 40.9c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.2-.1-.3-.3-.5-.6zM841 34.6c-.1-.1-.2-.3-.2-.4-.2.3-.4.7-.9.7l-.9-.6c0 .4.1.8.4 1.1.4.3.5.8.5 1.4.1-.3.3-.5.4-.8.9.2.9.2 1.1-.7-.2-.2-.3-.5-.4-.7zM839.8 36.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM840.7 34.2s0-.1 0 0zM856.9 36.4c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.4-.1-.6-.3-.8-.6zM849.7 39.7c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.4 0-.7-.3-.8z"/><path d="M1014.5 39.8c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1v-.1c.1.2.3.3.4.5.1-.4 0-.6-.4-.6 0-.2.1-.4.1-.5.2 0 .3.1.5 0 .1-.1.4-.2.3-.3 0-.7-.3-1.3-1.1-1.6zM820.3 27.1c-.3 0-.6.3-.6.8s.3.8.8.8c.4 0 .7-.3.7-.7-.1-.5-.5-.9-.9-.9zM874.4 39.2c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.1-.4 0-.6-.2zM994.1 36.6c-.6-.1-1.2-.1-1.8-.2l-.1-.1c-.1.3-.2.6-.3.8.2 0 .4.2.4.1s.1-.1.1-.2c.1 0 .2.1.3.1.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.1-.9-.1-1.3-.2zM877.3 39.6c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5.1-.6-.5-.8-.8-1.2zM862.3 41c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.4-.6-.3-.9zM959.8 36.3c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4.1-.3-.1-.4-.4-.6zM822 31h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8-.1.2-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.5 1.1.9 1.5zM811.8 29.7c-.3.5-.6.9-.8 1.4.4.5.6.7 1 1 .1-.9.2-1.6-.2-2.4zM977.9 36.2c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.4.2-2.8-.4-4.2.1zM852.7 36.2c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.4-1 .4-1-.7-2.1zM890.9 39.6c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.3.1-.5.3-.4.5zM891.2 39.2c.1 0 0 0 0 0zM973.8 34.1c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-.9-.4-1.4zM812.3 34.3c-.3.3-.5.6-.3.8.2.2.5.4.8.4.4 0 .6-.3.5-.8-.3-.1-.6-.2-1-.4zM858.6 42.8c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.5.6-.4 1.2-.4 1.7zM1003.4 31.5c-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.2 0 .5.1.7.2-.1.1-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.5 1 .9 1.4h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8.3-.4.5-.8.2-1.2zM846.7 36.6c0 .6 0 1.2.1 1.9.5-.4.7-.6.8-.8.1-.6-.2-.9-.9-1.1zM836.1 41.2v.8c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1-.1-.9-.1-.8-.9-1.4zM990.6 39.2c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.1-1.1.3-1.9.6zM863.5 39.1c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5s-.1-.4-.4-.5zm.1.9s.1 0 0 0l.1.1-.1-.1zM878.5 39.6c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1l-1 1zM825.5 33.6s-.1 0 0 0c-.1 0-.1 0 0 0zM824.9 33.8c.3.6.7 1.1.7 1.8.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1l-.3-.9h-.6c-.2.1-.2.2-.1.2zM823.6 36.5c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.3-.7-.5-.6zM838.9 34.2zM838.8 32.4s-.1-.3-.1-.4c-.2 0-.3 0-.5.1-.1 0-.1.2-.1.2 0 .4 0 .9.1 1.3.1.3.4.4.7.6-.1-.6-.6-1.2-.1-1.8zM825.1 37.6h-.2v1.1c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.3-.4-.4-.9-.5-1.3zM820.2 38.3c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4 0-.3-.2-.4-.6-.2zM836.8 38.3c-.1-.4-.1-.6-.2-.9v-.9c-.5.3-.8.5-.7 1 0 .5.3.8.9.8zM860.4 41.1c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.6 0-.8.2-.7.5zM1010.5 40.1c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6l.1-.1.1.1c0-.1 0-.2.1-.2.1-.1.3-.3.3-.4 0-.4-.3-.7-.6-.7zM831.5 34.1c0-.3-.2-.4-.4-.5-.3-.3-.6-.6-.9-1-.4.3-.4.7-.3 1.1.1.4.3.5.7.5 0 .1 0 .2-.1.3-.1.3.1.6.4.7.2.1.4-.1.5-.5 0-.2.1-.4.1-.6zM821.9 28.1c.7-.7.6-1-.3-1.9 0 .7-.2 1.3.3 1.9zM813.3 31c-.1.4-.3.8-.4 1.2-.1.2.1.5.3.6.3 0 .4-.2.4-.4.1-.5.1-.9-.1-1.4h-.2zM985.4 31.9c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.1-.5-.3-.7-.4zM960.3 32.3c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.2.2.2.7.6.6zM960.5 30.9zM898.3 40.8c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1.1-.2.4-.1.5zM845.3 36.9c-.2.2-.3.4-.1.6.1.2.2.3.4.4 0 .1 0 .1.1.2v-.2c.2.1.3.1.5.2.2-.5 0-.8-.2-1.1-.3-.2-.5-.2-.7-.1zM850.6 41.9c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.6-.5.9-1 .8zM855.6 42.3c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .7.2 1.2.5 1.9zM992.3 35.9c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4h-.3c.2-.8.2-1.6-.1-2.3-.3.5-.6.9-.8 1.4.4.4.6.7 1 .9h-.9s-.1 0-.1.1c-.7-.2-.8-.1-.9.4v.5c.3-.2.6-.4.9-.7-.4.2-.3.3-.2.3zM821.3 36.3c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.2-.2-.4-.3-.6-.5zM821.3 36.3zM989.5 31.6c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.4.2-.6.5-.6 1zM994.3 30.2c-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM994.3 32.7c.4-.9.3-1.3-.1-2.5-.2 1.9-.2 1.9.1 2.5zM921.8 39.1c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.2-.3-.1zM910.4 39.6c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5-.1-.4-.2-.6-.5-.6zM1021.4 44.4c.1 0 .1 0 0 0 0-.1-.1-.1-.1-.1-.2-.1-.3-.2-.5-.2 0 .1.1.1.1.2-.2 0-.3.1-.2.2.1.1.2.1.3.1.4.7.7.8 1.4.8-.3-.3-.6-.7-1-1zM819 35.8c-.1.5-.2 1-.4 1.6.3 0 .5.1.7 0 .1-.1.2-.3.2-.5-.2-.4-.2-.7-.5-1.1zM955.4 31.1c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM820.1 33.3c-.3-.3-.6-.4-.9-.4-.1 0-.2.1-.5.3.4.1.6.2.8.3.2.1.4.3.6.4.3-.2.2-.4 0-.6zM1020.6 45.3c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.6.2-1-.3-1.1zM873 41.1c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 0 .2.1.4.1zM964.6 34c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.2-.1-.4 0-.5.2zM988.9 33c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM910.4 38.1c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2.1 0 .1-.2.1-.3zM872.7 42.1c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.4.4-.4.6zM870.1 35.8c-.1 0-.2.1-.2.2 0 .4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM912.4 37.8c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.1-.2-.2-.2zM844.8 41.3c.6.2.9.2 1.3-.2-.5-.3-.8-.3-1.3.2zM960.1 34c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.2-.3-.2-.6-.3-1zM875 38.5c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.1.5-.3.6-.7zM826.4 36.9l.3.6c.2-.1.5-.2.7-.3-.5-.8-.6-.8-1-.3zM896.6 37.5c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2-.1.2-.1.4 0 .6zM896.5 37zM962.2 31.6v.1c.3.3.6.2 1-.1-.4-.3-.7-.3-1 0zM856 39.5c.1.8.1.8.9.4-.3-.3-.5-.5-.9-.4zM983.9 32.3c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2 0 .3-.2.3-.4zM850.3 36.6c-.1.1-.3.3-.3.4 0 .2.2.5.3.9.1-.5.3-.7.3-1 .1 0-.1-.1-.3-.3zM956.3 30.5c.3-.6.1-1.2.1-1.8-.4.7-.4 1.1-.1 1.8zM815.1 32.9l-.5.5c.2.1.3.3.4.3.2 0 .4-.2.3-.4 0-.3-.1-.3-.2-.4zM834.9 33c-.2-.2-.5-.3-.7-.5-.1 0-.1.1-.2.1.1.2.1.4.2.6.2.2.6.1.7-.2zM894.8 40.3c0 .3.1.6.1 1.1.6-.2.5-.6.4-1 0-.3-.2-.3-.5-.1zM865.2 41.5c.3-.4.2-.8 0-1.4-.4.6-.4.6 0 1.4zM991.2 34c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.2-.1-.3-.1zM816 37.7v.8c0 .1.1.1.2.1s.2-.1.2-.1c.1-.3.1-.6-.4-.8zM974.7 34.8c.4.3.7.4 1.1.2-.3-.4-.6-.4-1.1-.2zM970.9 34.7c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.1 0 .3-.1.6-.2zM819.4 39.9c-.2-.5-.4-.8-.7-1.4 0 .9 0 .9.7 1.4zM849.6 37.4c0-.1-.1-.3-.2-.6-.2.2-.3.4-.4.5-.1.2 0 .4.2.4s.4-.2.4-.3zM834.9 35.6c.3-.6.1-.9-.3-1.2 0 .4-.1.8.3 1.2zM841.3 32.7c.1.3.1.6.2.9h.6c-.1-.6-.3-.8-.8-.9zM841.5 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1016.6 41.4zM1016.6 40.5l-.2-.2c0-.1-.1-.2-.2-.2 0 0-.1.1-.2.1 0 .1.1.1.1.2l-.1.1c.1.3.3.6.5.9.2-.3.3-.6.1-.9zM974.7 40.4c-.2 0-.4.1-.3.3 0 .1.2.2.4.3.1-.1.3-.2.3-.3 0-.2-.2-.3-.4-.3zM903.6 40.2c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.1-.2-.3-.3-.5-.4zM848 42c0 .4.1.6.1 1 .5-.6.5-.7-.1-1zM857.3 42.1c.2-.3 0-.5 0-.7l-.2-.1c-.1 0-.1.1-.1.2-.1.3 0 .6.3.6zM901.9 38.3c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0-.1-.2 0-.2.1zM841.5 42c-.1.2-.3.3-.4.5.1.1.2.2.3.2.2-.1.3-.3.4-.5 0 0 0-.2-.1-.2-.1-.1-.2-.1-.2 0zM832.6 42.2c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.1.1-.2.1zM876.4 41.3c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4 0-.1-.1-.2-.2-.4zM973.3 39.4c-.1.4-.1.7.4 1 0-.4 0-.8-.4-1zM1017.3 39.7s.1 0 0 0c.1 0 .1 0 0 0 .1 0 0 0 0 0zM820.4 37.5c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7 0 .1-.1.3.2.4zM826.3 38c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM826.7 37.5zM982.4 32.5c-.2-.3-.3-.5-.6-1-.1 1.1-.1 1.1.6 1zM817.8 39.7c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3-.1-.2-.1-.4-.3-.4zM988.2 34.2c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4h.1zM1019 44.4c.1.1.2.2.3.2.1-.1.1-.2.2-.3-.1-.1-.2-.1-.3-.2 0 0-.1.2-.2.3zM830.1 36.8zM829.7 36.1s-.1.1 0 0c-.2.5.2.5.4.7 0-.3 0-.6-.4-.7zM820.2 35.9c.2.2.4.3.5.4h.5c-.1-.4-.4-.6-1-.4zM821.3 36.3zM820.7 36.3zM981.8 38c-.1.2-.1.3-.2.5.1.1.1.2.2.2s.2-.1.2-.1c0-.2 0-.4-.1-.5 0-.1-.1-.1-.1-.1zM830.1 35.3c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 0 .2-.1.3-.1zM827.3 35.1c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2-.1-.4-.2-.4zM976.7 37.9c-.1 0-.2 0-.2.1-.1.1-.1.2-.2.3.1 0 .2.1.3.1.2 0 .3-.1.3-.4 0 0-.1-.1-.2-.1zM880.7 41.9l.2.2c.1-.2.2-.4.3-.5-.1 0-.2-.1-.2-.1-.1.1-.2.2-.3.4zM843 42.1s-.1 0 0 0c0 .2 0 .4.1.6h.2c-.1-.2-.1-.3-.2-.5 0-.1-.1-.1-.1-.1zM839.8 42.3c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3 0 0-.2 0-.3.1zM920.7 38.3c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7-.1-.2-.3-.2-.3-.3zM869.3 39.8s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.2.2-.3.3zM841.6 41c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3l.1-.2zM839.4 41.1c.1.1.3.1.5.1.1 0 .2-.1.3-.2-.1 0-.2-.1-.3-.1-.4-.1-.7.1-.5.2zM840.2 41zM821.9 40.1s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.1.3-.2.5zM833.2 38.8l.6.6c.1-.5 0-.7-.6-.6zM960.8 33.4l.2-.1v-.4c-.1 0-.2.1-.4.1.1.2.2.3.2.4zM975.9 31.9c-.1 0-.2.2-.3.3.1.1.2.2.3.2.1 0 .2-.2.2-.3 0-.1-.1-.3-.2-.2zM1018.5 46.1l.2.2c.1 0 .2-.1.2-.2-.1-.1-.2-.1-.3-.2 0 .1-.1.1-.1.2zM874 51.6c.1 0 .1.1.2.1v-.2l-.1-.1s0 .1-.1.2zM1032.3 41.4h-.4c-.1 0-.1.2-.1.3.1 0 .2.1.2 0l.3-.3zM1001.7 39.9c.2-.1.3-.4 0-.5l-.4.4c.1 0 .3.1.4.1zM1001.3 39.7zM857 43h.3s.1-.1.1-.2c-.1 0-.2-.1-.3 0 0 0 0 .1-.1.2zM886.6 41.4c0 .1.1.3.1.3.1 0 .2-.1.3-.1-.1-.1-.1-.3-.1-.3s-.1.1-.3.1zM871 41.3c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3 0-.1-.1-.2-.2-.2zM845 42.7c.4-.3.4-.3.3-.7-.1.3-.2.4-.3.7zM846.7 41.9c0 .1.1.2.2.3.1-.1.2-.1.2-.2-.1-.1-.1-.2-.2-.3l-.2.2zM918.8 39.2c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1.1-.2.2-.2.3zM907.8 38.6v-.1zM907.3 38.9c0 .1 0 .1 0 0 .4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM835.5 40.9s0 .2.1.2c.2 0 .4 0 .6.1-.1-.1-.3-.3-.5-.4 0 0-.2 0-.2.1zM836.2 41.2zM981.5 35.1c-.3 0-.5-.1-.8-.1.3.3.4.3.8.1zM992.7 32.8s0 .1 0 0c0 .1 0 .1 0 0zM992.4 33.2l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1.1.1.1.2.2.3zM828.7 38.5c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM829.2 37.4c0 .2-.1.3-.1.4 0 .1.1.1.2.2 0-.1.1-.2.1-.4l-.2-.2zM832.2 34.4c-.1.7.4.9 1 1.3v-.8c-.1-.4-.5-.5-.8-.7.1-.4.1-.8-.2-1.2-.1.5-.4 1 0 1.4zM1016.6 42c-.2 0-.5.1-.9.1.6.4.8.2.9-.1zM1004 40.4c0 .1.1.1.1.2.1 0 .1-.1.2-.1 0 0 0-.1-.1-.1 0-.1-.1-.1-.2 0zM854.7 42.7c0 .1.1.1.1.2.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0 0 0 .1-.1.2zM918.4 39.8c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM834.4 42.6s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.2.4-.2.5-.2.6zM833.4 40.7c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c0 .1 0 .1-.1.2zM876.6 38.2h.3c-.1-.1-.1-.2-.2-.3h-.2s-.1.1 0 .1c0 .1 0 .2.1.2zM891.8 37.2c-.1 0-.1 0-.2.1 0 .1.1.1.1.2l.2-.2c-.1 0-.1-.1-.1-.1zM983.4 33.8s.1-.1.1-.2c-.1 0-.2-.1-.3-.1 0 0-.1.1-.1.2.1 0 .2.1.3.1zM890.7 36.8c-.1 0-.2.1-.3.1l.2.2c.1 0 .2-.1.3-.2-.1 0-.2-.1-.2-.1zM843.4 38.2c.1 0 .2.1.2.1s.1-.1.1-.2c-.1 0-.2-.1-.2-.1-.1 0-.1.1-.1.2zM840.6 38.3c.1.1.1.2.1.2l.2-.2v-.2c-.1.1-.2.1-.3.2zM831.4 38.7c0 .1.1.1.2.2.1-.1.1-.2.2-.3-.1 0-.1-.1-.2-.1-.1.1-.2.1-.2.2zM844.2 36.9c0 .1.1.1.1.2.1 0 .2-.1.2-.1 0-.1-.1-.1-.1-.2-.1 0-.2.1-.2.1zM835 36.8s-.1.1-.2.1c.1.1.1.2.2.3.1-.1.2-.2.1-.2 0-.1-.1-.2-.1-.2zM822.9 35.9s-.1 0 0 0c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0 0 0-.1.1-.2 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM850.7 41.2s-.1 0 0 0c-.1 0-.1 0-.1.1l.1-.1c0 .1 0 0 0 0zM882.1 38.6h.1c.2-.2 0-.4-.1-.5-.1.2-.3.3 0 .5zM882.1 38.1zM854 39.5c0-.1-.1-.1-.1-.2-.1 0-.1.1-.1.1 0 .1.1.1.1.2 0 0 .1 0 .1-.1zM1004 32.8s-.1 0 0 0c-.1 0-.2 0-.2.1l.1.1c0-.1.1-.1.1-.2zM892.9 37.1c0 .1-.1.2-.1.3.1-.1.2-.1.3-.2-.1-.1-.1-.1-.2-.1zM892.8 37.4zM831.5 37.1h-.2v.1s.1.1.2.1v-.2zM838.4 36.9c.1 0 .1 0 .1-.1 0 0-.1-.1-.1.1 0-.1 0-.1 0 0zM833 37c0 .1 0 .1 0 0 .1 0 .1 0 .1-.1h-.1v.1zM830.1 36.8zM830.1 36.8c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1h-.3zM1004.1 29.9c.1 0 .1 0 0 0 0-.1 0 0 0 0zM1003.3 29.9zM1003.3 29.9c.3.2.5.1.8 0-.2-.2-.5-.1-.8 0zM837.2 35.7c.1 0 .1 0 0 0l.1.1c.1-.1.1-.1-.1-.1.1-.1.1-.1 0 0zM829 34.3v.7c.2-.4.1-.5 0-.7zM1001.5 28s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1s-.2 0-.2.1zM1001.9 27.9z"/><path d="M834.5 34.2h-.2s0 .1.1.1.1.1.2.1c-.1-.1-.1-.2-.1-.2zM834.6 34.4zM816.8 32.8c.1-.1.1-.1 0 0 .1-.1.1-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0z"/><path d="M816.8 33.3c.1-.1.2-.1.2-.2s0-.2-.1-.4c-.1.1-.1.2-.2.3-.1.1 0 .2.1.3zM819.7 30.6c0 .1-.1.1-.1.2 0 0 .1 0 .1.1 0-.1.1-.1.1-.2l-.1-.1zM1015.5 42.9v.1l.1-.1c0-.1 0-.1-.1 0 0-.1 0-.1 0 0zM1010.3 42.1v.1h.2v-.1h-.2zM1007.4 40.5c0-.1-.1-.1-.1-.2h-.1c0 .1 0 .1.2.2-.1 0-.1 0 0 0zM853.4 42.9s.1.1.1 0v-.1h-.1v.1zM1034.6 34.2c-.1 0-.1 0 0 0-.1 0 0 0 0 0zM1034.8 34.4c0-.1 0-.1 0 0-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM840.2 41c.1-.1.1-.2.2-.4-.1 0-.1 0-.2-.1v.5zM855 39.6c0 .1 0 .1 0 0 0 .1 0 .1.1.1l-.1-.1c.1 0 .1 0 0 0zM912.3 36.4h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2-.1-.1-.1-.1-.1 0zM912.6 36.1c-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM848.8 38.4c.1.1.1.1.2 0v-.1c-.1 0-.2 0-.2.1zM958.5 33.5c0 .1 0 .1 0 0zM958.7 33.2h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2.1.1.1.1.1 0zM827.6 33.5zM827.3 33.2v.2c.1 0 .1 0 .2.1 0-.1-.1-.1-.1-.2l-.1-.1zM817.9 32.9c0-.1-.1-.1 0 0-.1-.1-.1 0-.1 0h.1c-.1 0 0 0 0 0zM965.7 26.4l-.2-.2c0 .1.1.1.1.2h.1zM828 30.8v-.2c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2s.1.1.1.1zM813.5 29.6v.1zM821.9 24.5zM821.7 24.8h.2c0-.1 0-.2.1-.2l-.2.2c-.1-.1-.1 0-.1 0zM1016.6 41.4v.5c.3-.1.2-.3 0-.5zM1031.1 41v0c0 .1 0 0 0 0zM1017.3 39c-.2.2-.1.4.1.6 0-.2 0-.3.1-.5-.1 0-.2 0-.2-.1zM968.5 39.9c0-.1 0-.1.1-.2l-.1.1v.1zM872 39.6c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM972.1 35.9h0zM892.8 37.4zM892.6 37.5l.1-.1-.1.1c0-.1 0 0 0 0zM902.4 36.6v-.1.1zM973.8 34v0zM854.4 38.1s0-.1.1-.1l-.1.1c.1-.1.1 0 0 0zM854.5 38s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0zM992.7 32.8s.1 0 .1-.1c0 .1 0 .1-.1.1zM879.2 36.8c.1 0 .1-.1.2-.1-.1 0-.1 0-.2.1zM839.8 36.8c-.1 0-.1 0 0 0-.1 0 0 0 0 0zM839.7 37c0-.1 0-.1.1-.2l-.1.1v.1zM851.9 36.4l.1-.1h-.1zM840.7 34.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM840.6 34l.1.1-.1-.1c.1 0 .1 0 0 0zM841.5 33.6l-.1.1.1-.1zM827.8 33.5h-.2c.1.2.2.2.2 0zM827.8 33.5c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0zM956.5 28.7c-.1.1-.1.1 0 0-.1.1 0 .1 0 0z"/><path d="M956.5 28.6c0 .1 0 .1-.1.2l.1-.1v-.1zM929 26.9s-.1 0-.1.1-.1.1-.1.2c.1 0 .1-.1.2-.1.1-.1 0-.2 0-.2zM928.8 27.2zM972.5 25.8s0-.1-.1-.1l.1.1c-.1-.1 0-.1 0 0zM825.3 30.9h-.1v.1h.1c.1-.1 0-.1 0-.1zM947.9 32.1c0-.1 0-.1.1-.2 0 .1-.1.1-.1.2 0-.1 0 0 0 0zM905.4 26.2s0-.1.1-.1c-.1 0-.1 0-.1.1 0-.1 0 0 0 0zM858 35.9l.2.2c0-.1-.1-.1-.1-.2s-.1 0-.1 0zM858.2 36c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM900.8 28l.2.2c0-.1-.1-.1-.1-.2h-.1zM946 31.1l-.1.1c0-.1 0-.1.1-.1-.1 0 0 0 0 0zM927.1 30.2c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1c0-.1-.1-.2-.2-.2zM862.5 23.5zM1497 39.4zM1440.8 39.2c-.1 0-.1 0 0 0zM1413.4 37.6zM1587.8 33.2zM1481 40.3c-.1 0-.1 0 0 0zM1586.4 31.3zM1501 39.5c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c-.1 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3-.1.3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.4 0-.8.1-1.1.3zM1573.7 39.7c-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5 0-.1 0-.2-.1-.2-.4-.3-.6-.3-.9-.3zM1442.9 42.7c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.8-1 1zM1443.8 41.7s0-.1 0 0c0-.1 0-.1 0 0zM1444.8 40.5zM1443.4 39.1zM1443.4 39.1c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.5-.7-1-1-1.4zM1480.9 41.5v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.8-.8-.2-1.6-.5zM1550.1 41.6c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.4-.5-1-.8-1.6-.7zM1555.3 42.9c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM1469.6 42.1c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.3-.2-.5-.3-.7-.3zM1540.4 37.4c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.2.6.2 1.1.3 1.6zM1473 42c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4-.1-.2-.3-.3-.4-.4zM1399.1 33.4c0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.2-.5 0-.9-.5-.9h-.2c0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.3 0-.6.1-.9.2.1.7.6.3.9.5-.1.4-.2.8-.2 1.2zM1555.2 39.4c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3h3.1zM1437.8 44.3c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.3-.1-.4-.4-.5-.6zM1441.3 39.7c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM1434.2 43c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.3 0-.6-.3-.8zM1599 43.1c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1.1-.3.1-.5.2-.8.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.2-.6-.4-1.2-1.2-1.5zM1458.8 42.5c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.2-.4.1-.6-.2zM1578.5 40c-.6-.1-1.2-.1-1.8-.2-.1 0-.2.2-.2.3l.1.2c.2.1.3.2.5.2.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.2-.9-.2-1.3-.2zM1461.7 42.9c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5.1-.6-.4-.8-.8-1.2zM1446.7 44.3c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.5-.3-.9zM1544.3 39.6c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4.1-.2-.2-.4-.4-.6zM1562.4 39.5c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.9-.3-4.2.1zM1437.1 39.5c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.5-1 .5-1-.7-2.1zM1475.3 43c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.2.1-.5.2-.4.5zM1475.7 42.5zM1558.2 37.5c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-1-.4-1.4zM1396.7 37.6c-.3.3-.5.6-.3.8.2.2.5.4.8.4.4 0 .6-.3.5-.8-.2-.1-.6-.2-1-.4zM1443 46.2c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.4.6-.4 1.1-.4 1.7zM1587.7 36.2c.2-.5.4-.9.1-1.3-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.4 0 .6.1.8.2zM1420.8 44.7s.1 0 0 0c.1-.2 0-.3-.1-.4-.1 0-.2.1-.2.1-.1-.1-.2-.2-.4-.3l-.2.1s0 .2.1.2h.4c.1.1.1.1.1.2v.7c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1 0-.8-.1-.8-.6-1.2zM1575 42.5c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.2-1.1.3-1.9.6zM1448 42.5c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5-.1-.3-.2-.5-.4-.5zm.1.8c0 .1 0 .1 0 0l.1.1c-.1 0-.1 0-.1-.1zM1462.9 43c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1-.4.3-.7.6-1 1zM1408 39.8c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.2-.7-.5-.6zM1409.5 40.9h-.2V42c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.8-.5-1.3zM1404.7 41.7c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4 0-.3-.3-.5-.6-.2zM1444.8 44.4c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.5.1-.7.3-.7.5zM1594.9 43.5c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6.2-.2.5-.4.6-.6.1-.4-.3-.8-.6-.7zM1397.3 35.5c-.1.2.1.5.3.6.3 0 .4-.2.4-.4.1-.4.1-.9-.1-1.3l-.1-.1-.1.1v.1c-.1.2-.3.6-.4 1zM1569.8 35.3c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.2-.5-.3-.7-.4zM1544.8 35.6c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.1.2.2.7.6.6zM1545 34.2zM1482.7 44.2c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1 0-.1.3-.1.5zM1435 45.3c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.5-.4.8-1 .8zM1440 45.6c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .8.3 1.2.5 1.9zM1588.6 40.6c-.2 0-.4.1-.6.2v.4c.2.3.7.4.9.3.1 0 .1-.2.1-.2 0-.3-.1-.6-.4-.7zM1576.7 39.3c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4-.4 0-.9-.1-1.3-.1-.1 0-.2.2-.2.3-.1.1 0 .3.1.4zM1405.7 39.6c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.1-.4-.3-.6-.5zM1405.7 39.6zM1574 34.9c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.5.2-.6.5-.6 1zM1578.7 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1578.8 36.1c.4-.9.3-1.3-.1-2.5-.2 1.8-.2 1.8.1 2.5zM1506.3 42.4c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.1-.3-.1zM1494.8 42.9c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5s-.2-.6-.5-.6zM1605.2 47.4c.7 1.2.8 1.3 1.7 1.3-.6-.5-.9-1.1-1.7-1.3zM1539.8 34.4c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM1605 48.6c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.5.2-1-.3-1.1zM1457.4 44.4c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 .1.2.1.4.1zM1549 37.3c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.1-.1-.4 0-.5.2zM1573.3 36.3c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM1494.9 41.4c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.1.1-.3zM1457.1 45.4c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.3.5-.4.6zM1454.5 39.1c-.1 0-.2.1-.2.2-.1.4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM1585.4 36.2c.1-.1.2-.3 0-.5-.1-.1-.3-.1-.5-.1-.1.1-.3.2-.3.4s.1.4.2.7c.3-.2.4-.3.6-.5zM1589.9 41.7c.1 0 .3.1.4 0 .3-.3.8-.4 1-.8-.8-.1-.8-.1-1.4.8zM1496.9 41.1c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.2-.2-.2-.2zM1394.3 36.3zM1544.5 37.3c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.1-.3-.2-.6-.3-1z"/><path d="M1459.4 41.9c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.2.6-.4.6-.7zM1410.8 40.3l.3.6c.2-.1.5-.2.7-.3-.5-.9-.5-.9-1-.3zM1481 40.9c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2v.6zM1481 40.3c-.1 0 0 0 0 0zM1589.9 33.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1588.6 33.2c0 .3-.2.6.2.9.4-.3.9-.4 1.1-.9-.4.2-.9.1-1.3 0zM1546.6 34.9v.1c.3.3.6.2 1-.1-.4-.2-.7-.3-1 0zM1440.4 42.9c.1.8.1.8.9.4-.3-.4-.5-.6-.9-.4zM1568.3 35.7c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2-.1.3-.3.3-.4zM1435.1 40.3c0-.1-.2-.2-.3-.3-.1.1-.3.3-.3.4 0 .2.2.5.3.9.2-.5.3-.7.3-1zM1594.7 41.1c-.2 0-.4-.1-.5 0-.2.1-.3.4-.4.6l.2.2c.2-.3.6-.2.7-.8zM1540.8 33.9c.3-.6.1-1.2.1-1.8-.4.7-.5 1-.1 1.8zM1399.8 36.5c0-.1-.2-.2-.2-.3l-.5.5c.2.1.3.3.4.3.2-.1.3-.3.3-.5zM1479.3 43.6c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.2-.3-.3-.5-.1zM1449.6 44.8c.3-.4.2-.8 0-1.4-.4.7-.4.7 0 1.4zM1575.7 37.3c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.3-.1-.3-.1zM1400.5 41v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3.1-.6-.4-.8zM1583.2 35c0 .8 0 .8.8.9-.3-.3-.5-.5-.8-.9zM1559.1 38.1c.4.3.7.4 1.1.2-.3-.3-.6-.3-1.1-.2zM1555.4 38.1c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.1 0 .2-.1.6-.2zM1403.8 43.2c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM1580.8 34.7c-.1 0-.3.2-.3.2 0 .1.1.3.2.5.2-.2.3-.3.3-.4.1-.2 0-.4-.2-.3zM1620.5 33.4c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM1621.9 33.5c-.1 0-.2-.1-.4-.1v-.2c0-.1-.2-.2-.2-.3l-.4.4c-.1 0-.3.1-.4.1.4.3.9.5 1.4.1zM1394.5 38.9c.5-.6.3-1.2.4-1.7-.3.4-.5.9-.4 1.7zM1394.9 37.2s0-.1 0 0c0-.1 0-.1 0 0zM1488.1 43.5c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.3-.3-.5-.4zM1432.4 45.3c0 .4.1.6.1 1 .5-.5.5-.7-.1-1zM1441.5 44.6c-.1 0-.1.1-.1.2 0 .3.1.5.4.6.2-.3 0-.5 0-.7-.1 0-.3-.1-.3-.1zM1486.3 41.6c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0 0-.1 0-.2.1zM1417.1 45.5c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.2.1-.2.1zM1460.8 44.6c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM1602.3 43.9c.1 0 .1-.1.1-.2 0-.4-.3-.6-.7-.7.1.3.2.6.3.8.1.1.3.1.3.1zM1601.8 43zM1404.9 40.8c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7-.1.1-.1.4.2.4z"/><path d="M1410.7 41.3c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM1411.1 40.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM1566.8 35.8c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM1402.2 43c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM1572.6 37.5c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4c0 .1.1.1.1 0zM1414.5 40.1s0 .1 0 0c.1 0 0 0 0 0z"/><path d="M1414.1 39.5s-.1 0 0 0c-.2.5.2.5.4.7 0-.3.1-.7-.4-.7zM1404.7 39.2c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM1405.7 39.6zM1405.2 39.6s0 .1 0 0c0 .1 0 .1 0 0zM1451.3 45.8l.2.2c.1-.1.2-.3.3-.4l-.2-.2c-.2.1-.3.3-.3.4zM1414.5 38.6c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 .1.2 0 .3-.1zM1411.7 38.4c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2 0-.4-.2-.4zM1522.6 42.5c0 .1.1.2.2.4.1-.2.2-.4.1-.4 0-.1-.2-.1-.3-.2 0 .1-.1.2 0 .2zM1392.9 38.6c0 .1.1.2.2.4.1-.2.1-.3.1-.4 0-.1-.1-.1-.1-.2 0 0-.2.1-.2.2zM1424.2 45.6c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3 0 0-.1 0-.3.1zM1505.1 41.6c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7l-.3-.3zM1453.7 43.1s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.1.2-.3.3zM1426.1 44.3c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3-.1 0 .1-.1.1-.2zM1424.6 44.3s0 .1 0 0c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM1406.4 43.4s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.2.3-.2.5zM1586.1 43.2c.2-.1.3-.4 0-.5l-.4.4c.2 0 .4.1.4.1zM1585.7 43zM1392.9 35.8c0 .1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.2-.1-.3c-.1 0-.3.1-.3.2zM1455.5 44.6c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3-.1-.1-.2-.1-.2-.2zM1503.2 42.6c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1 0-.1.2-.2.3zM1492.2 41.9h.1-.1zM1491.7 42.3s.1.1 0 0c.4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM1583.8 37.4s.2-.1.2-.2-.1-.2-.2-.3c-.1.1-.2.1-.3.2.2.2.2.3.3.3zM1577.2 36.2zM1576.6 36.2c.1.1.1.2.2.3l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1zM1575.5 36.3c0 .1.1.2.3.3.1-.2.1-.3.1-.4 0-.1-.2-.1-.3-.1 0 0-.1.1-.1.2zM1413.1 41.8c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM1502.8 43.1c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM1418.8 46s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.2.3-.2.4-.2.6zM1417.8 44c.1.1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c0 .1 0 .1-.1.2zM1394.2 33.7h.2c0-.1.1-.3.1-.4v-.1c.1 0 .1 0 .2-.1v-.2s-.1 0-.1.1l-.1.1c0-.1.1-.2 0-.2 0-.1-.2-.1-.3-.1l-.1.2c0 .1.1.2.2.3l-.3.3c.2 0 .2.1.2.1zM1407.3 39.3c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0-.1 0-.2.1-.2zM1431 43.5s.1.1.2.1v-.2h-.2v.1zM1421.9 43.8s0 .1 0 0c0 .1 0 .1.1.1l-.1-.1c.1.1 0 0 0 0zM1410.4 43.8c.1.1.1.3.2.4h.2v-.1c-.1-.1-.3-.2-.4-.3zM1466.5 41.9h.1c.2-.2 0-.4-.1-.5-.1.2-.3.3 0 .5zM1466.5 41.4zM1417.5 40.3s0-.1 0 0c-.1 0-.1.1-.1.1s.1 0 .1.1v-.2zM1414.5 40.2c.1 0 .1 0 0 0 .1 0 .1 0 0 0zM1414.6 40.2c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1-.2-.1-.3-.1-.3 0zM1588.6 33.2zM1587.8 33.2zM1587.8 33.2c.3.2.5.1.8 0-.3-.2-.6-.1-.8 0zM1413.4 37.6v.7c.3-.3.1-.5 0-.7zM1585.9 31.3s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1 0 0-.1.1-.2.1zM1586.4 31.3zM1404 34.2s.1 0 .1.1c0-.1.1-.1.1-.2 0 0-.1-.1-.1 0 0-.1 0 0-.1.1zM1395.5 32.2l-.1.1s0 .1.1.1c-.1 0 0 0 0-.2 0 .1 0 0 0 0zM1617.5 39.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM1617.5 39.9c-.1.2-.2.4-.2.6.2-.2.4-.3.2-.6zM1619 37.5zM1619.2 37.7s0-.1 0 0c-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM1424.6 43.9v.4c.1-.1.1-.2.2-.4 0 .1-.1 0-.2 0zM1410.4 43.7c0 .1 0 .1 0 0 0 .1 0 0 0 0zM1410.3 43.4c0 .1-.1.1-.1.2s.1.1.1.2v-.2c.1-.1 0-.2 0-.2zM1508.7 39.2s.1 0 .1-.1c.1-.1.1-.1.1-.2-.1 0-.2 0-.2.1s.1.2 0 .2zM1496.7 39.7h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2 0-.1 0 0-.1 0zM1497 39.4zM1542.9 36.8c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM1543.2 36.6h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2 0 .1 0 0 .1 0zM1394.3 36.3zM1394 36.4c.1 0 .2 0 .2-.1l-.2.1c.1-.1.1 0 0 0zM1550.1 29.7l-.2-.2c0 .1.1.1.1.2h.1zM1412.4 34.2V34c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2.1 0 .1.1.1.1zM1612.9 48.7h0c-.1 0-.1 0 0 0zM1612.7 48.6zM1615.6 44.3v.1c-.1.1-.1 0 0-.1 0 .1 0 .1 0 0zM1601.8 43c0-.2 0-.3.1-.5-.1 0-.1-.1-.2-.1-.2.2-.1.4.1.6zM1553 43.3c0-.1 0-.1.1-.2l-.1.1v.1zM1456.4 42.9c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM1556.6 39.2h.1-.1zM1486.8 39.9v-.1.1zM1558.2 37.3v0zM1438.9 41.4s0-.1.1-.1c-.1 0-.1 0-.1.1zM1438.9 41.3s.1 0 0 0c.1 0 .1-.1 0 0 .1-.1.1-.1 0 0zM1577.2 36.2s.1 0 .1-.1c-.1 0-.1 0-.1.1zM1463.6 40.2c.1 0 .1-.1.2-.1 0 0-.1 0-.2.1.1-.1.1-.1 0 0zM1540.9 32.1zM1541 31.9c0 .1 0 .1-.1.2l.1-.1v-.1zM1394.7 29.3s.1 0 .1.1l-.1-.1c.1 0 .1 0 0 0zM1513.4 30.2s-.1 0-.1.1-.1.1-.1.2c.1 0 .1-.1.2-.1s.1-.1 0-.2zM1513.3 30.5c-.1 0-.1 0 0 0zM1556.9 29.1s0-.1-.1-.1l.1.1zM1500.3 29.9c-.1 0-.1-.1-.2-.1l-.1.1h.3zM1492.6 30.2c.1 0 .2-.1.3-.1-.1-.1-.1-.2-.2-.3h-.4v.1l.3.3zM1409.7 34.2v.1h.1v-.1h-.1zM1532.3 35.4c0-.1 0-.1.1-.2 0 .1 0 .1-.1.2 0 0 .1 0 0 0zM1489.8 29.5s0-.1.1-.1l-.1.1zM1442.6 39.4zM1485.2 31.3l.2.2c0-.1-.1-.1-.1-.2h-.1zM1530.4 34.4l-.1.1s0-.1.1-.1zM1507 37.7l-.2.2c.1 0 .1-.1.2-.1s0-.1 0-.1zM1511.6 33.5c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1c-.1-.1-.2-.1-.2-.2zM1447 26.8c-.1 0-.1 0 0 0-.1.1-.1.1 0 0 0 .1 0 0 0 0zM1315.7 36.1zM1246.7 32.3zM1259.4 35.9zM1232.1 34.3zM1406.5 29.9h-.1zM1299.6 37zM1405.1 27.9c-.1 0-.1 0 0 0zM1319.7 36.2c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c-.1 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3-.1.3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.5-.1-.8 0-1.1.3zM1393.2 36.4c-.3 0-.5-.1-.8 0-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5-.2-.3-.2-.4-.2-.5zM1236.7 30.1c.1 0 .1 0 0 0 .1 0 0 0 0 0zM1235.7 30.1v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 .1.1.1.2.1 0 .4 0 .8-.2 1.2 0-.1-.1-.1-.1-.2 0 .1.1.1.1.2-.3.1-.5.2-.8.3.2.5.2.5-.3 1.3.3.1.6.1.9.2.5-.2.5-.2.7.2.1.2 0 .4.4.3v-.8c-.1-.5 0-.9.2-1.4.2-.4.2-.8.3-1.2-.1-.2-.3-.4-.4-.6-.4.1-.6.3-.8.5zM1261.6 39.4c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.7-1 1zM1262.5 38.3zM1220.6 28.7zM1219.6 31.7c-.1.1-.1.2-.2.3.2.3.4.5.6.8.4-.1.6-.5.8-.9.3.1.5.5.9.1-.2-.3-.3-.6-.5-.8l.3-.3c.1-.9-.6-1.4-.8-2.1-.1.1-.2.3-.1.4.2 1-.3 1.7-1 2.5zm1.1.1c-.1-.1-.2-.1-.3-.2 0-.1.1-.1.1-.2.1.2.2.3.2.4zM1263.5 37.1zM1262.1 35.8zM1262.1 35.8c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.6-.7-1-1-1.4zM1299.6 38.2v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.9-.9-.2-1.6-.5zM1368.8 38.3c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.5-.5-1-.8-1.6-.7zM1374 39.6c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM1288.3 38.7c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.4-.1-.5-.3-.7-.3zM1359.1 34c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.1.6.2 1.1.3 1.6zM1291.6 38.7c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4 0-.2-.2-.4-.4-.4zM1218.6 28.1c-.5 0-1 0-1.5.2.1.7.6.3.9.5-.1.4-.1.8-.1 1.2 0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5 0-.5-.2-.8-.6-.9zM1373.8 36c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3c1.1.1 2.1 0 3.1 0zM1256.4 40.9c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.2-.1-.3-.3-.5-.6zM1244.1 34.6c-.1-.1-.2-.3-.2-.4-.2.3-.4.7-.9.7l-.9-.6c0 .4.1.8.4 1.1.4.3.5.8.5 1.4.1-.3.3-.5.4-.8.9.2.9.2 1.1-.7-.2-.2-.3-.5-.4-.7zM1242.9 36.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0z"/><path d="M1260 36.4c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM1252.9 39.7c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.4 0-.7-.3-.8zM1417.7 39.8c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1v-.1c.1.2.3.3.4.5.1-.4 0-.6-.4-.6 0-.2.1-.4.1-.5.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.1-.7-.4-1.3-1.1-1.6zM1223.4 27.1c-.3 0-.6.3-.6.8s.3.8.8.8c.4 0 .7-.3.7-.7 0-.5-.5-.9-.9-.9zM1277.5 39.2c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.1-.4 0-.6-.2zM1397.2 36.6c-.6-.1-1.2-.1-1.8-.2l-.1-.1c-.1.3-.2.6-.3.8.2 0 .4.2.4.1s.1-.1.1-.2c.1 0 .2.1.3.1.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.1-.9-.1-1.3-.2zM1280.4 39.6c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5.1-.6-.5-.8-.8-1.2zM1265.4 41c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.6-.3-.9zM1363 36.3c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4 0-.3-.2-.4-.4-.6zM1225.1 31h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8-.1.2-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.6 1.1.9 1.5zM1381.1 36.2c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.9-.4-4.2.1zM1255.8 36.2c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.4-1 .4-1-.7-2.1zM1294 39.6c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.3.1-.5.3-.4.5zM1294.4 39.2zM1376.9 34.1c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-.9-.4-1.4zM1261.7 42.8c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.5.6-.4 1.2-.4 1.7zM1406.6 31.5c-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.2 0 .5.1.7.2-.1.1-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.5 1 .9 1.4h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8.2-.4.5-.8.2-1.2zM1249.8 36.6c0 .6 0 1.2.1 1.9.5-.4.7-.6.8-.8.1-.6-.2-.9-.9-1.1zM1239.2 41.2v.8c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1 0-.9-.1-.8-.9-1.4zM1393.7 39.2c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.1-1.1.3-1.9.6zM1266.7 39.1c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5-.1-.2-.2-.4-.4-.5zm0 .9c.1 0 .1 0 0 0l.1.1s0-.1-.1-.1zM1281.6 39.6c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1l-1 1zM1228.6 33.6zM1228 33.8c.3.6.7 1.1.7 1.8.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1l-.3-.9h-.6c-.1.1-.1.2-.1.2zM1226.7 36.5c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.3-.7-.5-.6zM1242 34.2zM1241.9 32.4s-.1-.3-.1-.4c-.2 0-.3 0-.5.1-.1 0-.1.2-.1.2 0 .4 0 .9.1 1.3.1.3.4.4.7.6-.1-.6-.6-1.2-.1-1.8zM1228.2 37.6h-.2v1.1c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.9-.5-1.3zM1223.3 38.3c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4.1-.3-.2-.4-.6-.2zM1239.9 38.3c-.1-.4-.1-.6-.2-.9v-.9c-.5.3-.8.5-.7 1 .1.5.3.8.9.8zM1263.5 41.1c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.6 0-.7.2-.7.5zM1413.6 40.1c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6l.1-.1.1.1c0-.1 0-.2.1-.2.1-.1.3-.3.3-.4 0-.4-.3-.7-.6-.7zM1234.6 34.1c0-.3-.2-.4-.4-.5-.3-.3-.6-.6-.9-1-.4.3-.4.7-.3 1.1.1.4.3.5.7.5 0 .1 0 .2-.1.3-.1.3.1.6.4.7.2.1.4-.1.5-.5.1-.2.1-.4.1-.6zM1225 28.1c.7-.7.6-1-.3-1.9 0 .7-.2 1.3.3 1.9zM1388.5 31.9c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.1-.5-.3-.7-.4zM1363.4 32.3c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.2.2.3.7.6.6zM1363.7 30.9c-.1 0 0 0 0 0zM1301.4 40.8c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1.1-.1.4-.1.5zM1248.4 36.9c-.2.2-.3.4-.1.6.1.2.2.3.4.4 0 .1 0 .1.1.2v-.2c.2.1.3.1.5.2.2-.5 0-.8-.2-1.1-.3-.2-.5-.2-.7-.1zM1253.7 41.9c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.6-.4.9-1 .8zM1258.7 42.3c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .7.2 1.2.5 1.9zM1395.4 35.9c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4h-.3c.2-.8.2-1.6-.1-2.3-.3.5-.6.9-.8 1.4.4.4.6.7 1 .9h-.9s-.1 0-.1.1c-.7-.2-.8-.1-.9.4v.5c.3-.2.6-.4.9-.7-.4.2-.3.3-.2.3zM1224.4 36.3c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.2-.4-.3-.6-.5zM1224.4 36.3zM1392.7 31.6c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.5.2-.6.5-.6 1zM1397.4 30.2zM1397.5 32.7c.4-.9.3-1.3-.1-2.5-.3 1.9-.2 1.9.1 2.5zM1325 39.1c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.2-.3-.1zM1313.5 39.6c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5 0-.4-.2-.6-.5-.6zM1424.6 44.4c0-.1-.1-.1-.1-.1-.2-.1-.3-.2-.5-.2 0 .1.1.1.1.2-.2 0-.3.1-.2.2.1.1.2.1.3.1.4.7.7.8 1.4.8-.4-.3-.7-.7-1-1zM1222.1 35.8c-.1.5-.2 1-.4 1.6.3 0 .5.1.7 0 .1-.1.2-.3.2-.5-.1-.4-.2-.7-.5-1.1zM1358.5 31.1c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM1223.2 33.3c-.3-.3-.6-.4-.9-.4-.1 0-.2.1-.5.3.4.1.6.2.8.3.2.1.4.3.6.4.3-.2.2-.4 0-.6zM1423.7 45.3c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.6.2-1-.3-1.1zM1276.1 41.1c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 0 .2.1.4.1zM1367.7 34c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.2-.1-.4 0-.5.2zM1392 33c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM1313.6 38.1c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.2.1-.3zM1275.8 42.1c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.3.4-.4.6zM1273.2 35.8c-.1 0-.2.1-.2.2 0 .4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM1315.5 37.8c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3.1-.1-.1-.2-.2-.2zM1247.9 41.3c.6.2.9.2 1.3-.2-.5-.3-.8-.3-1.3.2zM1363.2 34c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.2-.3-.2-.6-.3-1zM1278.1 38.5c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.1.5-.3.6-.7zM1229.5 36.9l.3.6c.2-.1.5-.2.7-.3-.5-.8-.5-.8-1-.3zM1299.7 37.5c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2-.1.2-.1.4 0 .6zM1299.6 37zM1365.3 31.6v.1c.3.3.6.2 1-.1-.4-.3-.7-.3-1 0zM1259.1 39.5c.1.8.1.8.9.4-.3-.3-.5-.5-.9-.4zM1387 32.3c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2 0 .3-.2.3-.4zM1253.5 36.6c-.1.1-.3.3-.3.4 0 .2.2.5.3.9.1-.5.3-.7.3-1 0 0-.2-.1-.3-.3zM1359.4 30.5c.3-.6.1-1.2.1-1.8-.4.7-.4 1.1-.1 1.8zM1238 33c-.2-.2-.5-.3-.7-.5-.1 0-.1.1-.2.1.1.2.1.4.2.6.2.2.7.1.7-.2zM1298 40.3c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.3-.3-.3-.5-.1zM1268.3 41.5c.3-.4.2-.8 0-1.4-.4.6-.4.6 0 1.4zM1394.3 34c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.2-.1-.3-.1zM1219.2 37.7v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3 0-.6-.4-.8zM1377.8 34.8c.4.3.7.4 1.1.2-.3-.4-.6-.4-1.1-.2zM1374 34.7c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.2 0 .3-.1.6-.2zM1222.5 39.9c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM1252.7 37.4c0-.1-.1-.3-.2-.6-.2.2-.3.4-.4.5-.1.2 0 .4.2.4s.4-.2.4-.3zM1238 35.6c.3-.6.1-.9-.3-1.2 0 .4-.1.8.3 1.2zM1244.4 32.7c.1.3.1.6.2.9h.6c0-.6-.3-.8-.8-.9zM1244.6 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1419.7 41.4zM1419.7 40.5l-.2-.2c0-.1-.1-.2-.2-.2 0 0-.1.1-.2.1 0 .1.1.1.1.2l-.1.1c.1.3.3.6.5.9.2-.3.3-.6.1-.9zM1377.9 40.4c-.2 0-.4.1-.3.3 0 .1.2.2.4.3.1-.1.3-.2.3-.3-.1-.2-.3-.3-.4-.3zM1306.8 40.2c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.4-.3-.5-.4zM1251.1 42c0 .4.1.6.1 1 .5-.6.5-.7-.1-1zM1260.4 42.1c.2-.3 0-.5 0-.7l-.2-.1c-.1 0-.1.1-.1.2-.1.3 0 .6.3.6zM1305 38.3c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0-.1-.1 0-.2.1zM1244.6 42c-.1.2-.3.3-.4.5.1.1.2.2.3.2.2-.1.3-.3.4-.5 0 0 0-.2-.1-.2 0-.1-.2-.1-.2 0zM1235.7 42.2c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.1.1-.2.1zM1279.5 41.3c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM1376.4 39.4c-.1.4-.1.7.4 1 0-.4 0-.8-.4-1zM1420.5 39.7zM1223.5 37.5c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7 0 .1 0 .3.2.4zM1229.4 38c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM1229.8 37.5zM1385.5 32.5c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM1220.9 39.7c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM1391.3 34.2c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4h.1zM1422.2 44.4c.1.1.2.2.3.2.1-.1.1-.2.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2.2-.2.3zM1233.2 36.8zM1232.8 36.1s-.1.1 0 0c-.2.5.2.5.4.7 0-.3.1-.6-.4-.7zM1223.4 35.9c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM1224.4 36.3zM1223.8 36.3c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0zM1384.9 38c-.1.2-.1.3-.2.5.1.1.1.2.2.2s.2-.1.2-.1c0-.2 0-.4-.1-.5 0-.1-.1-.1-.1-.1zM1233.2 35.3c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 0 .2-.1.3-.1zM1230.4 35.1c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2-.1-.4-.2-.4zM1379.8 37.9c-.1 0-.2 0-.2.1-.1.1-.1.2-.2.3.1 0 .2.1.3.1.2 0 .3-.1.3-.4 0 0-.1-.1-.2-.1zM1283.9 41.9l.2.2c.1-.2.2-.4.3-.5-.1 0-.2-.1-.2-.1-.1.1-.2.2-.3.4zM1246.1 42.1s-.1 0 0 0c0 .2 0 .4.1.6h.2c-.1-.2-.1-.3-.2-.5 0-.1-.1-.1-.1-.1zM1242.9 42.3c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3 0 0-.2 0-.3.1zM1323.8 38.3c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7-.1-.2-.2-.2-.3-.3zM1272.4 39.8s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.2.2-.3.3zM1244.7 41c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3 0 0 .2-.2.1-.2zM1242.5 41.1c.1.1.3.1.5.1.1 0 .2-.1.3-.2-.1 0-.2-.1-.3-.1-.4-.1-.6.1-.5.2zM1243.3 41zM1225.1 40.1s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.2.2-.2.3-.2.5zM1236.3 38.8l.6.6c.1-.5 0-.7-.6-.6zM1364 33.4l.2-.1v-.4c-.1 0-.2.1-.4.1 0 .2.1.3.2.4zM1379 31.9c-.1 0-.2.2-.3.3.1.1.2.2.3.2.1 0 .2-.2.2-.3 0-.1-.1-.3-.2-.2zM1421.6 46.1l.2.2c.1 0 .2-.1.2-.2-.1-.1-.2-.1-.3-.2 0 .1 0 .1-.1.2zM1277.1 51.6c.1 0 .1.1.2.1v-.2l-.1-.1s0 .1-.1.2zM1435.4 41.4h-.4c-.1 0-.1.2-.1.3.1 0 .2.1.2 0 .1 0 .1-.1.3-.3zM1404.8 39.9c.2-.1.3-.4 0-.5l-.4.4c.2 0 .4.1.4.1zM1404.4 39.7zM1260.2 43h.3s.1-.1.1-.2c-.1 0-.2-.1-.3 0-.1 0-.1.1-.1.2zM1289.8 41.4c0 .1.1.3.1.3.1 0 .2-.1.3-.1-.1-.1-.1-.3-.1-.3-.1 0-.2.1-.3.1zM1274.1 41.3c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3 0-.1-.1-.2-.2-.2zM1248.1 42.7c.4-.3.4-.3.3-.7-.1.3-.2.4-.3.7zM1249.8 41.9c0 .1.1.2.2.3.1-.1.2-.1.2-.2-.1-.1-.1-.2-.2-.3 0 .1-.2.2-.2.2zM1321.9 39.2c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1.1-.1.2-.2.3zM1310.9 38.6v-.1zM1310.4 38.9c0 .1.1.1 0 0 .4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM1238.6 40.9s0 .2.1.2c.2 0 .4 0 .6.1-.1-.1-.3-.3-.5-.4 0 0-.1 0-.2.1zM1239.3 41.2zM1384.6 35.1c-.3 0-.5-.1-.8-.1.3.3.5.3.8.1zM1395.8 32.8s0 .1 0 0c0 .1.1.1 0 0zM1395.5 33.2l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1.1.1.1.2.2.3zM1231.8 38.5c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM1232.4 37.4c0 .2-.1.3-.1.4 0 .1.1.1.2.2 0-.1.1-.2.1-.4l-.2-.2zM1235.4 34.4c-.1.7.4.9 1 1.3v-.8c-.1-.4-.5-.5-.8-.7.1-.4.1-.8-.2-1.2-.2.5-.4 1 0 1.4zM1419.7 42c-.2 0-.5.1-.9.1.6.4.8.2.9-.1zM1407.1 40.4c0 .1.1.1.1.2.1 0 .1-.1.2-.1 0 0 0-.1-.1-.1 0-.1-.1-.1-.2 0zM1257.9 42.7c0 .1.1.1.1.2.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3-.1 0-.1.1-.1.2zM1321.5 39.8c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM1237.5 42.6s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.2.4-.2.5-.2.6zM1236.5 40.7c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c0 .1 0 .1-.1.2zM1279.7 38.2h.3c-.1-.1-.1-.2-.2-.3h-.2s-.1.1 0 .1c0 .1.1.2.1.2zM1294.9 37.2c-.1 0-.1 0-.2.1 0 .1.1.1.1.2l.2-.2-.1-.1zM1386.5 33.8s.1-.1.1-.2c-.1 0-.2-.1-.3-.1 0 0-.1.1-.1.2.1 0 .2.1.3.1zM1293.8 36.8c-.1 0-.2.1-.3.1l.2.2c.1 0 .2-.1.3-.2-.1 0-.2-.1-.2-.1zM1246.5 38.2c.1 0 .2.1.2.1s.1-.1.1-.2c-.1 0-.2-.1-.2-.1s-.1.1-.1.2zM1243.7 38.3c.1.1.1.2.1.2l.2-.2v-.2c-.1.1-.2.1-.3.2zM1234.5 38.7c0 .1.1.1.2.2.1-.1.1-.2.2-.3-.1 0-.1-.1-.2-.1-.1.1-.2.1-.2.2zM1247.3 36.9c0 .1.1.1.1.2.1 0 .2-.1.2-.1 0-.1-.1-.1-.1-.2-.1 0-.1.1-.2.1zM1238.1 36.8s-.1.1-.2.1c.1.1.1.2.2.3.1-.1.2-.2.1-.2 0-.1-.1-.2-.1-.2zM1226 35.9c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0 0 0-.1.1-.2 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM1253.8 41.2s-.1 0 0 0c-.1 0-.1 0-.1.1l.1-.1c0 .1 0 0 0 0zM1285.2 38.6h.1c.2-.2 0-.4-.1-.5-.1.2-.3.3 0 .5zM1285.2 38.1zM1257.1 39.5c0-.1-.1-.1-.1-.2-.1 0-.1.1-.1.1 0 .1.1.1.1.2 0 0 .1 0 .1-.1z"/><path d="M1407.1 32.8c-.1 0-.2 0-.2.1l.1.1c.1-.1.1-.1.1-.2zM1296 37.1c0 .1-.1.2-.1.3.1-.1.2-.1.3-.2-.1-.1-.1-.1-.2-.1zM1295.9 37.4zM1234.6 37.1h-.2v.1s.1.1.2.1v-.2zM1241.5 36.9c.1 0 .1 0 .1-.1 0 0-.1-.1-.1.1 0-.1 0-.1 0 0zM1236.1 37c0 .1 0 .1 0 0 .1 0 .1 0 .1-.1h-.1v.1zM1233.2 36.8zM1233.3 36.8c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1h-.3zM1407.2 29.9c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1-.1.1 0 0 0zM1406.4 29.9c.1 0 .1 0 0 0 .1 0 .1 0 0 0z"/><path d="M1406.5 29.9c.3.2.5.1.8 0-.3-.2-.6-.1-.8 0zM1240.4 35.7l.1.1c0-.1 0-.1-.1-.1 0-.1 0-.1 0 0zM1232.1 34.3v.7c.3-.4.1-.5 0-.7zM1404.6 28s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1s-.1 0-.2.1zM1405.1 27.9c-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM1237.6 34.2h-.2s0 .1.1.1.1.1.2.1c0-.1-.1-.2-.1-.2zM1237.7 34.4zM1220 32.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1219.9 33.3c.1-.1.2-.1.2-.2s0-.2-.1-.4c-.1.1-.1.2-.2.3 0 .1 0 .2.1.3zM1222.8 30.6c0 .1-.1.1-.1.2 0 0 .1 0 .1.1 0-.1.1-.1.1-.2l-.1-.1zM1418.6 42.9v.1l.1-.1c0-.1 0-.1-.1 0 .1-.1 0-.1 0 0zM1413.5 42.1v.1h.2v-.1h-.2zM1410.5 40.5c0-.1-.1-.1-.1-.2h-.1c0 .1.1.1.2.2-.1 0 0 0 0 0zM1256.5 42.9s.1.1.1 0v-.1h-.1v.1zM1437.7 34.2zM1437.9 34.4c0-.1 0-.1 0 0-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM1243.3 41c.1-.1.1-.2.2-.4-.1 0-.1 0-.2-.1v.5zM1258.2 39.6c-.1.1-.1.1 0 0 0 .1 0 .1.1.1-.1 0 0 0-.1-.1zM1315.4 36.4h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2-.1-.1-.1-.1-.1 0zM1315.7 36.1zM1251.9 38.4c.1.1.1.1.2 0v-.1c-.1 0-.2 0-.2.1zM1361.6 33.5c0 .1 0 .1 0 0zM1361.8 33.2h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2.1.1.1.1.1 0zM1230.7 33.5zM1230.4 33.2v.2c.1 0 .1 0 .2.1 0-.1-.1-.1-.1-.2l-.1-.1zM1221 32.9c0-.1-.1-.1 0 0-.1-.1-.1 0-.1 0h.1c-.1 0 0 0 0 0zM1368.8 26.4l-.2-.2c0 .1.1.1.1.2h.1zM1231.1 30.8v-.2c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2l.1.1zM1216.6 29.7v-.1.1zM1225 24.5zM1224.8 24.8h.2c0-.1 0-.2.1-.2l-.2.2c-.1-.1-.1 0-.1 0zM1419.7 41.4v.5c.3-.1.2-.3 0-.5zM1434.2 41v0c0 .1 0 0 0 0zM1420.4 39c-.2.2-.1.4.1.6 0-.2 0-.3.1-.5-.1 0-.2 0-.2-.1zM1371.7 39.9c0-.1 0-.1.1-.2l-.1.1v.1zM1275.1 39.6c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM1375.2 35.9h0zM1295.9 37.4zM1295.7 37.5l.1-.1-.1.1c.1-.1.1 0 0 0zM1305.5 36.6v-.1.1zM1376.9 34v0zM1257.6 38.1s0-.1.1-.1c-.1 0-.1 0-.1.1 0-.1 0 0 0 0zM1257.6 38s0-.1 0 0c0-.1.1-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0zM1395.8 32.8s.1 0 .1-.1c0 .1 0 .1-.1.1zM1282.3 36.8c.1 0 .1-.1.2-.1 0 0-.1 0-.2.1.1 0 0 0 0 0zM1242.9 36.8zM1242.8 37c0-.1 0-.1.1-.2l-.1.1v.1zM1255 36.4l.1-.1h-.1zM1243.8 34.1c0 .1 0 .1 0 0 .1.1.1 0 0 0zM1243.8 34l.1.1c-.1 0-.1 0-.1-.1zM1244.6 33.6l-.1.1.1-.1zM1231 33.5h-.2c0 .2.1.2.2 0zM1231 33.5zM1359.6 28.7c0 .1 0 .1 0 0 0 .1 0 .1 0 0zM1359.7 28.6c0 .1 0 .1-.1.2l.1-.1v-.1zM1332.1 26.9c-.1.1-.2.2-.2.3.1 0 .1-.1.2-.1.1-.1 0-.2 0-.2zM1332 27.2c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0 0zM1375.6 25.8l-.1-.1.1.1c0-.1 0-.1 0 0zM1228.4 30.9h-.1v.1h.1c.1-.1.1-.1 0-.1zM1351 32.1c0-.1 0-.1.1-.2 0 .1 0 .1-.1.2 0-.1 0 0 0 0zM1308.5 26.2s0-.1.1-.1c0 0-.1 0-.1.1 0-.1 0 0 0 0zM1261.1 35.9l.2.2c0-.1-.1-.1-.1-.2s-.1 0-.1 0zM1261.3 36c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM1303.9 28l.2.2c0-.1-.1-.1-.1-.2h-.1zM1349.1 31.1l-.1.1c0-.1 0-.1.1-.1zM1330.3 30.2c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1l-.2-.2zM1265.7 23.5c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM1900.1 39.4zM1843.9 39.2zM1816.5 37.6zM1884.1 40.3zM1904.1 39.5c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c0 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3-.1.3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.4 0-.8.1-1.1.3zM1846 42.7c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.8-1 1zM1846.9 41.7s0-.1 0 0c0-.1 0-.1 0 0zM1847.9 40.5zM1846.5 39.1s.1 0 0 0c.1 0 .1 0 0 0zM1846.5 39.1c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.3-.5-.6-1-1-1.4zM1884 41.5v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.8-.8-.2-1.6-.5zM1872.7 42.1c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.3-.2-.5-.3-.7-.3zM1876.1 42c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4-.1-.2-.3-.3-.4-.4zM1802.2 33.4c0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.2-.5 0-.9-.5-.9h-.2c0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.3 0-.6.1-.9.2.1.7.6.3.9.5-.1.4-.2.8-.2 1.2zM1840.9 44.3c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.3-.1-.4-.4-.5-.6z"/><path d="M1844.4 39.7c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM1837.3 43c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.3 0-.6-.3-.8zM1861.9 42.5c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.2-.4.1-.6-.2zM1864.9 42.9c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5 0-.6-.5-.8-.8-1.2zM1849.8 44.3c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.5-.3-.9zM1840.3 39.5c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.4-1 .4-1-.7-2.1zM1878.4 43c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.2.1-.4.2-.4.5zM1878.8 42.5zM1799.8 37.6c-.3.3-.5.6-.3.8.2.2.5.4.8.4.4 0 .6-.3.5-.8-.2-.1-.6-.2-1-.4zM1846.1 46.2c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.4.6-.4 1.1-.4 1.7zM1823.9 44.7c.1 0 .1 0 0 0 .1-.2 0-.3-.1-.4-.1 0-.2.1-.2.1-.1-.1-.2-.2-.4-.3l-.2.1s0 .2.1.2h.4c.1.1.1.1.1.2v.7c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1 0-.8 0-.8-.6-1.2zM1851.1 42.5c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5 0-.3-.1-.5-.4-.5zm.1.8c0 .1 0 .1 0 0l.1.1c-.1 0-.1 0-.1-.1zM1866 43c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1-.4.3-.6.6-1 1zM1811.2 39.8c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4-.1-.3-.3-.7-.5-.6zM1812.6 40.9h-.2V42c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.8-.5-1.3zM1807.8 41.7c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4 0-.3-.2-.5-.6-.2zM1847.9 44.4c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.5.1-.7.3-.7.5zM1800.4 35.5c-.1.2.1.5.3.6.3 0 .4-.2.4-.4.1-.4.1-.9-.1-1.3l-.1-.1-.1.1v.1c-.1.2-.3.6-.4 1zM1885.8 44.2c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1 0-.1.3-.1.5zM1838.1 45.3c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.5-.4.8-1 .8zM1843.1 45.6c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .8.3 1.2.5 1.9zM1808.8 39.6c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.1-.4-.3-.6-.5zM1808.8 39.6zM1909.4 42.4c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.1-.3-.1zM1897.9 42.9c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5s-.2-.6-.5-.6zM1860.5 44.4c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 .1.3.1.4.1zM1898 41.4c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.1.1-.3zM1860.3 45.4c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.2.3-.4.5-.4.6zM1857.6 39.1c-.1 0-.2.1-.2.2-.1.4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM1900 41.1c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.2-.2-.2-.2zM1797.5 36.3z"/><path d="M1862.6 41.9c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.2-.2.5-.4.6-.7zM1813.9 40.3l.3.6c.2-.1.5-.2.7-.3-.4-.9-.5-.9-1-.3zM1884.1 40.9c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2v.6zM1884.1 40.3zM1843.6 42.9c.1.8.1.8.9.4-.4-.4-.6-.6-.9-.4zM1838.2 40.3c0-.1-.2-.2-.3-.3-.1.1-.3.3-.3.4 0 .2.2.5.3.9.2-.5.3-.7.3-1zM1802.9 36.5c0-.1-.2-.2-.2-.3l-.5.5c.2.1.3.3.4.3.2-.1.4-.3.3-.5zM1882.4 43.6c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.2-.3-.3-.5-.1zM1852.7 44.8c.3-.4.2-.8 0-1.4-.4.7-.4.7 0 1.4zM1803.6 41v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3.1-.6-.4-.8zM1806.9 43.2c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM1797.6 38.9c.5-.6.3-1.2.4-1.7-.3.4-.5.9-.4 1.7zM1798 37.2s0-.1 0 0c0-.1 0-.1 0 0zM1891.2 43.5c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.3-.3-.5-.4zM1835.5 45.3c0 .4.1.6.1 1 .6-.5.5-.7-.1-1zM1844.6 44.6c-.1 0-.1.1-.1.2 0 .3.1.5.4.6.2-.3 0-.5 0-.7-.1 0-.3-.1-.3-.1zM1889.5 41.6c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2-.1 0-.2 0-.2.1zM1820.2 45.5c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.2.1-.2.1zM1863.9 44.6c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM1808 40.8c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7-.1.1-.1.4.2.4z"/><path d="M1813.8 41.3c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.2.1-.5.2-.3.5zM1814.2 40.9s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0 0 0 0zM1805.3 43c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM1817.7 40.1s0 .1 0 0zM1817.3 39.5c-.1 0-.1 0 0 0-.2.5.2.5.4.7-.1-.3 0-.7-.4-.7zM1807.8 39.2c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM1808.8 39.6zM1808.3 39.6s0 .1 0 0c0 .1 0 .1 0 0zM1854.4 45.8l.2.2c.1-.1.2-.3.3-.4l-.2-.2c-.1.1-.2.3-.3.4zM1817.6 38.6c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4.1.1.2 0 .3-.1zM1814.8 38.4c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2 0-.4-.2-.4zM1796.1 38.6c0 .1.1.2.2.4.1-.2.1-.3.1-.4 0-.1-.1-.1-.1-.2-.1 0-.2.1-.2.2zM1827.4 45.6c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3-.1 0-.2 0-.3.1zM1908.2 41.6c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7l-.3-.3zM1856.9 43.1s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1-.3.3zM1829.2 44.3c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3-.1 0 .1-.1.1-.2zM1827.7 44.3s0 .1 0 0c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM1809.5 43.4s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.2.3-.2.5zM1796.1 35.8c0 .1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.2-.1-.3c-.2 0-.3.1-.3.2zM1858.6 44.6c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM1906.3 42.6c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1 0-.1.2-.2.3zM1895.4 41.9zM1894.8 42.3s.1.1 0 0c.4.2.4 0 .5-.3v-.1h-.1c-.1.1-.4.1-.4.4zM1816.2 41.8c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2.1-.1-.1-.3-.1-.3zM1906 43.1c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.2-.1-.2-.2zM1821.9 46s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.1.3-.2.4-.2.6zM1821 44c.1.1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c0 .1-.1.1-.1.2zM1797.3 33.7h.2c0-.1.1-.3.1-.4v-.1c.1 0 .1 0 .2-.1v-.2s-.1 0-.1.1l-.1.1c0-.1.1-.2 0-.2 0-.1-.2-.1-.3-.1l-.1.2c0 .1.1.2.2.3l-.3.3c.2 0 .2.1.2.1zM1810.4 39.3c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0-.1.1-.2.1-.2zM1834.1 43.5s.1.1.2.1v-.2h-.2v.1zM1825 43.8s0 .1 0 0c0 .1 0 .1.1.1l-.1-.1c.1.1 0 0 0 0zM1813.5 43.8c.1.1.1.3.2.4h.2v-.1c-.1-.1-.2-.2-.4-.3zM1869.6 41.9h.1c.2-.2 0-.4-.1-.5-.1.2-.2.3 0 .5zM1869.6 41.4c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0zM1820.7 40.3c-.1 0-.1-.1 0 0-.1 0-.1.1-.1.1s.1 0 .1.1c-.1-.1-.1-.2 0-.2zM1817.7 40.2zM1817.7 40.2c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1-.2-.1-.2-.1-.3 0zM1816.5 37.6v.7c.3-.3.1-.5 0-.7zM1807.1 34.2s.1 0 .1.1c0-.1.1-.1.1-.2 0 0-.1-.1-.1 0 0-.1 0 0-.1.1zM1798.6 32.2l-.1.1s0 .1.1.1v-.2c.1.1 0 0 0 0zM1827.8 43.9v.4c.1-.1.1-.2.2-.4-.1.1-.2 0-.2 0zM1868.8 41.3s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1v.1c-.1.1 0 .2.1.2zM1813.5 43.7c0 .1 0 .1 0 0 0 .1 0 0 0 0zM1813.4 43.4c0 .1-.1.1-.1.2s.1.1.1.2v-.2c.1-.1 0-.2 0-.2zM1911.9 39.2s.1 0 .1-.1c.1-.1.1-.1.1-.2-.1 0-.2 0-.2.1v.2zM1899.9 39.7h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2-.1-.1-.1 0-.1 0zM1900.1 39.4zM1797.5 36.3c-.1 0-.1 0 0 0-.1 0-.1 0 0 0zM1797.2 36.4c.1 0 .2 0 .2-.1 0 0-.1 0-.2.1 0-.1 0 0 0 0zM1815.6 34.2V34c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2 0 0 0 .1.1.1zM1859.5 42.9c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM1889.9 39.9v-.1.1zM1842 41.4s0-.1.1-.1c-.1 0-.1 0-.1.1zM1842.1 41.3s0-.1 0 0c0-.1 0-.1 0 0zM1866.8 40.2c.1 0 .1-.1.2-.1-.1 0-.2 0-.2.1 0-.1 0-.1 0 0zM1797.8 29.3s.1 0 .1.1c.1 0 0 0-.1-.1.1 0 .1 0 0 0zM1916.6 30.2s-.1 0-.1.1-.1.1-.1.2c.1 0 .1-.1.2-.1v-.2zM1916.4 30.5zM1903.4 29.9c-.1 0-.1-.1-.2-.1l-.1.1h.3zM1895.7 30.2c.1 0 .2-.1.3-.1-.1-.1-.1-.2-.2-.3h-.4v.1l.3.3zM1812.8 34.2v.1h.1v-.1h-.1zM1893 29.5s0-.1.1-.1c-.1 0-.1 0-.1.1zM1845.7 39.4c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0zM1888.3 31.3l.2.2c0-.1-.1-.1-.1-.2h-.1zM1910.2 37.7l-.2.2c.1 0 .1-.1.2-.1v-.1zM1914.7 33.5c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1l-.2-.2zM1850.1 26.8c0 .1 0 .1 0 0 0 .1 0 0 0 0zM1718.8 36.1zM1649.8 32.3s.1 0 0 0c.1 0 .1 0 0 0zM1662.6 35.9zM1635.2 34.3zM1809.6 29.9zM1702.8 37zM1808.2 27.9zM1722.8 36.2c.1 0 .1.1.2.1v.2s-.1 0-.1-.1c0 0-.1-.1-.1-.2-.3.1-.5.1-.8.2.1.4.2.7.3 1-.7.4-1.4 0-2 .3-.1.3 0 .6-.2.9-.2.3-.5.5-.7.8.2.3.3.6.5.9.1.2.3.3.5.3.3 0 .6-.3.7-.6 0-.1 0-.3.1-.4.2-1.1.6-1.4 1.7-1.4.2 0 .4.1.5.1.5 0 .8-.3.9-.8.1-.4.1-.8.2-1.2-.2-.1-.4-.3-.6-.4-.4-.1-.8 0-1.1.3zM1796.3 36.4c-.3 0-.5-.1-.8 0-1 .1-2 .1-2.9-.1-.7-.2-1.5-.3-2.3-.1-.2 0-.4 0-.4-.3.2-.1.5-.1.6-.2.4-.5.9-.4 1.3-.4.3 0 .5.1.8.1.3 0 .7.1 1.1-.3-.7-.2-1.2-.1-1.8-.1-.6 0-1.2-.1-1.7-.2-.6-.1-1.1-.1-1.7-.2-.3.3-.2.6 0 .9l.6.6c.2.5.6.6 1.1.7 1.2.1 2.3.3 3.5.2.7-.1 1.4.1 2.1.4.2-.2.4-.3.7-.5-.2-.3-.2-.4-.2-.5zM1639.9 30.1zM1638.8 30.1v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 .1.1.1.2.1 0 .4 0 .8-.2 1.2 0-.1-.1-.1-.1-.2 0 .1.1.1.1.2-.3.1-.5.2-.8.3.2.5.2.5-.3 1.3.3.1.6.1.9.2.5-.2.5-.2.7.2.1.2 0 .4.4.3v-.8c-.1-.5 0-.9.2-1.4.2-.4.2-.8.3-1.2-.1-.2-.3-.4-.4-.6-.4.1-.6.3-.8.5zM1664.7 39.4c-.2-.1-.3-.2-.5-.3-.2-.1-.5-.1-.5.1-.1.2 0 .5.1.6.1.2.4.2.6.4-.1.2-.2.3-.3.5-.1.4 0 .6.4.7.4-.3.3-1 .8-1.1.2.1.3.2.5.4.4-.5.4-1.2.3-1.8 0-.2-.3-.3-.4-.5-.2.4-.5.7-1 1zM1665.6 38.3zM1623.7 28.7s.1 0 0 0c.1 0 .1 0 0 0zM1622.7 31.7c-.1.1-.1.2-.2.3.2.3.4.5.6.8.4-.1.6-.5.8-.9.3.1.5.5.9.1-.2-.3-.3-.6-.5-.8l.3-.3c.1-.9-.6-1.4-.8-2.1-.1.1-.2.3-.1.4.2 1-.3 1.7-1 2.5zm1.2.1c-.1-.1-.2-.1-.3-.2 0-.1.1-.1.1-.2.1.2.1.3.2.4zM1666.6 37.1zM1665.2 35.8zM1665.2 35.8c-.3.1-.5.2-.8.3-.2.3-.3.6-.5.9l.6.9c.3.4.5.6 1 .5 0-.2-.1-.3-.1-.5.3 0 .5-.1.7-.1.3 0 .4-.3.5-.5-.2 0-.4 0-.4-.1-.4-.6-.7-1-1-1.4zM1702.7 38.2v-.6c-.3 0-.6 0-.9.1-.1 0-.1.1-.2.1 0 .2 0 .4.1.5l-.9.6c-1-.5-2-.4-3-.3-.3 0-.4.3-.3.6.4 0 .8 0 .9.6.1.3.3.3.6.1.1-.1.2-.3.4-.3.2-.1.5 0 .8 0 .3 0 .5-.1.8-.1 0-.2-.1-.3-.1-.5.2 0 .3.1.5.1.3 0 .7-.1 1 0 .4.1.6.4 1 .6.3-.4.6-.7.9-1-.4-.9-.8-.2-1.6-.5zM1771.9 38.3c-.3.7 0 1.1.1 1.6.5.3.8.5 1.3.8.1-.4.3-.7.4-1.1 0-.2-.1-.5-.2-.6-.4-.5-1-.8-1.6-.7zM1777.1 39.6c-.6-.1-1.3-.2-1.9-.3-.1 0-.2.3-.3.4.3.4.5.8.8 1.2.5-.2.8-.5 1.2-.7.1.3.2.4.3.7.2-.2.4-.2.4-.4.1-.1 0-.4-.1-.5 0-.1-.2-.3-.4-.4zM1691.4 38.7c-.2 0-.4.1-.6.2-.5.2-.9.2-1.2-.3-.1-.1-.2-.1-.4-.2 0 .2-.2.4-.1.5.2.4.4.8.7 1.2.4-.1.7-.2 1.1-.3.3.1.5.7 1 .3-.1-.2-.2-.5-.3-.7.1-.1.3-.2.5-.4-.3-.1-.5-.3-.7-.3zM1762.2 34c.1.4.5.5.8.2.5-.5.6-1.1.5-1.8-.3-.1-.7-.2-1-.2-.2.1-.4.2-.6.2.2.6.2 1.1.3 1.6zM1694.8 38.7c-.1-.1-.3 0-.4 0-.8.1-1.5-.2-2-.9h-.3c-.1.3.1.5.3.7.3.2.4.4.6.8.1.3.2.5.4.7.6-.2 1.1-.3 1.5-.5.1-.1.3-.3.3-.4-.1-.2-.3-.4-.4-.4zM1621.7 28.1c-.5 0-1 0-1.5.2.1.7.6.3.9.5-.1.4-.1.8-.1 1.2 0 .2.1.5.4.5.2-.3.1-.8.6-1 .1-.1.2-.3.3-.5.1-.5-.1-.8-.6-.9zM1777 36c.1 0 .4.1.3-.3-1.3-.1-2.7-.2-4.1-.3-.1-.2-.1-.4-.3-.9-.1.5-.2.7-.2.8 0 .2.2.4.3.4l.9.3c1 .1 2 0 3.1 0zM1659.6 40.9c-.2-.3-.3-.6-.1-.9l-.1-.3c-.1 0-.3.1-.3.1l-.6 2.7.2.2c.1-.3.3-.5.5-.9l1.2.6c.1-.1.1-.2.2-.3-.2-.2-.4-.4-.5-.6-.3-.1-.4-.3-.5-.6zM1647.2 34.6c-.1-.1-.2-.3-.2-.4-.2.3-.4.7-.9.7l-.9-.6c0 .4.1.8.4 1.1.4.3.5.8.5 1.4.1-.3.3-.5.4-.8.9.2.9.2 1.1-.7-.2-.2-.3-.5-.4-.7zM1646 36.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1647 34.2s0-.1 0 0zM1663.1 36.4c-.1-.2-.4-.3-.6-.5-.2.2-.3.6-.6.7-.6.3-.9.8-1.2 1.4.2-.1.5-.2.7-.3 1.1-.5 1.1-.5 2.3-.1.1-.2.1-.4.2-.6-.3-.1-.6-.3-.8-.6zM1656 39.7c-.2-.1-.6.1-.5.3.1.6 0 1.1-.1 1.6 0 .3.1.6.2 1.2.6-1.2.7-1.7.7-2.3.1-.4 0-.7-.3-.8z"/><path d="M1820.8 39.8c-.1.9-.4 1.7 0 2.5 0 0 .1.1.2.1v-.1c.1.2.3.3.4.5.1-.4 0-.6-.4-.6 0-.2.1-.4.1-.5.2 0 .3.1.5 0 .1-.1.4-.2.3-.3-.1-.7-.3-1.3-1.1-1.6zM1626.5 27.1c-.3 0-.6.3-.6.8s.3.8.8.8c.4 0 .7-.3.7-.7 0-.5-.5-.9-.9-.9zM1680.6 39.2c-.2 0-.4 0-.5.1-.1.1-.2.3-.2.5 0 .3.3.5.5.5.6.1 1.1-.1 1.7-.8-.4 0-.7-.1-.9-.1-.2.1-.4 0-.6-.2zM1800.3 36.6c-.6-.1-1.2-.1-1.8-.2l-.1-.1c-.1.3-.2.6-.3.8.2 0 .4.2.4.1s.1-.1.1-.2c.1 0 .2.1.3.1.9 0 1.8.1 2.7.1.1 0 .2-.1.4-.2-.2-.1-.3-.2-.4-.2-.5-.1-.9-.1-1.3-.2zM1683.5 39.6c-.4.9-.4.9.2 1.6.1.3-.3.7-.1 1.1.5-.4.7-1 .7-1.5.1-.6-.4-.8-.8-1.2zM1668.5 41c0-.3-.1-.5-.4-.4-.1.1-.3.4-.3.6 0 .3.1.6.3.8.3.3.4.7.5 1.3.2-.2.4-.2.4-.3.2-.4.1-.7-.2-1.1-.1-.3-.3-.6-.3-.9zM1766.1 36.3c-.2-.2-.5-.2-.7 0-.2.2-.4.5-.7.9.6.1.9.1 1.2.1.3 0 .5-.2.6-.4.1-.3-.2-.4-.4-.6zM1628.2 31h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8-.1.2-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.6 1.1.9 1.5zM1784.2 36.2c1.1.1 2.2.3 3.3.4.3 0 .5-.1.8-.2 0 0 .1-.2.1-.3-1.5.2-2.9-.4-4.2.1zM1658.9 36.2c-.1.4-.2.7-.3 1 .4.4.7.8 1 1.1.5-1 .5-1-.7-2.1zM1697.1 39.6c.1.6.4 1.1.7 1.6.5 0 .6-.3.6-.8-.3-.5-.8-.7-.9-1.3-.2.1-.4.3-.4.5zM1697.5 39.2zM1780 34.1c-.2.5-.3 1-.5 1.6-.3.1-.7.1-1 .2 1 .6 1.9.2 3.2.1-.7-.2-1-.3-1.3-.5-.2-.5-.3-.9-.4-1.4zM1664.8 42.8c0 .1.1.2.1.2.3.1.7.2.9-.1-.2-.6-.4-1.1-.6-1.8-.4.6-.4 1.2-.4 1.7zM1809.7 31.5c-.5.3-1 .5-1.5.7-.1.1-.1.3-.3.5.4-.1.6-.1.9-.1.2 0 .5.1.7.2-.1.1-.2.3-.3.4-.2-.1-.3-.2-.6-.3 0 .8.5 1 .9 1.4h.3c.1-.2.3-.5.4-.8-.2-.3-.4-.5-.7-.8.3-.4.5-.8.2-1.2zM1652.9 36.6c0 .6 0 1.2.1 1.9.5-.4.7-.6.8-.8.1-.6-.1-.9-.9-1.1zM1642.4 41.2v.8c-.2.3-.6.2-.6.7.5 0 1 0 1.5-.1-.1-.9-.2-.8-.9-1.4zM1796.8 39.2c1 .1 1.6.6 2.3.3.1 0 .1-.1.2-.2-.2-.2-.3-.4-.6-.7-.6.1-1.1.3-1.9.6zM1669.8 39.1c-.1 0-.3.1-.4.1 0 .6 0 1 .1 1.5v.3c.1.2.2.3.4.2 0-.3 0-.7.1-1.1.1-.2.2-.3.2-.5-.1-.2-.2-.4-.4-.5zm.1.9l.1.1c-.1 0-.1-.1-.1-.1zM1684.7 39.6c.4.7.4.7.7.5.2-.1.4-.3.7-.5-.1-.3-.3-.6-.4-1l-1 1zM1631.7 33.6zM1631.1 33.8c.3.6.7 1.1.7 1.8.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1l-.3-.9h-.6c-.1.1-.1.2-.1.2zM1629.8 36.5c-.1 0-.3.2-.3.4-.1.3-.1.7-.1 1 0 .2.2.3.5.6.2-.6.3-1 .4-1.4 0-.3-.2-.7-.5-.6zM1645.1 34.2zM1645 32.4s-.1-.3-.1-.4c-.2 0-.3 0-.5.1-.1 0-.1.2-.1.2 0 .4 0 .9.1 1.3.1.3.4.4.7.6-.1-.6-.6-1.2-.1-1.8zM1631.3 37.6h-.2v1.1c0 .4-.2.7-.2 1 .7 0 1-.2.9-.8-.2-.4-.4-.9-.5-1.3zM1626.5 38.3c.1 1.1.1 1.1.4 1.6.2-.5.3-.9.2-1.4 0-.3-.3-.4-.6-.2zM1643 38.3c-.1-.4-.1-.6-.2-.9v-.9c-.5.3-.8.5-.7 1 .1.5.3.8.9.8zM1666.6 41.1c.1.6.3 1.2.5 1.7 0 .1.1.1.3.1.1-.8-.1-1.5-.1-2.3-.5 0-.7.2-.7.5zM1816.7 40.1c-.1 0-.3 0-.4.1-.2.1-.3.4-.2.6.1.2.4.3.6.6l.1-.1.1.1c0-.1 0-.2.1-.2.1-.1.3-.3.3-.4.1-.4-.3-.7-.6-.7zM1637.7 34.1c0-.3-.2-.4-.4-.5-.3-.3-.6-.6-.9-1-.4.3-.4.7-.3 1.1.1.4.3.5.7.5 0 .1 0 .2-.1.3-.1.3.1.6.4.7.2.1.4-.1.5-.5.1-.2.1-.4.1-.6zM1628.1 28.1c.7-.7.6-1-.3-1.9.1.7-.2 1.3.3 1.9zM1791.6 31.9c-.2-.1-.5-.1-.6 0-.1.1-.2.4-.3.8.7-.1 1.2.1 1.6-.4-.3-.1-.5-.3-.7-.4zM1766.6 32.3c.2-.1.4-.3.6-.5.2-.4-.1-.6-.3-.8-.3.2-.6.5-.9.7.1.2.2.7.6.6zM1766.8 30.9zM1704.5 40.8c0 .1.2.2.3.2.6 0 .9-.4 1.2-1.1-.5.2-1 .2-1.4.4-.1.1-.1.4-.1.5zM1651.5 36.9c-.2.2-.3.4-.1.6.1.2.2.3.4.4 0 .1 0 .1.1.2v-.2c.2.1.3.1.5.2.2-.5 0-.8-.2-1.1-.3-.2-.5-.2-.7-.1zM1656.8 41.9c.1.3.2.4.2.5.3.5.5.5.8.1.2-.4.3-.8 0-1.4-.2.6-.4.9-1 .8zM1661.8 42.3c.2-.4.4-.7.6-1.1-.4-.3-.7-.5-1.1-.8 0 .7.3 1.2.5 1.9zM1798.5 35.9c.4.1.9.1 1.3-.2 0 0 0-.2.1-.4h-.3c.2-.8.2-1.6-.1-2.3-.3.5-.6.9-.8 1.4.4.4.6.7 1 .9h-.9s-.1 0-.1.1c-.7-.2-.8-.1-.9.4v.5c.3-.2.6-.4.9-.7-.4.2-.3.3-.2.3zM1627.5 36.3c.2.6.4 1.3.7 1.9.1.2.2.4.6.2-.2-.5-.4-1.1-.7-1.6-.1-.2-.4-.3-.6-.5zM1627.5 36.3zM1795.8 31.6c0 .1.1.2.2.4s.4.1.4 0c.2-.4.2-.8 0-1.4-.5.2-.6.5-.6 1zM1800.5 30.2zM1800.6 32.7c.4-.9.3-1.3-.1-2.5-.2 1.9-.2 1.9.1 2.5zM1728.1 39.1c-.1 0-.1.2-.2.3 0 .3 0 .5.1.7.1.1.3.2.4.2.3 0 .4-.2.4-.4-.1-.3-.2-.5-.4-.7 0-.1-.2-.2-.3-.1zM1716.6 39.6c-.2 0-.5.3-.5.7.1.1.3.3.5.4.3.1.5-.2.5-.5 0-.4-.2-.6-.5-.6zM1827.7 44.4c0-.1-.1-.1-.1-.1-.2-.1-.3-.2-.5-.2 0 .1.1.1.1.2-.2 0-.3.1-.2.2.1.1.2.1.3.1.4.7.7.8 1.4.8-.4-.3-.6-.7-1-1zM1625.2 35.8c-.1.5-.2 1-.4 1.6.3 0 .5.1.7 0 .1-.1.2-.3.2-.5-.1-.4-.1-.7-.5-1.1zM1761.6 31.1c0 .6.6.8.9 1.1.3-1.1.2-1.2-.9-1.1zM1626.4 33.3c-.3-.3-.6-.4-.9-.4-.1 0-.2.1-.5.3.4.1.6.2.8.3.2.1.4.3.6.4.2-.2.1-.4 0-.6zM1826.8 45.3c-.7-.1-.1.6-.4.7-.1 0-.1.1-.2.4h.9c.1-.6.2-1-.3-1.1zM1679.2 41.1c.2-.1.3-.3.3-.5-.1-.4-.3-.5-.9-.4.1.3.1.5.2.8 0 0 .2.1.4.1zM1770.8 34c-.1.2-.1.5-.2.9.4-.2.6-.2.8-.4.2-.2.2-.6-.1-.7-.1-.1-.4 0-.5.2zM1795.1 33c.1-.1.2-.1.2-.2 0-.3-.1-.6-.1-.8 0-.1-.2-.2-.3-.2-.1 0-.2.2-.2.3-.1.3 0 .6.2.8 0 .1.1.1.2.1zM1716.7 38.1c0-.1-.1-.2-.2-.3-.1-.1-.3-.1-.5-.2-.3-.1-.5.1-.5.2 0 .2.2.3.3.4.2.1.4.1.8.2 0 0 .1-.2.1-.3zM1678.9 42.1c0 .2.1.4.4.4.3 0 .4-.2.4-.4s-.2-.3-.4-.6c-.1.3-.3.4-.4.6zM1676.3 35.8c-.1 0-.2.1-.2.2 0 .4 0 .7.4 1.1.3-.5.2-.9 0-1.3h-.2zM1718.7 37.8c-.5 0-.7.2-.7.5v.1c.1.2.4.2.8-.1.1-.1.2-.2.1-.3 0-.1-.2-.2-.2-.2zM1651 41.3c.6.2.9.2 1.3-.2-.4-.3-.8-.3-1.3.2zM1766.3 34c-.5.4-.4.7-.3 1 0 .2.2.4.4.3.1 0 .2-.2.2-.3-.1-.3-.2-.6-.3-1zM1681.2 38.5c0-.2 0-.4-.1-.5 0-.1-.1-.1-.2-.1s-.2.1-.2.1c-.2.4-.2.8-.1 1.2.3-.1.6-.3.6-.7zM1632.6 36.9l.3.6c.2-.1.5-.2.7-.3-.4-.8-.5-.8-1-.3zM1702.8 37.5c.4-.1.7-.2 1.1-.3l.1-.2c0-.1-.2-.3-.2-.3-.3.1-.7.2-1 .2v.6zM1702.8 37zM1768.4 31.6v.1c.3.3.6.2 1-.1-.4-.3-.7-.3-1 0zM1662.2 39.5c.1.8.1.8.9.4-.3-.3-.5-.5-.9-.4zM1790.1 32.3c0-.2-.3-.4-.5-.2-.1.1-.2.2-.5.4.3.1.5.2.7.2.2 0 .3-.2.3-.4zM1656.6 36.6c-.1.1-.3.3-.3.4 0 .2.2.5.3.9.1-.5.3-.7.3-1 0 0-.2-.1-.3-.3zM1762.6 30.5c.3-.6.1-1.2.1-1.8-.4.7-.5 1.1-.1 1.8zM1641.1 33c-.2-.2-.5-.3-.7-.5-.1 0-.1.1-.2.1.1.2.1.4.2.6.2.2.7.1.7-.2zM1701.1 40.3c0 .3.1.6.1 1.1.6-.2.5-.6.4-1-.1-.3-.3-.3-.5-.1zM1671.4 41.5c.3-.4.2-.8 0-1.4-.4.6-.4.6 0 1.4zM1797.5 34c-.1 0-.1.2-.1.2.1.3.1.6.5.6.2-.3.1-.5-.1-.7-.1-.1-.3-.1-.3-.1zM1622.3 37.7v.8c0 .1.1.1.2.1s.2-.1.2-.1c0-.3.1-.6-.4-.8zM1781 34.8c.4.3.7.4 1.1.2-.4-.4-.7-.4-1.1-.2zM1777.2 34.7c-.3-.2-.4-.3-.6-.3-.1 0-.3.1-.3.1-.1.2.1.4.3.4.1 0 .2-.1.6-.2zM1625.6 39.9c-.2-.5-.4-.8-.7-1.4.1.9.1.9.7 1.4zM1655.8 37.4c0-.1-.1-.3-.2-.6-.2.2-.3.4-.4.5-.1.2 0 .4.2.4s.4-.2.4-.3zM1641.1 35.6c.3-.6.1-.9-.3-1.2 0 .4-.1.8.3 1.2zM1647.6 32.7c.1.3.1.6.2.9h.6c-.1-.6-.4-.8-.8-.9zM1647.8 33.6c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1822.9 41.4c-.1 0-.1 0 0 0-.1 0 0 0 0 0zM1822.8 40.5l-.2-.2c0-.1-.1-.2-.2-.2 0 0-.1.1-.2.1 0 .1.1.1.1.2l-.1.1c.1.3.3.6.5.9.2-.3.3-.6.1-.9zM1781 40.4c-.2 0-.4.1-.3.3 0 .1.2.2.4.3.1-.1.3-.2.3-.3 0-.2-.2-.3-.4-.3zM1709.9 40.2c-.1.2-.2.3-.2.4.1.1.2.3.4.3s.4-.2.3-.3c-.2-.2-.3-.3-.5-.4zM1654.2 42c0 .4.1.6.1 1 .5-.6.5-.7-.1-1zM1663.5 42.1c.2-.3 0-.5 0-.7l-.2-.1c-.1 0-.1.1-.1.2-.1.3 0 .6.3.6zM1708.1 38.3c-.1.1.1.3.3.3.1 0 .2-.1.4-.2-.3-.1-.4-.2-.5-.2 0-.1-.1 0-.2.1zM1647.7 42c-.1.2-.3.3-.4.5.1.1.2.2.3.2.2-.1.3-.3.4-.5 0 0 0-.2-.1-.2 0-.1-.2-.1-.2 0zM1638.9 42.2c-.2.2-.2.5 0 .6h.1s.1 0 .1-.1.1-.3.1-.4c0-.1-.1-.1-.1-.2-.1.1-.2.1-.2.1zM1682.6 41.3c-.1.2-.2.4-.2.6 0 .1.2.2.2.2.2 0 .3-.2.2-.4.1-.1 0-.2-.2-.4zM1779.5 39.4c-.1.4-.1.7.4 1 0-.4 0-.8-.4-1zM1823.6 39.7zM1626.7 37.5c.3-.3.3-.7.3-1.1-.2.2-.4.5-.5.7-.1.1-.1.3.2.4zM1632.5 38c.1.1.3.2.4.2 0-.2.1-.3.1-.5 0-.1-.1-.2-.1-.2h-.1c-.3.1-.5.2-.3.5zM1632.9 37.5zM1788.6 32.5c-.2-.3-.3-.5-.6-1 0 1.1 0 1.1.6 1zM1624 39.7c-.1 0-.2.1-.3.3.1.2.3.3.4.4.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.4zM1794.4 34.2c0-.1.1-.2.1-.2l-.4-.4-.2.2.4.4h.1zM1825.3 44.4c.1.1.2.2.3.2.1-.1.1-.2.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2.2-.2.3zM1636.3 36.8c.1 0 .1 0 0 0zM1635.9 36.1s-.1.1 0 0c-.2.5.2.5.4.7 0-.3.1-.6-.4-.7zM1626.5 35.9c.2.2.4.3.5.4h.5c-.2-.4-.5-.6-1-.4zM1627.5 36.3zM1627 36.3zM1788 38c-.1.2-.1.3-.2.5.1.1.1.2.2.2s.2-.1.2-.1c0-.2 0-.4-.1-.5 0-.1-.1-.1-.1-.1zM1636.3 35.3c-.1-.1-.1-.3-.2-.4 0 0-.1 0-.3.1.1.2.1.3.2.4 0 0 .2-.1.3-.1zM1633.5 35.1c-.1 0-.1.1-.2.2.1.1.1.2.2.3l.2-.1c.1-.2 0-.4-.2-.4zM1783 37.9c-.1 0-.2 0-.2.1-.1.1-.1.2-.2.3.1 0 .2.1.3.1.2 0 .3-.1.3-.4-.1 0-.2-.1-.2-.1zM1687 41.9l.2.2c.1-.2.2-.4.3-.5-.1 0-.2-.1-.2-.1-.1.1-.2.2-.3.4zM1649.2 42.1s-.1 0 0 0c0 .2 0 .4.1.6h.2c-.1-.2-.1-.3-.2-.5 0-.1 0-.1-.1-.1zM1646 42.3c.1.1.1.2.2.3 0 0 .1 0 .2-.1 0-.1-.1-.2-.1-.3 0 0-.1 0-.3.1zM1726.9 38.3c0 .1-.1.2-.1.3 0 .1.1.2.3.7.1-.4.1-.6.1-.7-.1-.2-.2-.2-.3-.3zM1675.5 39.8s0 .2-.1.2c.1 0 .3.1.3 0 .1-.1.2-.3.2-.4l-.1-.1c0 .1-.1.2-.3.3zM1647.9 41c-.1-.2-.2-.3-.2-.4-.1.1-.2.1-.3.3.2.1.3.2.4.3-.1 0 .1-.2.1-.2zM1645.6 41.1c.1.1.3.1.5.1.1 0 .2-.1.3-.2-.1 0-.2-.1-.3-.1-.3-.1-.6.1-.5.2zM1646.4 41zM1628.2 40.1s.1.1.3.1c0-.2.1-.3.1-.5 0 0-.1-.1-.2-.1-.1.2-.2.3-.2.5zM1639.5 38.8l.6.6c0-.5-.1-.7-.6-.6zM1767.1 33.4l.2-.1v-.4c-.1 0-.2.1-.4.1.1.2.1.3.2.4zM1782.1 31.9c-.1 0-.2.2-.3.3.1.1.2.2.3.2.1 0 .2-.2.2-.3.1-.1-.1-.3-.2-.2zM1824.7 46.1l.2.2c.1 0 .2-.1.2-.2-.1-.1-.2-.1-.3-.2 0 .1 0 .1-.1.2zM1680.3 51.6c.1 0 .1.1.2.1v-.2l-.1-.1c-.1 0-.1.1-.1.2zM1838.5 41.4h-.4c-.1 0-.1.2-.1.3.1 0 .2.1.2 0 .1 0 .1-.1.3-.3zM1807.9 39.9c.2-.1.3-.4 0-.5l-.4.4c.2 0 .4.1.4.1zM1807.5 39.7zM1663.3 43h.3s.1-.1.1-.2c-.1 0-.2-.1-.3 0 0 0-.1.1-.1.2zM1692.9 41.4c0 .1.1.3.1.3.1 0 .2-.1.3-.1-.1-.1-.1-.3-.1-.3-.1 0-.2.1-.3.1zM1677.3 41.3c0 .1-.1.2-.1.2 0 .1.1.2.2.3.1-.1.1-.2.1-.3l-.2-.2zM1651.2 42.7c.4-.3.4-.3.3-.7-.1.3-.2.4-.3.7zM1652.9 41.9c0 .1.1.2.2.3.1-.1.2-.1.2-.2-.1-.1-.1-.2-.2-.3 0 .1-.2.2-.2.2zM1725 39.2c.1 0 .1.1.3.1 0-.1.1-.2.1-.3l-.2-.1c-.1.1-.1.2-.2.3zM1714.1 38.6v-.1zM1713.5 38.9c0 .1.1.1 0 0 .4.2.4 0 .5-.3v-.1h-.1c-.2.1-.4.1-.4.4zM1641.7 40.9s0 .2.1.2c.2 0 .4 0 .6.1-.1-.1-.3-.3-.5-.4 0 0-.1 0-.2.1zM1642.4 41.2zM1787.7 35.1c-.3 0-.5-.1-.8-.1.3.3.5.3.8.1zM1799 32.8s0 .1 0 0c0 .1 0 .1 0 0zM1798.6 33.2l.3-.3c-.1 0-.2-.1-.3-.1-.1 0-.1.1-.2.1.1.1.2.2.2.3zM1634.9 38.5c-.1 0-.2.1-.3.2.1.1.1.2.2.3.1-.1.2-.1.2-.2s-.1-.3-.1-.3zM1635.5 37.4c0 .2-.1.3-.1.4 0 .1.1.1.2.2 0-.1.1-.2.1-.4l-.2-.2zM1638.5 34.4c-.1.7.4.9 1 1.3v-.8c-.1-.4-.5-.5-.8-.7.1-.4.1-.8-.2-1.2-.1.5-.4 1 0 1.4zM1822.9 42c-.2 0-.5.1-.9.1.5.4.7.2.9-.1zM1810.3 40.4c0 .1.1.1.1.2.1 0 .1-.1.2-.1 0 0 0-.1-.1-.1-.1-.1-.2-.1-.2 0zM1661 42.7c0 .1.1.1.1.2.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0 0-.1.1-.1.2zM1724.6 39.8c-.1.1-.1.2-.1.3 0 .1.2.1.2.2 0-.1.1-.2.1-.3 0-.1-.1-.1-.2-.2zM1640.6 42.6s.1.1.2.1l.1-.1c0-.1-.1-.2-.1-.6-.1.4-.2.5-.2.6zM1639.7 40.7c0 .1.1.1.1.2 0-.1.1-.1.1-.2s-.1-.1-.1-.2c-.1.1-.1.1-.1.2zM1682.8 38.2h.3c-.1-.1-.1-.2-.2-.3h-.2s-.1.1 0 .1c0 .1.1.2.1.2zM1698 37.2c-.1 0-.1 0-.2.1 0 .1.1.1.1.2l.2-.2-.1-.1zM1789.6 33.8s.1-.1.1-.2c-.1 0-.2-.1-.3-.1 0 0-.1.1-.1.2.1 0 .2.1.3.1zM1696.9 36.8c-.1 0-.2.1-.3.1l.2.2c.1 0 .2-.1.3-.2-.1 0-.2-.1-.2-.1zM1649.6 38.2c.1 0 .2.1.2.1s.1-.1.1-.2c-.1 0-.2-.1-.2-.1s0 .1-.1.2zM1646.8 38.3c.1.1.1.2.1.2l.2-.2v-.2c-.1.1-.2.1-.3.2zM1637.6 38.7c0 .1.1.1.2.2.1-.1.1-.2.2-.3-.1 0-.1-.1-.2-.1-.1.1-.2.1-.2.2zM1650.4 36.9c0 .1.1.1.1.2.1 0 .2-.1.2-.1 0-.1-.1-.1-.1-.2-.1 0-.1.1-.2.1zM1641.2 36.8s-.1.1-.2.1c.1.1.1.2.2.3.1-.1.2-.2.1-.2 0-.1 0-.2-.1-.2zM1629.1 35.9c-.1 0-.1-.1-.2-.1h-.2s-.1.2 0 .2.2.1.3.1c0 0 0-.1.1-.2 0 .1 0 .1 0 0 0 .1 0 .1 0 0zM1656.9 41.2c-.1 0-.1 0-.1.1 0 0 .1 0 .1-.1 0 .1 0 0 0 0zM1688.3 38.6h.1c.2-.2 0-.4-.1-.5-.1.2-.3.3 0 .5zM1688.3 38.1zM1660.2 39.5c0-.1-.1-.1-.1-.2-.1 0-.1.1-.1.1 0 .1.1.1.1.2 0 0 .1 0 .1-.1z"/><path d="M1810.2 32.8c-.1 0-.2 0-.2.1l.1.1c.1-.1.1-.1.1-.2zM1699.2 37.1c0 .1-.1.2-.1.3.1-.1.2-.1.3-.2-.1-.1-.2-.1-.2-.1zM1699 37.4zM1637.7 37.1h-.2v.1s.1.1.2.1v-.2zM1644.6 36.9s.1 0 0 0c.1 0 .1 0 .1-.1 0 0 0-.1-.1.1 0-.1 0-.1 0 0zM1639.2 37c0 .1.1.1 0 0 .1 0 .1 0 .1-.1h-.1v.1zM1636.4 36.8zM1636.4 36.8c.1.1.1.2.2.2s.2.1.2.1l.1-.2c0-.1-.1-.1-.2-.1h-.3zM1810.4 29.9c0-.1 0 0 0 0zM1809.6 29.9zM1809.6 29.9c.3.2.5.1.8 0-.3-.2-.6-.1-.8 0zM1643.5 35.7l.1.1c0-.1 0-.1-.1-.1 0-.1 0-.1 0 0zM1635.2 34.3v.7c.3-.4.1-.5 0-.7zM1807.7 28s0 .2.1.2h.2c.1 0 .1-.1.1-.2-.1 0-.1-.1-.2-.1 0 0-.1 0-.2.1zM1808.2 27.9zM1640.7 34.2h-.2s0 .1.1.1.1.1.2.1c0-.1 0-.2-.1-.2zM1640.8 34.4zM1623.1 32.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1623 33.3c.1-.1.2-.1.2-.2s0-.2-.1-.4c-.1.1-.1.2-.2.3 0 .1.1.2.1.3zM1625.9 30.6c0 .1-.1.1-.1.2 0 0 .1 0 .1.1 0-.1.1-.1.1-.2 0 0 0-.1-.1-.1zM1821.7 42.9v.1l.1-.1c.1-.1 0-.1-.1 0 .1-.1 0-.1 0 0zM1816.6 42.1v.1h.2v-.1h-.2zM1813.6 40.5c0-.1-.1-.1-.1-.2h-.1c0 .1.1.1.2.2-.1 0 0 0 0 0zM1659.6 42.9s.1.1.1 0v-.1h-.1v.1zM1840.8 34.2zM1841.1 34.4c-.1-.1-.1-.1 0 0-.1-.1-.2-.1-.3-.2 0 .1 0 .1.1.2h.2zM1646.4 41c.1-.1.1-.2.2-.4-.1 0-.1 0-.2-.1v.5zM1661.3 39.6c0 .1 0 .1 0 0 0 .1 0 .1.1.1-.1 0 0 0-.1-.1.1 0 0 0 0 0zM1718.5 36.4h.2c0-.1 0-.2.1-.2-.1 0-.1.1-.2.2 0-.1 0-.1-.1 0zM1718.8 36.1zM1655 38.4c.1.1.1.1.2 0v-.1c-.1 0-.2 0-.2.1zM1764.7 33.5c0 .1 0 .1 0 0zM1765 33.2h-.2c0 .1 0 .1-.1.2.1 0 .1-.1.2-.2 0 .1 0 .1.1 0zM1633.8 33.5zM1633.5 33.2v.2c.1 0 .1 0 .2.1 0-.1-.1-.1-.1-.2l-.1-.1zM1624.1 32.9c0-.1 0-.1 0 0-.1-.1-.1 0-.1 0h.1zM1771.9 26.4l-.2-.2c0 .1.1.1.1.2h.1zM1634.2 30.8v-.2c-.1 0-.1 0-.2-.1 0 .1.1.1.1.2l.1.1zM1619.8 29.7l-.1-.1v.1zM1628.1 24.5zM1627.9 24.8h.2c0-.1 0-.2.1-.2l-.2.2c-.1-.1-.1 0-.1 0zM1822.9 41.4v.5c.2-.1.1-.3 0-.5zM1837.4 41v.1c-.1 0-.1 0 0-.1 0 .1 0 0 0 0zM1823.5 39c-.2.2-.1.4.1.6 0-.2 0-.3.1-.5-.1 0-.2 0-.2-.1zM1774.8 39.9c0-.1 0-.1.1-.2l-.1.1v.1zM1678.2 39.6c0-.1-.1-.3-.2-.6-.2.3-.3.5-.5.6-.2.1-.4.2-.5.4-.1.1-.1.2-.1.3.7.2 1-.2 1.3-.7l.3.6-.3-.6zM1778.4 35.9h.1-.1zM1699 37.4zM1698.9 37.5l.1-.1s-.1 0-.1.1c0-.1 0 0 0 0zM1708.6 36.6v-.1.1zM1780.1 34v.1c-.1 0-.1-.1 0-.1zM1660.7 38.1s0-.1.1-.1c-.1 0-.1 0-.1.1 0-.1 0 0 0 0zM1660.7 38s.1-.1 0 0c.1-.1.1-.1 0 0 .1-.1.1-.1 0 0 0-.1 0 0 0 0zM1799 32.8s.1 0 .1-.1l-.1.1zM1685.4 36.8c.1 0 .1-.1.2-.1 0 0-.1 0-.2.1.1 0 .1 0 0 0zM1646 36.8zM1645.9 37c0-.1 0-.1.1-.2l-.1.1v.1zM1658.2 36.4v-.1h-.1zM1647 34.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0zM1646.9 34l.1.1s-.1 0-.1-.1zM1647.8 33.6l-.1.1c0-.1 0-.1.1-.1zM1634.1 33.5h-.2c0 .2.1.2.2 0zM1634.1 33.5zM1762.7 28.7c0 .1 0 .1 0 0 0 .1 0 .1 0 0zM1762.8 28.6c0 .1 0 .1-.1.2l.1-.1v-.1zM1735.3 26.9c-.1 0-.1 0 0 0-.1.1-.2.2-.2.3.1 0 .1-.1.2-.1v-.2zM1735.1 27.2c-.1 0 0 0 0 0zM1778.7 25.8l-.1-.1s.1 0 .1.1c0-.1 0-.1 0 0zM1631.6 30.9h-.1v.1h.1v-.1zM1754.2 32.1c0-.1 0-.1.1-.2-.1.1-.1.1-.1.2-.1-.1 0 0 0 0zM1711.6 26.2s0-.1.1-.1l-.1.1c0-.1 0 0 0 0zM1664.2 35.9l.2.2c0-.1-.1-.1-.1-.2s0 0-.1 0zM1664.4 36c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0zM1707 28l.2.2c0-.1-.1-.1-.1-.2h-.1zM1752.2 31.1l-.1.1c0-.1 0-.1.1-.1zM1733.4 30.2c-.1 0-.2-.1-.2 0 0 0-.1.2 0 .2 0 .1.1.1.2.1s.2-.1.2-.1c-.1-.1-.1-.2-.2-.2zM1668.8 23.5c-.1 0-.1 0 0 0z"/><path d="M1921.2 1.1H1.2v12.1c0 .6.1 1.2.3 1.8.3 1.2.5 2.5.7 3.8.1.5.1 1.1 0 1.6-.1.6.3 1 .4 1.5 0 .9 0 1.8.1 2.7 0 .1.1.2.1.2.4 0 .8.1.7.7-.4.1-.7.3-1.2.4.3.2.5.4.7.5.2 0 .5-.1.7-.2.3.4 0 .9.4 1.2.1-.1.2-.1.2-.2 0-.8.2-1.5.3-2.2.1-.4.3-.6.5-.6.6 0 1.3-.4 1.8.3 0 0 .3-.1.5-.2.1.4.2.7.2 1 0 .4-.3.9.2 1.2.1.1.1.4 0 .5-.1.5-.2.9-.3 1.4 1-.2 1.2-.1 1.3.9 0 .3-.1.6.2.7.4-.2.4-.2.7-1-.7-1.1-1-2.5-1.1-4 .6-.4 1.1-.8 1.7-1.2.4.1.8.1 1.2.2.1 0 .2.2.2.3h.3c.2.6.6.4 1 .2 0 .4.1.8-.1 1.2-.1.4.1.9.1 1.4 0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.4.6.1 1.2.2 1.8.1.8-.1 1.4-.8 1.8l-.3.3.3.9c-.4.1-.8.2-1.1-.2.4-.6.2-1.2-.2-1.8-.3 0-.5.2-.5.5-.1.7 0 1.4.3 2.1.2.4.6.7 1.1.6.2 0 .4-.1.6-.2.3.7.1 1.4 0 2 .6 0 1.3.1 1.9-.3-.1-.3-.2-.6-.3-1-.2.1-.6.2-.6.4v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2.1-.2l-.3-1.2c.3-.6.3-1.2-.2-1.8.2-.4.3-.8.5-1.4.2.3.3.5.5.8.3.1.4-.1.5-.3.1-.3.4-.4.7-.5-.1.4-.1.9 0 1.3.1.5 0 1-.4 1.2-.9.4-.8 1.1-.7 1.8.6-.2.4-1 1-1.3.6.2 1.2.4 1.4 1.2.2.1.3.1.5.2-.2.3-.3.6-.4.9-.1.2-.1.5.2.6.3-.3.5-.6.8-.9.2-.6-.3-.9-.4-1.3.1-.4.2-.6.3-.9-.2-.2-.4-.4-.6-.4-.3 0-.7.2-1 .3 0-.7-.1-1.3-.1-1.9.2.2.4.4.6.5.4-.5 1.1 0 1.7-.4-.3-.4-.6-.7-.8-1v-.3c.4-.3.4-.3.9-.3.2.6.5 1.2.7 1.8-.1.1-.2.2-.2.3l-.3.3c-.1.2-.1.4-.1.5 0 .2.2.3.3.4.6-.4.7-1.2 1.4-1.5.1 0 .2-.2.2-.3 0-.4.1-.7.1-1.4-.5 1-1 .5-1.5.5-.1-.4.2-.4.4-.5.2-.1.3-.2.4-.3.1-.2.2-.4.3-.7.4.3.7.6 1.1.9.4-.2.7-.4 1.1-.5.1.5.3 1 .4 1.5 0 .2-.1.3-.2.5.6 0 1 .4 1.4.8.4.3.8.6 1.3.6.1.7-.6.5-.9.9.4.7.6 1.3.4 2.1-.1.3-.1.6.2.8.1.1.3.2.4.2.3-.1.3-.3.3-.6-.1-.3-.2-.5-.4-.7.2-.3.6-.7.7-1 0-1.1.5-2.2.1-3.4.6.6 1.2.8 2 .8.6 0 1.2.1 1.6.6.3-.1.6-.2.9-.2 0 .2.1.4.1.5.6.2.7.9 1.1 1.3.2-.2.5-.3.7-.4-.1-.4-.3-.8-.4-1.2 0-.2.1-.5.2-.6.1-.1.4 0 .6.1.5.2.2.8.5 1.2.5-.1.5-.6.7-.9.2-.4.6-.4.8 0 .2.3.3.8.7.9 0 .3-.1.6-.1 1-.2 0-.4.1-.6.1.1.2.1.4.2.7-.5.3-1.2-.1-1.5.5-.1.4-.2.2-.4 0h.3v-.5c.2-.8.4-.9 1.2-.7 0-.4-.1-.7-.1-1.2-.3.2-.5.3-.7.4-.3.1-.6.2-.9.2-.2 0-.5-.1-.7-.1.4.5.6 1 .6 1.7-.4 0-.8 0-1.1.4-.1.2-.3.3-.4.1v-.8c-.4.3-.8.5-1 .8-.2.2-.2.5-.4.7.2.3.4.5.6.8.2.2.3.5.5.7.1.2.3.4.6.1v-.7c0-.2.1-.5.1-.7 1.1.5 1.3.5 2.2.4.8-.1 1.5-.3 2.3-.3 1 0 1.9-.2 2.9-.2.6 0 1.3 0 2-.3.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .5.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1l.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1V35c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3.4.7.4.8.5.8 0 0 .1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.2.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6.1 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1v-1.2c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2 0 0 .1 0 .1.1s-.1.2-.1.3c0 .1.1.2.1.2-.2.1-.4.2-.7.4h.8c.2.4.4.7.9.9.1-.1.2-.3.2-.4 0-.1-.1-.3-.1-.4.2.1.5.1.7.2 0-.3.1-.6.1-.9.4.2.4.2.4.7.3 0 .6.1 1 .1 0 .2 0 .4.2.5.1-.1.2-.1.2-.2v-.3c.6 0 1.2.1 1.7.2 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1 .4-1.4 1.1-1.5-.1.3-.1.7-.2 1l-.1-.1v.4c-.1.1-.1.2-.1.3.3 1.1-.2 1.9-.9 2.6-.1.1-.1.2-.2.3.1.1.2.3.3.4-.1.1-.2.1-.3.2 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.4-.1.9-.2 1.3-.4-.1.3-.1.5-.2.8.3 0 .5.1.7 0 .1-.1.2-.3.2-.5s-.1-.3-.1-.5h.6c-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.5c0 .1.1.3.2.4.2.4.6.7 1.1.6.2 0 .4-.1.6-.2v.1c-.2 0-.4.1-.6.2v.4c.1.2.5.4.8.3 0 .4-.1.7-.1 1 .6 0 1.3.1 1.9-.3-.1-.2-.1-.4-.2-.6.2-.1.5-.3.7-.5.2.3.3.7.3 1.1.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1-.1-.3-.2-.5-.3-.8.2.1.3.3.4.6l.3.6c.9-.1 1.6-.3 2.2-1-.1.3-.3.5-.3.7-.1.2-.1.5.2.6h.1c.2-.2.6-.2.7-.8h-.1l.1-.1v-.3c.2 0 .5.1.7.1.1.3.1.6.2.8.1.3.4.5.7.3.1 0 .1-.1.2-.2l.1.1c.2.1.4-.1.5-.5 0-.2.1-.4.1-.6v-.1c.3 0 .6.2.8.6 0 0 0 .1.1.1 0 .1.1.3.2.4l.1.1c0 .1.1.1.1.2 0-.1 0-.1.1-.2.1.1.3.2.5.3V38c-.1-.2-.2-.4-.4-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.2-.2.3-.2.5-.3v0c.3-.1.7 0 1 .2.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5 0 .1-.1.2-.2.3v-.1h-.1v.1c-.1.1-.1.1-.2.1-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.1 0-.2 0-.3.1-.1-.2-.1-.4-.1-.6v-.2c.1 0 .1-.1.1-.2 0-.2-.1-.3-.2-.4v-.1c-.1-.1-.3-.1-.4-.2 0 .1.1.2.1.4-.3.2-.4.4-.4.8.1.3.2.6.5.7-.2.2-.3.4-.4.7v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.2.4-.4.9-.5 1.4h-.1c-.1.2-.3.3-.4.5.1.1.2.2.3.2.1 0 .1-.1.2-.2 0 .4.4.8.8.7.3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.1 0 .1.1.2.1-.1.1-.1.3-.3.5.3-.2.4-.3.4-.5.2.1.5.2.6.3.3-.2.6-.3.8-.5 0 .1.1.1.1.2.1-.1.2-.1.2-.2l-.1-.1c.2-.7-.3-1.2-.8-1.9h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.1-.2-.2-.2-.3 0-.1.1-.1.1-.2s-.1-.3-.2-.6c-.1.1-.1.2-.2.2 0-.1.1-.3.2-.3.9-.1 1.4-.9 2.2-1.1v-.1c.3 0 .6-.1.9-.2.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .5.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1 0 .1.1.2.1.2h.3c-.1-.1-.1-.2-.2-.3h-.2c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3l.2.2s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.3.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6 0 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1V33c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2.1 0 .2.2.4.4-.4.2-.6.3-1 .6h1.4c.4 0 .7.2 1.1.3 0-.3.1-.6.1-.9.4.2.4.2.4.7 1 .1 2.1.2 3.1.3 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1.2.5-1.6 1.6-1.5.4 0 .7.1 1.1 0 .4-.2.8-.2 1.3-.1.2.1.4 0 .4-.4-1-.3-1.2-1.1-1.2-2.1 0-.5.2-.9.7-1 0 .3.1.5.1.7.2 0 .3 0 .4.2.2.7.3 1.4 1 1.7.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.4-.2.8-.2 1.1.1.4.3.4.7.3 1.1l.9.3.4-.4c.3.4.5.8.8 1.2.2.3.6.3.9.2-.1.4-.1.8-.2 1.2-.7.1-1.2.2-1.8.3-.6.1-1.1 0-1.7.2.4.7.4.7-.1 1.8-1.4.4-2.9.2-4.3.1-.7.7-.7.7-1.5.7-.4 0-.9-.1-1.3.4 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.5-.1 1-.2 1.5-.4.4-.2.7-.2 1-.1-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.6c1 .4 1.9.3 2.9.2h.7c.6 0 1 .2 1.2.9l.3.6c.9-.1 1.6-.3 2.2-1 .5.1 1 .2 1.4.3.1.3.1.6.2.8.1.3.4.5.7.3.2-.1.3-.3.4-.5.1-.2 0-.4 0-.7.6-.1 1 0 1.3.6l.3.6c0 .1.1.1.1.2 0-.1.1-.1.1-.2.2-.1.3-.2.2-.4-.1-.1-.3-.2-.1-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.5-.5 1-.5 1.6-.1.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5-.1.2-.2.4-.4.5-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.7 0-.8.5-1 1v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.3.5-.5 1.1-.6 1.7-.1.5.3 1.1.8 1 .3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.3.1.7.3 1 .4.4-.2.7-.4 1-.6.3-.8-.3-1.3-.8-2h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.2-.3-.3-.4-.5-.1-.2-.1-.6.1-.6.9-.1 1.4-.9 2.2-1.1 0-.7 0-1.2-.2-1.8-.2-.3 0-.5.3-.6.1-.3.2-.6.1-.8-.3-.7.1-1.4 0-2.1.4-.1.7-.2 1-.2.2.3.3.5.4.7.1-.5.4-1.1.3-1.6V35c.3-.1.5-.3.4-.8-.1 0-.2-.1-.2-.1.2-.4.5-.7.9-1l.2-.2c-.1-.1-.3-.2-.4-.3-.2-.2-.2-.5-.2-.7v-.1-.3c0-.1 0-.1.1-.2.2-.4.2-.8-.2-1.2-.1.2-.2.4-.4.6-.4-.2-.3-.5-.2-.8.1-.5.3-1 .5-1.4-.3-.3-.7-.5-.9-.8-.3-.4-.9-.7-.1-1.2.1-.1 0-.4.1-.5 0-.1.1-.1.1-.2l.3.3v1.1c0 .2 0 .4.3.3.1-.7.1-1 .1-1.4.2 0 .4-.1.6-.2.3.4 0 .9.4 1.2.1-.1.2-.1.2-.2 0-.8.2-1.5.3-2.2.1-.4.3-.6.5-.6.6 0 1.3-.4 1.8.3 0 0 .3-.1.5-.2.1.4.2.7.2 1 0 .4-.3.9.2 1.2.1.1.1.4 0 .5-.1.5-.2.9-.3 1.4 1-.2 1.2-.1 1.3.9 0 .3-.1.6.2.7.5-.3.5-.3.8-1.1-.7-1.1-1-2.5-1.1-4 .6-.4 1.1-.8 1.7-1.2.4.1.8.1 1.2.2.1 0 .2.2.2.3h.3c.2.6.6.4 1 .2 0 .4.1.8-.1 1.2-.1.4.1.9.1 1.4 0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.4.6.1 1.2.2 1.8.1.8-.1 1.4-.8 1.8l-.3.3.3.9c-.4.1-.8.2-1.1-.2.4-.6.2-1.2-.2-1.8-.3 0-.5.2-.5.5-.1.7 0 1.4.3 2.1.2.4.6.7 1.1.6.2 0 .4-.1.6-.2.3.7.1 1.4 0 2 .6 0 1.3.1 1.9-.3-.1-.3-.2-.6-.3-1-.2.1-.6.2-.6.4v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2.1-.2l-.3-1.2c.3-.6.3-1.2-.2-1.8.2-.4.3-.8.5-1.4.2.3.3.5.5.8.3.1.4-.1.5-.3.1-.3.4-.4.7-.5-.1.4-.1.9 0 1.3.1.5 0 1-.4 1.2-.9.4-.8 1.1-.7 1.8.6-.2.4-1 1-1.3.6.2 1.2.4 1.4 1.2.2.1.3.1.5.2-.2.3-.3.6-.4.9-.1.2-.1.5.2.6.3-.3.5-.6.8-.9.2-.6-.3-.9-.4-1.3.1-.4.2-.6.3-.9-.2-.2-.4-.4-.6-.4-.3 0-.7.2-1 .3 0-.7-.1-1.3-.1-1.9.2.2.4.4.6.5.4-.5 1.1 0 1.7-.4-.3-.4-.6-.7-.8-1v-.3c.4-.3.4-.3.9-.3.2.6.5 1.2.7 1.8-.1.1-.2.2-.2.3l-.3.3c-.1.2-.1.4-.1.5 0 .2.2.3.3.4.6-.4.7-1.2 1.4-1.5.1 0 .2-.2.2-.3 0-.4.1-.7.1-1.4-.5 1-1 .5-1.5.5-.1-.4.2-.4.4-.5.2-.1.3-.2.4-.3.1-.2.2-.4.3-.7.4.3.7.6 1.1.9.4-.2.7-.4 1.1-.5.1.5.3 1 .4 1.5 0 .2-.1.3-.2.5.6 0 1 .4 1.4.8.4.3.8.6 1.3.6.1.7-.6.5-.9.9.4.7.6 1.3.4 2.1-.1.3-.1.6.2.8.1.1.3.2.4.2.3-.1.3-.3.3-.6-.1-.3-.2-.5-.4-.7.2-.3.6-.7.7-1 0-1.1.5-2.2.1-3.4.6.6 1.2.8 2 .8.6 0 1.2.1 1.6.6.3-.1.6-.2.9-.2 0 .2.1.4.1.5.6.2.7.9 1.1 1.3.2-.2.5-.3.7-.4-.1-.4-.3-.8-.4-1.2 0-.2.1-.5.2-.6.1-.1.4 0 .6.1.5.2.2.8.5 1.2.5-.1.5-.6.7-.9.2-.4.6-.4.8 0 .2.3.3.8.7.9 0 .3-.1.6-.1 1-.2 0-.4.1-.6.1.1.2.1.4.2.7-.5.3-1.2-.1-1.5.5-.1.4-.2.2-.4 0h.3v-.5c.2-.8.4-.9 1.2-.7 0-.4-.1-.7-.1-1.2-.3.2-.5.3-.7.4-.3.1-.6.2-.9.2-.2 0-.5-.1-.7-.1.4.5.6 1 .6 1.7-.4 0-.8 0-1.1.4-.1.2-.3.3-.4.1v-.8c-.4.3-.8.5-1 .8-.2.2-.2.5-.4.7.2.3.4.5.6.8.2.2.3.5.5.7.1.2.3.4.6.1v-.7c0-.2.1-.5.1-.7 1.1.5 1.3.5 2.2.4.8-.1 1.5-.3 2.3-.3 1 0 1.9-.2 2.9-.2.6 0 1.3 0 2-.3.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .5.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1l.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3l.2.2s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.2.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6.1 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1v-1.2c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2 0 0 .1 0 .1.1s-.1.2-.1.3c0 .1.1.2.1.2-.2.1-.4.2-.7.4h.8c.2.4.4.7.9.9.1-.1.2-.3.2-.4 0-.1-.1-.3-.1-.4.2.1.5.1.7.2 0-.3.1-.6.1-.9.4.2.4.2.4.7.3 0 .6.1 1 .1 0 .2 0 .4.2.5.1-.1.2-.1.2-.2v-.3c.6 0 1.2.1 1.7.2 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1 .4-1.4 1.1-1.5-.1.3-.1.7-.2 1l-.1-.1v.4c-.1.1-.1.2-.1.3.3 1.1-.2 1.9-.9 2.6-.1.1-.1.2-.2.3.1.1.2.3.3.4-.1.1-.2.1-.3.2 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.4-.1.9-.2 1.3-.4-.1.3-.1.5-.2.8.3 0 .5.1.7 0 .1-.1.2-.3.2-.5s-.1-.3-.1-.5h.6c-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.5c0 .1.1.3.2.4.2.4.6.7 1.1.6.2 0 .4-.1.6-.2v.1c-.2 0-.4.1-.6.2v.4c.1.2.5.4.8.3 0 .4-.1.7-.1 1 .6 0 1.3.1 1.9-.3-.1-.2-.1-.4-.2-.6.2-.1.5-.3.7-.5.2.3.3.7.3 1.1.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1-.1-.3-.2-.5-.3-.8.2.1.3.3.4.6l.3.6c.9-.1 1.6-.3 2.2-1-.1.3-.3.5-.3.7-.1.2-.1.5.2.6h.1c.2-.2.6-.2.7-.8h-.1l.1-.1v-.3c.2 0 .5.1.7.1.1.3.1.6.2.8.1.3.4.5.7.3.1 0 .1-.1.2-.2l.1.1c.2.1.4-.1.5-.5 0-.2.1-.4.1-.6v-.1c.3 0 .6.2.8.6 0 0 0 .1.1.1 0 .1.1.3.2.4l.1.1c0 .1.1.1.1.2 0-.1 0-.1.1-.2.1.1.3.2.5.3V37c-.1-.2-.2-.4-.4-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.2-.2.3-.2.5-.3v0c.3-.1.7 0 1 .2.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5 0 .1-.1.2-.2.3v-.1h-.1v.1c-.1.1-.1.1-.2.1-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.1 0-.2 0-.3.1-.1-.2-.1-.4-.1-.6v-.2c.1 0 .1-.1.1-.2 0-.2-.1-.3-.2-.4v-.1c-.1-.1-.3-.1-.4-.2 0 .1.1.2.1.4-.3.2-.4.4-.4.8.1.3.2.6.5.7-.2.2-.3.4-.4.7v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.2.4-.4.9-.5 1.4h-.1c-.1.2-.3.3-.4.5.1.1.2.2.3.2.1 0 .1-.1.2-.2 0 .4.4.8.8.7.3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.1 0 .1.1.2.1-.1.1-.1.3-.3.5.3-.2.4-.3.4-.5.2.1.5.2.6.3.3-.2.6-.3.8-.5 0 .1.1.1.1.2.1-.1.2-.1.2-.2l-.1-.1c.2-.7-.3-1.2-.8-1.9h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.1-.2-.2-.2-.3 0-.1.1-.1.1-.2s-.1-.3-.2-.6c-.1.1-.1.2-.2.2 0-.1.1-.3.2-.3.9-.1 1.4-.9 2.2-1.1v-.1c.3 0 .6-.1.9-.2.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .5.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1 0 .1.1.2.1.2h.3c-.1-.1-.1-.2-.2-.3h-.2v.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3v-.1c.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.3.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6 0 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1V32c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2.1 0 .2.2.4.4-.4.2-.6.3-1 .6h1.4c.4 0 .7.2 1.1.3 0-.3.1-.6.1-.9.4.2.4.2.4.7 1 .1 2.1.2 3.1.3 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1.2.5-1.6 1.6-1.5.4 0 .7.1 1.1 0 .4-.2.8-.2 1.3-.1.2.1.4 0 .4-.4-1-.3-1.2-1.1-1.2-2.1 0-.5.2-.9.7-1 0 .3.1.5.1.7.2 0 .3 0 .4.2.2.7.3 1.4 1 1.7.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.4-.2.8-.2 1.1.1.4.3.4.7.3 1.1l.9.3.4-.4c.3.4.5.8.8 1.2.2.3.6.3.9.2-.1.4-.1.8-.2 1.2-.7.1-1.2.2-1.8.3-.6.1-1.1 0-1.7.2.4.7.4.7-.1 1.8-1.4.4-2.9.2-4.3.1-.7.7-.7.7-1.5.7-.4 0-.9-.1-1.3.4 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.5-.1 1-.2 1.5-.4.4-.2.7-.2 1-.1-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.6c1 .4 1.9.3 2.9.2h.7c.6 0 1 .2 1.2.9l.3.6c.9-.1 1.6-.3 2.2-1 .5.1 1 .2 1.4.3.1.3.1.6.2.8.1.3.4.5.7.3.2-.1.3-.3.4-.5.1-.2 0-.4 0-.7.6-.1 1 0 1.3.6l.3.6c0 .1.1.1.1.2 0-.1.1-.1.1-.2.2-.1.3-.2.2-.4-.1-.1-.3-.2-.1-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.5-.5 1-.5 1.6-.1.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5-.1.2-.2.4-.4.5-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.7 0-.8.5-1 1v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.3.5-.5 1.1-.6 1.7-.1.5.3 1.1.8 1 .3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.3.1.7.3 1 .4.4-.2.7-.4 1-.6.3-.8-.3-1.3-.8-2h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.2-.3-.3-.4-.5-.1-.2-.1-.6.1-.6.9-.1 1.4-.9 2.2-1.1 0-.7 0-1.2-.2-1.8-.2-.3 0-.5.3-.6.1-.3.2-.6.1-.8-.3-.7.1-1.4 0-2.1.4-.1.7-.2 1-.2.2.3.3.5.4.7.1-.5.4-1.1.3-1.6-.2-1.1.3-1.7 1-2.2l.2-.2c-.1-.1-.3-.2-.4-.3-.3-.4-.3-.8-.1-1.3.2-.4.2-.8-.2-1.2-.1.2-.2.4-.4.6-.4-.2-.3-.5-.2-.8.1-.5.3-1 .5-1.4-.3-.3-.7-.5-.9-.8-.3-.4-.9-.7-.1-1.2.1-.1 0-.4.1-.5.1-.3.3-.5.4-.8.1-.3.2-.6.2-.9-.1-.8-.2-1.6-.4-2.4-.1-.5-.1-1.1-.2-1.6.3-.1.6-.1.9-.2.4-.1.8-.5 1-.9.2-.4.1-.7-.2-1-.1-.1-.1-.3 0-.4.3-.5.2-1.2.3-1.8v-.3c-.1 0-.1.1-.2.1-.3 0-.5-.1-.6-.4 0-.5 0-.9-.1-1.4 0 0-.1 0-.1-.1s-.1-.3-.1-.3c.2-.1.3.1.3.2l1.5-.3c0 .4.1.9.2 1.3.3 1.2.5 2.5.7 3.8.1.5.1 1.1 0 1.6-.1.6.3 1 .4 1.5 0 .9 0 1.8.1 2.7 0 .1.1.2.1.2.4 0 .8.1.7.7-.4.1-.7.3-1.2.4.3.2.5.4.7.5.2 0 .5-.1.7-.2.3.4 0 .9.4 1.2.1-.1.2-.1.2-.2 0-.8.2-1.5.3-2.2.1-.4.3-.6.5-.6.6 0 1.3-.4 1.8.3 0 0 .3-.1.5-.2.1.4.2.7.2 1 0 .4-.3.9.2 1.2.1.1.1.4 0 .5-.1.5-.2.9-.3 1.4 1-.2 1.2-.1 1.3.9 0 .3-.1.6.2.7.5-.3.5-.3.8-1.1-.7-1.1-1-2.5-1.1-4 .6-.4 1.1-.8 1.7-1.2.4.1.8.1 1.2.2.1 0 .2.2.2.3h.3c.2.6.6.4 1 .2 0 .4.1.8-.1 1.2-.1.4.1.9.1 1.4 0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.4.6.1 1.2.2 1.8.1.8-.1 1.4-.8 1.8l-.3.3.3.9c-.4.1-.8.2-1.1-.2.4-.6.2-1.2-.2-1.8-.3 0-.5.2-.5.5-.1.7 0 1.4.3 2.1.2.4.6.7 1.1.6.2 0 .4-.1.6-.2.3.7.1 1.4 0 2 .6 0 1.3.1 1.9-.3-.1-.3-.2-.6-.3-1-.2.1-.6.2-.6.4v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2.1-.2l-.3-1.2c.3-.6.3-1.2-.2-1.8.2-.4.3-.8.5-1.4.2.3.3.5.5.8.3.1.4-.1.5-.3.1-.3.4-.4.7-.5-.1.4-.1.9 0 1.3.1.5 0 1-.4 1.2-.9.4-.8 1.1-.7 1.8.6-.2.4-1 1-1.3.6.2 1.2.4 1.4 1.2.2.1.3.1.5.2-.2.3-.3.6-.4.9-.1.2-.1.5.2.6.3-.3.5-.6.8-.9.2-.6-.3-.9-.4-1.3.1-.4.2-.6.3-.9-.2-.2-.4-.4-.6-.4-.3 0-.7.2-1 .3 0-.7-.1-1.3-.1-1.9.2.2.4.4.6.5.4-.5 1.1 0 1.7-.4-.3-.4-.6-.7-.8-1v-.3c.4-.3.4-.3.9-.3.2.6.5 1.2.7 1.8-.1.1-.2.2-.2.3l-.3.3c-.1.2-.1.4-.1.5 0 .2.2.3.3.4.6-.4.7-1.2 1.4-1.5.1 0 .2-.2.2-.3 0-.4.1-.7.1-1.4-.5 1-1 .5-1.5.5-.1-.4.2-.4.4-.5.2-.1.3-.2.4-.3.1-.2.2-.4.3-.7.4.3.7.6 1.1.9.4-.2.7-.4 1.1-.5.1.5.3 1 .4 1.5 0 .2-.1.3-.2.5.6 0 1 .4 1.4.8.4.3.8.6 1.3.6.1.7-.6.5-.9.9.4.7.6 1.3.4 2.1-.1.3-.1.6.2.8.1.1.3.2.4.2.3-.1.3-.3.3-.6-.1-.3-.2-.5-.4-.7.2-.3.6-.7.7-1 0-1.1.5-2.2.1-3.4.6.6 1.2.8 2 .8.6 0 1.2.1 1.6.6.3-.1.6-.2.9-.2 0 .2.1.4.1.5.6.2.7.9 1.1 1.3.2-.2.5-.3.7-.4-.1-.4-.3-.8-.4-1.2 0-.2.1-.5.2-.6.1-.1.4 0 .6.1.5.2.2.8.5 1.2.5-.1.5-.6.7-.9.2-.4.6-.4.8 0 .2.3.3.8.7.9 0 .3-.1.6-.1 1-.2 0-.4.1-.6.1.1.2.1.4.2.7-.5.3-1.2-.1-1.5.5-.1.4-.2.2-.4 0h.3v-.5c.2-.8.4-.9 1.2-.7 0-.4-.1-.7-.1-1.2-.3.2-.5.3-.7.4-.3.1-.6.2-.9.2-.2 0-.5-.1-.7-.1.4.5.6 1 .6 1.7-.4 0-.8 0-1.1.4-.1.2-.3.3-.4.1v-.8c-.4.3-.8.5-1 .8-.2.2-.2.5-.4.7.2.3.4.5.6.8.2.2.3.5.5.7.1.2.3.4.6.1v-.7c0-.2.1-.5.1-.7 1.1.5 1.3.5 2.2.4.8-.1 1.5-.3 2.3-.3 1 0 1.9-.2 2.9-.2.6 0 1.3 0 2-.3.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .5.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1l.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3l.2.2s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.2.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6 0 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1v-1.2c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2 0 0 .1 0 .1.1s-.1.2-.1.3c0 .1.1.2.1.2-.2.1-.4.2-.7.4h.8c.2.4.4.7.9.9.1-.1.2-.3.2-.4 0-.1-.1-.3-.1-.4.2.1.5.1.7.2 0-.3.1-.6.1-.9.4.2.4.2.4.7.3 0 .6.1 1 .1 0 .2 0 .4.2.5.1-.1.2-.1.2-.2v-.3c.6 0 1.2.1 1.7.2 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1 .4-1.4 1.1-1.5-.1.3-.1.7-.2 1l-.1-.1v.4c-.1.1-.1.2-.1.3.3 1.1-.2 1.9-.9 2.6-.1.1-.1.2-.2.3.1.1.2.3.3.4-.1.1-.2.1-.3.2 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.4-.1.9-.2 1.3-.4-.1.3-.1.5-.2.8.3 0 .5.1.7 0 .1-.1.2-.3.2-.5s-.1-.3-.1-.5h.6c-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.5c0 .1.1.3.2.4.2.4.6.7 1.1.6.2 0 .4-.1.6-.2v.1c-.2 0-.4.1-.6.2v.4c.1.2.5.4.8.3 0 .4-.1.7-.1 1 .6 0 1.3.1 1.9-.3-.1-.2-.1-.4-.2-.6.2-.1.5-.3.7-.5.2.3.3.7.3 1.1.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1-.1-.3-.2-.5-.3-.8.2.1.3.3.4.6l.3.6c.9-.1 1.6-.3 2.2-1-.1.3-.3.5-.3.7-.1.2-.1.5.2.6h.1c.2-.2.6-.2.7-.8h-.1l.1-.1v-.3c.2 0 .5.1.7.1.1.3.1.6.2.8.1.3.4.5.7.3.1 0 .1-.1.2-.2l.1.1c.2.1.4-.1.5-.5 0-.2.1-.4.1-.6v-.1c.3 0 .6.2.8.6 0 0 0 .1.1.1 0 .1.1.3.2.4l.1.1c0 .1.1.1.1.2 0-.1 0-.1.1-.2.1.1.3.2.5.3v-.8c-.1-.2-.2-.4-.4-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.2-.2.3-.2.5-.3v0c.3-.1.7 0 1 .2.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5 0 .1-.1.2-.2.3V38h-.1v.1c-.1.1-.1.1-.2.1-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.1 0-.2 0-.3.1-.1-.2-.1-.4-.1-.6v-.2c.1 0 .1-.1.1-.2 0-.2-.1-.3-.2-.4v-.1c-.1-.1-.3-.1-.4-.2 0 .1.1.2.1.4-.3.2-.4.4-.4.8.1.3.2.6.5.7-.2.2-.3.4-.4.7v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.2.4-.4.9-.5 1.4h-.1c-.1.2-.3.3-.4.5.1.1.2.2.3.2.1 0 .1-.1.2-.2 0 .4.4.8.8.7.3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.1 0 .1.1.2.1-.1.1-.1.3-.3.5.3-.2.4-.3.4-.5.2.1.5.2.6.3.3-.2.6-.3.8-.5 0 .1.1.1.1.2.1-.1.2-.1.2-.2l-.1-.1c.2-.7-.3-1.2-.8-1.9h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.1-.2-.2-.2-.3 0-.1.1-.1.1-.2s-.1-.3-.2-.6c-.1.1-.1.2-.2.2 0-.1.1-.3.2-.3.9-.1 1.4-.9 2.2-1.1v-.1c.3 0 .6-.1.9-.2.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .4.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1 0 .1.1.2.1.2h.3c-.1-.1-.1-.2-.2-.3h-.2v.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3v-.1c.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.3.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6 0 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1v-1.2c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2.1 0 .2.2.4.4-.4.2-.6.3-1 .6h1.4c.4 0 .7.2 1.1.3 0-.3.1-.6.1-.9.4.2.4.2.4.7 1 .1 2.1.2 3.1.3 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1.2.5-1.6 1.6-1.5.4 0 .7.1 1.1 0 .4-.2.8-.2 1.3-.1.2.1.4 0 .4-.4-1-.3-1.2-1.1-1.2-2.1 0-.5.2-.9.7-1 0 .3.1.5.1.7.2 0 .3 0 .4.2.2.7.3 1.4 1 1.7.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.4-.2.8-.2 1.1.1.4.3.4.7.3 1.1l.9.3.4-.4c.3.4.5.8.8 1.2.2.3.6.3.9.2-.1.4-.1.8-.2 1.2-.7.1-1.2.2-1.8.3-.6.1-1.1 0-1.7.2.4.7.4.7-.1 1.8-1.4.4-2.9.2-4.3.1-.7.7-.7.7-1.5.7-.4 0-.9-.1-1.3.4 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.5-.1 1-.2 1.5-.4.4-.2.7-.2 1-.1-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.6c1 .4 1.9.3 2.9.2h.7c.6 0 1 .2 1.2.9l.3.6c.9-.1 1.6-.3 2.2-1 .5.1 1 .2 1.4.3.1.3.1.6.2.8.1.3.4.5.7.3.2-.1.3-.3.4-.5.1-.2 0-.4 0-.7.6-.1 1 0 1.3.6l.3.6c0 .1.1.1.1.2 0-.1.1-.1.1-.2.2-.1.3-.2.2-.4-.1-.1-.3-.2-.1-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.5-.5 1-.5 1.6-.1.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5-.1.2-.2.4-.4.5-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.7 0-.8.5-1 1v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.3.5-.5 1.1-.6 1.7-.1.5.3 1.1.8 1 .3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.3.1.7.3 1 .4.4-.2.7-.4 1-.6.3-.8-.3-1.3-.8-2h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.2-.3-.3-.4-.5-.1-.2-.1-.6.1-.6.9-.1 1.4-.9 2.2-1.1 0-.7 0-1.2-.2-1.8-.2-.3 0-.5.3-.6.1-.3.2-.6.1-.8-.3-.7.1-1.4 0-2.1.4-.1.7-.2 1-.2.2.3.3.5.4.7.1-.5.4-1.1.3-1.6v-.4c.3-.1.5-.3.4-.8-.1 0-.2-.1-.2-.1.2-.4.5-.7.9-1l.2-.2c-.1-.1-.3-.2-.4-.3-.2-.2-.2-.5-.2-.7V30v-.3c0-.1 0-.1.1-.2.2-.4.2-.8-.2-1.2-.1.2-.2.4-.4.6-.4-.2-.3-.5-.2-.8.1-.5.3-1 .5-1.4-.3-.3-.7-.5-.9-.8-.3-.4-.9-.7-.1-1.2.1-.1 0-.4.1-.5 0-.1.1-.1.1-.2l.3.3v1.1c0 .2 0 .4.3.3.1-.7.1-1 .1-1.4.2 0 .4-.1.6-.2.3.4 0 .9.4 1.2.1-.1.2-.1.2-.2 0-.8.2-1.5.3-2.2.1-.4.3-.6.5-.6.6 0 1.3-.4 1.8.3 0 0 .3-.1.5-.2.1.4.2.7.2 1 0 .4-.3.9.2 1.2.1.1.1.4 0 .5-.1.5-.2.9-.3 1.4 1-.2 1.2-.1 1.3.9 0 .3-.1.6.2.7.5-.3.5-.3.8-1.1-.7-1.1-1-2.5-1.1-4 .6-.4 1.1-.8 1.7-1.2.4.1.8.1 1.2.2.1 0 .2.2.2.3h.3c.2.6.6.4 1 .2 0 .4.1.8-.1 1.2-.1.4.1.9.1 1.4 0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.4.6.1 1.2.2 1.8.1.8-.1 1.4-.8 1.8l-.3.3.3.9c-.4.1-.8.2-1.1-.2.4-.6.2-1.2-.2-1.8-.3 0-.5.2-.5.5-.1.7 0 1.4.3 2.1.2.4.6.7 1.1.6.2 0 .4-.1.6-.2.3.7.1 1.4 0 2 .6 0 1.3.1 1.9-.3-.1-.3-.2-.6-.3-1-.2.1-.6.2-.6.4v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2.1-.2l-.3-1.2c.3-.6.3-1.2-.2-1.8.2-.4.3-.8.5-1.4.2.3.3.5.5.8.3.1.4-.1.5-.3.1-.3.4-.4.7-.5-.1.4-.1.9 0 1.3.1.5 0 1-.4 1.2-.9.4-.8 1.1-.7 1.8.6-.2.4-1 1-1.3.6.2 1.2.4 1.4 1.2.2.1.3.1.5.2-.2.3-.3.6-.4.9-.1.2-.1.5.2.6.3-.3.5-.6.8-.9.2-.6-.3-.9-.4-1.3.1-.4.2-.6.3-.9-.2-.2-.4-.4-.6-.4-.3 0-.7.2-1 .3 0-.7-.1-1.3-.1-1.9.2.2.4.4.6.5.4-.5 1.1 0 1.7-.4-.3-.4-.6-.7-.8-1v-.3c.4-.3.4-.3.9-.3.2.6.5 1.2.7 1.8-.1.1-.2.2-.2.3l-.3.3c-.1.2-.1.4-.1.5 0 .2.2.3.3.4.6-.4.7-1.2 1.4-1.5.1 0 .2-.2.2-.3 0-.4.1-.7.1-1.4-.5 1-1 .5-1.5.5-.1-.4.2-.4.4-.5.2-.1.3-.2.4-.3.1-.2.2-.4.3-.7.4.3.7.6 1.1.9.4-.2.7-.4 1.1-.5.1.5.3 1 .4 1.5 0 .2-.1.3-.2.5.6 0 1 .4 1.4.8.4.3.8.6 1.3.6.1.7-.6.5-.9.9.4.7.6 1.3.4 2.1-.1.3-.1.6.2.8.1.1.3.2.4.2.3-.1.3-.3.3-.6-.1-.3-.2-.5-.4-.7.2-.3.6-.7.7-1 0-1.1.5-2.2.1-3.4.6.6 1.2.8 2 .8.6 0 1.2.1 1.6.6.3-.1.6-.2.9-.2 0 .2.1.4.1.5.6.2.7.9 1.1 1.3.2-.2.5-.3.7-.4-.1-.4-.3-.8-.4-1.2 0-.2.1-.5.2-.6.1-.1.4 0 .6.1.5.2.2.8.5 1.2.5-.1.5-.6.7-.9.2-.4.6-.4.8 0 .2.3.3.8.7.9 0 .3-.1.6-.1 1-.2 0-.4.1-.6.1.1.2.1.4.2.7-.5.3-1.2-.1-1.5.5-.1.4-.2.2-.4 0h.3v-.5c.2-.8.4-.9 1.2-.7 0-.4-.1-.7-.1-1.2-.3.2-.5.3-.7.4-.3.1-.6.2-.9.2-.2 0-.5-.1-.7-.1.4.5.6 1 .6 1.7-.4 0-.8 0-1.1.4-.1.2-.3.3-.4.1v-.8c-.4.3-.8.5-1 .8-.2.2-.2.5-.4.7.2.3.4.5.6.8.2.2.3.5.5.7.1.2.3.4.6.1v-.7c0-.2.1-.5.1-.7 1.1.5 1.3.5 2.2.4.8-.1 1.5-.3 2.3-.3 1 0 1.9-.2 2.9-.2.6 0 1.3 0 2-.3.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .5.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1l.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3l.2.2s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.3.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6.1 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1v-1.2c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2 0 0 .1 0 .1.1s-.1.2-.1.3c0 .1.1.2.1.2-.2.1-.4.2-.7.4h.8c.2.4.4.7.9.9.1-.1.2-.3.2-.4 0-.1-.1-.3-.1-.4.2.1.5.1.7.2 0-.3.1-.6.1-.9.4.2.4.2.4.7.3 0 .6.1 1 .1 0 .2 0 .4.2.5.1-.1.2-.1.2-.2v-.3c.6 0 1.2.1 1.7.2 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1 .4-1.4 1.1-1.5-.1.3-.1.7-.2 1l-.1-.1v.4c-.1.1-.1.2-.1.3.3 1.1-.2 1.9-.9 2.6-.1.1-.1.2-.2.3.1.1.2.3.3.4-.1.1-.2.1-.3.2 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.4-.1.9-.2 1.3-.4-.1.3-.1.5-.2.8.3 0 .5.1.7 0 .1-.1.2-.3.2-.5s-.1-.3-.1-.5h.6c-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.5c0 .1.1.3.2.4.2.4.6.7 1.1.6.2 0 .4-.1.6-.2v.1c-.2 0-.4.1-.6.2v.4c.1.2.5.4.8.3 0 .4-.1.7-.1 1 .6 0 1.3.1 1.9-.3-.1-.2-.1-.4-.2-.6.2-.1.5-.3.7-.5.2.3.3.7.3 1.1.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1-.1-.3-.2-.5-.3-.8.2.1.3.3.4.6l.3.6c.9-.1 1.6-.3 2.2-1-.1.3-.3.5-.3.7-.1.2-.1.5.2.6h.1c.2-.2.6-.2.7-.8h-.1l.1-.1v-.3c.2 0 .5.1.7.1.1.3.1.6.2.8.1.3.4.5.7.3.1 0 .1-.1.2-.2l.1.1c.2.1.4-.1.5-.5 0-.2.1-.4.1-.6v-.1c.3 0 .6.2.8.6 0 0 0 .1.1.1 0 .1.1.3.2.4l.1.1c0 .1.1.1.1.2 0-.1 0-.1.1-.2.1.1.3.2.5.3v-.8c-.1-.2-.2-.4-.4-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.2-.2.3-.2.5-.3v0c.3-.1.7 0 1 .2.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5 0 .1-.1.2-.2.3V37h-.1v.1c-.1.1-.1.1-.2.1-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.1 0-.2 0-.3.1-.1-.2-.1-.4-.1-.6v-.2c.1 0 .1-.1.1-.2 0-.2-.1-.3-.2-.4v-.1c-.1-.1-.3-.1-.4-.2 0 .1.1.2.1.4-.3.2-.4.4-.4.8.1.3.2.6.5.7-.2.2-.3.4-.4.7v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.2.4-.4.9-.5 1.4h-.1c-.1.2-.3.3-.4.5.1.1.2.2.3.2.1 0 .1-.1.2-.2 0 .4.4.8.8.7.3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.1 0 .1.1.2.1-.1.1-.1.3-.3.5.3-.2.4-.3.4-.5.2.1.5.2.6.3.3-.2.6-.3.8-.5 0 .1.1.1.1.2.1-.1.2-.1.2-.2l-.1-.1c.2-.7-.3-1.2-.8-1.9h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.1-.2-.2-.2-.3 0-.1.1-.1.1-.2s-.1-.3-.2-.6c-.1.1-.1.2-.2.2 0-.1.1-.3.2-.3.9-.1 1.4-.9 2.2-1.1v-.1c.3 0 .6-.1.9-.2.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .4.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1 0 .1.1.2.1.2h.3c-.1-.1-.1-.2-.2-.3h-.2v.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3l.2.2s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.3.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6 0 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1v-1.2c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2.1 0 .2.2.4.4-.4.2-.6.3-1 .6h1.4c.4 0 .7.2 1.1.3 0-.3.1-.6.1-.9.4.2.4.2.4.7 1 .1 2.1.2 3.1.3 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1.2.5-1.6 1.6-1.5.4 0 .7.1 1.1 0 .4-.2.8-.2 1.3-.1.2.1.4 0 .4-.4-1-.3-1.2-1.1-1.2-2.1 0-.5.2-.9.7-1 0 .3.1.5.1.7.2 0 .3 0 .4.2.2.7.3 1.4 1 1.7.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.4-.2.8-.2 1.1.1.4.3.4.7.3 1.1l.9.3.4-.4c.3.4.5.8.8 1.2.2.3.6.3.9.2-.1.4-.1.8-.2 1.2-.7.1-1.2.2-1.8.3-.6.1-1.1 0-1.7.2.4.7.4.7-.1 1.8-1.4.4-2.9.2-4.3.1-.7.7-.7.7-1.5.7-.4 0-.9-.1-1.3.4 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.5-.1 1-.2 1.5-.4.4-.2.7-.2 1-.1-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.6c1 .4 1.9.3 2.9.2h.7c.6 0 1 .2 1.2.9l.3.6c.9-.1 1.6-.3 2.2-1 .5.1 1 .2 1.4.3.1.3.1.6.2.8.1.3.4.5.7.3.2-.1.3-.3.4-.5.1-.2 0-.4 0-.7.6-.1 1 0 1.3.6l.3.6c0 .1.1.1.1.2 0-.1.1-.1.1-.2.2-.1.3-.2.2-.4-.1-.1-.3-.2-.1-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.5-.5 1-.5 1.6-.1.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5-.1.2-.2.4-.4.5-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.7 0-.8.5-1 1v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.3.5-.5 1.1-.6 1.7-.1.5.3 1.1.8 1 .3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.3.1.7.3 1 .4.4-.2.7-.4 1-.6.3-.8-.3-1.3-.8-2h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.2-.3-.3-.4-.5-.1-.2-.1-.6.1-.6.9-.1 1.4-.9 2.2-1.1 0-.7 0-1.2-.2-1.8-.2-.3 0-.5.3-.6.1-.3.2-.6.1-.8-.3-.7.1-1.4 0-2.1.4-.1.7-.2 1-.2.2.3.3.5.4.7.1-.5.4-1.1.3-1.6v-.4c.3-.1.5-.3.4-.8-.1 0-.2-.1-.2-.1.2-.4.5-.7.9-1l.2-.2c-.1-.1-.3-.2-.4-.3-.2-.2-.2-.5-.2-.7V29v-.3c0-.1 0-.1.1-.2.2-.4.2-.8-.2-1.2-.1.2-.2.4-.4.6-.4-.2-.3-.5-.2-.8.1-.5.3-1 .5-1.4-.3-.3-.7-.5-.9-.8-.3-.4-.9-.7-.1-1.2.1-.1 0-.4.1-.5 0-.1.1-.1.1-.2l.3.3v1.1c0 .2 0 .4.3.3.1-.7.1-1 .1-1.4.2 0 .4-.1.6-.2.3.4 0 .9.4 1.2.1-.1.2-.1.2-.2 0-.8.2-1.5.3-2.2.1-.4.3-.6.5-.6.6 0 1.3-.4 1.8.3 0 0 .3-.1.5-.2.1.4.2.7.2 1 0 .4-.3.9.2 1.2.1.1.1.4 0 .5-.1.5-.2.9-.3 1.4 1-.2 1.2-.1 1.3.9 0 .3-.1.6.2.7.5-.3.5-.3.8-1.1-.7-1.1-1-2.5-1.1-4 .6-.4 1.1-.8 1.7-1.2.4.1.8.1 1.2.2.1 0 .2.2.2.3h.3c.2.6.6.4 1 .2 0 .4.1.8-.1 1.2-.1.4.1.9.1 1.4 0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.4.6.1 1.2.2 1.8.1.8-.1 1.4-.8 1.8l-.3.3.3.9c-.4.1-.8.2-1.1-.2.4-.6.2-1.2-.2-1.8-.3 0-.5.2-.5.5-.1.7 0 1.4.3 2.1.2.4.6.7 1.1.6.2 0 .4-.1.6-.2.3.7.1 1.4 0 2 .6 0 1.3.1 1.9-.3-.1-.3-.2-.6-.3-1-.2.1-.6.2-.6.4v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2.1-.2l-.3-1.2c.3-.6.3-1.2-.2-1.8.2-.4.3-.8.5-1.4.2.3.3.5.5.8.3.1.4-.1.5-.3.1-.3.4-.4.7-.5-.1.4-.1.9 0 1.3.1.5 0 1-.4 1.2-.9.4-.8 1.1-.7 1.8.6-.2.4-1 1-1.3.6.2 1.2.4 1.4 1.2.2.1.3.1.5.2-.2.3-.3.6-.4.9-.1.2-.1.5.2.6.3-.3.5-.6.8-.9.2-.6-.3-.9-.4-1.3.1-.4.2-.6.3-.9-.2-.2-.4-.4-.6-.4-.3 0-.7.2-1 .3 0-.7-.1-1.3-.1-1.9.2.2.4.4.6.5.4-.5 1.1 0 1.7-.4-.3-.4-.6-.7-.8-1v-.3c.4-.3.4-.3.9-.3.2.6.5 1.2.7 1.8-.1.1-.2.2-.2.3l-.3.3c-.1.2-.1.4-.1.5 0 .2.2.3.3.4.6-.4.7-1.2 1.4-1.5.1 0 .2-.2.2-.3 0-.4.1-.7.1-1.4-.5 1-1 .5-1.5.5-.1-.4.2-.4.4-.5.2-.1.3-.2.4-.3.1-.2.2-.4.3-.7.4.3.7.6 1.1.9.4-.2.7-.4 1.1-.5.1.5.3 1 .4 1.5 0 .2-.1.3-.2.5.6 0 1 .4 1.4.8.4.3.8.6 1.3.6.1.7-.6.5-.9.9.4.7.6 1.3.4 2.1-.1.3-.1.6.2.8.1.1.3.2.4.2.3-.1.3-.3.3-.6-.1-.3-.2-.5-.4-.7.2-.3.6-.7.7-1 0-1.1.5-2.2.1-3.4.6.6 1.2.8 2 .8.6 0 1.2.1 1.6.6.3-.1.6-.2.9-.2 0 .2.1.4.1.5.6.2.7.9 1.1 1.3.2-.2.5-.3.7-.4-.1-.4-.3-.8-.4-1.2 0-.2.1-.5.2-.6.1-.1.4 0 .6.1.5.2.2.8.5 1.2.5-.1.5-.6.7-.9.2-.4.6-.4.8 0 .2.3.3.8.7.9 0 .3-.1.6-.1 1-.2 0-.4.1-.6.1.1.2.1.4.2.7-.5.3-1.2-.1-1.5.5-.1.4-.2.2-.4 0h.3v-.5c.2-.8.4-.9 1.2-.7 0-.4-.1-.7-.1-1.2-.3.2-.5.3-.7.4-.3.1-.6.2-.9.2-.2 0-.5-.1-.7-.1.4.5.6 1 .6 1.7-.4 0-.8 0-1.1.4-.1.2-.3.3-.4.1v-.8c-.4.3-.8.5-1 .8-.2.2-.2.5-.4.7.2.3.4.5.6.8.2.2.3.5.5.7.1.2.3.4.6.1v-.7c0-.2.1-.5.1-.7 1.1.5 1.3.5 2.2.4.8-.1 1.5-.3 2.3-.3 1 0 1.9-.2 2.9-.2.6 0 1.3 0 2-.3.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .5.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1l.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3l.2.2s.1 0 .2-.1l-.1-.1c-.1 0-.2-.1-.2-.1.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.3.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6.3 0 .5.1.8.1.3 0 .5-.2.5-.5 0-.1.1-.1.2-.2.2.1.4.3.7.4.4-.3.9-.6 1.3-.9l.6-.6c.3-.6.6-1.2.9-1.7.7.4 1.1 1 1.2 1.9 0 .5 0 1.1.5 1.4.7 0 1.3 0 1.8-.7.2-.3.6-.2.9 0 .1.1.3.3.4.3.1 0 .4 0 .5-.1.1-.1.2-.4.1-.5-.1-.3-.3-.5-.4-.8.5-.5.8-.5.9 0 .2.5.2 1.1.6 1.6.6-.4.6-.4 1.6-.5.4 0 .5-.2.5-.7 0-.1 0-.3-.1-.4-.2-.3-.3-.6-.5-.9.1 0 .2-.1.3-.1.6.5.5 1.5 1.1 2 1.2-.2 1.2-.2 2.1.6.5-.1.5-.8 1-.8h1.3c.3.4.5.6.7.9.5-.1.6-.4.7-.8.4-.1.7-.2 1.1-.2.4.3.7.6 1.1.9.3.2.6.1.8-.2l.3-.6c.7.2 1.4.4 2 .5.1-.2.1-.3.2-.4.1-.1.3-.2.3-.2.1.1.3.3.3.4 0 .3-.1.5-.2.7.3.3.6.1.8-.1.2-.1.4-.4.5-.3.5.3.7-.3 1-.5.1.1.3.2.4.3.2.2.4.4.5.6.2.4.7.3.9 0l.3-.6c.2-.3.4-.2.6 0 .1.1.1.3.2.5.4-.1.8 0 .9-.6-.3-.3-.6-.7-1-1-.4-.3-.8-.5-1.2-.2-.3.2-.5.3-.8.4-.6-.5-.6-.5-.8-1.4-.2.1-.3.1-.5.2l-.6.6c-.8.6-1.2.6-1.8-.2-.3-.4-.7-.9-.9-1.4-.3-.5-.6-.6-1.1-.6-.3 0-.5.1-.7.2-.1.3-.2.5-.3.8-.3-.3-.6-.5-.9-.7.3-.8.3-.9.9-.9 1 0 2 .1 2.9.1.2 0 .4 0 .4-.4-.2-.2-.4-.3-.6-.5.1-.4.2-.7.3-1.1-.7.1-.9.8-1.3 1.3-.6.1-1.1.2-1.7.2-.4 0-.8-.1-1-.5.1-.2.2-.4.2-.6-.1-.4-.2-.7-.4-1-.1-.1-.3-.2-.4-.3l-.3-.3c-.6-.5-1.1-.3-1.3.5-.1.2.1.5-.3.6-.6-.2-1-.6-1.2-1.4.5-.1.9-.3 1.2-.4.2-.4.4-.7.6-1 .7-.1.9.2 1 .7.1.2.2.4.5.4.2 0 .4-.2.5-.3-.1-.4-.3-.7-.4-1 .2-.1.3-.1.5-.2h.3c.5-.1.7-.5.5-.9-.4-.8-.8-1.6-.9-2.5 0-.1-.1-.2-.2-.4s-.1-.4-.1-.5c.2 0 .3.1.5.2.6.2 1.1.1 1.6-.1h.4c.6.1 1.2.1 1.8-.1.4-.1.9-.2 1.3-.2v.1c0 .1 0 .2-.1.3-.9 1-1.8 1.5-3.1 1-.2-.1-.3-.2-.5-.2s-.5.2-.7.3c-.1 0-.1.2-.1.2.1.1.1.2.2.3h.4c1.1-.2 2.1-.1 3 .8.3.3.7.4.7.9 0 .2.2.3.3.4.3.3.3.6.4 1 .4-.6.1-1.4.4-2 .6-.3 1.2 0 1.7-.5.3-.2.8.2.9.6.1.3 0 .7.1 1 .1.8.2 1.5.3 2.3 0 .4.2.6.6.7h.1c.1 0 .2-.1.2-.1.7-.8 1.5-1 2.4-.7.4.1.9.1 1.3.1.3 0 .6 0 .8.1.4.3.8.2 1.3.2.7-.1 1.4-.2 2.1-.2.5.1 1-.1 1.6-.4-1.1-.1-2.2-.2-3.2-.3-1.1-.1-1.1-.1-2.2-.9-.1.3-.3.6-.3.7-.8 0-1.5 0-2.1-.1-.4 0-.8-.1-1.2-.2-.7-.2-.9-.9-1-1.5-.1-.7.4-.7.8-1v-.1c-.1-.1-.1-.1-.2-.1s-.3 0-.4-.1c-.6-.2-.7-.4-.5-1.1.1-.4.1-.7.2-1.1 0-.1 0-.1.1-.2h.6c.2.1.3.2.5.3v-.1c.4-.3.8-.3 1.1-.3.2.4.4.7.5 1 .6.1 1.1.1 1.5-.3.6.2 1.2.7 1.9.6.1 0 .1.2.2.3-1 .1-2 .2-2.9.3 0 1 0 1.1.8 1.2 1.7.1 3.4.2 5 .3h.7l3.9.3c.2-.1.5-.3.7-.5.3.1.6.3 1 .4.2 0 .4-.2.5-.2l2.4.6c.1.4.3.9.4 1.3 0 .1.2.1.4.1v-1.2c.4-.2.7-.3 1-.5.6.1 1.1.5 1.7.2.1-.1.1-.2.2-.3.5-.7.6-.7 1.3-.3.2.1.5.2.7.3-.1.4-.2.8-.2 1.2 0 .1.1.2.2.2h.2c.6-.6 1.2-1.3 1.8-1.9.4.1.8.1 1.2.2 0 0 .1 0 .1.1s-.1.2-.1.3c0 .1.1.2.1.2-.2.1-.4.2-.7.4h.8c.2.4.4.7.9.9.1-.1.2-.3.2-.4 0-.1-.1-.3-.1-.4.2.1.5.1.7.2 0-.3.1-.6.1-.9.4.2.4.2.4.7.3 0 .6.1 1 .1 0 .2 0 .4.2.5.1-.1.2-.1.2-.2v-.3c.6 0 1.2.1 1.7.2 0 .5.1.8.1 1.2 0 .4 0 .8.1 1.3.1-.1.3-.1.3-.1.1-.2 0-.4 0-.5.1-1 .4-1.4 1.1-1.5-.1.3-.1.7-.2 1l-.1-.1v.4c-.1.1-.1.2-.1.3.3 1.1-.2 1.9-.9 2.6-.1.1-.1.2-.2.3.1.1.2.3.3.4-.1.1-.2.1-.3.2 0 .8 0 1.6-.1 2.4l-.1.1.1-.1c-.1-.1-.1-.1-.2-.1h-.2c0 .1.1.2.1.2h.3c-.3.3-.6.7-.9 1.1.7.3 1.3.5 1.9.7h.3c.4-.1.9-.2 1.3-.4-.1.3-.1.5-.2.8.3 0 .5.1.7 0 .1-.1.2-.3.2-.5s-.1-.3-.1-.5h.6c-.1-.3-.4-.5-.6-.7-.4-.3-.9-.5-1.5-.9.9-.1 1.6-.2 2.4-.3.1-.5.2-.9.2-1.4h.5c0 .1.1.3.2.4.2.4.6.7 1.1.6.2 0 .4-.1.6-.2v.1c-.2 0-.4.1-.6.2v.4c.1.2.5.4.8.3 0 .4-.1.7-.1 1 .6 0 1.3.1 1.9-.3-.1-.2-.1-.4-.2-.6.2-.1.5-.3.7-.5.2.3.3.7.3 1.1.3.1.6.3.9-.1-.2-.3-.4-.7-.6-1-.1-.3-.2-.5-.3-.8.2.1.3.3.4.6l.3.6c.9-.1 1.6-.3 2.2-1-.1.3-.3.5-.3.7-.1.2-.1.5.2.6h.1c.2-.2.6-.2.7-.8h-.1l.1-.1v-.3c.2 0 .5.1.7.1.1.3.1.6.2.8.1.3.4.5.7.3.1 0 .1-.1.2-.2l.1.1c.2.1.4-.1.5-.5 0-.2.1-.4.1-.6v-.1c.3 0 .6.2.8.6 0 0 0 .1.1.1 0 .1.1.3.2.4l.1.1c0 .1.1.1.1.2 0-.1 0-.1.1-.2.1.1.3.2.5.3v-.8c-.1-.2-.2-.4-.4-.5.3-.1.5 0 .7.3.1.3.1.6.2.8.1.4.4.6.7.3.2-.2.3-.2.5-.3v0c.3-.1.7 0 1 .2.1 0 .1.1.2.1.2 0 .4-.1.6 0 .6.1.9-.2 1.1-.6 0 .4 0 .7.5.8.2 0 .4.3.3.5 0 .1-.1.2-.2.3V36h-.1v.1c-.1.1-.1.1-.2.1-.3.1-.6.2-.8.2-.2.3-.3.7-.4.7-.1 0-.2 0-.3.1-.1-.2-.1-.4-.1-.6v-.2c.1 0 .1-.1.1-.2 0-.2-.1-.3-.2-.4v-.1c-.1-.1-.3-.1-.4-.2 0 .1.1.2.1.4-.3.2-.4.4-.4.8.1.3.2.6.5.7-.2.2-.3.4-.4.7v.4c.2.1.5.3.7.4l.7-.7c.8.9.8.9 1.9.8.4-.1.8 0 1.1.3.2.1.4.2.6.4.6-.4 1.1-1.3 2-.6-.3.2-.7.4-.8.7-.2.4-.4.9-.5 1.4h-.1c-.1.2-.3.3-.4.5.1.1.2.2.3.2.1 0 .1-.1.2-.2 0 .4.4.8.8.7.3 0 .5-.2.7-.3.3-.2.7-.2 1 0l-.1.1.1-.1c.3-.2.6-.5 1-.8.1 0 .1.1.2.1-.1.1-.1.3-.3.5.3-.2.4-.3.4-.5.2.1.5.2.6.3.3-.2.6-.3.8-.5 0 .1.1.1.1.2.1-.1.2-.1.2-.2l-.1-.1c.2-.7-.3-1.2-.8-1.9h.8c.2 0 .4-.1.6-.1v.2c0 .3-.2.7.2.9.3.2.6 0 .8-.2.1-.1.2-.3.3-.5 0 0-.1-.1-.1-.2-.2.1-.4.2-.6.4-.2-.3-.1-.6.1-.7.8-.3 1.1-.9 1.4-1.6 0-.1.1-.2.1-.3-.1-.1-.2-.2-.2-.3 0-.1.1-.1.1-.2s-.1-.3-.2-.6c-.1.1-.1.2-.2.2 0-.1.1-.3.2-.3.9-.1 1.4-.9 2.2-1.1v-.1c.3 0 .6-.1.9-.2.3-.2.8 0 1.2-.1.4-.1.5.3.8.5.3-.5.8-.5 1.3-.2.2.1.4.2.6.4.4-.3.8-.6 1.3-1.1.4 0 1.1.1 1.3 1 .4 0 .7-.1 1-.3l.9-.6c.3-.2.6-.1.7.1.1.3-.1.4-.3.5-.1 0-.1.1-.2.2 0 .1.1.2.1.3v.2c-.3.1-.6.2-1 .3.1.3.1.5.2.7.3-.2.6-.6 1.1-.4.3.3.5.7.8 1.1.4.4.7.3 1-.3 0-.1.1-.1.2-.2.1 0 .2.1.3.1.1 0 .2.2.3.2.4-1 .7-2.9 1.1-2.9h1.3c.2 0 .4.6.6.8 0 .6-.6.4-.5.9.2.2.6-.1.5.4 0 .2.2.4.3.6.2.2.4.4.6.5-.1.6-.3 1.1-.2 1.6.2.7.2 1.4.4 2 0 .1.1.1.3.1.4-.4.4-.9.4-1.4 0-.8-.1-1.7-.1-2.5 0-.1.2-.3.3-.4.2-.3 0-.5-.3-.6-.2 0-.3.2-.5-.1.2-.2.4-.4.7-.6-.3-.2-.6-.3-.9-.5.1-.1.2-.2.2-.3h.2c-.1 0-.1 0-.2-.1.2-.6.8-.7 1.3-.8.2 0 .4.2.5.3.9-.5.9-.5 1.9.1-.3.6-.3 1.1.4 1.5.2.1.4.5.6.7.5-1 .5-1 1.5-.7h.1c.6-.2.8.2.9.7.1.5.4.9.9 1 0 .1.1.2.1.2h.3c-.1-.1-.1-.2-.2-.3h-.2v.1-.1c0-.3 0-.5.3-.4.6.1 1-.1 1.4-.6-.5-.2-.9-.4-1.3-.6-.3-.1-.5-.4-.5-.8.3.1.5.5.8.1v-.1c-.2-.4-.5-.2-.8-.2-.1-.3-.2-.7-.2-1 .4-.1.7.3 1.1 0 .4-.3.9-.2 1.5-.1-.3.5-.6.9-.8 1.3.1.5.5.6.8.7.3.1.5 0 .7.4.2.1.5.2.7-.1.2-.6.5-.4 1-.2-.1.1-.2.2-.2.3-.1.1-.2.2-.2.3v.5c.1.1.3.2.4.3v-.1c.1-.4.4-.7.9-.8.2 0 .4 0 .5.3-.1.2-.2.5-.3.7.8-.1.9-.3.7-1-.1-.3-.2-.5-.3-.8.7-.3 1.4-.4 2.1-.4.4.4.8.9 1.4 1.1.2-.1.5-.1.7-.2.6-.1 1.1 0 1.5.7 0 .1.2 0 .2.1.1-.3.2-.7.4-1.2-.1-.1-.3-.1-.4-.3-.1-.1-.3-.2-.1-.4.5 0 1.1.1 1.6.2.1-.1.3-.1.4-.1v.3h-.5s-.1.2-.1.5c.5 0 1-.2 1.4-.1 1 .4 1.9 0 2.9 0 .2 0 .4-.2.6-.2-.9-.2-1.9 0-2.8-.5 0-.3 0-.6-.1-.6-.6-.1-.8-.6-1-1.2.2-.2.4-.3.5-.4.4.3.7.5 1 .8.2 1 .3 1.1 1.2 1.1.5 0 1 0 1.6.1.3.7.7 1.3 1.3 1.5.2-.5.5-1.1.8-1.6.7 0 1.1.5 1.6.8.7.4 1 1 .7 1.9v.4c.6.4 1.3.8 1.7 1.5 0 0 .1 0 .3-.1-.3-.9-.6-1.7-.9-2.6.4-.6.8-1.3 1.7-.7.4.2.4-.4.8-.5.5.2 1.1.4 1.7.6.6-.8.6-.8 1.3-.2-.6.1-.8.3-.7.9 0 .2.4.4.1.4-.5 0-1 0-1.6.1-.1 0-.1.4-.2.5.7.2.9 1 1.1 1.5.2.5.6.9 1 1.2.1.1.4.1.5 0 .1-.1.2-.3.2-.4 0-.2-.1-.5-.1-.7-.3-.1-.5-.2-.7-.3.1-.3.1-.6.2-.8.4-.1.7-.2 1.1-.4.4-.1.6 0 .8.3.3-.1.3-.3.2-.5-.1-.1-.3-.2-.4-.3-.2-.1-.3-.2-.5-.3-.3-.3-.4-.6-.3-1 .1-.3.3-.6.8-.6h.9c.6.1 1.2.1 1.9.2-.1.2-.2.4-.2.6 0 .1 0 .4.1.4.2 0 .4 0 .5-.1.2-.2.4-.4.5-.7.2-.4.5-.6.8-.9.2.3.4.5.6.8.5-.3 1.1-.3 1.6-.3.8 0 1.5-.1 2-.7.5.3 1 .6 1.4.9.4-.1.9-.1 1.3-.2.7-.2 1.4-.3 2.1 0 .3.1.6.1.9 0 .9-.4 1.8-.4 2.7 0 0 .1.1.1.1.2.1.8-.2 1.1-.8 1-.2 0-.5-.1-.7-.2-.3.4-.8.7-.4 1.4h1c.3 0 .6.1.9.2.2.1.4.3.2.6l-.9.3c.1.3.1.6.2.9.1.1.3.3.4.3.3.1.5.1.8 0 .3-.1.5-.2.7-.4l.3-.3c-.1-.3-.2-.7-.2-1 .2-.2.4-.5.6-.7-.2-.4-.6-.5-.7-1 0-.4-.2-.9-.3-1.3 1.3-.6 1.8-.5 2.4.7-.1.2-.2.5-.4.7.1.1.1.2.1.3.5.5.8 1 .4 1.7-.1.2-.1.5 0 .7 0 .3.4.4.6.2.2-.1.2-.3.4-.5.3-.4.8-.8.8-1.1v-1.2c0-.4-.3.4-.7.6.2-.8-.2-1.5 0-2.3.4-.2.7 0 .9.4.4.8.4 1.9 1.2 2.5v.1c-.3.6.3 1 .3 1.6.5.1.8.2 1.1-.1.2-.9-.9-1.4-.5-2.4.7.8.8 1.8 1.2 2.6l-6.2-38.5zM5 22.9c-.1 0-.1-.1 0 0 0-.1 0-.2.1-.2-.1 0-.1.1-.1.2zm9.3 8.8c.1.2.1.5.2.8-.3-.1-.5-.3-.6-.6 0-.1.1-.2.1-.3.1-.1.3 0 .3.1zm.6-3.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1s.1.1.1.2c-.1.1-.2.1-.2.1zm1.7 1c0 .1 0 .1 0 0 0 .1 0 0 0 0zm.5 1c0-.6 0-.6.8-.8-.3.3-.6.5-.8.8zm4-6.1c-.1 0-.1 0 0 0-.1-.1-.1-.2 0-.2l.1.1-.1.1zm.9 2.8c-.3-.5-.1-.9.2-1.4.1.6-.2.9-.2 1.4zm1.5-1.1c-.1-.1-.2-.1-.2-.2s.1-.1.1-.2c.1 0 .2 0 .2.1-.1.1-.1.2-.1.3zm11.8-.8c.1 0 .1-.1.2-.1h.1c.1.1.1.1-.1.1 0 .1-.1.1-.2 0zm-3.9.6c.3-.1.6-.2.8 0 .1 0 .1.1.2.1 0 .2-.2.5-.4.9-.2-.2-.4-.3-.5-.4-.1-.2-.2-.4-.3-.5 0 0 .1-.1.2-.1zm-1.1.1c.1 0 .1 0 0 0 .1 0 .1 0 0 0zm-2.8.4l.1.1c0 .1-.1.1-.1.2 0 0 0-.1-.1-.1.1-.1.1-.1.1-.2zm-.3 1.1h-.1c-.5 0-.6 0-.4-.5.1.2.3.3.5.5zm-.8-1.3c.3.2.2.5.2.7-.2-.1-.4-.2-.7-.4.2-.1.4-.2.5-.3zm-.6 1.5zm-2 .1v-.1.1zm1.7 3.1v-.1h.1c0 .1-.1.1-.1.1zm.8.9s0-.1 0 0c0-.1 0-.1 0 0zm.7-1.7c-.3-.2-.5-.4-.8-.5H26c-1 .6-1.1.5-1.2-.8-.1-1.1-.1-2.1-.1-3.3.2.1.4.1.4.2.1.4.1.7.1 1.1v2.3c.9-.3.9-.3 1.9-.1.1-.5.1-1 .2-1.4h.6c0 .3-.1.6-.1.9 0 .3.1.5.2.8-.5.2-.7.5-1 .8zm4.8 1.3h-.2c0-.1.1-.2.1-.2.1 0 .2.1.3.1-.1 0-.1.1-.2.1zm.8-1.4c-.2.1-.5 0-.8-.1-.2-.1-.4-.3-.7-.5-.2-.1-.4-.3-.5-.4-.4 0-.4.5-.6.7-.2.2-.3.4-.5.6-.2-.3-.3-.7-.5-.9-.6-.6-.5-1.2-.1-1.9.1-.2.4-.3.5-.5-.4-.3-1-.7-1-1 .2.1.5.2.7.1.2-.1.4-.1.7-.1.2 1.5.5 1.5 1.4 2.2.3.3.9.5 1.1.9 0 0 .3 0 .4-.1.1-.1.1-.3.1-.4-.2-.4-.4-.7-.6-1.1.4-.3.6-.3.7 0 .2.3.3.6.4.9.1.8-.1 1.4-.7 1.6zm1.2-2.2c-.2-.4-.5-.8-.8-1.2 0-.1.1-.2.2-.3h1.2c.1.2.3.4.5.7 0 .2 0 .4.1.5l-1.2.3zm1.2 1.3v-.1.1zm.8-1.6c-.3-.2-.3-.9-.9-.6.1-.2.1-.4.1-.6.4 0 .8 0 1.2.1v.1c.1.3 0 .7-.4 1zm.6 1.7c-.1-.1-.1-.1 0-.1v.1c.1-.1 0 0 0 0zm-4.5 7.3s0-.1 0 0c0-.1 0 0 0 0zm5.3-10.8c.1 0 .3 0 .4.1 0 0 0 .1-.1.1h-.3c.1-.1 0-.1 0-.2 0 0 0-.1 0 0zm-.1.7c.2-.1.5-.1.7-.1.3 0 .5-.1.6-.2.1.2.1.3-.1.5-.1.2-.1.5-.2.7-.6.9-.6 1 0 2-.2.2-.5.3-.7.5-.4-.3-.5-.8-.4-1.2.1-.8-.2-1.5.1-2.2zm1.4 5.4s-.1.1-.1.2l-.1-.1v-.4c.1 0 .1.1.2.3zm-1.8.5c0-.4-.1-.8-.1-1.3h1.3c.1 0 .2.2.3.3-.5.1-.5.6-.7.9-.2.1-.5-.4-.8.1zm1.7 1.9l-.3.3c-.1.1-.3.1-.4.1-.1-.1-.2-.3-.3-.5.1-.2.2-.5.3-.6.3-.4.6-.4.8-.3.3.2.2.6-.1 1zm.7.4v-.1.1zm.3-2.7h.2c0 .3-.1.2-.2 0zm.3 2h.1-.1zm0-2c.1-.1.2-.3.4-.5 0 .5-.2.5-.4.5zm4.8-2.8zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2 0-.2.1-.2.1-.2zm-1.8 16.4s.1 0 .1-.1v.2c-.1.1-.2.1-.3.2.1-.1.2-.2.2-.3zm-.2.4c0 .1.1.1 0 .2l-.1.1v-.1c.1-.1.1-.1.1-.2zm.4 2.2c-.1.2-.2.3-.3.4l-.2-.1v-.5c0-.1.2-.2.4-.4.1.3.1.5.1.6zm.3-8c-.2-.1-.4-.2-.4-.5.3 0 .5 0 .8-.1.1-.1.2-.1.3-.1 0 .1-.1.2-.2.3.2.8 1.2 1.2 1 2.3-.7-.6-1.3-.8-1.4-1.7.1 0 0-.1-.1-.2zm.4 3c.3-.2.5-.1.7.1.1 0 .1.2.1.2 0 .1-.1.1-.2.1-.3.1-.5 0-.6-.4zm.6 4c.6.6.6.6.9 1.8-.9-.4-.7-1.1-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.2.6.5.4 1zm-.4-1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1.5-.1 1 .7 1.3-.3.2.4.4.6.5.9-.2.3-.7.3-.7.8zm.8-6.7c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2-.1.2-.2.3-.3.3zm.7 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5 0 .1 0 .1-.1.1zm.6-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.5.2 1-.1 1.4zm.4 7.4c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2c0 .1-.1.2-.3.3zm.5-1.4l.1-.1-.1.1zm.6-6.1c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1-.1-.4-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.5c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 .1-.1.2-.1.2zm.8-.4c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.8-8.1v0zm0 .8v0zm.4-5.8c.1 0 .2.1.2.1-.1 0-.2-.1-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1v-.1l.1.1c.1 0 0 .1 0 .1zm.2 2.6h.1-.1zm.5-10.3H53l-.3-.3V24c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .5 0 .8zm0 5.3v-.1h.2v.2c0-.1-.1-.1-.2-.1zm.6 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.4-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.2 0 .4-.1.6-.1zm-.5 1.5c.2-.5.5-.4.8-.4-.2.5-.4.4-.8.4zm1.2 4.4l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.1 0-.2.1-.4.2zm0-1.3c.1-.2.2-.4.3-.7.3.4-.1.5-.3.7zm1.7 1.2v-.1.1zm-.3-1.6c.5-.8.5-.8 1.1-.3-.3.2-.6.2-1.1.3zm2.3 4.9c0-.1 0-.1 0 0v-.2s.1 0 0 .2c.1-.1.1-.1 0 0zm.1-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6v-.2l.1-.1c.1 0 .1.1.1.2-.1 0-.2 0-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c-.1-.1-.2-.1-.2-.2zm.9 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c.1.3-.1.3-.3.3zm1.3 1.9s0-.1 0 0c0 0 .1 0 .1.1l-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3 0 .5 0 .7zm1.5 4.4zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.1.1-.2.1zm.6-15.7c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2 0 .4-.1.6zm.6 13.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.2.1-.2.1zm.5-16c0 .1 0 0 0 0zm1.8 16.1c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1.1-.1.2-.1.2zm3.8-.3zm-.5-5.2s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zM71 15.6c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.2.1-.2.1-.3zm-.4 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c0-.2.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1 0 .1 0 .2.1zm-.3 4.2c0 .1 0 .1-.1.1l.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4 0-.1-.1-.2-.1-.2zm1.5 7.2c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.2-1.1.3-1.5.4zm5.8-12c.1 0 .1 0 0 0 .1 0 .1.1 0 0 .1.1 0 0 0 0zm-.7 3.9c.1 0 .1 0 0 0 .1.1.1.1 0 .1.1 0 0 0 0-.1 0 .1 0 0 0 0zm-.3 4.7c.1 0 .1 0 0 0l.1.1s-.1 0-.1-.1zM72.9 16v-.1l.1.1h-.1zm1 19c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.7-1.5.6-2.2.4zm2.6 1.3c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2 0 0 0 .1-.1.2zm.9-9.5h.1v.2c-.1 0-.1 0-.2-.1.1 0 .1-.1.1-.1zm-.1 5.1c0 .1.1.1 0 0v0c0 .1 0 .1 0 0zm.2 3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.2.6-.2.9-.2.2 0 .3.1.8.9-.6.1-1.1.1-1.6 0zm.8-14.4c-.1-.1-.1-.3 0-.4V20v.5zm0 6.2s0 .1-.1.1c0 0 0-.1.1-.1-.1 0-.1 0 0 0zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.3-.1-.5-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.4-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1 0-.1.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.2.6-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-3.3.3zm-.5-.3c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.2 0 .5-.1.8-.2zm-9.7-6.4c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.1-.2.2-.3zm-5-7.1v0zM94 18.2l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3 0-.1-.1-.2 0-.2zm-1-.9c0 .1 0 .1 0 0 0 .1 0 .1 0 0zm-1.1.1zm-2.4 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zm-1.3-12.8s.1 0 0 0c.1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3 0 0 .2.1.3.2zM84.8 14s0 .1 0 0zm-1.7 17.7v.1H83s-.1 0-.1-.1c.1.1.2.1.2 0zm-1.5-9.6v-.2s.1 0 .1.1l-.1.1zm.7 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1V27zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.6-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8 0 .3-.2.6-.8.6zm1.1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.2-4.4zm2 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.6-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.5.2-.8.3zm1.4 1.9c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .2-.1.2zm1-2.1c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.5c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.8-.5-1.3-.4zm1.5 4.5v.1h-.2v-.1c.1-.1.1-.1.2 0zm-.6 3.9c-.1 0-.1 0 0 0-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.2 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.2-1.7-.2zm1.9.2s-.1 0 0 0c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.3-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.1-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.2.8-.5 1-1 1zm2 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0-.1 0 0zm-.3-3.1s-.1-.1-.1-.2h.4s.1.1.1.2h-.4zm.3-12c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.3 9.3zm-.2-9.6c.1 0 .2.1.3.2-.2 0-.3-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .1-.1.2-.1zm0 9.4s-.1 0-.1-.1c.1 0 .1 0 .1.1 0-.1 0 0 0 0zm.3-8h-.1v-.1c0-.1.1-.1.2-.2-.1.2-.1.2-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2c-.2-.1-.4-.1-.7 0zm.5 6.6zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.7s-.1 0 0 0c-.1 0-.1-.1 0 0-.1-.1 0-.1 0 0zm1.2-2c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.4.1-.5-.2-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.7-.2-1.3-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2s-.1 0-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.4.3-.9 0-1.3.1zm1.3-6.9c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7h.2c-.1 0-.1-.1-.2-.1 0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2.1.4.2.9-.1 1.5zm.6 4h-.1c0-.1-.1-.1-.1-.2h.2c.1 0 .1.1 0 .2zm.5-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.7s-.1 0 0 0l-.1-.1c.1 0 .1 0 .1.1zm0-2.3c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.4c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.6-1.3-.9zm4.9 4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c-.1 0-.1 0 0 0-.1 0-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm-3-3.4c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.5 0 .8-.3 1.1zm1.4 3.2c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.7.3.4.9.5 1.4zm.3-2.1c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.2-.6-.7-.7-1.5zm2.5 4.8c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.3.7.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s-.1 0 0 0c0 0 0-.1 0 0 0-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .1-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-1-.1-1.7.2-2.3.5zm1.6 5.9zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.2.3-.4.5-.6.8zm.7-4.3s-.1 0 0 0c-.1 0-.1 0 0 0-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.3-.3-.4-.5-.5-.6zm4.5 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1-.1-.2 0-.4 0zm-1.1-4.9c.1-.2.3-.2.4 0l.7.7c-.7.2-.7.2-1.1-.7zm2.8.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.3.4.6.8.1 1.1zm-.8-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.7.8-1.4.3-1.9.5zm7.5-1.1c0 .1 0 .1-.1.1 0 0 0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1 0-.1.1-.1zm-3.6 11.7c-.1 0-.1-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1l-.1.1zm1 .6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.5.5 0 .9 0 1.3zm-1-1.9c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.2-1 .2-1.5.2zm2.1 4.2c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.7c0-.4 0-.4.5-.6-.2.3-.3.5-.5.6zm.5-.5c.3-.2.5-.4.9-.6-.2.6-.2.7-.9.6zm.4-5.6h.2v.1h-.2v-.1zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.2.4-.3.6-.3.9zm.4 2.1V31s0-.1.1-.1c-.1 0 0 .1-.1.2.1 0 0 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.2-.4.4-.6 0zm.8 5.6V34c.1 0 .1-.1.2-.1v.1s-.1 0-.2.1zm-.2-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm-.1-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.2-.2-.6-.4-.9-.5zm1.1 2.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1-.2.2zm14.2 7.8c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.1-.1.2-.2.3-.1zm-13.4-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.3 0-.6-.1-.5-.5zm1.2 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6 0-.3.1-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.5 0-1 .2-1.4.7zm1.1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3 0 .2-.3.4-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.3-.7.4-1.1.4zm2.6-.4l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.1-.4.4-.1.6-.3zm-.4 6v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7 0-1.4.1-2 .1zm.7 3.2v-.1.1zm.5 1.6V36h.1c.1.1.1.2.2.3-.1-.1-.2-.1-.3-.1zm.5.2c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1-.1.1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.2-3v-.1.1zm.6-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2.1.2.2.4.1.5zm.7 2.2c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5-.1.1-.2.2-.3.2zm3.6-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.2-.5.5-.6zm-.7 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.3-.6.7-1 1.1-.8zm-2.3 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .1-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1c-.1-.1-.1-.1-.2-.1zm1.8 1.9l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-1-1.9c.4-.6.8-.4 1.3-.4 0 1.1-.1 1.1-1.3.4zm1.4-1.4c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.1.4.1.5.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.2 1.5c-.1 0-.1 0 0 0-.1-.1-.1-.1 0-.2h.1c-.1.1-.1.2-.1.2zm1.1-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.3.2.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .1-.1.2-.1zm-7.2-.3l.1.1c-.1 0-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.2-.7.1zm.7-.1c0-.2.1-.4.1-.5H160.6c-.1.2-.2.4-.4.5zm5.2 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.3.9-.5 1.4zm3.5 1.2c0-.2 0-.4-.1-.7.3.4.2.6.1.7zm1.8-.9c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.3.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1-.1-.1-.1 0-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.2c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1v.2zm0-2.3c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c0-.3-.2-.5-.3-.7zm1 1.7c-.2-.4-.4-.7-.5-1.1.4.2.5.6.5 1.1zm.2.8c-.4-.2-.1-.6-.2-.8.5.4.5.4.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c-.1-.1-.1-.2-.1-.4-.1.1 0 .1 0 0zm-.3 2.1c.4-.3.6 0 .8.1-.3 0-.5-.1-.8-.1zm.9 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2.1.3-.2.4-.4.6zm.4-1.4v-.2c.1.1.1.1 0 .2.1-.1.1 0 0 0zm3-.1h.2v.1c-.1 0-.1.1-.2.1v-.2zm-1.8-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.2-.3-.2-.6-.2-1zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2 0-.3.1-.3.1zm.6.9c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zm1.2-1.3c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1c-.1-.1-.2-.1-.2-.2h.3c-.1 0-.1.1-.2.1 0 .1.1.1.1.1zm.1-.1c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm2.2-3.3zm-.7 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.2.1-.3.1-.3zm.1 2c0-.1 0-.2-.1-.3 0 0 .2-.1.2 0s.1.2.1.2-.1 0-.2.1zm.6-3.8s0-.1 0 0c-.1-.1-.1-.1 0-.1 0 0 .1 0 0 .1.1-.1.1 0 0 0zm.8 3c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.2 0 .4 0 .1-.1.2-.1.2zm1.6-.1v-.2c0-.2.1-.3.2-.4 0 .2 0 .4.1.6h-.3zm2.1.1zm12.7 4.3c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-3.3.3c.1.1 0 .1 0 .1-.1 0-.1-.1 0-.1-.1 0-.1 0 0 0zm-1-2.1c.1 0 .1.1.1.2-.1 0-.1.1-.2.1 0-.1-.1-.1-.1-.2s.1-.1.2-.1zm-.1 1.4zm-2.5-4.1c0 .1.1.1.1.2-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1h.2zm-3.6.7s-.1 0 0 0c-.1 0-.1 0 0 0-.1-.1 0-.1 0 0zm-1.4 5.6zm-.1.2l.1-.1v0c0 .1.1.2.1.3 0-.1-.1-.1-.2-.2zm.2.5h-.1c.1-.1.1-.2.2-.3.2.1.3.2.5.2-.2 0-.3.1-.6.1zm5.8-2.2c.1.5 0 1-.3 1.4-.5.1-1 .1-1.4.2-.1-.2-.2-.4-.3-.5-.3 0-.5.2-.5.5v.1c-.6 0-1.1-.1-1.7-.1-.4.4-.5.5-.8.6.1 0 .1 0 .2-.1-.2-.3-.3-.6-.5-.8l.3-.3c0-.7-.3-1.1-.6-1.7.1.1.3.1.6.2l-.6-.6c.8-.1 1 0 1.1.9 0 .3-.1.6.2.7.4-.3.5-.3.7-.9 0-.1.1-.1.1-.2v-.1c-.3-.5-.6-1.1-.8-1.8h.2c.2-.1.4-.1.5-.1-.1.1-.1.3-.1.5 0 .5.3.8.8.8.4 0 .7-.3.7-.7 0-.2-.1-.4-.3-.6.1-.1.2-.2.1-.3-1-.3-1.2-1.1-1.2-2.1 0-.2 0-.3.1-.4.2-.2.4-.3.7-.5h.1c0 .2.1.4.1.6.2 0 .3 0 .4.2.1.5.2 1.1.6 1.4 0 .7-.2 1.3.3 1.8.6-.7.6-1-.1-1.7.1.1.2.1.3.2.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.2-.1.3-.1.5-.1 0 .3 0 .6-.1.9-.1.2 0 .4 0 .6-.1 0-.2-.1-.3-.1 0 .3-.2.6.2.9.1 0 .1-.1.2-.1v.1c0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.2.6 0 1.2.1 1.8zm1.5 3.6v.2c.1.1.1.2.2.4-.3 0-.5.1-.8.6-.2.1-.4.2-.4.3v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2 0-.3v-.2c.2 0 .4.1.6.2h-.6zm0-2.1c-.1 0-.1 0 0 0-.1-.2-.1-.4-.3-.6v-.1c.5 0 1-.1 1.6 0h.5c0 .3 0 .5-.2.7-.6.1-1.1-.2-1.6 0zm1.9 2.6c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2-.2-.1-.3 0-.5 0zm1.9-2.2c-.1-.1-.3-.2-.4-.2h-.2c-.2-.2-.5-.3-.8-.4 0-.3 0-.7-.1-1l.1-.1.4.4s.1 0 .1-.1c.2.1.5.3.7.4.4.1.8.2 1.1.6-.3.2-.6.3-.9.4zm.6-1.6c.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0-.1.1-.1.1-.2.1.2.2.5.3.8-.2 0-.3-.1-.4-.2zm1.2 2.4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1.1 0 0 0 0 .1zm1.5-6.8c.1 0 .2-.1.3-.1 0 .2 0 .3-.1.4-.1-.1-.1-.2-.2-.3zm-1.3 2.8l.3-.3c.1-.1.1-.2.2-.4h.4c.1.1.2.1.3.2-.3.3-.4.4-.6.9-.2-.1-.4-.2-.6-.4zm.8.5c0 .1-.1.1-.2.1 0-.1 0-.1-.1-.2.1 0 .2.1.3.1zm.1 2.4c.2.4.2.5 0 .9-.1.1-.2.1-.3.2-.1-.5-.2-.9-.4-1.3l.6-.6c.2.3.4.4.8.5-.2.1-.5.2-.7.3zm1-1.4v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 0 .1.1.2.1-.1.2-.2.3-.3.5-.2 0-.5.1-.7.1v-.4c0-.1.1-.2.1-.2 0-.3 0-.6.1-.9.2 0 .4.1.6.1v-.1c0-.1.1-.1.1-.2 0 .1 0 .2.1.3l.3.3c-.1.1-.2.3-.3.5zm.7 2.7c-.1-.1-.1-.1 0 0l-.1-.1c0-.4 0-.7.1-1.1.1.1.1.4.1.8 0 .1-.1.2-.1.4zm.9-1.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .2-.2.3-.2.4zm1.4 2.9zm2.2-7.4c0 .1-.1.1-.1.2s-.2.1-.3 0v-.2h.4zm-.2 1.6zm-.3-1.7c-.1 0 0 0 0 0zm.6 8.1c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.2.2-.2.4zm-.5-3.1h-.2v-.3c.2 0 .5.1 1 .2-.4.1-.6.1-.8.1zm1.7 7.1c.1 0 .1 0 .1-.1v.1h-.1zm.2-2v.6c-.3-.3-.1-.5 0-.6zm0-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.7-.8c0-.1.1-.1 0 0 .1-.1.1-.1 0 0 .1-.1.1-.1 0 0zm.2 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.4-5.3zm1.7 6.1s.1 0 .1-.1c0 .2 0 .3.1.5 0-.1-.1-.2-.2-.4zm.4.7c0-.1-.1-.1-.1-.2.1.1.1.1.1.2.1-.1.1 0 .1.1 0-.1-.1-.1-.1-.1zm-.4 3.8zm1.1-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3.1 0 0 .1-.1.2zm1.1-.5v-.1h.1c0-.1 0 0-.1.1.1-.1 0-.1 0 0zm.7-.2c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2s0 .1-.1.1zm.6 1.3c0-.1-.1-.1-.1-.2v-.1s.1 0 .1-.1l.1.1c0 .2-.1.3-.1.3zm5.9-8.3c0 .1-.1.2-.1.3l-.1.1c-.2-.2 0-.4.2-.4zm2.9-4.6zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2.1-.1.1-.2.1-.2zm-.3 18.1c.6.6.6.6.9 1.8-.9-.5-.7-1.2-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.1.6.4.4 1zm-.4-1.1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1v0c.4 0 .9.6 1.2-.3.2.4.4.6.5.9-.1.3-.6.4-.6.8zm.8-6.6c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2l-.3.3zm.8 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5l-.1.1zm.5-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.4.2.9-.1 1.4zm.5 7.3c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2-.3.3zm.5-1.3l.1-.1-.1.1zm.5-6.2c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1 0-.3-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.4c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 0-.1.1-.1.2zm.8-.5c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.8-8.1v0zm.4-5c.1 0 .2.1.2.1-.1 0-.2 0-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3v-.1c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .6 0 .8zm.1 5.3v-.1h.2v.2c-.1 0-.2-.1-.2-.1zm.5 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.5-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.3 0 .4 0 .6-.1zm-.4 1.5c.2-.5.5-.4.8-.4-.3.6-.5.4-.8.4zm1.2 4.5l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.2 0-.3.1-.4.2zm0-1.4c.1-.2.2-.4.3-.7.2.5-.1.5-.3.7zm1.6 1.2v-.1.1zm-.3-1.5c.5-.8.5-.8 1.1-.3-.3.1-.6.2-1.1.3zm2.4 4.8c-.1 0-.1 0 0 0l-.1-.1s.1 0 .1.1c0-.1 0 0 0 0zm0-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6V32l.1-.1c.1 0 .1.1.1.2-.1 0-.2.1-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c-.1 0-.2-.1-.2-.2zm1 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c0 .3-.2.3-.3.3zm1.2 1.9s.1 0 .1.1c0-.1-.1-.1-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3 0 .5 0 .7zm1.5 4.5zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.6-15.8c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2 0 .4-.1.6zm.6 13.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.1 0-.2.1zm.6-16.1c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1.1-.1.1 0 0zm-.1 0c0 .1 0 .1 0 0zm1.1-5.7c-.1-.1-.2-.2-.2-.3.1 0 .2.1.2.1.1.1.1.2 0 .2.1 0 0 0 0 0zm.7 21.9c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1 0-.1.2-.1.2zm3.8-.3zm-.5-5.3s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zm-.7-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.1.1-.2.1-.3zm-.4 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c0-.1.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1.1.2.1.2.1zm-.3 4.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4l-.1-.2zm1.5 7.3c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.1-1 .2-1.5.4zm6.8-8.6h.1v.2c-.1 0-.1 0-.2-.1 0 0 0-.1.1-.1zm-.2 5.2c.1 0 .1 0 0 0v0zm-.7-8.6s-.1 0 0 0c-.1 0-.1 0 0 0zm-.7 3.8s0 .1 0 0c.1.1.1.1 0 .1 0 .1-.1 0 0-.1-.1.1-.1 0 0 0zm-.4 4.7c.1 0 .1 0 0 0l.1.1s-.1 0-.1-.1c0 .1 0 0 0 0zm-2.6-15.9v-.1l.1.1h-.1zm1 19.1c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.6-1.5.6-2.2.4zm2.6 1.2c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2.1.1 0 .1-.1.2zm.1-25.4v-.1c.1 0 .1.1 0 .1zm.5-.3c-.1 0-.2.1-.3.1 0-.1 0-.3.1-.4 0 0 0-.1.1-.1 0 .2 0 .3.1.4zm.5 24.3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.7.1-1.2.1-1.6 0zm.7-14.4c-.1-.1-.1-.3 0-.4v-.1.5zm0 6.2s0 .1-.1.1l.1-.1c-.1 0 0 0 0 0zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.2 0-.5-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.5-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.1.7-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1 0 .1-.1zm-3.2.3c-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm-.6-.2c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.3 0 .5-.2.8-.2zm-9.7-6.5c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.2-.2.2-.3zm-5-7.3s.1 0 0 0c.1.1.1.3.1.4-.1-.1-.2-.2-.1-.4-.1.1 0 0 0 0zm-5.5 5.7l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3v-.2zm-.9-.8c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm-1.2 0zm-2.4 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zm-1.3-12.8c.1 0 .1.1 0 0 .1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3.1 0 .2.1.3.2zm-4.2-17.8c0 .1 0 .1 0 0 0 .1 0 0 0 0zm-1.6 17.8v.1h-.1s-.1 0-.1-.1h.2zm-1.6-9.7v-.2s.1 0 .1.1-.1.1-.1.1zm.7 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1v-.4zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.7-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8-.1.4-.3.6-.8.6zm1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.3-4.4zm1.9 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.7-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.5.2-.8.3zm1.4 2c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .1-.1.2zm1-2.2c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.4c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.8-.5-1.3-.4zm1.5 4.4v.1h-.2v-.1h.2zm-.6 3.9c-.1 0-.1 0 0 0-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.2 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.1-1.7-.2zm1.9.2c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.4-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.1-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.1.8-.5 1-1 1zm2 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0 0 0 0zm-.3-3s-.1-.1-.1-.2h.4s.1.1.1.2c-.2-.1-.3 0-.4 0zm.3-12.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.3 9.4zm-.2-9.7c.1 0 .2.1.3.2-.2 0-.2-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .2 0 .2-.1zm.1 9.4s-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm.2-8h-.1v-.1c0-.1.1-.1.2-.2 0 .2-.1.3-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2h-.7zm.5 6.6c0 .1 0 .1 0 0 .1 0 0 0 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.8s-.1 0 0 0c-.1-.1-.1-.1 0 0-.1-.2 0-.1 0 0 0-.1 0-.1 0 0zm1.2-2.1c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.4.2-.4-.1-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.7-.1-1.3-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2s0 .1-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.4.3-.9.1-1.3.1zm1.3-6.8c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7l.1-.1c0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2 0 .3.1.9-.2 1.5zm.7 3.9h-.1c0-.1-.1-.1-.1-.2h.2v.2zm.4-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.8c0-.1-.1-.1 0 0l-.1-.1c.1-.1.1-.1.1.1 0-.1 0-.1 0 0zm0-2.4c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.3c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.7-1.3-.9zm4.9 3.9c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c0 .1-.1.1 0 0-.1 0-.1 0-.1-.1 0 .1 0 0 .1.1zm-3-3.3c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.4 0 .7-.3 1.1zm1.4 3.1c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.8.3.4.9.5 1.4zm.3-2c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.3-.6-.8-.7-1.5zm2.5 4.7c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.3.8.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s0-.1 0 0c0-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .2-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9 0-1.6.2-2.3.5zm1.6 5.9c.1 0 0 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.1.3-.4.6-.6.8zm.7-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.4-.4-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.2 0-.3.1-.4 0zm-1.2-4.8c.1-.2.3-.2.4 0l.7.7c-.7.1-.7.1-1.1-.7zm2.8.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.3.3.6.8.1 1.1zm-.8-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.6.8-1.3.2-1.9.5zm7.5-1.2s0 .1 0 0c0 .1 0 .1-.1.1s0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1.1-.1.1-.1zm-3.6 11.7s-.1-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1l-.1.1zm1.1.6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.4.6-.1.9 0 1.3zm-1.1-1.8c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.1-1 .1-1.5.2zm2.1 4.1c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.8c0-.4 0-.4.5-.6-.2.2-.3.4-.5.6zm.5-.6c.3-.2.5-.4.9-.6-.2.7-.2.7-.9.6zm.4-5.6h.2v.1h-.2V34zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.2.4-.2.7-.3.9zm.4 2.1v-.1s0-.1.1-.1c-.1.1 0 .1-.1.2.1 0 0 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.3-.4.4-.6 0zm.9 5.6v-.1c.1 0 .1-.1.2-.1v.1c-.1 0-.2.1-.2.1zm-.3-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm0-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.3-.2-.6-.3-.9-.5zm1 2.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1.1-.2.1-.2.2zm14.2 7.7c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.1-.1.2-.1.3-.1zM314 34.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.2 0-.6 0-.5-.5zm1.2 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6 0-.3.1-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.5 0-1 .2-1.4.7zm1.1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3.1.2-.3.5-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.4-.7.4-1.1.4zm2.6-.3l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.2-.5.4-.2.6-.3zm-.4 5.9v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7.1-1.3.1-2 .1zm.8 3.3v-.1.1zm.4 1.5v-.2h.1c.1.1.1.2.2.3 0-.1-.2-.1-.3-.1zm.5.3c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.1 0-.2.1zm.2-3v-.1.1zm.7-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2 0 .1.1.3.1.5zm.6 2.1c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5 0 .1-.2.2-.3.2zm3.6-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.3-.5.5-.6zm-.6 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.2-.6.6-.9 1.1-.8zm-2.4 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .2-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1s-.1-.1-.2-.1zm1.8 2l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-.9-1.9c.4-.6.8-.4 1.3-.4-.1 1-.2 1-1.3.4zm1.3-1.5c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.2.4.1.6.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.2 1.5s-.1 0 0 0c-.1-.1-.1-.1 0-.2h.1c-.1.1-.1.2-.1.2zm1.1-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.3.3.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .2-.1.2-.1zm-7.2-.3s.1 0 0 0l.1.1c-.1.1-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.3-.7.1zm.7-.1c0-.2.1-.4.1-.5H341.9c-.1.2-.2.4-.4.5zm5.3 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.4.9-.5 1.4zm3.4 1.3c0-.2 0-.4-.1-.7.3.3.2.5.1.7zm1.8-1c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.3.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1 0-.1-.1.1-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.3c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1.1 0 0 .1 0 .2zm0-2.4c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c0-.3-.2-.5-.3-.7zm1 1.7c-.2-.4-.4-.7-.5-1.1.4.2.5.6.5 1.1zm.2.9c-.4-.2-.1-.6-.2-.8.5.3.5.3.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c-.1-.1-.1-.3-.1-.4zm-.3 2c.4-.3.6 0 .8.1-.3 0-.5 0-.8-.1zm1 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2 0 .3-.3.4-.4.6zm.3-1.4v-.2c.1.1.1.1 0 .2.1 0 .1 0 0 0zm3.1-.1h.2v.1c-.1 0-.1.1-.2.1s-.1-.1 0-.2zm-1.9-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.1-.3-.2-.6-.2-1zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2.1-.2.1-.3.1zm.6 1c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zm1.2-1.4c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1.1c-.1-.1-.1-.2-.2-.3h.3c0 .1-.1.2-.1.3zm2.4-3.5s-.1 0 0 0c-.1 0 0 0 0 0zm-.8 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.1.1-.3.1-.3zm.1 2v-.4s.2-.1.2 0 .1.2.1.2c-.1.1-.2.2-.3.2zm.7-3.8c-.1 0-.1 0 0 0-.1-.1-.1-.1 0-.1-.1 0 0 0 0 .1 0-.1 0 0 0 0zm2.5.9c0 .1 0 .1-.1.2.1-.1.1-.2.1-.2zm-1.8 2.2c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.3.1.4-.1 0-.2.1-.2.2zm.6-1.8c-.1 0-.2 0-.2-.1-.1-.1-.2-.3-.2-.4.1 0 .1-.1.2-.1.1.1.2.3.3.4 0 0 0 .1-.1.2zm.5 1.9c-.2-.4 0-.5.1-.7 0 .2 0 .4-.1.7zm.2-.7c0-.5-.1-1.1.5-1.4.1.6.1 1.2.2 1.8-.5.1-.5-.3-.7-.4zm.8-3.7l-.2-.2c.1-.1.2-.1.4-.1 0 0-.1.1-.2.3zm1.6 4.2zm.6-2.3c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1 0 0 .1.1.1.2 0 0-.1 0-.2.1zm.9 1c.1-.1.2-.3.3-.3 0 0 .1.1.2.1-.1.1-.2.3-.3.4 0-.1-.1-.1-.2-.2zm.5 1.9c0 .1-.1 0 0 0-.1-.1-.1-.2 0-.3.1 0 .1.1.2.1-.1.1-.1.2-.2.2zm.4-2.9l-1.2-2.1c.1-.2.1-.3.2-.5h.5v.5c.1.4.6.5.5 1-.1.3.2.7.2 1-.1.2-.2.2-.2.1zm.5-2.2s-.1 0 0 0v-.2.2zm.9.6c-.2-.3-.2-.5 0-.8h.1c0 .3 0 .5-.1.8zm1.4 2.5c-.1 0-.2-.1-.2-.1 0-.2.1-.5.2-.7.2.1.3.1.3.2 0 .2-.1.5-.3.6zm.4-3.7c0 .1 0 .1 0 0-.1.1 0 .1 0 0zm.1 5s0-.1-.1-.1h.2c0 .1.1.1.1.2-.1 0-.2 0-.2-.1zm2-4.3c-.1 0-.1-.1-.2-.1l.1-.1c.1 0 .1.1.1.2zm.3 1.4c-.1 0-.1-.1-.2-.1v-.1c.1 0 .2 0 .2.1v.1zm.5.9zm4.1 4.6c.1 0 .3.2.4.3.1.2-.2.5-.4.4-.1-.1-.2-.2-.5-.4.2-.1.4-.3.5-.3zm.1 1.9c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-1-3.7zm0 .8s.1.1 0 .1c0 0-.1 0-.1.1 0 0-.1 0-.1-.1.1 0 .2 0 .2-.1zm-.3 2.3c0 .1 0 .1-.1.1l.1-.1c-.1 0 0 0 0 0zm-.7-1.4c-.1 0-.1 0 0 0l-.1.1c0-.1 0-.1.1-.1zm-1.3 2.2c.1.1 0 .1 0 .1s-.1 0 0-.1c-.1 0 0 0 0 0zm.8 4.1c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2h-.5zm1.5-2c-.4-.5-1.1-.8-1.6-.6-.7.3-1.3-.2-2 0-.3.1-.4-.3-.3-.7.5 0 1-.1 1.6 0 .6.1.9-.1 1.2-.6.4.3.8.5 1.2.7.4.1.8.2 1.1.6-.4.3-.7.4-1.2.6zm1-2.3c.1.2.2.5.3.8-.6-.3-.6-.3-.3-.8zm2.5-3.8c-.2.2-.4.3-.6.6-.3-.1-.6-.3-.9-.4.1-.5.5-.5 1.5-.2zm-1.6 3.6s-.1 0-.1-.1V36s.1 0 .1.1v.1zm.2 3.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1.1 0 0 .1 0 .1zm.3-2.1h-.2v-.1c.1 0 .1 0 .2.1 0-.1 0 0 0 0zm-.3-2.4c.5-.1 1-.1 1.7-.2-.6.5-.6.5-.9 1.1-.4-.2-.8-.3-.8-.9zm2 .8c0 .1 0 .2.1.3l.3.3c-.2.3-.3.7-.5 1-.2 0-.5.1-.7.1 0-.3 0-.6-.1-.9 0-.3-.2-.5-.2-.8.4.1.7.2 1.1.2v-.1c-.1.1 0 0 0-.1zm0-1.7c0-.1.1-.2.1-.2.1 0 .2 0 .2.1v.2c-.1 0-.2 0-.3-.1zm.8 5.6c-.1-.1-.3-.1-.4-.2-.2-.2-.3-.5-.6-.9-.3.3-.6.6-1 .9-.1-.5-.2-.9-.4-1.3l.6-.6c.2.4.6.5 1 .6.8.1.8.2.8 1.1.1.1 0 .2 0 .4zm.1-6.4c-.1.2-.5.3-.8.1-.2-.1-.4-.4-.6-.6.3-.1.6-.3 1-.4.1 0 .2.1.2.1.1.2.3.4.2.8zm1.7-15.4v.1-.1zm-.4 1.2c.1 0 .2 0 .2.1.2.2.1.4 0 .6-.1-.2-.2-.3-.3-.5.1-.1.1-.1.1-.2zm-.7 5.2c.1 0 .1-.1 0 0 .1 0 .1 0 .2.1h-.2v-.1zm.2 11zm0 3.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .3-.2.4-.2.4zm.2-8.8zm.3 2.8v-.1.1zm.2-11.6s-.2 0-.2-.1c-.1-.4-.3-.8.2-1.1 0 .1.1.2.1.2.1.4.3.8-.1 1zm6.3-9.3zm-1.1-.1c-.1 0-.2.1-.4.1v-.1h.4zm-1.2 0c.1.1 0 .3 0 .4-.1-.1-.3-.2-.3-.4h.3zm-.6 3c0 .1-.1.3-.1.4-.2.3-.4.6-.6 1-.1-.9 0-1.4.4-2.3.3.2.3.6.3.9zm-.4-.9c-.1 0-.2 0-.2-.1v-.2h.1c.1.2.1.3.1.3zm-.8-2.1h.4c.1.2.2.3.3.5l-.6.9c-.1.1-.1.1-.6-.1.2-.4.3-.9.5-1.3zM389 14s.2.1.1.2-.1.2-.2.2c0-.1-.1-.1-.2-.2.1-.1.2-.1.3-.2zm-.9 27.2zm.1-28.5zm.5 19.6c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.2.1-.2.1zm-.2-14.9c0-.2.1-.5.1-.7 0-.3-.1-.5-.2-.8.2 0 .4-.1.4-.1.4.6 1 1.2.8 2.2-.3-.2-.7-.4-1.1-.6zm.8 1.5zm-.1 6.8c.3-.2.6-.3.9-.5 0 .2.1.5.1.7 0 .4-.2.6-.5.7-.3 0-.5-.2-.6-.6 0-.1.1-.2.1-.3zm1.3 6.8s.1 0 .2.1c0 .5-.2 1-.5 1.4 0 .1-.2.1-.3 0l-.1-.2c.2-.4.4-.8.7-1.3zm-.3-9.9zm-.1 12.8zm-.2-10.8c0-.1.1-.1.1-.2.1.1.3.1.2.2 0 .2-.1.4-.1.6-.1-.2-.2-.4-.2-.6zm.5 17.2c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.1.3-.2.4zm-.5-3h-.6l-.1-.1c.5-.3.5-.3 1.6 0-.5 0-.7 0-.9.1zm1.1-15.1c-.1 0-.1-.1-.1-.2s.1-.1.1-.2c.1.1.1.2.2.3l-.2.1zm.6 22.1c.1 0 .1 0 .1-.1v.1h-.1zm.2-2v.6c-.2-.3-.1-.4 0-.6zm0-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.7-.8h-.2c.1 0 .2-.1.2 0 .1-.1.1 0 0 0zm.2 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.1-24c-.2.4-.4.2-.8.2.1-.4.2-.6.3-.9h.3c.3.1.3.4.2.7zm-.4-4.6c0 .4-.1.7 0 .9.1.6 0 1.1-.3 1.6-.4.7-.6 1.6-.9 2.4-.1-.2-.2-.4-.4-.6-.4-.1-.5.2-.5.5.1.5.1.9 0 1.4-.1.3-.3.3-.5.2 0-.1-.1-.2-.1-.3-.2-1.7-.2-1.7 1.2-2.8.4-.3.6-.6.7-1.2 0-.5.1-1 .3-1.4.4-.8.3-1.7 0-2.5-.1-.3-.2-.6-.3-1v-1.1c.3-.1.5-.2.8-.3 0 .1.1.2.1.2.3.6.1 1-.4 1.2.2.5.3.9.5 1.3.4.2 1 0 1.3.6l-.3.9c-.1.1-.3.2-.5.3-.3.1-.4 0-.7-.3zm.7 23.3zm.4-20.3c-.1 0-.1-.1-.2-.1 0-.1.1-.2.1-.2.1 0 .1.1.2.1-.1 0-.1.1-.1.2zm.2-1.6c0 .1-.1.1 0 0zm.1-.1c-.1-.4-.2-.7-.3-1.1.2.4.5.7.3 1.1zm.4-3.7c.4 0 .5.4.7.8-.8-.1-.8-.1-.7-.8zm.7 31.8s.1 0 .1-.1c0 .2 0 .3.1.5-.1-.1-.2-.2-.2-.4zm.3.7c0-.1-.1-.1-.1-.2.1.1.1.1.1.2.1-.1.1 0 .1.1l-.1-.1zm.2-32.7s0-.1 0 0l.1-.1c-.1 0-.1.1-.1.1zm-.6 36.5zm1.2-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3 0 .1-.1.1-.1.2zm.5-35.2c-.3.1-.8-.2-1 .3 0-.2 0-.4.1-.6.1-.2.4-.3.5-.3.4 0 .4.3.4.6zm.5 1.2v.1h-.1l.1-.1zm0 33.5V47h.1l-.1.1c.1 0 0 0 0 0zm.2-29.6s0-.1-.1-.1l.2-.2.1.1-.2.2zm.5 29.4c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2.1.1 0 .1-.1.1zm.1-32.7v-.1.1zm.5 34.1c0-.1-.1-.1-.1-.2s.1-.1.1-.2c0 .1.1.1.1.2 0 0 0 .1-.1.2zm1-30.5h-.1c0-.1 0-.1.1-.2h.1c-.1.1-.1.1-.1.2zm.6-5c.1-.3.1-.5.2-1 .3.5.5.8.7 1.2-.3 0-.5 0-.9-.2zm4.3 16.8c.1 0 .2 0 .2.1.2.2.4.4-.1.7 0-.3-.1-.6-.1-.8zm.2-9.5c.1-.2.2-.3.4-.4 0 0 .2 0 .2.1v.2c-.3 0-.4 0-.6.1zm1.3 1.8zm-1.6-1.6c.1-.1.2-.1.3-.2 0 .1 0 .2-.1.4 0 0-.1.1-.2.1 0-.1-.1-.2 0-.3zm-1.2 21zm1-12.9c.1.5.2.8.2 1.1-.3-.1-.4-.4-.2-1.1zm2.3 3s-.1-.1 0 0l-.1-.1s.1 0 .1.1zm-1.3-6l.5-1c.2.6.1.8-.5 1zm1.1.4c0-.1-.1-.2-.1-.3v.3c-.1 0-.2.1-.2.1.1-.1.2-.3.2-.4 0-.2.1-.4.2-.6.4 0 .6.2.6.7-.3 0-.5.1-.7.2zm2.1-2.9c-.1 0-.1-.1 0 0 0-.1 0-.2.1-.2-.1 0-.1.1-.1.2zm9.4 8.8c.1.2.1.5.2.8-.3-.1-.5-.3-.6-.6 0-.1.1-.2.1-.3.1-.1.2 0 .3.1zm.5-3.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1s.1.1.1.2c-.1.1-.1.1-.2.1zm1.7 1c0 .1 0 .1 0 0 0 .1 0 0 0 0 .1 0 .1 0 0 0zm.5 1c0-.6 0-.6.8-.8l-.8.8zm4-6.1s-.1 0 0 0c-.1-.1-.1-.2 0-.2l.1.1-.1.1zm.9 2.8c-.3-.5-.1-.9.2-1.4.1.6-.2.9-.2 1.4zm1.5-1.1c-.1-.1-.2-.1-.2-.2s.1-.1.1-.2c.1 0 .2 0 .2.1s-.1.2-.1.3zm11.8-.8c.1 0 .1-.1.2-.1h.1c.1.1.1.1-.1.1 0 .1-.1.1-.2 0zm-3.9.6c.3-.1.6-.2.8 0 .1 0 .1.1.2.1 0 .2-.2.5-.4.9-.2-.2-.4-.3-.5-.4-.1-.2-.2-.4-.3-.5 0 0 .1-.1.2-.1zm-1 .1zm-2.8.4l.1.1c0 .1-.1.1-.1.2 0 0 0-.1-.1-.1 0-.1 0-.1.1-.2zm-.4 1.1h-.1c-.5 0-.6 0-.4-.5.1.2.3.3.5.5zm-.8-1.3c.3.2.2.5.2.7-.2-.1-.4-.2-.7-.4.2-.1.4-.2.5-.3zm-.6 1.5zm-2 .1v-.1.1zm1.7 3.1v-.1h.1c0 .1 0 .1-.1.1zm.8.9s0-.1 0 0c.1-.1.1-.1 0 0zm.7-1.7c-.3-.2-.5-.4-.8-.5h-.2c-1 .6-1.1.5-1.2-.8-.1-1.1-.1-2.1-.1-3.3.2.1.4.1.4.2.1.4.1.7.1 1.1v2.3c.9-.3.9-.3 1.9-.1.1-.5.1-1 .2-1.4h.6c0 .3-.1.6-.1.9 0 .3.1.5.2.8-.5.2-.7.5-1 .8zM435 31h-.2c0-.1.1-.2.1-.2.1 0 .2.1.3.1-.1 0-.2.1-.2.1zm.7-1.4c-.2.1-.5 0-.8-.1-.2-.1-.4-.3-.7-.5-.2-.1-.4-.3-.5-.4-.4 0-.4.5-.6.7-.2.2-.3.4-.5.6-.2-.3-.3-.7-.5-.9-.6-.6-.5-1.2-.1-1.9.1-.2.4-.3.5-.5-.4-.3-1-.7-1-1 .2.1.5.2.7.1.2-.1.4-.1.7-.1.2 1.5.5 1.5 1.4 2.2.3.3.9.5 1.1.9 0 0 .3 0 .4-.1.1-.1.1-.3.1-.4-.2-.4-.4-.7-.6-1.1.4-.3.6-.3.7 0 .2.3.3.6.4.9.1.8-.1 1.4-.7 1.6zm1.2-2.2c-.2-.4-.5-.8-.8-1.2 0-.1.1-.2.2-.3h1.2c.1.2.3.4.5.7 0 .2 0 .4.1.5-.4.1-.7.2-1.2.3zm1.2 1.3v-.1.1zm.8-1.6c-.3-.2-.3-.9-.9-.6.1-.2.1-.4.1-.6.4 0 .8 0 1.2.1v.1c.1.3 0 .7-.4 1zm.6 1.7c-.1-.1-.1-.1 0-.1 0 0 .1 0 0 .1.1-.1.1 0 0 0zm-4.5 7.3s0-.1 0 0c.1-.1 0 0 0 0zm5.4-10.8c.1 0 .3 0 .4.1 0 0 0 .1-.1.1h-.3c0-.1-.1-.1 0-.2-.1 0-.1-.1 0 0zm-.2.7c.2-.1.5-.1.7-.1.3 0 .5-.1.6-.2.1.2.1.3-.1.5-.1.2-.1.5-.2.7-.6.9-.6 1 0 2-.2.2-.5.3-.7.5-.4-.3-.5-.8-.4-1.2.1-.8-.2-1.5.1-2.2zm1.4 5.4s-.1.1-.1.2l-.1-.1v-.4c.1 0 .2.1.2.3zm-1.7.5c0-.4-.1-.8-.1-1.3h1.3c.1 0 .2.2.3.3-.5.1-.5.6-.7.9-.3.1-.6-.4-.8.1zm1.6 1.9l-.3.3c-.1.1-.3.1-.4.1-.1-.1-.2-.3-.3-.5.1-.2.2-.5.3-.6.3-.4.6-.4.8-.3.3.2.2.6-.1 1zm.8.4v-.1.1zm.2-2.7h.2c0 .3-.1.2-.2 0zm.3 2h.1-.1zm0-2c.1-.1.2-.3.4-.5 0 .5-.2.5-.4.5zm4.8-2.8zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2l.1-.2zm-1.7 16.4s.1 0 .1-.1v.2c-.1.1-.2.1-.3.2 0-.1.1-.2.2-.3zm-.2.4c0 .1.1.1 0 .2l-.1.1v-.1c0-.1 0-.1.1-.2zm.3 2.2c-.1.2-.2.3-.3.4l-.2-.1v-.5c0-.1.2-.2.4-.4.1.3.2.5.1.6zm.3-8c-.2-.1-.4-.2-.4-.5.3 0 .5 0 .8-.1.1-.1.2-.1.3-.1 0 .1-.1.2-.2.3.2.8 1.2 1.2 1 2.3-.7-.6-1.3-.8-1.4-1.7.1 0 0-.1-.1-.2zm.5 3c.3-.2.5-.1.7.1.1 0 .1.2.1.2 0 .1-.1.1-.2.1-.3.1-.6 0-.6-.4zm.5 4c.6.6.6.6.9 1.8-.8-.4-.7-1.1-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.2.6.5.4 1zm-.4-1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1.5-.1 1 .7 1.3-.3.2.4.4.6.5.9-.2.3-.7.3-.7.8zm.8-6.7c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2-.1.2-.2.3-.3.3zm.8 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5 0 .1-.1.1-.1.1zm.5-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.5.2 1-.1 1.4zm.5 7.4c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2-.3.3zm.5-1.4l.1-.1-.1.1zm.5-6.1c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1-.1-.3-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.5c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 .1 0 .2-.1.2zm.8-.4c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.8-8.1v0zm.4-5c.1 0 .2.1.2.1-.1 0-.2-.1-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3V24c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .5 0 .8zm.1 5.3v-.1h.2v.2c-.1-.1-.2-.1-.2-.1zm.5 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.4-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.3 0 .5-.1.6-.1zm-.4 1.5c.2-.5.5-.4.8-.4-.3.5-.5.4-.8.4zm1.2 4.4l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.2 0-.3.1-.4.2zm0-1.3c.1-.2.2-.4.3-.7.2.4-.1.5-.3.7zm1.6 1.2v-.1.1zm-.3-1.6c.5-.8.5-.8 1.1-.3-.3.2-.6.2-1.1.3zm2.4 4.9c-.1-.1-.1-.1 0 0l-.1-.1c0-.1.1-.1.1.1 0-.1 0-.1 0 0zm0-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6v-.2l.1-.1c.1 0 .1.1.1.2-.1 0-.2 0-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c0-.1-.2-.1-.2-.2zm1 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c0 .3-.2.3-.3.3zm1.2 1.9s0-.1 0 0c0 0 .1 0 .1.1 0-.1-.1-.1-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3 0 .5 0 .7zm1.5 4.4zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.1.1-.2.1zm.6-15.7c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2 0 .4-.1.6zm.6 13.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.1.1-.2.1zm.6-16c-.1.1-.1 0 0 0zm1.7 16.1c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1.1-.1.2-.1.2zm3.8-.3zm-.5-5.2s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zm-.7-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.2.1-.2.1-.3zm-.4 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c0-.2.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1 0 .2 0 .2.1zm-.3 4.2c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4 0-.1-.1-.2-.1-.2zm1.5 7.2c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.2-1 .3-1.5.4zm5.9-12s0 .1 0 0c0 .1-.1 0 0 0-.1 0-.1 0 0 0zm-.7 3.9c.1.1.1.1 0 .1 0 0-.1 0 0-.1-.1.1-.1 0 0 0zm-.4 4.7c.1 0 .1 0 0 0l.1.1s-.1 0-.1-.1zM476 16v-.1l.1.1h-.1zm1 19c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.7-1.5.6-2.2.4zm2.6 1.3c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2.1 0 0 .1-.1.2zm1-9.5h.1v.2c-.1 0-.1 0-.2-.1 0 0 0-.1.1-.1zm-.2 5.1c.1.1.1.1 0 0v0c0 .1 0 .1 0 0zm.3 3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.7.1-1.2.1-1.6 0zm.7-14.4c-.1-.1-.1-.3 0-.4V20v.5zm0 6.2s0 .1-.1.1c0 0 0-.1.1-.1-.1 0 0 0 0 0zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.2-.1-.5-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.4-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1 0-.1.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.1.6-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-3.2.3s-.1 0 0 0c-.1 0-.1 0 0 0zm-.6-.3c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.3 0 .5-.1.8-.2zm-9.7-6.4c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.2-.2.2-.3zm-4.9-7.1v.1c-.1 0-.1 0 0-.1zm-5.6 5.5l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3v-.2zm-.9-.9c-.1.1-.1.1 0 0-.1.1-.1.1 0 0-.1 0-.1 0 0 0zm-1.1.1zm-2.5 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zM491 15.1c.1 0 .1 0 0 0 .1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3.1 0 .2.1.3.2zM487.9 14s0 .1 0 0zm-1.6 17.7v.1h-.1s-.1 0-.1-.1c0 .1.1.1.2 0zm-1.6-9.6v-.2s.1 0 .1.1l-.1.1zm.7 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1V27zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.7-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8-.1.3-.3.6-.8.6zm1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.3-4.4zm1.9 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.6-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.5.2-.8.3zm1.4 1.9c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .2-.1.2zm1-2.1c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.5c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.8-.5-1.3-.4zm1.5 4.5v.1h-.2v-.1c.1-.1.2-.1.2 0zm-.6 3.9c-.1 0-.1 0 0 0-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.2 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.2-1.7-.2zm1.9.2c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.3-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.2-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.2.8-.6 1-1 1zm1.9 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0-.1 0 0zm-.3-3.1s-.1-.1-.1-.2h.4s.1.1.1.2h-.4zm.3-12c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.3 9.3zm-.2-9.6c.1 0 .2.1.3.2-.1 0-.2-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .2-.1.2-.1zm.1 9.4s-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm.2-8h-.1v-.1c0-.1.1-.1.2-.2 0 .2-.1.2-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2c-.2-.1-.4-.1-.7 0zm.5 6.6c.1 0 0 0 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.7s-.1 0 0 0c-.1 0-.1-.1 0 0-.1-.1 0-.1 0 0zm1.2-2c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.4.1-.4-.2-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.6-.2-1.2-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2l-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.4.3-.9 0-1.3.1zm1.3-6.9c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7h.2c-.1 0-.1-.1-.2-.1 0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2.1.4.2.9-.1 1.5zm.7 4h-.1c0-.1-.1-.1-.1-.2h.2v.2zm.4-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.7s-.1 0 0 0l-.1-.1c.1 0 .1 0 .1.1zm0-2.3c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.4c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.6-1.3-.9zm4.9 4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2s-.1 0 0 0c-.1 0-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm-3-3.4c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.5 0 .8-.3 1.1zm1.4 3.2c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.8.3.5.9.5 1.4zm.3-2.1c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.2-.6-.7-.7-1.5zm2.5 4.8c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.3.7.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s0-.1 0 0c.1-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .1-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9-.1-1.6.2-2.3.5zm1.6 5.9c.1 0 0 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.1.3-.4.5-.6.8zm.7-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.4-.5-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1-.1-.3 0-.4 0zm-1.2-4.9c.1-.2.3-.2.4 0l.7.7c-.7.2-.7.2-1.1-.7zm2.9.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.2.4.5.8.1 1.1zm-.9-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.6.8-1.3.3-1.9.5zm7.5-1.1c0 .1 0 .1-.1.1 0 0 0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1.1-.1.1-.1zm-3.6 11.7s-.1-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1c0 0 0 .1-.1.1zm1.1.6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.4.5-.1.9 0 1.3zm-1.1-1.9c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.2-1 .2-1.5.2zm2.1 4.2c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.7c0-.4 0-.4.5-.6-.2.3-.3.5-.5.6zm.5-.5c.3-.2.5-.4.9-.6-.2.6-.2.7-.9.6zm.4-5.6h.2v.1h-.2v-.1zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.2.4-.2.6-.3.9zm.4 2.1V31s0-.1.1-.1c-.1 0 0 .1-.1.2.1 0 0 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.2-.4.4-.6 0zm.9 5.6V34c.1 0 .1-.1.2-.1v.1c-.1 0-.2 0-.2.1zm-.3-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm0-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.3-.2-.6-.4-.9-.5zm1 2.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1-.2.2zm14.2 7.8c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.1-.1.2-.2.3-.1zm-13.4-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.2 0-.5-.1-.5-.5zm1.3 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6-.1-.3 0-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.6 0-1.1.2-1.4.7zm1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3.1.2-.3.4-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.3-.7.4-1.1.4zm2.6-.4l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.2-.4.4-.1.6-.3zm-.4 6v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7 0-1.3.1-2 .1zm.8 3.2v-.1.1zm.4 1.6V36h.1c.1.1.1.2.2.3 0-.1-.1-.1-.3-.1zm.5.2c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1-.1.1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.2-3v-.1.1zm.7-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2 0 .2.1.4.1.5zm.6 2.2c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5 0 .1-.2.2-.3.2zm3.6-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.3-.5.5-.6zm-.6 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.2-.6.6-1 1.1-.8zm-2.4 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .1-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1c0-.1-.1-.1-.2-.1zm1.8 1.9l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-.9-1.9c.4-.6.8-.4 1.3-.4-.1 1.1-.2 1.1-1.3.4zm1.3-1.4c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.2.4.1.5.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.2 1.5s-.1 0 0 0c-.1-.1-.1-.1 0-.2h.1c-.1.1-.1.2-.1.2zm1.1-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.3.2.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .2-.1.2-.1zm-7.2-.3s.1 0 0 0l.1.1c-.1 0-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.2-.7.1zm.7-.1c0-.2.1-.4.1-.5H563.7c0 .2-.2.4-.4.5zm5.3 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.4.9-.5 1.4zM572 29c0-.2 0-.4-.1-.7.3.4.2.6.1.7zm1.8-.9c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.3.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1 0-.1-.1 0-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.2c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1.1.1 0 .2 0 .2zm0-2.3c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c0-.3-.2-.5-.3-.7zm1 1.7c-.2-.4-.4-.7-.5-1.1.4.2.5.6.5 1.1zm.2.8c-.4-.2-.1-.6-.2-.8.5.4.5.4.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c0-.1-.1-.2-.1-.4 0 .1 0 .1 0 0zm-.3 2.1c.4-.3.6 0 .8.1-.2 0-.5-.1-.8-.1zm1 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2 0 .3-.3.4-.4.6zm.3-1.4v-.2c.1.1.1.1 0 .2.1-.1.1 0 0 0zm3.1-.1h.2v.1c-.1 0-.1.1-.2.1-.1-.1-.1-.1 0-.2zm-1.9-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.1-.3-.2-.6-.2-1zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2 0-.2.1-.3.1zm.6.9c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zm1.2-1.3c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1c-.1-.1-.2-.1-.2-.2h.3c-.1 0-.1.1-.2.1l.1.1zm.1-.1c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm2.3-3.3zm-.8 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.2.1-.3.1-.3zm.1 2c0-.1 0-.2-.1-.3 0 0 .2-.1.2 0s.1.2.1.2-.1 0-.2.1zm.7-3.8c-.1 0-.1-.1 0 0-.1-.1-.1-.1 0-.1-.1 0 0 0 0 .1 0-.1 0 0 0 0zm.7 3c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.2 0 .4 0 .1-.1.2-.1.2zm1.6-.1v-.2c0-.2.1-.3.2-.4 0 .2 0 .4.1.6h-.3zm2.1.1zm12.7 4.3c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-3.3.3c.1.1 0 .1 0 .1s-.1-.1 0-.1c-.1 0 0 0 0 0zm-1-2.1c.1 0 .1.1.1.2-.1 0-.1.1-.2.1 0-.1-.1-.1-.1-.2.1-.1.1-.1.2-.1zm-.1 1.4zm-2.5-4.1c0 .1.1.1.1.2-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1h.2zm-3.6.7c-.1 0-.1 0 0 0-.1-.1 0-.1 0 0zm-1.4 5.6zm-.1.2l.1-.1v0c0 .1.1.2.1.3 0-.1-.1-.1-.2-.2zm.3.5h-.1c.1-.1.1-.2.2-.3.2.1.3.2.5.2-.3 0-.4.1-.6.1zm5.7-2.2c.1.5 0 1-.3 1.4-.5.1-1 .1-1.4.2-.1-.2-.2-.4-.3-.5-.3 0-.5.2-.5.5v.1c-.6 0-1.1-.1-1.7-.1-.4.4-.5.5-.8.6.1 0 .1 0 .2-.1-.2-.3-.3-.6-.5-.8l.3-.3c0-.7-.3-1.1-.6-1.7.1.1.3.1.6.2l-.6-.6c.8-.1 1 0 1.1.9 0 .3-.1.6.2.7.4-.3.5-.3.7-.9 0-.1.1-.1.1-.2v-.1c-.3-.5-.6-1.1-.8-1.8h.2c.2-.1.4-.1.5-.1-.1.1-.1.3-.1.5 0 .5.3.8.8.8.4 0 .7-.3.7-.7 0-.2-.1-.4-.3-.6.1-.1.2-.2.1-.3-1-.3-1.2-1.1-1.2-2.1 0-.2 0-.3.1-.4.2-.2.4-.3.7-.5h.1c0 .2.1.4.1.6.2 0 .3 0 .4.2.1.5.2 1.1.6 1.4 0 .7-.2 1.3.3 1.8.6-.7.6-1-.1-1.7.1.1.2.1.3.2.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.2-.1.3-.1.5-.1 0 .3 0 .6-.1.9-.1.2 0 .4 0 .6-.1 0-.2-.1-.3-.1 0 .3-.2.6.2.9.1 0 .1-.1.2-.1v.1c0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.2.6 0 1.2.1 1.8zm1.5 3.6v.2c.1.1.1.2.2.4-.3 0-.5.1-.8.6-.2.1-.4.2-.4.3v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2 0-.3v-.2c.2 0 .4.1.6.2h-.6zm0-2.1c-.1-.2-.1-.4-.3-.6v-.1c.5 0 1-.1 1.6 0h.5c0 .3 0 .5-.2.7-.5.1-1.1-.2-1.6 0zm2 2.6c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2-.3-.1-.4 0-.5 0zm1.8-2.2c-.1-.1-.3-.2-.4-.2h-.2c-.2-.2-.5-.3-.8-.4 0-.3 0-.7-.1-1l.1-.1.4.4s.1 0 .1-.1c.2.1.5.3.7.4.4.1.8.2 1.1.6-.3.2-.6.3-.9.4zm.6-1.6c.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0-.1.1-.1.1-.2.1.2.2.5.3.8-.2 0-.3-.1-.4-.2zm1.2 2.4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1.1 0 .1 0 0 .1zm1.5-6.8c.1 0 .2-.1.3-.1 0 .2 0 .3-.1.4 0-.1-.1-.2-.2-.3zM605 32l.3-.3c.1-.1.1-.2.2-.4h.4c.1.1.2.1.3.2-.3.3-.4.4-.6.9-.2-.1-.4-.2-.6-.4zm.8.5c0 .1-.1.1-.2.1 0-.1 0-.1-.1-.2.2 0 .2.1.3.1zm.1 2.4c.2.4.2.5 0 .9-.1.1-.2.1-.3.2-.1-.5-.2-.9-.4-1.3l.6-.6c.2.3.4.4.8.5-.2.1-.4.2-.7.3zm1-1.4v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 0 .1.1.2.1-.1.2-.2.3-.3.5-.2 0-.5.1-.7.1v-.4c0-.1.1-.2.1-.2 0-.3 0-.6.1-.9.2 0 .4.1.6.1v-.1c0-.1.1-.1.1-.2 0 .1 0 .2.1.3l.3.3c-.1.1-.2.3-.3.5zm.7 2.7c0-.1-.1-.1 0 0l-.1-.1c0-.4 0-.7.1-1.1.1.1.1.4.1.8 0 .1 0 .2-.1.4zm.9-1.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .2-.1.3-.2.4zm1.4 2.9zm2.2-7.4c0 .1-.1.1-.1.2s-.2.1-.3 0v-.2h.4zm-.2 1.6zm-.3-1.7zm.6 8.1c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.1.2-.2.4zm-.5-3.1h-.2v-.3c.2 0 .5.1 1 .2-.4.1-.6.1-.8.1zm1.7 7.1c.1 0 .1 0 .1-.1v.1h-.1zm.2-2v.6c-.2-.3-.1-.5 0-.6zm0-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.8-.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm.1 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.4-5.3zm1.8 6.1s.1 0 .1-.1c0 .2 0 .3.1.5-.1-.1-.2-.2-.2-.4zm.3.7c0-.1-.1-.1-.1-.2.1.1.2.1.1.2.1-.1.1 0 .1.1 0-.1 0-.1-.1-.1zm-.4 3.8zm1.2-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3 0 0-.1.1-.1.2zm1-.5v-.1h.1c0-.1 0 0-.1.1.1-.1 0-.1 0 0zm.7-.2c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2.1 0 0 .1-.1.1zm.6 1.3c0-.1-.1-.1-.1-.2v-.1s.1 0 .1-.1l.1.1c0 .2 0 .3-.1.3zm5.9-8.3c0 .1-.1.2-.1.3l-.1.1c-.2-.2 0-.4.2-.4zm2.9-4.6zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2.1-.1.1-.2.1-.2zm-.3 18.1c.6.6.6.6.9 1.8-.8-.5-.6-1.2-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.1.7.4.4 1zm-.3-1.1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1v0c.4 0 .9.6 1.2-.3.2.4.4.6.5.9-.2.3-.6.4-.6.8zm.7-6.6c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2l-.3.3zm.8 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5l-.1.1zm.5-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.4.2.9-.1 1.4zm.5 7.3c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2-.3.3zm.5-1.3l.1-.1-.1.1zm.5-6.2c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1 0-.3-.2-.4-.4zm.8 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.3 0-.3.1-.4.1zm1-.4zm0-1.4c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 0 0 .1-.1.2zm.8-.5c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2c.1-.2 0-.5 0-.7zm.3 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.7-8.1v0zm.4-5c.1 0 .2.1.2.1-.1 0-.1 0-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1s0 .1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3v-.1c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .6 0 .8zm.1 5.3v-.1h.2v.2c-.1 0-.2-.1-.2-.1zm.5 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.3.2.1.5-.1.7zm.9-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.2 0 .4 0 .6-.1zm-.5 1.5c.2-.5.5-.4.8-.4-.2.6-.5.4-.8.4zm1.2 4.5l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.2 0-.3.1-.4.2zm0-1.4c.1-.2.2-.4.3-.7.2.5-.1.5-.3.7zm1.6 1.2v-.1.1zm-.3-1.5c.5-.8.5-.8 1.1-.3-.3.1-.6.2-1.1.3zm2.4 4.8c-.1 0-.1 0 0 0l-.1-.1c.1 0 .1 0 .1.1 0-.1 0 0 0 0zm0-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6V32l.1-.1c.1 0 .1.1.1.2-.1 0-.1.1-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2s-.2-.1-.2-.2zm1 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c.1.3-.2.3-.3.3zm1.2 1.9s.1 0 .1.1c0-.1-.1-.1-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3.1.5 0 .7zm1.5 4.5zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.7-15.8c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3-.1.2-.1.4-.1.6zm.5 13.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.1 0-.2.1zm.6-16.1c-.1.1-.1.1 0 0zm1-5.7c-.1-.1-.2-.2-.2-.3.1 0 .2.1.2.1.1.1.1.2 0 .2.1 0 .1 0 0 0zm.7 21.9c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1 0-.1.2-.1.2zm3.8-.3zm-.5-5.3s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c.1-.1.1-.2.2-.2zm-.6-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c0-.1 0-.2.1-.3zm-.5 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c.1-.1.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1.1.2.1.2.1zM654 31s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4l-.1-.2zm1.5 7.3c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.1-1 .2-1.5.4zm6.8-8.6h.1v.2c-.1 0-.1 0-.2-.1 0 0 0-.1.1-.1zm-.1 5.2v.1c-.1 0-.1-.1 0-.1-.1 0-.1 0 0 0zm-.8-8.6zm-.7 3.8s0 .1 0 0c.1.1.1.1 0 .1v-.1c-.1.1 0 0 0 0zm-.3 4.7l.1.1c-.1 0-.2 0-.1-.1-.1.1-.1 0 0 0zm-2.7-15.9v-.1l.1.1h-.1zm1 19.1c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.7.6-1.4.6-2.2.4zm2.6 1.2c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2.1.1 0 .1-.1.2zm.2-25.4v-.1.1zm.4-.3c-.1 0-.2.1-.3.1 0-.1 0-.3.1-.4 0 0 0-.1.1-.1 0 .2 0 .3.1.4zm.5 24.3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.7.1-1.2.1-1.6 0zm.7-14.4c-.1-.1-.1-.3 0-.4v-.1.5zm0 6.2s0 .1-.1.1l.1-.1zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.2 0-.4-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.5-.3.5zm2.1 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.2.1-.2.1-.2.2zm-.4-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.1.7-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1 0 .1-.1zm-3.2.3zm-.6-.2c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.3 0 .5-.2.8-.2zm-9.7-6.5s.1 0 0 0c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.2-.1.2-.2.2-.3zm-5-7.3s.1 0 0 0c.1.1.1.3.1.4-.1-.1-.2-.2-.1-.4 0 .1 0 0 0 0zm-5.5 5.7l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3.1-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3v-.2zm-.9-.8s-.1 0 0 0c-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm-1.1 0zm-2.5 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zm-1.3-12.8c.1 0 .1.1 0 0 .1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3.1 0 .2.1.3.2zm-4.2-17.8c.1.1.1.1 0 0 0 .1 0 0 0 0zm-1.6 17.8v.1h-.1s-.1 0-.1-.1h.2zm-1.6-9.7v-.2s.1 0 .1.1 0 .1-.1.1zm.8 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1-.1-.2 0-.3 0-.4zm.6 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.7-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8 0 .4-.3.6-.8.6zm1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.3-4.4zm1.9 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.7-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.2.1-.5.2-.8.3zm1.4 2c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .1-.1.2zm1-2.2c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2.1.4 0 .6zm-.2-6.4c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.3-.6-.8-.5-1.3-.4zm1.5 4.4v.1h-.2v-.1h.2zm-.6 3.9s-.1 0 0 0c-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1 0 .2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.3.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.3 1.6-.5 2zm-1-6.8c-.1 0-.1 0 0 0 .2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.6-.1-1.2-.1-1.7-.2zm1.8.2c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.4-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3 0 0 .1.2 0 .2zm.2-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.2.8-.6 1-1 1zm1.9 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0 0 0 0zm-.3-3s-.1-.1-.1-.2h.4s.1.1.1.2c-.2-.1-.3 0-.4 0zm.3-12.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.3 9.4zm-.2-9.7c.1 0 .2.1.3.2-.1 0-.2-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .2 0 .2-.1zm.1 9.4s-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm.2-8h-.1v-.1c0-.1.1-.1.2-.2 0 .2 0 .3-.1.3zm.7 7.1zm-.1-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2h-.7zm.4 6.6c0 .1 0 .1 0 0 .1 0 .1 0 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c0 0-.1.1-.2.1zm.4 1.8c-.1-.1-.1-.1 0 0 0-.2 0-.1 0 0 0-.1 0-.1 0 0zm1.2-2.1c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.3.2-.4-.1-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.6-.1-1.2-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2s0 .1-.1.1zm.2-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.5.3-1 .1-1.3.1zm1.3-6.8c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7l.1-.1c0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2 0 .3 0 .9-.2 1.5zm.6 3.9h-.1c0-.1-.1-.1-.1-.2h.2v.2zm.4-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.8c0-.1 0-.1 0 0l-.1-.1c.1-.1.1-.1.1.1.1-.1 0-.1 0 0zm0-2.4c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.3c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.7-1.3-.9zm4.9 3.9c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c0 .1-.1.1 0 0-.1 0-.1 0-.1-.1 0 .1 0 0 .1.1zm-2.9-3.3c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.1.4-.1.7-.3 1.1zm1.3 3.1c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.8.3.5.9.5 1.4zm.4-2c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.7-.3-.7-.8-.7-1.5zm2.4 4.7c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.4.4.3.8.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s0-.1 0 0c.1-.1.1 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .2-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9 0-1.6.2-2.3.5zm1.6 5.9s.1 0 0 0c.1 0 0 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.1.3-.3.6-.6.8zm.7-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.4-.4-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1 0-.3.1-.4 0zm-1.2-4.8c.1-.2.3-.2.4 0l.7.7c-.7.1-.7.1-1.1-.7zm2.9.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.2.3.5.8.1 1.1zm-.9-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.6.8-1.3.2-1.9.5zm7.5-1.2c.1 0 .1.1 0 0 0 .1 0 .1-.1.1s0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1.1-.1.1-.1zm-3.6 11.7s0-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.2-10.7zm.7.5v-.1l.1-.1s.1.1 0 .1c0 0 0 .1-.1.1zm1.1.6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.4.6-.1.9 0 1.3zm-1-1.8c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.6.1-1.1.1-1.5.2zm2 4.1c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.8c0-.4 0-.4.5-.6-.1.2-.3.4-.5.6zm.6-.6c.3-.2.5-.4.9-.6-.3.7-.3.7-.9.6zm.3-5.6h.2v.1h-.2V34zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.1.4-.2.7-.3.9zm.4 2.1v-.1s0-.1.1-.1c0 .1 0 .1-.1.2.1 0 .1 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.3-.4.4-.6 0zm.9 5.6v-.1c.1 0 .1-.1.2-.1v.1c-.1 0-.2.1-.2.1zm-.3-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm0-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.3-.2-.6-.3-.9-.5zm1 2.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1.1-.2.1-.2.2zm14.2 7.7c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.2-.1.3-.1.3-.1zm-13.4-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.2 0-.5 0-.5-.5zm1.3 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6 0-.3 0-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.6 0-1.1.2-1.4.7zm1.1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3 0 .2-.3.5-.6.4zm-.6-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.4-.7.4-1.1.4zm2.7-.3l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.1-.5.4-.2.6-.3zm-.5 5.9v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7.1-1.3.1-2 .1zm.8 3.3v-.1.1zm.5 1.5v-.2h.1c.1.1.1.2.2.3-.1-.1-.2-.1-.3-.1zm.4.3c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c0 0-.1 0-.2.1zm.2-3v-.1.1zm.7-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2.1.1.1.3.1.5zm.6 2.1c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5 0 .1-.2.2-.3.2zm3.7-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.2-.5.2-.5.5-.6zm-.7 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.2-.6.6-.9 1.1-.8zm-2.4 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .2 0 .3-.2.4zm-.4-3.4l.2-.2c0 .1.1.1.1.2l-.1.1c-.1 0-.2-.1-.2-.1zm1.8 2l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s-.1.2-.1.3zm-1-1.9c.4-.6.8-.4 1.3-.4-.1 1-.2 1-1.3.4zm1.3-1.5c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.2.4.2.6.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.2 1.5s-.1 0 0 0c-.1-.1-.1-.1 0-.2h.1c-.1.1-.1.2-.1.2zm1.1-.8H736c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.3.3.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .2-.1.2-.1zM748 29s.1 0 0 0l.1.1c-.1.1-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.3-.7.1zm.7-.1c0-.2.1-.4.1-.5H745c0 .2-.2.4-.4.5zm5.3 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.4.9-.5 1.4zm3.4 1.3c0-.2 0-.4-.1-.7.4.3.2.5.1.7zm1.8-1c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.1.2-.3.2-.5.2zm1 3.2c-.1-.4-.1-.4.2-.8.2.4 0 .6-.2.8zm1.9-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1 0-.1 0 .1-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.3c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1.1 0 0 .1 0 .2zm.1-2.4c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c-.1-.3-.2-.5-.3-.7zm.9 1.7c-.2-.4-.4-.7-.5-1.1.4.2.5.6.5 1.1zm.2.9c-.4-.2-.1-.6-.2-.8.5.3.5.3.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c0-.1-.1-.3-.1-.4zm-.3 2c.4-.3.6 0 .8.1-.2 0-.5 0-.8-.1zm1 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2 0 .3-.3.4-.4.6zm.4-1.4v-.2.2zm3-.1h.2v.1c-.1 0-.1.1-.2.1s-.1-.1 0-.2zm-1.9-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.1-.3-.2-.6-.2-1zm-.2 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.2 0-.3.1-.3.2zm.2-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2.1-.2.1-.3.1zm.6 1c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zM765 30c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1.1c-.1-.1-.1-.2-.2-.3h.3c0 .1 0 .2-.1.3zm2.4-3.5zm-.8 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.1.1-.3.1-.3zm.1 2v-.4s.2-.1.2 0 .1.2.1.2c-.1.1-.2.2-.3.2zm.7-3.8s-.1 0 0 0c-.1-.1-.1-.1 0-.1v.1c0-.1 0 0 0 0zm2.5.9c0 .1 0 .1-.1.2.1-.1.1-.2.1-.2zm-1.8 2.2c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.3.1.4-.1 0-.2.1-.2.2zm.7-1.8c-.1 0-.2 0-.2-.1-.1-.1-.2-.3-.2-.4.1 0 .1-.1.2-.1.1.1.2.3.3.4-.1 0-.1.1-.1.2zm.5 1.9c-.2-.4 0-.5.1-.7-.1.2-.1.4-.1.7zm.1-.7c0-.5-.1-1.1.5-1.4.1.6.1 1.2.2 1.8-.5.1-.5-.3-.7-.4zm.8-3.7l-.2-.2c.1-.1.2-.1.4-.1 0 0-.1.1-.2.3zm1.6 4.2zm.7-2.3c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1 0 0 .1.1.1.2-.1 0-.2 0-.2.1zm.8 1c.1-.1.2-.3.3-.3 0 0 .1.1.2.1-.1.1-.2.3-.3.4 0-.1-.1-.1-.2-.2zm.5 1.9c0 .1-.1 0 0 0-.1-.1-.1-.2 0-.3.1 0 .1.1.2.1 0 .1-.1.2-.2.2zm.4-2.9l-1.2-2.1c.1-.2.1-.3.2-.5h.5v.5c.1.4.6.5.5 1-.1.3.2.7.2 1-.1.2-.2.2-.2.1zm.5-2.2v-.2.2zm1 .6c-.2-.3-.2-.5 0-.8h.1c-.1.3-.1.5-.1.8zm1.3 2.5c-.1 0-.2-.1-.2-.1 0-.2.1-.5.2-.7.2.1.3.1.3.2 0 .2-.1.5-.3.6zm.4-3.7c0 .1 0 .1 0 0 0 .1 0 .1 0 0zm.1 5s0-.1-.1-.1h.2c0 .1.1.1.1.2-.1 0-.2 0-.2-.1zm2-4.3c-.1 0-.1-.1-.2-.1l.1-.1c.1 0 .1.1.1.2zm.3 1.4c-.1 0-.1-.1-.2-.1v-.1c.1 0 .2 0 .2.1v.1zm.5.9zm4.1 4.6c.1 0 .3.2.4.3.1.2-.2.5-.4.4-.1-.1-.2-.2-.5-.4.3-.1.4-.3.5-.3zm.1 1.9c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-1-3.7zm.1.8s.1.1 0 .1c0 0-.1 0-.1.1 0 0-.1 0-.1-.1 0 0 .1 0 .2-.1zm-.4 2.3c0 .1 0 .1-.1.1l.1-.1c-.1 0 0 0 0 0zm-.7-1.4s-.1 0 0 0l-.1.1c0-.1 0-.1.1-.1zm-1.3 2.2s.1 0 0 0c.1.1 0 .1 0 .1v-.1zm.8 4.1c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2h-.5zm1.6-2c-.4-.5-1.1-.8-1.6-.6-.7.3-1.3-.2-2 0-.3.1-.4-.3-.3-.7.5 0 1-.1 1.6 0 .6.1.9-.1 1.2-.6.4.3.8.5 1.2.7.4.1.8.2 1.1.6-.5.3-.8.4-1.2.6zm.9-2.3c.1.2.2.5.3.8-.6-.3-.6-.3-.3-.8zm2.6-3.8c-.2.2-.4.3-.6.6-.3-.1-.6-.3-.9-.4 0-.5.4-.5 1.5-.2zm-1.7 3.6s-.1 0-.1-.1V36s.1 0 .1.1v.1zm.3 3.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm.2-2.1h-.2v-.1c.1 0 .1 0 .2.1 0-.1 0 0 0 0zm-.3-2.4c.5-.1 1-.1 1.7-.2-.6.5-.6.5-.9 1.1-.3-.2-.8-.3-.8-.9zm2 .8c0 .1 0 .2.1.3l.3.3c-.2.3-.3.7-.5 1-.2 0-.5.1-.7.1 0-.3 0-.6-.1-.9 0-.3-.2-.5-.2-.8.4.1.7.2 1.1.2v-.1c-.1.1 0 0 0-.1zm0-1.7c0-.1.1-.2.1-.2.1 0 .2 0 .2.1v.2c-.1 0-.2 0-.3-.1zm.8 5.6c-.1-.1-.3-.1-.4-.2-.2-.2-.3-.5-.6-.9-.3.3-.6.6-1 .9-.1-.5-.2-.9-.4-1.3l.6-.6c.2.4.6.5 1 .6.8.1.8.2.8 1.1.1.1.1.2 0 .4zm.1-6.4c-.1.2-.5.3-.8.1-.2-.1-.4-.4-.6-.6.3-.1.6-.3 1-.4.1 0 .2.1.2.1.1.2.3.4.2.8zm1.7-15.4v.1-.1zm-.3 1.2c.1 0 .2 0 .2.1.2.2.1.4 0 .6-.1-.2-.2-.3-.3-.5 0-.1 0-.1.1-.2zm-.7 5.2s0-.1 0 0c.1 0 .1 0 .2.1h-.2c-.1 0-.1-.1 0-.1zm.1 11zm0 3.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .3-.1.4-.2.4zm.2-8.8zm.3 2.8v-.1.1zm.3-11.6s-.2 0-.2-.1c-.1-.4-.3-.8.2-1.1 0 .1.1.2.1.2.1.4.2.8-.1 1zm6.3-9.3zm-1.2-.1c-.1 0-.2.1-.4.1v-.1h.4zm-1.2 0c.1.1 0 .3 0 .4-.1-.1-.3-.2-.3-.4h.3zm-.6 3c0 .1-.1.3-.1.4-.2.3-.4.6-.6 1-.1-.9 0-1.4.4-2.3.3.2.3.6.3.9zm-.3-.9c-.1 0-.2 0-.2-.1v-.2h.1c0 .2 0 .3.1.3zm-.8-2.1h.4c.1.2.2.3.3.5l-.6.9c-.1.1-.1.1-.6-.1.1-.4.3-.9.5-1.3zm-.7 2.7s.2.1.1.2-.1.2-.2.2c0-.1-.1-.1-.2-.2.1-.1.2-.1.3-.2zm-.9 27.2zm.1-28.5zm.5 19.6c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.2.1-.2.1zm-.2-14.9c0-.2.1-.5.1-.7 0-.3-.1-.5-.2-.8.2 0 .4-.1.4-.1.4.6 1 1.2.8 2.2-.3-.2-.6-.4-1.1-.6zm.8 1.5zm-.1 6.8c.3-.2.6-.3.9-.5 0 .2.1.5.1.7 0 .4-.2.6-.5.7-.3 0-.5-.2-.6-.6 0-.1.1-.2.1-.3zm1.3 6.8s.1 0 .2.1c0 .5-.2 1-.5 1.4 0 .1-.2.1-.3 0l-.1-.2c.2-.4.4-.8.7-1.3zm-.2-9.9zm-.2 12.8zm-.2-10.8c0-.1.1-.1.1-.2.1.1.3.1.2.2 0 .2-.1.4-.1.6-.1-.2-.2-.4-.2-.6zm.5 17.2c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3 0 .1-.1.3-.2.4zm-.4-3h-.6l-.1-.1c.5-.3.5-.3 1.6 0-.6 0-.7 0-.9.1zm1-15.1c-.1 0-.1-.1-.1-.2s.1-.1.1-.2c.1.1.1.2.2.3l-.2.1zm.6 22.1c.1 0 .1 0 .1-.1v.1h-.1zm.2-2v.6c-.2-.3-.1-.4 0-.6zm0-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.8-.8h-.2c.1 0 .1-.1.2 0 0-.1 0 0 0 0zm.1 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.1-24c-.2.4-.4.2-.8.2.1-.4.2-.6.3-.9h.3c.3.1.3.4.2.7zm-.4-4.6c0 .4-.1.7 0 .9.1.6 0 1.1-.3 1.6-.4.7-.6 1.6-.9 2.4-.1-.2-.2-.4-.4-.6-.4-.1-.5.2-.5.5.1.5.1.9 0 1.4-.1.3-.3.3-.5.2 0-.1-.1-.2-.1-.3-.2-1.7-.2-1.7 1.2-2.8.4-.3.6-.6.7-1.2 0-.5.1-1 .3-1.4.4-.8.3-1.7 0-2.5-.1-.3-.2-.6-.3-1v-1.1c.3-.1.5-.2.8-.3 0 .1.1.2.1.2.3.6.1 1-.4 1.2.2.5.3.9.5 1.3.4.2 1 0 1.3.6l-.3.9c-.1.1-.3.2-.5.3-.2.1-.4 0-.7-.3zm.7 23.3zm.4-20.3c-.1 0-.1-.1-.2-.1 0-.1.1-.2.1-.2.1 0 .1.1.2.1 0 0-.1.1-.1.2zm.3-1.6c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1.1-.1.1 0 0zm0-.1c-.1-.4-.2-.7-.3-1.1.3.4.5.7.3 1.1zm.4-3.7c.4 0 .5.4.7.8-.8-.1-.8-.1-.7-.8zm.7 31.8s.1 0 .1-.1c0 .2 0 .3.1.5-.1-.1-.1-.2-.2-.4zm.4.7c0-.1-.1-.1-.1-.2 0 .1.1.1.1.2.1-.1.1 0 .1.1-.1 0-.1 0-.1-.1zm.1-32.7s0-.1 0 0l.1-.1c-.1 0-.1.1-.1.1zm-.5 36.5zm1.1-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3 0 .1-.1.1-.1.2zm.5-35.2c-.3.1-.8-.2-1 .3 0-.2 0-.4.1-.6.1-.2.4-.3.5-.3.5 0 .5.3.4.6zm.5 1.2v.1h-.1l.1-.1zm0 33.5V47h.1l-.1.1c.1 0 .1 0 0 0zm.2-29.6s0-.1-.1-.1l.2-.2.1.1c0 .1-.1.1-.2.2zm.5 29.4c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2.1.1 0 .1-.1.1zm.1-32.7v-.1.1zm.5 34.1c0-.1-.1-.1-.1-.2s.1-.1.1-.2c0 .1.1.1.1.2.1 0 0 .1-.1.2zm1-30.5h-.1c0-.1 0-.1.1-.2h.1c0 .1-.1.1-.1.2zm.7-5c.1-.3.1-.5.2-1 .3.5.5.8.7 1.2-.4 0-.6 0-.9-.2zm6.2 18.6s0-.1 0 0l-.1-.1c.1 0 .1 0 .1.1zM808.1 14h.1v.1h-.1V14zm-.2 5.6s.2 0 .2.1v.2c-.2.1-.4.1-.6.2.1-.2.2-.3.4-.5zm-.7.7c.1-.1.2-.1.3-.2 0 .1 0 .2-.1.4 0 0-.1.1-.2.1 0-.1-.1-.2 0-.3zm-1.2 21zm1.1-12.9c.1.5.2.8.2 1.1-.4-.1-.5-.4-.2-1.1zm.3 2c-.1-.3-.1-.5-.2-.8.1 0 .2 0 .2.1.3.2.5.4 0 .7zm.6-5l.5-1c.2.6.1.8-.5 1zm1-11.6c0-.1-.1-.2-.1-.3 0-.1.1-.1.1-.2 0 .1.1.2.1.2 0 .2-.1.2-.1.3zm1.3-2.4c-.1-.1-.1-.1 0-.1h.1c0 .1-.1.1-.1.1zm4.7 11.5s0-.1 0 0c0-.1 0-.2.1-.2 0 0 0 .1-.1.2.1 0 .1 0 0 0zm9.4 8.8c.1.2.1.5.2.8-.3-.1-.5-.3-.6-.6 0-.1.1-.2.1-.3.1-.1.3 0 .3.1zm.6-3.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1s.1.1.1.2c-.1.1-.2.1-.2.1zm1.7 1c0 .1 0 .1 0 0 0 .1 0 0 0 0zm.5 1c0-.6 0-.6.8-.8-.3.3-.6.5-.8.8zm3.9-6.1c-.1-.1-.1-.2 0-.2l.1.1c0 .1 0 .1-.1.1zm.9 2.8c-.3-.5-.1-.9.2-1.4.2.6-.1.9-.2 1.4zm1.5-1.1c-.1-.1-.2-.1-.2-.2s.1-.1.1-.2c.1 0 .2 0 .2.1s0 .2-.1.3zm11.9-.8c.1 0 .1-.1.2-.1h.1c.1.1.1.1-.1.1 0 .1-.1.1-.2 0zm-3.9.6c.3-.1.6-.2.8 0 .1 0 .1.1.2.1 0 .2-.2.5-.4.9-.2-.2-.4-.3-.5-.4-.1-.2-.2-.4-.3-.5 0 0 .1-.1.2-.1zm-1.1.1zm-2.8.4l.1.1c0 .1-.1.1-.1.2 0 0 0-.1-.1-.1 0-.1.1-.1.1-.2zm-.3 1.1h-.1c-.5 0-.6 0-.4-.5.1.2.3.3.5.5zm-.8-1.3c.3.2.2.5.2.7-.2-.1-.4-.2-.7-.4.2-.1.3-.2.5-.3zm-.7 1.5zm-1.9.1v-.1.1zm1.7 3.1v-.1h.1l-.1.1zm.8.9s0-.1 0 0c0-.1 0-.1 0 0zm.7-1.7c-.3-.2-.5-.4-.8-.5h-.2c-1 .6-1.1.5-1.2-.8-.1-1.1-.1-2.1-.1-3.3.2.1.4.1.4.2.1.4.1.7.1 1.1v2.3c.9-.3.9-.3 1.9-.1.1-.5.1-1 .2-1.4h.6c0 .3-.1.6-.1.9 0 .3.1.5.2.8-.5.2-.8.5-1 .8zm4.8 1.3h-.2c0-.1.1-.2.1-.2.1 0 .2.1.3.1-.1 0-.1.1-.2.1zm.7-1.4c-.2.1-.5 0-.8-.1-.2-.1-.4-.3-.7-.5-.2-.1-.4-.3-.5-.4-.4 0-.4.5-.6.7-.2.2-.3.4-.5.6-.2-.3-.3-.7-.5-.9-.6-.6-.5-1.2-.1-1.9.1-.2.4-.3.5-.5-.4-.3-1-.7-1-1 .2.1.5.2.7.1.2-.1.4-.1.7-.1.2 1.5.5 1.5 1.4 2.2.3.3.9.5 1.1.9 0 0 .3 0 .4-.1.1-.1.1-.3.1-.4-.2-.4-.4-.7-.6-1.1.4-.3.6-.3.7 0 .2.3.3.6.4.9.2.8 0 1.4-.7 1.6zm1.3-2.2c-.2-.4-.5-.8-.8-1.2 0-.1.1-.2.2-.3h1.2c.1.2.3.4.5.7 0 .2 0 .4.1.5l-1.2.3zm1.2 1.3v-.1.1zm.8-1.6c-.3-.2-.3-.9-.9-.6.1-.2.1-.4.1-.6.4 0 .8 0 1.2.1v.1c.1.3 0 .7-.4 1zm.6 1.7s-.1 0 0 0c-.1-.1-.1-.1 0-.1v.1c0-.1 0 0 0 0zm-4.5 7.3s-.1 0 0 0c0 0 0-.1 0 0 0-.1 0 0 0 0zm5.3-10.8c.1 0 .3 0 .4.1 0 0 0 .1-.1.1h-.3v-.2s0-.1 0 0zm-.1.7c.2-.1.5-.1.7-.1.3 0 .5-.1.6-.2.1.2.1.3-.1.5-.1.2-.1.5-.2.7-.6.9-.6 1 0 2-.2.2-.5.3-.7.5-.4-.3-.5-.8-.4-1.2.1-.8-.2-1.5.1-2.2zm1.4 5.4s-.1.1-.1.2l-.1-.1v-.4c.1 0 .1.1.2.3zm-1.8.5c0-.4-.1-.8-.1-1.3h1.3c.1 0 .2.2.3.3-.5.1-.5.6-.7.9-.2.1-.5-.4-.8.1zm1.7 1.9l-.3.3c-.1.1-.3.1-.4.1-.1-.1-.2-.3-.3-.5.1-.2.2-.5.3-.6.3-.4.6-.4.8-.3.2.2.2.6-.1 1zm.7.4v-.1.1zm.3-2.7h.2c0 .3-.1.2-.2 0zm.3 2h.1-.1zm0-2c.1-.1.2-.3.4-.5 0 .5-.3.5-.4.5zm4.8-2.8zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2 0-.2 0-.2.1-.2zm-1.8 16.4s.1 0 .1-.1v.2c-.1.1-.2.1-.3.2.1-.1.2-.2.2-.3zm-.2.4c0 .1.1.1 0 .2l-.1.1v-.1c0-.1.1-.1.1-.2zm.4 2.2c-.1.2-.2.3-.3.4l-.2-.1v-.5c0-.1.2-.2.4-.4.1.3.1.5.1.6zm.3-8c-.2-.1-.4-.2-.4-.5.3 0 .5 0 .8-.1.1-.1.2-.1.3-.1 0 .1-.1.2-.2.3.2.8 1.2 1.2 1 2.3-.7-.6-1.3-.8-1.4-1.7 0 0 0-.1-.1-.2zm.4 3c.3-.2.5-.1.7.1.1 0 .1.2.1.2 0 .1-.1.1-.2.1-.3.1-.5 0-.6-.4zm.6 4c.6.6.6.6.9 1.8-.9-.4-.7-1.1-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .4.2.6.5.4 1zm-.4-1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1.5-.1 1 .7 1.3-.3.2.4.4.6.5.9-.2.3-.7.3-.7.8zm.8-6.7c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2-.1.2-.2.3-.3.3zm.7 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5 0 .1 0 .1-.1.1zm.6-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.5.2 1-.1 1.4zm.4 7.4c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2c0 .1-.1.2-.3.3zm.5-1.4l.1-.1-.1.1zm.6-6.1c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1-.1-.4-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.5c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 .1-.1.2-.1.2zm.8-.4c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.7-8.1v.3c.1 0 .1-.2 0-.3zm.1.8v0zm.3-5.8c.1 0 .1 0 0 0 .1 0 .2.1.2.1s-.1-.1-.2-.1zm.6 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1c-.1 0-.1.1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3V24c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3v.8zm0 5.3v-.1h.2v.2c0-.1-.1-.1-.2-.1zm.6 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.4-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.2 0 .4-.1.6-.1zm-.5 1.5c.2-.5.5-.4.8-.4-.2.5-.5.4-.8.4zm1.2 4.4l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.1 0-.2.1-.4.2zm0-1.3c.1-.2.2-.4.3-.7.2.4-.1.5-.3.7zm1.7 1.2v-.1.1zm-.3-1.6c.5-.8.5-.8 1.1-.3-.4.2-.6.2-1.1.3zm2.3 4.9c0-.1 0-.1 0 0l-.1-.1c.1-.1.1-.1.1.1.1-.1 0-.1 0 0zm.1-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.1.5-.1.7-.4 1zm.5 4.6v-.2l.1-.1c.1 0 .1.1.1.2 0 0-.1 0-.2.1zm.9-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c-.1-.1-.2-.1-.2-.2zm.9 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c.1.3-.1.3-.3.3zm1.3 1.9s0-.1 0 0c0 0 .1 0 .1.1l-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1v.7zm1.5 4.4zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.2.1-.2.1zm.6-15.7c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2-.1.4-.1.6zm.6 13.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.2.1-.2.1zm.5-16c-.1.1 0 0 0 0zm1.7 16.1c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c0 .1 0 .2-.1.2zm3.9-.3zm-.5-5.2s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zm-.7-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.2.1-.2.1-.3zm-.5 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c.1-.2.2-.2.2-.2zm-.2-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1 0 .1 0 .2.1zm-.3 4.2c0 .1 0 .1-.1.1 0 0 0-.1.1-.1zm-.5.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4 0-.1-.1-.2-.1-.2zm1.5 7.2c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.2-1 .3-1.5.4zm5.9-12s.1 0 0 0c.1 0 .1.1 0 0 0 .1 0 0 0 0zm-.7 3.9s.1 0 0 0c.1.1.1.1 0 .1v-.1c0 .1 0 0 0 0zm-.3 4.7s.1 0 0 0l.1.1c-.1 0-.1 0-.1-.1zM883 16v-.1l.1.1h-.1zm1 19c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.7-1.5.6-2.2.4zm2.6 1.3c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2 0 0-.1.1-.1.2zm.9-9.5h.1v.2c-.1 0-.1 0-.2-.1.1 0 .1-.1.1-.1zm-.1 5.1c0 .1 0 .1 0 0v.1c0 .1-.1 0 0-.1-.1.1 0 .1 0 0zm.2 3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.6.1-1.1.1-1.6 0zm.8-14.4c-.1-.1-.1-.3 0-.4V20v.1c-.1.3-.1.4 0 .4zm0 6.2s0 .1-.1.1c0 0 0-.1.1-.1-.1 0-.1 0 0 0zm0-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.2-.1-.4-.1-.6-.3zm.4-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c0 .3-.1.4-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1 0-.2.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.2.6-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1l.1-.1zm-3.3.3zm-.5-.3c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.2 0 .5-.1.8-.2zm-9.7-6.4c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.1-.2.2-.3zm-5-7.1v0zm-5.6 5.5c.1 0 .1 0 0 0l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3.1-.1.2-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3v-.2zm-.9-.9c0 .1 0 .1 0 0 0 .1-.1.1 0 0zm-1.1.1zm-2.4 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1 0 .1-.1 0 0-.1zM898 15.1s.1 0 0 0c.1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3 0 0 .2.1.3.2zM894.9 14s0 .1 0 0zm-1.7 17.7v.1h-.1s-.1 0-.1-.1c.1.1.1.1.2 0zm-1.6-9.6v-.2s.1 0 .1.1c.1 0 0 .1-.1.1zm.8 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1V27zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8 0 .6-.3 1.1-.7 1.6zm2.6-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8 0 .3-.3.6-.8.6zm1.1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1-.1 0-.1.1-.1.1zm.2-4.4zm2 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.2.4-.1.6-.2.8zm.7 1.3zm-.6-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.6.2-.8.3zm1.4 1.9c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1-.1.2-.1.2zm1-2.1c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.5c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.9-.5-1.3-.4zm1.5 4.5v.1h-.2v-.1c0-.1.1-.1.2 0zm-.7 3.9s-.1 0 0 0c-.1-.1-.1-.1-.1-.2h.1c.1.1.1.2 0 .2zm.9.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c-.1.1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.4-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2.1.8.3 1.6-.5 2zm-1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.2-1.7-.2zm1.9.2c-.1 0-.1 0 0 0 .3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.3-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1l-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.1-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.2.8-.5 1-1 1zm2 1.2s-.1 0-.1-.1l.1.1c0-.1 0-.1 0 0zm-.3-3.1s-.1-.1-.1-.2h.4s.1.1.1.2h-.4zm.3-12c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.2 9.3zm-.2-9.6c.1 0 .1 0 0 0 .1 0 .2.1.3.2-.1 0-.2-.1-.3-.2zm.5 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .1-.1.2-.1zm-.1 9.3h.1v.1l-.1-.1zm.4-7.9h-.1v-.1c0-.1.1-.1.2-.2-.1.2-.1.2-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2c-.2-.1-.5-.1-.7 0zm.5 6.6s-.1 0 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.2.1-.2.1zm.4 1.7c-.1 0-.1 0 0 0-.1 0-.1-.1 0 0-.1-.1-.1-.1 0 0zm1.1-2c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.3.1-.4-.2-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.6-.2-1.2-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1.1 0 .1 0 0 .1zm.8.9h-.2l.1-.1h.2s-.1 0-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.5.3-.9 0-1.3.1zm1.3-6.9c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7h.2c-.1 0-.1-.1-.2-.1 0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2.1.4.1.9-.1 1.5zm.6 4h-.1c0-.1-.1-.1-.1-.2h.2v.2zm.5-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.5.6-.7.5zm.9 3.7c-.1 0-.1 0 0 0l-.1-.1s.1 0 .1.1zm0-2.3c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.2-2.4c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.8-.6-1.3-.9zm5 4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c-.1 0-.1 0 0 0-.1 0-.1 0-.1-.1l.1.1c-.1-.1-.1 0 0 0zm-3-3.4c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.5-.1.8-.3 1.1zm1.4 3.2c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.7.3.4.9.5 1.4zm.3-2.1c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.2-.6-.7-.7-1.5zm2.5 4.8c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.2.7.1 1zm1.2-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5.1.9 0 1.6 0 2.4zm.2-2.3s-.1 0 0 0c-.1 0 0-.1 0 0 0-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .1-.1.2.1 0 0 0 0 0zm-.4-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9-.1-1.6.2-2.3.5zm1.7 5.9c-.1 0-.1 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.2.3-.4.5-.6.8zm.6-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.3-.5-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1-.1-.2 0-.4 0zm-1.1-4.9c.1-.2.3-.2.4 0l.7.7c-.8.2-.8.2-1.1-.7zm2.8.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.3.4.5.8.1 1.1zm-.9-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.6.8-1.3.3-1.9.5zm7.6-1.1c0 .1 0 .1-.1.1 0 0 0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1 0-.1.1-.1zm-3.6 11.7c-.1 0-.1-.1 0 0v-.1s.1.1.1.2l-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1l-.1.1zm1 .6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.5.5 0 .9 0 1.3zm-1-1.9c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.2-1 .2-1.5.2zm2 4.2c.2.5.4.8.5 1.1l-.1.2h-.2c-.3-.3-.4-.7-.2-1.3zm.1 5.7c0-.4 0-.4.5-.6-.2.3-.4.5-.5.6zm.5-.5c.3-.2.5-.4.9-.6-.3.6-.3.7-.9.6zm.3-5.6h.2v.1h-.2v-.1zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.1.4-.2.6-.3.9zm.5 2.1V31s0-.1.1-.1c-.1 0-.1.1-.1.2.1 0 0 0 0 0zm0-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.2-.3.4-.6 0zm.9 5.6V34c.1 0 .1-.1.2-.1v.1c-.1 0-.1 0-.2.1zm-.2-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c-.1-.1-.1-.2-.2-.3zm-.1-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.3-.2-.6-.4-.9-.5zm1 2.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1.1-.1.2-.2.2zm14.2 7.8c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.2-.1.3-.2.3-.1zm-13.3-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.3 0-.6-.1-.5-.5zm1.2 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6 0-.3.1-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.5 0-1 .2-1.4.7zm1.1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3 0 .2-.3.4-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.3-.7.4-1.1.4zm2.6-.4l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.1-.4.4-.1.6-.3zm-.4 6v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7 0-1.4.1-2 .1zm.7 3.2v-.1.1zm.5 1.6V36h.1c.1.1.1.2.2.3-.1-.1-.2-.1-.3-.1zm.5.2c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1-.1.1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.2-3v-.1.1zm.6-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2.1.2.1.4.1.5zm.6 2.2c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5 0 .1-.2.2-.3.2zm3.7-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.2-.5.5-.6zm-.7 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.3-.6.6-1 1.1-.8zm-2.3 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .1-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1c-.1-.1-.1-.1-.2-.1zm1.8 1.9l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-1-1.9c.4-.6.8-.4 1.3-.4 0 1.1-.1 1.1-1.3.4zm1.4-1.4c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.1.4.1.5.1.7zm3.1-.5c.1-.1.2-.1.3 0h-.3zm5.2 1.5c-.1-.1-.1-.1 0-.2h.1c0 .1 0 .2-.1.2zm1.2-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.2.2.3.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.6.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .1-.1.2-.1zm-7.2-.3l.1.1c-.1 0-.1 0-.1-.1-.1.1-.1 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.5.2-.7.1zm.7-.1c0-.2.1-.4.1-.5H970.7c-.1.2-.2.4-.4.5zm5.2 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.3.9-.5 1.4zM979 29c0-.2 0-.4-.1-.7.3.4.2.6.1.7zm1.8-.9c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.3.3-.4.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.4.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1-.1-.1-.1 0-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2c-.1 0-.1.1-.2.2zm1.1 1.2c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1v.2zm0-2.3c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c-.1-.3-.2-.5-.3-.7zm.9 1.7c-.2-.4-.4-.7-.5-1.1.5.2.5.6.5 1.1zm.2.8c-.4-.2-.1-.6-.2-.8.6.4.6.4.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c0-.1 0-.2-.1-.4 0 .1 0 .1 0 0zm-.2 2.1c.4-.3.6 0 .8.1-.3 0-.5-.1-.8-.1zm.9 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2.1.3-.2.4-.4.6zm.4-1.4v-.2c.1.1.1.1 0 .2.1-.1 0 0 0 0zm3-.1h.2v.1c-.1 0-.1.1-.2.1v-.2zm-1.8-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.2-.3-.2-.6-.2-1-.1 0-.1 0 0 0zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2 0-.3.1-.3.1zm.6.9c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2-.3.1-.4.2-.6.3zm1.1-1.3c.1.3.2.5.3.8-.4-.3-.4-.3-.3-.8zm.6 1c-.1-.1-.2-.1-.2-.2h.3c-.1 0-.1.1-.2.1 0 .1.1.1.1.1zm.1-.1c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm2.2-3.3zm-.7 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.2 0-.3.1-.3zm.1 2c0-.1 0-.2-.1-.3 0 0 .2-.1.2 0s.1.2.1.2c-.1 0-.1 0-.2.1zm.6-3.8s0-.1 0 0c-.1-.1-.1-.1 0-.1v.1c.1-.1 0 0 0 0zm.7 3c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.2 0 .4 0 .1 0 .2-.1.2zm1.7-.1v-.2c0-.2.1-.3.2-.4 0 .2 0 .4.1.6h-.3zm2 .1zm12.8 4.3c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-3.3.3c.1.1 0 .1 0 .1-.1 0-.1-.1 0-.1-.1 0-.1 0 0 0zm-1.1-2.1c.1 0 .1.1.1.2-.1 0-.1.1-.2.1 0-.1-.1-.1-.1-.2.1-.1.2-.1.2-.1zm0 1.4s-.1 0 0 0c-.1 0-.1 0 0 0zm-2.6-4.1c0 .1.1.1.1.2-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1h.2zm-3.5.7c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1-.1-.1-.1 0 0zm-1.4 5.6zm-.2.2l.1-.1v0c0 .1.1.2.1.3 0-.1-.1-.1-.2-.2zm.3.5h-.1c.1-.1.1-.2.2-.3.2.1.3.2.5.2-.2 0-.4.1-.6.1zm5.7-2.2c.1.5 0 1-.3 1.4-.5.1-1 .1-1.4.2-.1-.2-.2-.4-.3-.5-.3 0-.5.2-.5.5v.1c-.6 0-1.1-.1-1.7-.1-.4.4-.5.5-.8.6.1 0 .1 0 .2-.1-.2-.3-.3-.6-.5-.8l.3-.3c0-.7-.3-1.1-.6-1.7.1.1.3.1.6.2l-.6-.6c.8-.1 1 0 1.1.9 0 .3-.1.6.2.7.4-.3.5-.3.7-.9 0-.1.1-.1.1-.2v-.1c-.3-.5-.6-1.1-.8-1.8h.2c.2-.1.4-.1.5-.1-.1.1-.1.3-.1.5 0 .5.3.8.8.8.4 0 .7-.3.7-.7 0-.2-.1-.4-.3-.6.1-.1.2-.2.1-.3-1-.3-1.2-1.1-1.2-2.1 0-.2 0-.3.1-.4.2-.2.4-.3.7-.5h.1c0 .2.1.4.1.6.2 0 .3 0 .4.2.1.5.2 1.1.6 1.4 0 .7-.2 1.3.3 1.8.6-.7.6-1-.1-1.7.1.1.2.1.3.2.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.2-.1.3-.1.5-.1 0 .3 0 .6-.1.9-.1.2 0 .4 0 .6-.1 0-.2-.1-.3-.1 0 .3-.2.6.2.9.1 0 .1-.1.2-.1v.1c0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.3.6 0 1.2.1 1.8zm1.6 3.6v.2c.1.1.1.2.2.4-.3 0-.5.1-.8.6-.2.1-.4.2-.4.3v-.8c0-.1.7-.3 1-.4-.1-.1-.1-.2 0-.3v-.2c.2 0 .4.1.6.2h-.6zm-.1-2.1c-.1-.2-.1-.4-.3-.6v-.1c.5 0 1-.1 1.6 0h.5c0 .3 0 .5-.2.7-.5.1-1-.2-1.6 0zm2 2.6c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2-.2-.1-.3 0-.5 0zm1.9-2.2c-.1-.1-.3-.2-.4-.2h-.2c-.2-.2-.5-.3-.8-.4 0-.3 0-.7-.1-1l.1-.1.4.4s.1 0 .1-.1c.2.1.5.3.7.4.4.1.8.2 1.1.6-.3.2-.6.3-.9.4zm.6-1.6c.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0-.1.1-.1.1-.2.1.2.2.5.3.8-.2 0-.3-.1-.4-.2zm1.2 2.4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm1.5-6.8c.1 0 .2-.1.3-.1 0 .2 0 .3-.1.4-.1-.1-.2-.2-.2-.3zM1012 32l.3-.3c.1-.1.1-.2.2-.4h.4c.1.1.2.1.3.2-.3.3-.4.4-.6.9-.2-.1-.5-.2-.6-.4zm.8.5c0 .1-.1.1-.2.1 0-.1 0-.1-.1-.2.1 0 .2.1.3.1zm.1 2.4c.2.4.2.5 0 .9-.1.1-.2.1-.3.2-.1-.5-.2-.9-.4-1.3l.6-.6c.2.3.4.4.8.5-.2.1-.5.2-.7.3zm1-1.4v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4-.1 0 .1.1.2.1-.1.2-.2.3-.3.5-.2 0-.5.1-.7.1v-.4c0-.1.1-.2.1-.2 0-.3 0-.6.1-.9.2 0 .4.1.6.1v-.1c0-.1.1-.1.1-.2 0 .1 0 .2.1.3l.3.3c-.1.1-.2.3-.3.5zm.7 2.7c-.1-.1-.1-.1 0 0l-.1-.1c0-.4 0-.7.1-1.1.1.1.1.4.1.8 0 .1-.1.2-.1.4zm.8-1.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .2-.1.3-.2.4zm1.4 2.9zm2.2-7.4c0 .1-.1.1-.1.2s-.2.1-.3 0v-.2h.4zm-.1 1.6zm-.4-1.7s.1 0 0 0c.1 0 0 0 0 0zm.7 8.1c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.2.2-.2.4zm-.5-3.1h-.2v-.3c.2 0 .5.1 1 .2-.4.1-.6.1-.8.1zm1.7 7.1c.1 0 .1 0 .1-.1v.1h-.1zm.1-2v.6c-.2-.3-.1-.5 0-.6zm.1-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.7-.8c0-.1 0-.1 0 0 .1-.1.1-.1 0 0 .1-.1 0-.1 0 0zm.1 1.1v-.2h.1l.1.1c-.1 0-.1 0-.2.1zm.5-5.3zm1.7 6.1s.1 0 .1-.1c0 .2 0 .3.1.5 0-.1-.1-.2-.2-.4zm.4.7c0-.1-.1-.1-.1-.2 0 .1.1.1.1.2.1-.1.1 0 .1.1 0-.1-.1-.1-.1-.1zm-.4 3.8zm1.1-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3.1 0 0 .1-.1.2zm1.1-.5v-.1h.1c-.1-.1 0 0-.1.1.1-.1 0-.1 0 0zm.7-.2c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2l-.1.1zm.6 1.3c0-.1-.1-.1-.1-.2v-.1s.1 0 .1-.1l.1.1c0 .2-.1.3-.1.3zm5.9-8.3c0 .1-.1.2-.1.3l-.1.1c-.2-.2 0-.4.2-.4zm2.9-4.6zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2 0-.1.1-.2.1-.2zm-.3 18.1c.6.6.6.6.9 1.8-.9-.5-.7-1.2-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.1.6.4.4 1zm-.4-1.1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1v0c.4 0 .9.6 1.2-.3.2.4.4.6.5.9-.1.3-.6.4-.6.8zm.8-6.6c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2l-.3.3zm.7 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5 0 0 0 .1-.1.1zm.6-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.4.2.9-.1 1.4zm.4 7.3c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2c0 .1-.1.2-.3.3zm.5-1.3l.1-.1-.1.1zm.6-6.2c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1 0-.4-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.4c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 0-.1.1-.1.2zm.8-.5c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.8-8.1v0zm0 .8v0zm.4-5.8c.1 0 .2.1.2.1-.1 0-.2 0-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3v-.1c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .6 0 .8zm0 5.3v-.1h.2v.2s-.1-.1-.2-.1zm.6 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.5-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.2 0 .4 0 .6-.1zm-.5 1.5c.2-.5.5-.4.8-.4-.2.6-.5.4-.8.4zm1.2 4.5l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.1 0-.2.1-.4.2zm0-1.4c.1-.2.2-.4.3-.7.3.5-.1.5-.3.7zm1.7 1.2v-.1.1zm-.3-1.5c.5-.8.5-.8 1.1-.3-.4.1-.6.2-1.1.3zm2.3 4.8l-.1-.1c.1 0 .2 0 .1.1.1-.1 0 0 0 0zm.1-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.1.5-.1.7-.4 1zm.6 4.6V32l.1-.1c.1 0 .1.1.1.2-.1 0-.2.1-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c-.1 0-.2-.1-.2-.2zm.9 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c.1.3-.1.3-.3.3zm1.3 1.9s.1 0 .1.1l-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1v.7zm1.5 4.5zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.2.1-.2.1zm.6-15.8c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2-.1.4-.1.6zm.6 13.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.2 0-.2.1zm.5-16.1c0 .1 0 .1 0 0zm0 0c0 .1 0 .1 0 0zm1.1-5.7c-.1-.1-.2-.2-.2-.3.1 0 .2.1.2.1v.2zm.7 21.9c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1 0-.1.2-.1.2zm3.8-.3zm-.5-5.3s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zm-.7-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.1.1-.2.1-.3zm-.4 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c0-.1.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1.1.1.1.2.1zm-.3 4.2s0 .1 0 0c0 .1 0 .1-.1.1l.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4l-.1-.2zm1.4 7.3c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.4.1-1 .2-1.5.4zm6.8-8.6h.1v.2c-.1 0-.1 0-.2-.1.1 0 .1-.1.1-.1zm-.1 5.2s.1 0 0 0v.1s-.1-.1 0-.1zm-.8-8.6c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0zm-.7 3.8c.1 0 .1.1 0 0 .1.1.1.1 0 .1.1.1 0 0 0-.1 0 .1 0 0 0 0zm-.3 4.7c.1 0 .1 0 0 0l.1.1c-.1 0-.1 0-.1-.1 0 .1 0 0 0 0zm-2.6-15.9v-.1l.1.1h-.1zm1 19.1c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.6-1.5.6-2.2.4zm2.6 1.2c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2 0 .1-.1.1-.1.2zm.1-25.4v-.1.1zm.5-.3c-.1 0-.2.1-.3.1 0-.1 0-.3.1-.4 0 0 0-.1.1-.1-.1.2 0 .3.1.4zm.4 24.3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.6.1-1.1.1-1.6 0zm.8-14.4c-.1-.1-.1-.3 0-.4v-.1.5zm0 6.2s0 .1-.1.1l.1-.1c-.1 0-.1 0 0 0zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.3 0-.5-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.5-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.2.7-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1 0 0 .1 0 .1-.1zm-3.3.3zm-.5-.2c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.2 0 .5-.2.8-.2zm-9.7-6.5c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.1-.2.2-.3zm-5-7.3c.1.1.1.3.1.4-.2-.1-.2-.2-.1-.4-.1.1-.1 0 0 0zm-5.5 5.7l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3 0-.1-.1-.1 0-.2zm-1-.8zm-1.1 0zm-2.4 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1 0 .1-.1 0 0-.1zm-1.3-12.8s.1.1 0 0c.1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3 0 0 .2.1.3.2zm-4.2-17.8c0 .1 0 .1 0 0 0 .1 0 0 0 0zm-1.7 17.8v.1h-.1s-.1 0-.1-.1h.2zm-1.6-9.7v-.2s.1 0 .1.1c.1.1 0 .1-.1.1zm.8 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1v-.4zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.6-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8 0 .4-.3.6-.8.6zm1.1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1-.1 0-.1.1-.1.1zm.2-4.4zm2 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.7-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.5.2-.8.3zm1.4 2c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .1-.1.2zm1-2.2c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.4c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.9-.5-1.3-.4zm1.5 4.4v.1h-.2v-.1h.2zm-.7 3.9c-.1-.1-.1-.1-.1-.2h.1c.1.2.1.2 0 .2zm.9.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.2 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.1-1.7-.2zm1.9.2s-.1 0 0 0c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.4-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1l-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.1-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.2.8-.5 1-1 1zm2 1.2s-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm-.3-3s-.1-.1-.1-.2h.4s.1.1.1.2c-.2-.1-.3 0-.4 0zm.3-12.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.2 9.4zm-.1-9.7c.1 0 .2.1.3.2-.2 0-.3-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .1 0 .2-.1zm0 9.4s-.1 0-.1-.1c.1 0 .1 0 .1.1 0-.1 0 0 0 0zm.3-8h-.1v-.1c0-.1.1-.1.2-.2-.1.2-.1.3-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2h-.7zm.5 6.6c0 .1 0 .1 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.8s-.1 0 0 0c-.1-.1-.1-.1 0 0-.1-.2 0-.1 0 0 0-.1 0-.1 0 0zm1.1-2.1c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.3.2-.4-.1-.3-.5zm-.6-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.7-.1-1.3-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2l-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.5.3-.9.1-1.3.1zm1.3-6.8c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7h.2c-.1 0-.1-.1-.2-.1 0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2.1.3.2.9-.1 1.5zm.6 3.9h-.1c0-.1-.1-.1-.1-.2h.2c.1 0 .1.1 0 .2zm.5-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.8c0-.1-.1-.1 0 0l-.1-.1c.1-.1.1-.1.1.1 0-.1 0-.1 0 0zm0-2.4c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.3c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.7-1.3-.9zm4.9 3.9c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c-.1.1-.1.1 0 0-.1 0-.1 0-.1-.1 0 .1 0 0 .1.1-.1 0 0 0 0 0zm-3-3.3c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.4 0 .7-.3 1.1zm1.4 3.1c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.7.3.4.9.5 1.4zm.3-2c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.3-.6-.8-.7-1.5zm2.5 4.7c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.3.8.1 1zm1.2-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5.1.9.1 1.7 0 2.4zm.2-2.3s-.1 0 0 0c0 0 0-.1 0 0 0-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .2-.1.2.1 0 0 0 0 0zm-.4-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9 0-1.6.2-2.3.5zm1.7 5.9s-.1 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.2.3-.4.6-.6.8zm.6-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.3-.4-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1 0-.2.1-.4 0zm-1.1-4.8c.1-.2.3-.2.4 0l.7.7c-.7.1-.7.1-1.1-.7zm2.8.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.3.3.5.8.1 1.1zm-.8-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.7.8-1.4.2-1.9.5zm7.5-1.2s0 .1 0 0c0 .1 0 .1-.1.1 0 0 0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1 0-.1.1-.1zm-3.6 11.7c-.1 0-.1-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1l-.1.1zm1 .6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.5.6 0 .9 0 1.3zm-1-1.8c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.1-1 .1-1.5.2zm2.1 4.1c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.8c0-.4 0-.4.5-.6-.2.2-.3.4-.5.6zm.5-.6c.3-.2.5-.4.9-.6-.2.7-.3.7-.9.6zm.4-5.6h.2v.1h-.2V34zm.6-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.1.4-.2.7-.3.9zm.5 2.1v-.1s0-.1.1-.1c-.1.1 0 .1-.1.2.1 0 0 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.3-.4.4-.6 0zm.8 5.6v-.1c.1 0 .1-.1.2-.1v.1s-.1.1-.2.1zm-.2-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm-.1-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.2-.2-.6-.3-.9-.5zm1.1 2.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.2.1-.2.1-.2.2zm14.2 7.7c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.1-.1.2-.1.3-.1zm-13.4-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.3 0-.6 0-.5-.5zm1.2 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6 0-.3.1-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.5 0-1 .2-1.4.7zm1.1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3 0 .2-.3.5-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.4-.7.4-1.1.4zm2.6-.3l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.1-.5.4-.2.6-.3zm-.4 5.9v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7.1-1.4.1-2 .1zm.7 3.3v-.1.1zm.5 1.5v-.2h.1c.1.1.1.2.2.3-.1-.1-.2-.1-.3-.1zm.5.3c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.1 0-.2.1zm.2-3v-.1.1zm.6-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2.1.1.2.3.1.5zm.7 2.1c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5-.1.1-.2.2-.3.2zm3.6-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.2-.5.5-.6zm-.7 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.3-.6.7-.9 1.1-.8zm-2.3 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .2-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1c-.1 0-.1-.1-.2-.1zm1.8 2l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-1-1.9c.4-.6.8-.4 1.3-.4 0 1-.1 1-1.3.4zm1.4-1.5c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.1.4.1.6.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.1 1.5c-.1-.1-.1-.1 0-.2h.1c0 .1 0 .2-.1.2zm1.2-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.2.3.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .1-.1.2-.1zm-7.2-.3l.1.1c-.1.1-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.3-.7.1zm.7-.1c0-.2.1-.4.1-.5H1152c-.1.2-.2.4-.4.5zm5.2 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.3.9-.5 1.4zm3.5 1.3c0-.2 0-.4-.1-.7.3.3.2.5.1.7zm1.8-1c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.4.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1-.1-.1-.1.1-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.3c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1v.2zm0-2.4c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c0-.3-.2-.5-.3-.7zm1 1.7c-.2-.4-.4-.7-.5-1.1.4.2.4.6.5 1.1zm.2.9c-.4-.2-.1-.6-.2-.8.5.3.5.3.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c-.1-.1-.1-.3-.1-.4-.1 0 0 0 0 0zm-.3 2c.4-.3.6 0 .8.1-.3 0-.5 0-.8-.1zm.9 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2.1.3-.2.4-.4.6zm.4-1.4v-.2c.1.1.1.1 0 .2.1 0 0 0 0 0zm3-.1h.2v.1c-.1 0-.1.1-.2.1v-.2zm-1.8-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.2-.3-.2-.6-.2-1zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2.1-.3.1-.3.1zm.6 1c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zm1.2-1.4c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1.1c-.1-.1-.1-.2-.2-.3h.3c0 .1-.1.2-.1.3zm2.3-3.5zm-.7 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.1.1-.3.1-.3zm.1 2v-.4s.2-.1.2 0 .1.2.1.2c-.1.1-.2.2-.3.2zm.6-3.8c-.1-.1-.1-.1 0-.1 0 0 .1 0 0 .1.1-.1.1 0 0 0zm2.6.9c0 .1 0 .1-.1.2.1-.1.1-.2.1-.2zm-1.9 2.2c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.3.1.4l-.2.2zm.7-1.8c-.1 0-.2 0-.2-.1-.1-.1-.2-.3-.2-.4.1 0 .1-.1.2-.1.1.1.2.3.3.4 0 0-.1.1-.1.2zm.5 1.9c-.2-.4 0-.5.1-.7 0 .2 0 .4-.1.7zm.1-.7c0-.5-.1-1.1.5-1.4.1.6.1 1.2.2 1.8-.5.1-.5-.3-.7-.4zm.9-3.7l-.2-.2c.1-.1.2-.1.4-.1-.1 0-.1.1-.2.3zm1.6 4.2zm.6-2.3c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1 0 0 .1.1.1.2-.1 0-.1 0-.2.1zm.9 1c.1-.1.2-.3.3-.3 0 0 .1.1.2.1-.1.1-.2.3-.3.4 0-.1-.1-.1-.2-.2zm.5 1.9c0 .1-.1 0 0 0-.1-.1-.1-.2 0-.3.1 0 .1.1.2.1-.1.1-.1.2-.2.2zm.4-2.9l-1.2-2.1c.1-.2.1-.3.2-.5h.5v.5c.1.4.6.5.5 1-.1.3.2.7.2 1-.1.2-.2.2-.2.1zm.5-2.2c-.1 0-.1 0 0 0v-.2.2zm.9.6c-.2-.3-.2-.5 0-.8h.1c0 .3 0 .5-.1.8zm1.3 2.5c-.1 0-.2-.1-.2-.1 0-.2.1-.5.2-.7.2.1.3.1.3.2.1.2 0 .5-.3.6zm.5-3.7c0 .1-.1.1 0 0-.1.1-.1.1 0 0zm0 5s0-.1-.1-.1h.2c0 .1.1.1.1.2 0 0-.1 0-.2-.1zm2-4.3c-.1 0-.1-.1-.2-.1l.1-.1c.1 0 .2.1.1.2.1 0 0 0 0 0zm.3 1.4c-.1 0-.1-.1-.2-.1v-.1c.1 0 .2 0 .2.1.1-.1 0 0 0 .1zm.6.9zm4.1 4.6c.1 0 .3.2.4.3.1.2-.2.5-.4.4-.1-.1-.2-.2-.5-.4.2-.1.4-.3.5-.3zm.1 1.9c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-1-3.7zm0 .8s.1.1 0 .1c0 0-.1 0-.1.1 0 0-.1 0-.1-.1.1 0 .2 0 .2-.1zm-.3 2.3c0 .1 0 .1-.1.1l.1-.1c-.1 0-.1 0 0 0zm-.8-1.4l-.1.1.1-.1zm-1.2 2.2c.1.1 0 .1 0 .1-.1 0-.1 0 0-.1-.1 0-.1 0 0 0zm.7 4.1c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2h-.5zm1.6-2c-.4-.5-1.1-.8-1.6-.6-.7.3-1.3-.2-2 0-.3.1-.4-.3-.3-.7.5 0 1-.1 1.6 0 .6.1.9-.1 1.2-.6.4.3.8.5 1.2.7.4.1.8.2 1.1.6-.4.3-.8.4-1.2.6zm1-2.3c.1.2.2.5.3.8-.6-.3-.6-.3-.3-.8zm2.5-3.8c-.2.2-.4.3-.6.6-.3-.1-.6-.3-.9-.4.1-.5.5-.5 1.5-.2zm-1.7 3.6s-.1 0-.1-.1V36s.1 0 .1.1c.1 0 0 0 0 .1zm.3 3.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm.3-2.1h-.2v-.1c.1 0 .1 0 .2.1 0-.1 0 0 0 0zm-.3-2.4c.5-.1 1-.1 1.7-.2-.6.5-.6.5-.9 1.1-.4-.2-.8-.3-.8-.9zm2 .8c0 .1 0 .2.1.3l.3.3c-.2.3-.3.7-.5 1-.2 0-.5.1-.7.1 0-.3 0-.6-.1-.9 0-.3-.2-.5-.2-.8.4.1.7.2 1.1.2v-.1c-.1.1 0 0 0-.1zm0-1.7c0-.1.1-.2.1-.2.1 0 .2 0 .2.1v.2c-.1 0-.2 0-.3-.1zm.8 5.6c-.1-.1-.3-.1-.4-.2-.2-.2-.3-.5-.6-.9-.3.3-.6.6-1 .9-.1-.5-.2-.9-.4-1.3l.6-.6c.2.4.6.5 1 .6.8.1.8.2.8 1.1.1.1 0 .2 0 .4zm.1-6.4c-.1.2-.5.3-.8.1-.2-.1-.4-.4-.6-.6.3-.1.6-.3 1-.4.1 0 .2.1.2.1.1.2.3.4.2.8zm1.6-15.4v.1-.1zm-.3 1.2c.1 0 .2 0 .2.1.2.2.1.4 0 .6-.1-.2-.2-.3-.3-.5.1-.1.1-.1.1-.2zm-.7 5.2s.1-.1 0 0c.1 0 .1 0 .2.1h-.2v-.1zm.2 11zm-.1 3.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3.1.3-.1.4-.2.4zm.2-8.8zm.4 2.8v-.1.1zm.2-11.6s-.2 0-.2-.1c-.1-.4-.3-.8.2-1.1 0 .1.1.2.1.2.1.4.3.8-.1 1zm6.3-9.3zm-1.1-.1c-.1 0-.2.1-.4.1v-.1h.4zm-1.2 0c.1.1 0 .3 0 .4-.1-.1-.3-.2-.3-.4h.3zm-.7 3c0 .1-.1.3-.1.4-.2.3-.4.6-.6 1-.1-.9 0-1.4.4-2.3.4.2.4.6.3.9zm-.3-.9c-.1 0-.2 0-.2-.1v-.2h.1c.1.2.1.3.1.3zm-.8-2.1h.4c.1.2.2.3.3.5l-.6.9c-.1.1-.1.1-.6-.1.1-.4.3-.9.5-1.3zm-.7 2.7s.2.1.1.2-.1.2-.2.2c0-.1-.1-.1-.2-.2.2-.1.3-.1.3-.2zm-.8 27.2zm.1-28.5zm.4 19.6c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.1.1-.2.1zm-.1-14.9c0-.2.1-.5.1-.7 0-.3-.1-.5-.2-.8.2 0 .4-.1.4-.1.4.6 1 1.2.8 2.2-.3-.2-.7-.4-1.1-.6zm.8 1.5zm-.1 6.8c.3-.2.6-.3.9-.5 0 .2.1.5.1.7 0 .4-.2.6-.5.7-.3 0-.5-.2-.6-.6 0-.1 0-.2.1-.3zm1.2 6.8s.1 0 .2.1c0 .5-.2 1-.5 1.4 0 .1-.2.1-.3 0l-.1-.2c.2-.4.5-.8.7-1.3zm-.2-9.9zm-.1 12.8zm-.2-10.8c0-.1.1-.1.1-.2.1.1.3.1.2.2 0 .2-.1.4-.1.6-.1-.2-.2-.4-.2-.6zm.5 17.2c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.2.3-.2.4zm-.5-3h-.6l-.1-.1c.5-.3.5-.3 1.6 0-.5 0-.7 0-.9.1zm1.1-15.1c-.1 0-.1-.1-.1-.2s.1-.1.1-.2c.1.1.1.2.2.3l-.2.1zm.6 22.1c.1 0 .1 0 .1-.1v.1h-.1zm.1-2v.6c-.2-.3 0-.4 0-.6zm.1-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.7-.8h-.2c.1 0 .2-.1.2 0 .1-.1 0 0 0 0zm.2 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.1-24c-.2.4-.4.2-.8.2.1-.4.2-.6.3-.9h.3c.3.1.3.4.2.7zm-.4-4.6c0 .4-.1.7 0 .9.1.6 0 1.1-.3 1.6-.4.7-.6 1.6-.9 2.4-.1-.2-.2-.4-.4-.6-.4-.1-.5.2-.5.5.1.5.1.9 0 1.4-.1.3-.3.3-.5.2 0-.1-.1-.2-.1-.3-.2-1.7-.2-1.7 1.2-2.8.4-.3.6-.6.7-1.2 0-.5.1-1 .3-1.4.4-.8.3-1.7 0-2.5-.1-.3-.2-.6-.3-1v-1.1c.3-.1.5-.2.8-.3 0 .1.1.2.1.2.3.6.1 1-.4 1.2.2.5.3.9.5 1.3.4.2 1 0 1.3.6l-.3.9c-.1.1-.3.2-.5.3-.3.1-.5 0-.7-.3zm.7 23.3zm.3-20.3c-.1 0-.1-.1-.2-.1 0-.1.1-.2.1-.2.1 0 .1.1.2.1 0 0 0 .1-.1.2zm.3-1.6c0 .1-.1.1 0 0zm.1-.1c-.1-.4-.2-.7-.3-1.1.2.4.5.7.3 1.1zm.4-3.7c.4 0 .5.4.7.8-.8-.1-.8-.1-.7-.8zm.6 31.8s.1 0 .1-.1c0 .2 0 .3.1.5 0-.1-.1-.2-.2-.4zm.4.7c0-.1-.1-.1-.1-.2.1.1.1.1.1.2.1-.1.1 0 .1.1 0 0-.1 0-.1-.1zm.1-32.7c.1 0 .1-.1 0 0l.1-.1s0 .1-.1.1zm-.5 36.5zm1.1-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3.1.1 0 .1-.1.2zm.6-35.2c-.3.1-.8-.2-1 .3 0-.2 0-.4.1-.6.1-.2.4-.3.5-.3.4 0 .4.3.4.6zm.5 1.2v.1h-.1l.1-.1zm0 33.5V47h.1l-.1.1c.1 0 0 0 0 0zm.2-29.6s0-.1-.1-.1l.2-.2.1.1-.2.2zm.5 29.4c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2 0 .1-.1.1-.1.1zm.1-32.7v-.1.1zm.5 34.1c0-.1-.1-.1-.1-.2s.1-.1.1-.2c0 .1.1.1.1.2 0 0-.1.1-.1.2zm1-30.5h-.1c0-.1 0-.1.1-.2h.1c-.1.1-.1.1-.1.2zm.6-5c.1-.3.1-.5.2-1 .3.5.5.8.7 1.2-.3 0-.6 0-.9-.2zm4.2 16.8c.1 0 .2 0 .2.1.2.2.4.4-.1.7 0-.3 0-.6-.1-.8zm.2-9.5c.1-.2.2-.3.4-.4 0 0 .2 0 .2.1v.2c-.2 0-.4 0-.6.1zm1.3 1.8zm-1.6-1.6c.1-.1.2-.1.3-.2 0 .1 0 .2-.1.4 0 0-.1.1-.2.1v-.3zm-1.1 21zm1-12.9c.1.5.2.8.2 1.1-.3-.1-.4-.4-.2-1.1zm2.3 3c-.1 0-.1-.1 0 0l-.1-.1.1.1zm-1.3-6l.5-1c.1.6 0 .8-.5 1zm1.1.4c0-.1-.1-.2-.1-.3v.3c-.1 0-.2.1-.2.1.1-.1.2-.3.2-.4 0-.2.1-.4.2-.6.4 0 .6.2.6.7-.3 0-.5.1-.7.2zm2-2.9s0-.1 0 0c0-.1 0-.2.1-.2 0 0 0 .1-.1.2.1 0 .1 0 0 0zm9.4 8.8c.1.2.1.5.2.8-.3-.1-.5-.3-.6-.6 0-.1.1-.2.1-.3.1-.1.3 0 .3.1zm.6-3.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1s.1.1.1.2c-.1.1-.2.1-.2.1zm1.7 1c0 .1 0 .1 0 0 0 .1 0 0 0 0zm.5 1c0-.6 0-.6.8-.8-.3.3-.6.5-.8.8zm4-6.1c-.1 0-.1 0 0 0-.1-.1-.1-.2 0-.2l.1.1-.1.1zm.9 2.8c-.3-.5-.1-.9.2-1.4.1.6-.2.9-.2 1.4zm1.5-1.1c-.1-.1-.2-.1-.2-.2s.1-.1.1-.2c.1 0 .2 0 .2.1-.1.1-.1.2-.1.3zm11.8-.8c.1 0 .1-.1.2-.1h.1c.1.1.1.1-.1.1 0 .1-.1.1-.2 0zm-3.9.6c.3-.1.6-.2.8 0 .1 0 .1.1.2.1 0 .2-.2.5-.4.9-.2-.2-.4-.3-.5-.4-.1-.2-.2-.4-.3-.5 0 0 .1-.1.2-.1zm-1.1.1c.1 0 .1 0 0 0 .1 0 .1 0 0 0zm-2.8.4l.1.1c0 .1-.1.1-.1.2 0 0 0-.1-.1-.1.1-.1.1-.1.1-.2zm-.3 1.1h-.1c-.5 0-.6 0-.4-.5.1.2.3.3.5.5zm-.8-1.3c.3.2.2.5.2.7-.2-.1-.4-.2-.7-.4.2-.1.4-.2.5-.3zm-.6 1.5zm-2 .1v-.1.1zm1.7 3.1v-.1h.1c0 .1-.1.1-.1.1zm.8.9s0-.1 0 0c0-.1 0-.1 0 0zm.7-1.7c-.3-.2-.5-.4-.8-.5h-.2c-1 .6-1.1.5-1.2-.8-.1-1.1-.1-2.1-.1-3.3.2.1.4.1.4.2.1.4.1.7.1 1.1v2.3c.9-.3.9-.3 1.9-.1.1-.5.1-1 .2-1.4h.6c0 .3-.1.6-.1.9 0 .3.1.5.2.8-.5.2-.7.5-1 .8zm4.8 1.3h-.2c0-.1.1-.2.1-.2.1 0 .2.1.3.1-.1 0-.1.1-.2.1zm.8-1.4c-.2.1-.5 0-.8-.1-.2-.1-.4-.3-.7-.5-.2-.1-.4-.3-.5-.4-.4 0-.4.5-.6.7-.2.2-.3.4-.5.6-.2-.3-.3-.7-.5-.9-.6-.6-.5-1.2-.1-1.9.1-.2.4-.3.5-.5-.4-.3-1-.7-1-1 .2.1.5.2.7.1.2-.1.4-.1.7-.1.2 1.5.5 1.5 1.4 2.2.3.3.9.5 1.1.9 0 0 .3 0 .4-.1.1-.1.1-.3.1-.4-.2-.4-.4-.7-.6-1.1.4-.3.6-.3.7 0 .2.3.3.6.4.9.1.8-.1 1.4-.7 1.6zm1.2-2.2c-.2-.4-.5-.8-.8-1.2 0-.1.1-.2.2-.3h1.2c.1.2.3.4.5.7 0 .2 0 .4.1.5l-1.2.3zm1.2 1.3v-.1.1zm.8-1.6c-.3-.2-.3-.9-.9-.6.1-.2.1-.4.1-.6.4 0 .8 0 1.2.1v.1c.1.3 0 .7-.4 1zm.6 1.7c-.1-.1-.1-.1 0-.1v.1c.1-.1 0 0 0 0zm-4.5 7.3s0-.1 0 0c0-.1 0 0 0 0zm5.3-10.8c.1 0 .3 0 .4.1 0 0 0 .1-.1.1h-.3c.1-.1 0-.1 0-.2 0 0 0-.1 0 0zm-.1.7c.2-.1.5-.1.7-.1.3 0 .5-.1.6-.2.1.2.1.3-.1.5-.1.2-.1.5-.2.7-.6.9-.6 1 0 2-.2.2-.5.3-.7.5-.4-.3-.5-.8-.4-1.2.1-.8-.2-1.5.1-2.2zm1.4 5.4s-.1.1-.1.2l-.1-.1v-.4c.1 0 .1.1.2.3zm-1.8.5c0-.4-.1-.8-.1-1.3h1.3c.1 0 .2.2.3.3-.5.1-.5.6-.7.9-.2.1-.5-.4-.8.1zm1.7 1.9l-.3.3c-.1.1-.3.1-.4.1-.1-.1-.2-.3-.3-.5.1-.2.2-.5.3-.6.3-.4.6-.4.8-.3.3.2.2.6-.1 1zm.7.4v-.1.1zm.3-2.7h.2c0 .3-.1.2-.2 0zm.3 2h.1-.1zm0-2c.1-.1.2-.3.4-.5 0 .5-.2.5-.4.5zm4.8-2.8zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2 0-.2.1-.2.1-.2zm-1.8 16.4s.1 0 .1-.1v.2c-.1.1-.2.1-.3.2.1-.1.2-.2.2-.3zm-.2.4c0 .1.1.1 0 .2l-.1.1v-.1c.1-.1.1-.1.1-.2zm.4 2.2c-.1.2-.2.3-.3.4l-.2-.1v-.5c0-.1.2-.2.4-.4.1.3.1.5.1.6zm.3-8c-.2-.1-.4-.2-.4-.5.3 0 .5 0 .8-.1.1-.1.2-.1.3-.1 0 .1-.1.2-.2.3.2.8 1.2 1.2 1 2.3-.7-.6-1.3-.8-1.4-1.7.1 0 0-.1-.1-.2zm.4 3c.3-.2.5-.1.7.1.1 0 .1.2.1.2 0 .1-.1.1-.2.1-.3.1-.5 0-.6-.4zm.6 4c.6.6.6.6.9 1.8-.9-.4-.7-1.1-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.2.6.5.4 1zm-.4-1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1.5-.1 1 .7 1.3-.3.2.4.4.6.5.9-.2.3-.7.3-.7.8zm.8-6.7c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2-.1.2-.2.3-.3.3zm.7 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5 0 .1 0 .1-.1.1zm.6-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.5.2 1-.1 1.4zm.4 7.4c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2c0 .1-.1.2-.3.3zm.5-1.4l.1-.1-.1.1zm.6-6.1c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1-.1-.4-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.5c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 .1-.1.2-.1.2zm.8-.4c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.8-8.1v0zm0 .8v0zm.4-5.8c.1 0 .2.1.2.1-.1 0-.2-.1-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1v-.1l.1.1c.1 0 0 .1 0 .1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3V24c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .5 0 .8zm0 5.3v-.1h.2v.2c0-.1-.1-.1-.2-.1zm.6 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.4-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.2 0 .4-.1.6-.1zm-.5 1.5c.2-.5.5-.4.8-.4-.2.5-.4.4-.8.4zm1.2 4.4l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.1 0-.2.1-.4.2zm0-1.3c.1-.2.2-.4.3-.7.3.4-.1.5-.3.7zm1.7 1.2v-.1.1zm-.3-1.6c.5-.8.5-.8 1.1-.3-.3.2-.6.2-1.1.3zm2.3 4.9c0-.1 0-.1 0 0l-.1-.1c.1-.1.2-.1.1.1.1-.1.1-.1 0 0zm.1-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6v-.2l.1-.1c.1 0 .1.1.1.2-.1 0-.2 0-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c-.1-.1-.2-.1-.2-.2zm.9 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c.1.3-.1.3-.3.3zm1.3 1.9s0-.1 0 0c0 0 .1 0 .1.1l-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3 0 .5 0 .7zm1.5 4.4zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.1.1-.2.1zm.6-15.7c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2 0 .4-.1.6zm.6 13.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.2.1-.2.1zm.5-16c0 .1 0 0 0 0zm1.8 16.1c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1.1-.1.2-.1.2zm3.8-.3zm-.5-5.2s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zm-.7-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.2.1-.2.1-.3zm-.4 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c0-.2.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1 0 .1 0 .2.1zm-.3 4.2c0 .1 0 .1-.1.1l.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4 0-.1-.1-.2-.1-.2zm1.5 7.2c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.2-1.1.3-1.5.4zm5.8-12c.1 0 .1 0 0 0 .1 0 .1.1 0 0 .1.1 0 0 0 0zm-.7 3.9c.1 0 .1 0 0 0 .1.1.1.1 0 .1.1 0 0 0 0-.1 0 .1 0 0 0 0zm-.3 4.7c.1 0 .1 0 0 0l.1.1s-.1 0-.1-.1zm-2.6-15.9v-.1l.1.1h-.1zm1 19c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.7-1.5.6-2.2.4zm2.6 1.3c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2 0 0 0 .1-.1.2zm.9-9.5h.1v.2c-.1 0-.1 0-.2-.1.1 0 .1-.1.1-.1zm-.1 5.1c0 .1.1.1 0 0v0c0 .1 0 .1 0 0zm.2 3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.6.1-1.1.1-1.6 0zm.8-14.4c-.1-.1-.1-.3 0-.4V20v.5zm0 6.2s0 .1-.1.1c0 0 0-.1.1-.1-.1 0-.1 0 0 0zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.3-.1-.5-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.4-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1 0-.1.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.2.6-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-3.3.3zm-.5-.3c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.2 0 .5-.1.8-.2zm-9.7-6.4c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.1-.2.2-.3zm-5-7.1v0zm-5.5 5.5l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3 0-.1-.1-.2 0-.2zm-1-.9c0 .1 0 .1 0 0 0 .1 0 .1 0 0zm-1.1.1zm-2.4 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zm-1.3-12.8s.1 0 0 0c.1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3 0 0 .2.1.3.2zM1298 14s0 .1 0 0zm-1.7 17.7v.1h-.1s-.1 0-.1-.1c.1.1.2.1.2 0zm-1.5-9.6v-.2s.1 0 .1.1l-.1.1zm.7 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1V27zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.6-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8 0 .3-.2.6-.8.6zm1.1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.2-4.4zm2 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.6-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.5.2-.8.3zm1.4 1.9c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .2-.1.2zm1-2.1c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.5c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.9-.5-1.3-.4zm1.5 4.5v.1h-.2v-.1c.1-.1.1-.1.2 0zm-.6 3.9c-.1 0-.1 0 0 0-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.2 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.2-1.7-.2zm1.9.2s-.1 0 0 0c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.3-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.1-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.2.8-.5 1-1 1zm2 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0-.1 0 0zm-.3-3.1s-.1-.1-.1-.2h.4s.1.1.1.2h-.4zm.3-12c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.2 9.3zm-.1-9.6c.1 0 .2.1.3.2-.2 0-.3-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .1-.1.2-.1zm0 9.4s-.1 0-.1-.1c.1 0 .1 0 .1.1 0-.1 0 0 0 0zm.3-8h-.1v-.1c0-.1.1-.1.2-.2-.1.2-.1.2-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2c-.2-.1-.4-.1-.7 0zm.5 6.6zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.7s-.1 0 0 0c-.1 0-.1-.1 0 0-.1-.1 0-.1 0 0zm1.2-2c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.4.1-.5-.2-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.7-.2-1.3-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2s-.1 0-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.4.3-.9 0-1.3.1zm1.3-6.9c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7h.2c-.1 0-.1-.1-.2-.1 0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2.1.4.2.9-.1 1.5zm.6 4h-.1c0-.1-.1-.1-.1-.2h.2c.1 0 .1.1 0 .2zm.5-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.7s-.1 0 0 0l-.1-.1c.1 0 .1 0 .1.1zm0-2.3c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.4c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.6-1.3-.9zm4.9 4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c-.1 0-.1 0 0 0-.1 0-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm-3-3.4c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.5 0 .8-.3 1.1zm1.4 3.2c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.7.3.4.9.5 1.4zm.3-2.1c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.2-.6-.7-.7-1.5zm2.5 4.8c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.3.7.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s-.1 0 0 0c0 0 0-.1 0 0 0-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .1-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-1-.1-1.7.2-2.3.5zm1.6 5.9s-.1 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.2.3-.4.5-.6.8zm.6-4.3c.1 0 0 0 0 0-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.3-.5-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1-.1-.2 0-.4 0zm-1.1-4.9c.1-.2.3-.2.4 0l.7.7c-.7.2-.7.2-1.1-.7zm2.8.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.3.4.6.8.1 1.1zm-.8-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.7.8-1.4.3-1.9.5zm7.5-1.1c0 .1 0 .1-.1.1 0 0 0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1 0-.1.1-.1zm-3.6 11.7c-.1 0-.1-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1l-.1.1zm1 .6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.5.5 0 .9 0 1.3zm-1-1.9c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.2-1 .2-1.5.2zm2.1 4.2c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.7c0-.4 0-.4.5-.6-.2.3-.3.5-.5.6zm.5-.5c.3-.2.5-.4.9-.6-.2.6-.2.7-.9.6zm.4-5.6h.2v.1h-.2v-.1zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.2.4-.3.6-.3.9zm.4 2.1V31s0-.1.1-.1c-.1 0 0 .1-.1.2.1 0 0 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.2-.4.4-.6 0zm.8 5.6V34c.1 0 .1-.1.2-.1v.1s-.1 0-.2.1zm-.2-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm-.1-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.2-.2-.6-.4-.9-.5zm1.1 2.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.2.1-.2.2-.2.2zm14.2 7.8c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.1-.1.2-.2.3-.1zm-13.4-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.3 0-.6-.1-.5-.5zm1.2 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6 0-.3.1-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.5 0-1 .2-1.4.7zm1.1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3 0 .2-.3.4-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.3-.7.4-1.1.4zm2.6-.4l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.1-.4.4-.1.6-.3zm-.4 6v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7 0-1.4.1-2 .1zm.7 3.2v-.1.1zm.5 1.6V36h.1c.1.1.1.2.2.3-.1-.1-.2-.1-.3-.1zm.5.2c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1-.1.1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.2-3v-.1.1zm.6-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2.1.2.2.4.1.5zm.7 2.2c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5-.1.1-.2.2-.3.2zm3.6-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.2-.5.5-.6zm-.7 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.3-.6.7-1 1.1-.8zm-2.3 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .1-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1c-.1-.1-.1-.1-.2-.1zm1.8 1.9l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-1-1.9c.4-.6.8-.4 1.3-.4 0 1.1-.1 1.1-1.3.4zm1.4-1.4c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.1.4.1.5.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.1 1.5c-.1-.1-.1-.1 0-.2h.1c0 .1 0 .2-.1.2zm1.2-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.2.2.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .1-.1.2-.1zm-7.2-.3l.1.1c-.1 0-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.2-.7.1zm.7-.1c0-.2.1-.4.1-.5H1373.8c-.1.2-.2.4-.4.5zm5.2 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.3.9-.5 1.4zm3.5 1.2c0-.2 0-.4-.1-.7.3.4.2.6.1.7zm1.8-.9c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.3.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1-.1-.1-.1 0-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.2c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1v.2zm0-2.3c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c0-.3-.2-.5-.3-.7zm1 1.7c-.2-.4-.4-.7-.5-1.1.4.2.5.6.5 1.1zm.2.8c-.4-.2-.1-.6-.2-.8.5.4.5.4.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c-.1-.1-.1-.2-.1-.4-.1.1 0 .1 0 0zm-.3 2.1c.4-.3.6 0 .8.1-.3 0-.5-.1-.8-.1zm.9 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2.1.3-.2.4-.4.6zm.4-1.4v-.2c.1.1.1.1 0 .2.1-.1.1 0 0 0zm3-.1h.2v.1c-.1 0-.1.1-.2.1v-.2zM1392 25c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.2-.3-.2-.6-.2-1zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2 0-.3.1-.3.1zm.6.9c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zm1.2-1.3c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1c-.1-.1-.2-.1-.2-.2h.3c-.1 0-.1.1-.2.1 0 .1.1.1.1.1zm.1-.1c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm2.2-3.3zm-.7 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.2.1-.3.1-.3zm.1 2c0-.1 0-.2-.1-.3 0 0 .2-.1.2 0s.1.2.1.2-.1 0-.2.1zm.6-3.8s0-.1 0 0c-.1-.1-.1-.1 0-.1 0 0 .1 0 0 .1.1-.1.1 0 0 0zm.8 3c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.2 0 .4 0 .1-.1.2-.1.2zm1.6-.1v-.2c0-.2.1-.3.2-.4 0 .2 0 .4.1.6h-.3zm2.1.1zm12.7 4.3c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-3.3.3c.1.1 0 .1 0 .1-.1 0-.1-.1 0-.1-.1 0-.1 0 0 0zm-1-2.1c.1 0 .1.1.1.2-.1 0-.1.1-.2.1 0-.1-.1-.1-.1-.2s.1-.1.2-.1zm-.1 1.4zm-2.5-4.1c0 .1.1.1.1.2-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1h.2zm-3.6.7s-.1 0 0 0c-.1 0-.1 0 0 0-.1-.1 0-.1 0 0zm-1.4 5.6zm-.1.2l.1-.1v0c0 .1.1.2.1.3 0-.1-.1-.1-.2-.2zm.2.5h-.1c.1-.1.1-.2.2-.3.2.1.3.2.5.2-.2 0-.3.1-.6.1zm5.8-2.2c.1.5 0 1-.3 1.4-.5.1-1 .1-1.4.2-.1-.2-.2-.4-.3-.5-.3 0-.5.2-.5.5v.1c-.6 0-1.1-.1-1.7-.1-.4.4-.5.5-.8.6.1 0 .1 0 .2-.1-.2-.3-.3-.6-.5-.8l.3-.3c0-.7-.3-1.1-.6-1.7.1.1.3.1.6.2l-.6-.6c.8-.1 1 0 1.1.9 0 .3-.1.6.2.7.4-.3.5-.3.7-.9 0-.1.1-.1.1-.2v-.1c-.3-.5-.6-1.1-.8-1.8h.2c.2-.1.4-.1.5-.1-.1.1-.1.3-.1.5 0 .5.3.8.8.8.4 0 .7-.3.7-.7 0-.2-.1-.4-.3-.6.1-.1.2-.2.1-.3-1-.3-1.2-1.1-1.2-2.1 0-.2 0-.3.1-.4.2-.2.4-.3.7-.5h.1c0 .2.1.4.1.6.2 0 .3 0 .4.2.1.5.2 1.1.6 1.4 0 .7-.2 1.3.3 1.8.6-.7.6-1-.1-1.7.1.1.2.1.3.2.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.2-.1.3-.1.5-.1 0 .3 0 .6-.1.9-.1.2 0 .4 0 .6-.1 0-.2-.1-.3-.1 0 .3-.2.6.2.9.1 0 .1-.1.2-.1v.1c0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.2.6 0 1.2.1 1.8zm1.5 3.6v.2c.1.1.1.2.2.4-.3 0-.5.1-.8.6-.2.1-.4.2-.4.3v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2 0-.3v-.2c.2 0 .4.1.6.2h-.6zm0-2.1c-.1 0-.1 0 0 0-.1-.2-.1-.4-.3-.6v-.1c.5 0 1-.1 1.6 0h.5c0 .3 0 .5-.2.7-.6.1-1.1-.2-1.6 0zm1.9 2.6c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2-.2-.1-.3 0-.5 0zm1.9-2.2c-.1-.1-.3-.2-.4-.2h-.2c-.2-.2-.5-.3-.8-.4 0-.3 0-.7-.1-1l.1-.1.4.4s.1 0 .1-.1c.2.1.5.3.7.4.4.1.8.2 1.1.6-.3.2-.6.3-.9.4zm.6-1.6c.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0-.1.1-.1.1-.2.1.2.2.5.3.8-.2 0-.3-.1-.4-.2zm1.2 2.4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm1.5-6.8c.1 0 .2-.1.3-.1 0 .2 0 .3-.1.4-.1-.1-.1-.2-.2-.3zm-1.3 2.8l.3-.3c.1-.1.1-.2.2-.4h.4c.1.1.2.1.3.2-.3.3-.4.4-.6.9-.2-.1-.5-.2-.6-.4zm.8.5c0 .1-.1.1-.2.1 0-.1 0-.1-.1-.2.1 0 .2.1.3.1zm.1 2.4c.2.4.2.5 0 .9-.1.1-.2.1-.3.2-.1-.5-.2-.9-.4-1.3l.6-.6c.2.3.4.4.8.5-.2.1-.5.2-.7.3zm1-1.4v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 0 .1.1.2.1-.1.2-.2.3-.3.5-.2 0-.5.1-.7.1v-.4c0-.1.1-.2.1-.2 0-.3 0-.6.1-.9.2 0 .4.1.6.1v-.1c0-.1.1-.1.1-.2 0 .1 0 .2.1.3l.3.3c-.1.1-.2.3-.3.5zm.7 2.7c-.1-.1-.1-.1 0 0l-.1-.1c0-.4 0-.7.1-1.1.1.1.1.4.1.8 0 .1-.1.2-.1.4zm.9-1.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .2-.2.3-.2.4zm1.4 2.9zm2.2-7.4c0 .1-.1.1-.1.2s-.2.1-.3 0v-.2h.4zm-.2 1.6zm-.3-1.7c-.1 0 0 0 0 0zm.6 8.1c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.2.2-.2.4zm-.5-3.1h-.2v-.3c.2 0 .5.1 1 .2-.4.1-.6.1-.8.1zm1.7 7.1c.1 0 .1 0 .1-.1v.1h-.1zm.2-2v.6c-.3-.3-.1-.5 0-.6zm0-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.7-.8c0-.1.1-.1 0 0 .1-.1.1-.1 0 0 .1-.1.1-.1 0 0zm.2 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.4-5.3zm1.7 6.1s.1 0 .1-.1c0 .2 0 .3.1.5 0-.1-.1-.2-.2-.4zm.4.7c0-.1-.1-.1-.1-.2.1.1.1.1.1.2.1-.1.1 0 .1.1 0-.1-.1-.1-.1-.1zm-.4 3.8zm1.1-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3.1 0 0 .1-.1.2zm1.1-.5v-.1h.1c0-.1 0 0-.1.1.1-.1 0-.1 0 0zm.7-.2c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2s0 .1-.1.1zm.6 1.3c0-.1-.1-.1-.1-.2v-.1s.1 0 .1-.1l.1.1c0 .2-.1.3-.1.3zm5.9-8.3c0 .1-.1.2-.1.3l-.1.1c-.2-.2 0-.4.2-.4zm2.9-4.6zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2.1-.1.1-.2.1-.2zm-.3 18.1c.6.6.6.6.9 1.8-.9-.5-.7-1.2-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.1.6.4.4 1zm-.4-1.1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1v0c.4 0 .9.6 1.2-.3.2.4.4.6.5.9-.1.3-.6.4-.6.8zm.8-6.6c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2l-.3.3zm.8 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5l-.1.1zm.5-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.4.2.9-.1 1.4zm.5 7.3c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2-.3.3zm.5-1.3l.1-.1-.1.1zm.5-6.2c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1 0-.3-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.4c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 0-.1.1-.1.2zm.8-.5c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.8-8.1v0zm.4-5c.1 0 .2.1.2.1-.1 0-.2 0-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3v-.1c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .6 0 .8zm.1 5.3v-.1h.2v.2c-.1 0-.2-.1-.2-.1zm.5 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.5-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.3 0 .4 0 .6-.1zm-.4 1.5c.2-.5.5-.4.8-.4-.3.6-.5.4-.8.4zm1.2 4.5l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.2 0-.3.1-.4.2zm0-1.4c.1-.2.2-.4.3-.7.2.5-.1.5-.3.7zm1.6 1.2v-.1.1zm-.3-1.5c.5-.8.5-.8 1.1-.3-.3.1-.6.2-1.1.3zm2.4 4.8c-.1 0-.1 0 0 0l-.1-.1s.1 0 .1.1c0-.1 0 0 0 0zm0-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6V32l.1-.1c.1 0 .1.1.1.2-.1 0-.2.1-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c-.1 0-.2-.1-.2-.2zm1 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c0 .3-.2.3-.3.3zm1.2 1.9s.1 0 .1.1c0-.1-.1-.1-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3 0 .5 0 .7zm1.5 4.5zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.6-15.8c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2 0 .4-.1.6zm.6 13.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.1 0-.2.1zm.6-16.1c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1.1-.1.1 0 0zm-.1 0c0 .1 0 .1 0 0zm1.1-5.7c-.1-.1-.2-.2-.2-.3.1 0 .2.1.2.1.1.1.1.2 0 .2.1 0 0 0 0 0zm.7 21.9c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1 0-.1.2-.1.2zm3.8-.3zm-.5-5.3s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zm-.7-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.1.1-.2.1-.3zm-.4 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c0-.1.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1.1.2.1.2.1zm-.3 4.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4l-.1-.2zm1.5 7.3c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.1-1 .2-1.5.4zm6.8-8.6h.1v.2c-.1 0-.1 0-.2-.1 0 0 0-.1.1-.1zm-.2 5.2c.1 0 .1 0 0 0v0zm-.7-8.6s-.1 0 0 0c-.1 0-.1 0 0 0zm-.7 3.8s0 .1 0 0c.1.1.1.1 0 .1 0 .1-.1 0 0-.1-.1.1-.1 0 0 0zm-.4 4.7c.1 0 .1 0 0 0l.1.1s-.1 0-.1-.1c0 .1 0 0 0 0zm-2.6-15.9v-.1l.1.1h-.1zm1 19.1c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.6-1.5.6-2.2.4zm2.6 1.2c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2.1.1 0 .1-.1.2zm.1-25.4v-.1c.1 0 .1.1 0 .1zm.5-.3c-.1 0-.2.1-.3.1 0-.1 0-.3.1-.4 0 0 0-.1.1-.1 0 .2 0 .3.1.4zm.5 24.3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.7.1-1.2.1-1.6 0zm.7-14.4c-.1-.1-.1-.3 0-.4v-.1.5zm0 6.2s0 .1-.1.1l.1-.1c-.1 0 0 0 0 0zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.2 0-.5-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.5-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.1.7-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1 0 .1-.1zm-3.3.3c.1 0 .1 0 0 0zm-.5-.2c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.3 0 .5-.2.8-.2zm-9.7-6.5c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.2-.2.2-.3zm-5-7.3s.1 0 0 0c.1.1.1.3.1.4-.1-.1-.2-.2-.1-.4-.1.1 0 0 0 0zm-5.5 5.7l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3v-.2zm-1-.8zm-1.1 0zm-2.4 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zm-1.3-12.8c.1 0 .1.1 0 0 .1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3.1 0 .2.1.3.2zm-4.2-17.8c0 .1 0 .1 0 0 0 .1 0 0 0 0zm-1.6 17.8v.1h-.1s-.1 0-.1-.1h.2zm-1.6-9.7v-.2s.1 0 .1.1-.1.1-.1.1zm.7 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1v-.4zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.7-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8-.1.4-.3.6-.8.6zm1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.3-4.4zm1.9 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.7-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.5.2-.8.3zm1.4 2c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .1-.1.2zm1-2.2c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.4c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.8-.5-1.3-.4zm1.5 4.4v.1h-.2v-.1h.2zm-.6 3.9c-.1 0-.1 0 0 0-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.2 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.1-1.7-.2zm1.9.2c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.4-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.1-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.1.8-.5 1-1 1zm2 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0 0 0 0zm-.3-3s-.1-.1-.1-.2h.4s.1.1.1.2c-.2-.1-.3 0-.4 0zm.3-12.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.3 9.4zm-.2-9.7c.1 0 .2.1.3.2-.2 0-.2-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .2 0 .2-.1zm.1 9.4s-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm.2-8h-.1v-.1c0-.1.1-.1.2-.2 0 .2-.1.3-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2h-.7zm.5 6.6c0 .1 0 .1 0 0 .1 0 0 0 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.8s-.1 0 0 0c-.1-.1-.1-.1 0 0-.1-.2 0-.1 0 0 0-.1 0-.1 0 0zm1.2-2.1c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.4.2-.4-.1-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.7-.1-1.3-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2s0 .1-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.4.3-.9.1-1.3.1zm1.3-6.8c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7l.1-.1c0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2 0 .3.1.9-.2 1.5zm.7 3.9h-.1c0-.1-.1-.1-.1-.2h.2v.2zm.4-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.8c0-.1-.1-.1 0 0l-.1-.1c.1-.1.1-.1.1.1 0-.1 0-.1 0 0zm0-2.4c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.3c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.7-1.3-.9zm4.9 3.9c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c0 .1-.1.1 0 0-.1 0-.1 0-.1-.1 0 .1 0 0 .1.1zm-3-3.3c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.4 0 .7-.3 1.1zm1.4 3.1c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.8.3.4.9.5 1.4zm.3-2c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.3-.6-.8-.7-1.5zm2.5 4.7c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.3.8.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s0-.1 0 0c0-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .2-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9 0-1.6.2-2.3.5zm1.6 5.9c.1 0 0 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.1.3-.4.6-.6.8zm.7-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.4-.4-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.2 0-.3.1-.4 0zm-1.2-4.8c.1-.2.3-.2.4 0l.7.7c-.7.1-.7.1-1.1-.7zm2.8.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.3.3.6.8.1 1.1zm-.8-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.6.8-1.3.2-1.9.5zm7.5-1.2s0 .1 0 0c0 .1 0 .1-.1.1 0 0 0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1.1-.1.1-.1zm-3.6 11.7s-.1-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1l-.1.1zm1.1.6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.4.6-.1.9 0 1.3zm-1.1-1.8c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.1-1 .1-1.5.2zm2.1 4.1c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.8c0-.4 0-.4.5-.6-.2.2-.3.4-.5.6zm.5-.6c.3-.2.5-.4.9-.6-.2.7-.2.7-.9.6zm.4-5.6h.2v.1h-.2V34zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.2.4-.2.7-.3.9zm.4 2.1v-.1s0-.1.1-.1c-.1.1 0 .1-.1.2.1 0 0 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.3-.4.4-.6 0zm.9 5.6v-.1c.1 0 .1-.1.2-.1v.1c-.1 0-.2.1-.2.1zm-.3-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm0-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.3-.2-.6-.3-.9-.5zm1 2.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1.1-.2.1-.2.2zm14.2 7.7c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.1-.1.2-.1.3-.1zm-13.4-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.2 0-.6 0-.5-.5zm1.2 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6 0-.3.1-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.5 0-1 .2-1.4.7zm1.1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3.1.2-.3.5-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.4-.7.4-1.1.4zm2.6-.3l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.2-.5.4-.2.6-.3zm-.4 5.9v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7.1-1.3.1-2 .1zm.8 3.3v-.1.1zm.4 1.5v-.2h.1c.1.1.1.2.2.3 0-.1-.2-.1-.3-.1zm.5.3c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.1 0-.2.1zm.2-3v-.1.1zm.6-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2.1.1.2.3.1.5zm.7 2.1c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5 0 .1-.2.2-.3.2zm3.6-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.3-.5.5-.6zm-.6 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.2-.6.6-.9 1.1-.8zm-2.4 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .2-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1s-.1-.1-.2-.1zm1.8 2l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-1-1.9c.4-.6.8-.4 1.3-.4 0 1-.1 1-1.3.4zm1.4-1.5c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.2.4.1.6.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.2 1.5s-.1 0 0 0c-.1-.1-.1-.1 0-.2h.1c-.1.1-.1.2-.1.2zm1.1-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.3.3.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .2-.1.2-.1zm-7.2-.3s.1 0 0 0l.1.1c-.1.1-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.3-.7.1zm.7-.1c0-.2.1-.4.1-.5H1555.1c-.1.2-.2.4-.4.5zm5.3 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.4.9-.5 1.4zm3.4 1.3c0-.2 0-.4-.1-.7.3.3.2.5.1.7zm1.8-1c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.3.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1-.1-.1-.1.1-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.3c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1.1 0 0 .1 0 .2zm0-2.4c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c0-.3-.2-.5-.3-.7zm1 1.7c-.2-.4-.4-.7-.5-1.1.4.2.5.6.5 1.1zm.2.9c-.4-.2-.1-.6-.2-.8.5.3.5.3.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c-.1-.1-.1-.3-.1-.4zm-.3 2c.4-.3.6 0 .8.1-.3 0-.5 0-.8-.1zm1 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2 0 .3-.3.4-.4.6zm.3-1.4v-.2c.1.1.1.1 0 .2.1 0 .1 0 0 0zm3.1-.1h.2v.1c-.1 0-.1.1-.2.1s-.1-.1 0-.2zm-1.9-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.1-.3-.2-.6-.2-1zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2.1-.2.1-.3.1zm.6 1c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zm1.2-1.4c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1.1c-.1-.1-.1-.2-.2-.3h.3c0 .1-.1.2-.1.3zm2.4-3.5s-.1 0 0 0c-.1 0 0 0 0 0zm-.8 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.1.1-.3.1-.3zm.1 2v-.4s.2-.1.2 0 .1.2.1.2c-.1.1-.2.2-.3.2zm.7-3.8c-.1 0-.1 0 0 0-.1-.1-.1-.1 0-.1-.1 0 0 0 0 .1 0-.1 0 0 0 0zm2.5.9c0 .1 0 .1-.1.2.1-.1.1-.2.1-.2zm-1.8 2.2c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.3.1.4-.1 0-.2.1-.2.2zm.6-1.8c-.1 0-.2 0-.2-.1-.1-.1-.2-.3-.2-.4.1 0 .1-.1.2-.1.1.1.2.3.3.4 0 0 0 .1-.1.2zm.5 1.9c-.2-.4 0-.5.1-.7 0 .2 0 .4-.1.7zm.2-.7c0-.5-.1-1.1.5-1.4.1.6.1 1.2.2 1.8-.5.1-.5-.3-.7-.4zm.8-3.7l-.2-.2c.1-.1.2-.1.4-.1 0 0-.1.1-.2.3zm1.6 4.2zm.6-2.3c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1 0 0 .1.1.1.2 0 0-.1 0-.2.1zm.9 1c.1-.1.2-.3.3-.3 0 0 .1.1.2.1-.1.1-.2.3-.3.4 0-.1-.1-.1-.2-.2zm.5 1.9c0 .1-.1 0 0 0-.1-.1-.1-.2 0-.3.1 0 .1.1.2.1-.1.1-.1.2-.2.2zm.4-2.9l-1.2-2.1c.1-.2.1-.3.2-.5h.5v.5c.1.4.6.5.5 1-.1.3.2.7.2 1-.1.2-.2.2-.2.1zm.5-2.2s-.1 0 0 0v-.2.2zm.9.6c-.2-.3-.2-.5 0-.8h.1c0 .3 0 .5-.1.8zm1.4 2.5c-.1 0-.2-.1-.2-.1 0-.2.1-.5.2-.7.2.1.3.1.3.2 0 .2-.1.5-.3.6zm.4-3.7c0 .1 0 .1 0 0-.1.1-.1.1 0 0zm.1 5s0-.1-.1-.1h.2c0 .1.1.1.1.2-.1 0-.2 0-.2-.1zm2-4.3c-.1 0-.1-.1-.2-.1l.1-.1c.1 0 .1.1.1.2zm.3 1.4c-.1 0-.1-.1-.2-.1v-.1c.1 0 .2 0 .2.1v.1zm.5.9zm4.1 4.6c.1 0 .3.2.4.3.1.2-.2.5-.4.4-.1-.1-.2-.2-.5-.4.2-.1.4-.3.5-.3zm.1 1.9c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-1-3.7zm0 .8s.1.1 0 .1c0 0-.1 0-.1.1 0 0-.1 0-.1-.1.1 0 .2 0 .2-.1zm-.3 2.3c0 .1 0 .1-.1.1l.1-.1c-.1 0 0 0 0 0zm-.7-1.4c-.1 0-.1 0 0 0l-.1.1c0-.1 0-.1.1-.1zm-1.3 2.2c.1.1 0 .1 0 .1s-.1 0 0-.1c-.1 0 0 0 0 0zm.8 4.1c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2h-.5zm1.5-2c-.4-.5-1.1-.8-1.6-.6-.7.3-1.3-.2-2 0-.3.1-.4-.3-.3-.7.5 0 1-.1 1.6 0 .6.1.9-.1 1.2-.6.4.3.8.5 1.2.7.4.1.8.2 1.1.6-.4.3-.7.4-1.2.6zm1-2.3c.1.2.2.5.3.8-.6-.3-.6-.3-.3-.8zm2.5-3.8c-.2.2-.4.3-.6.6-.3-.1-.6-.3-.9-.4.1-.5.5-.5 1.5-.2zm-1.6 3.6s-.1 0-.1-.1V36s.1 0 .1.1v.1zm.2 3.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1.1 0 0 .1 0 .1zm.3-2.1h-.2v-.1c.1 0 .1 0 .2.1 0-.1 0 0 0 0zm-.3-2.4c.5-.1 1-.1 1.7-.2-.6.5-.6.5-.9 1.1-.4-.2-.8-.3-.8-.9zm2 .8c0 .1 0 .2.1.3l.3.3c-.2.3-.3.7-.5 1-.2 0-.5.1-.7.1 0-.3 0-.6-.1-.9 0-.3-.2-.5-.2-.8.4.1.7.2 1.1.2v-.1c-.1.1 0 0 0-.1zm0-1.7c0-.1.1-.2.1-.2.1 0 .2 0 .2.1v.2c-.1 0-.2 0-.3-.1zm.8 5.6c-.1-.1-.3-.1-.4-.2-.2-.2-.3-.5-.6-.9-.3.3-.6.6-1 .9-.1-.5-.2-.9-.4-1.3l.6-.6c.2.4.6.5 1 .6.8.1.8.2.8 1.1.1.1 0 .2 0 .4zm.1-6.4c-.1.2-.5.3-.8.1-.2-.1-.4-.4-.6-.6.3-.1.6-.3 1-.4.1 0 .2.1.2.1.1.2.3.4.2.8zm1.6-15.4v.1-.1zm-.3 1.2c.1 0 .2 0 .2.1.2.2.1.4 0 .6-.1-.2-.2-.3-.3-.5.1-.1.1-.1.1-.2zm-.7 5.2c.1 0 .1-.1 0 0 .1 0 .1 0 .2.1h-.2v-.1zm.2 11zm0 3.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .3-.2.4-.2.4zm.2-8.8zm.3 2.8v-.1.1zm.2-11.6s-.2 0-.2-.1c-.1-.4-.3-.8.2-1.1 0 .1.1.2.1.2.1.4.3.8-.1 1zm6.3-9.3zm-1.1-.1c-.1 0-.2.1-.4.1v-.1h.4zm-1.2 0c.1.1 0 .3 0 .4-.1-.1-.3-.2-.3-.4h.3zm-.6 3c0 .1-.1.3-.1.4-.2.3-.4.6-.6 1-.1-.9 0-1.4.4-2.3.3.2.3.6.3.9zm-.4-.9c-.1 0-.2 0-.2-.1v-.2h.1c.1.2.1.3.1.3zm-.8-2.1h.4c.1.2.2.3.3.5l-.6.9c-.1.1-.1.1-.6-.1.2-.4.3-.9.5-1.3zm-.6 2.7s.2.1.1.2-.1.2-.2.2c0-.1-.1-.1-.2-.2.1-.1.2-.1.3-.2zm-.9 27.2zm.1-28.5zm.5 19.6c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.2.1-.2.1zm-.2-14.9c0-.2.1-.5.1-.7 0-.3-.1-.5-.2-.8.2 0 .4-.1.4-.1.4.6 1 1.2.8 2.2-.3-.2-.7-.4-1.1-.6zm.8 1.5zm-.1 6.8c.3-.2.6-.3.9-.5 0 .2.1.5.1.7 0 .4-.2.6-.5.7-.3 0-.5-.2-.6-.6 0-.1.1-.2.1-.3zm1.3 6.8s.1 0 .2.1c0 .5-.2 1-.5 1.4 0 .1-.2.1-.3 0l-.1-.2c.2-.4.4-.8.7-1.3zm-.3-9.9zm-.1 12.8zm-.2-10.8c0-.1.1-.1.1-.2.1.1.3.1.2.2 0 .2-.1.4-.1.6-.1-.2-.2-.4-.2-.6zm.5 17.2c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.1.3-.2.4zm-.5-3h-.6l-.1-.1c.5-.3.5-.3 1.6 0-.5 0-.7 0-.9.1zm1.1-15.1c-.1 0-.1-.1-.1-.2s.1-.1.1-.2c.1.1.1.2.2.3l-.2.1zm.6 22.1c.1 0 .1 0 .1-.1v.1h-.1zm.2-2v.6c-.2-.3-.1-.4 0-.6zm0-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.7-.8h-.2c.1 0 .2-.1.2 0 .1-.1.1 0 0 0zm.2 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.1-24c-.2.4-.4.2-.8.2.1-.4.2-.6.3-.9h.3c.3.1.3.4.2.7zm-.4-4.6c0 .4-.1.7 0 .9.1.6 0 1.1-.3 1.6-.4.7-.6 1.6-.9 2.4-.1-.2-.2-.4-.4-.6-.4-.1-.5.2-.5.5.1.5.1.9 0 1.4-.1.3-.3.3-.5.2 0-.1-.1-.2-.1-.3-.2-1.7-.2-1.7 1.2-2.8.4-.3.6-.6.7-1.2 0-.5.1-1 .3-1.4.4-.8.3-1.7 0-2.5-.1-.3-.2-.6-.3-1v-1.1c.3-.1.5-.2.8-.3 0 .1.1.2.1.2.3.6.1 1-.4 1.2.2.5.3.9.5 1.3.4.2 1 0 1.3.6l-.3.9c-.1.1-.3.2-.5.3-.3.1-.4 0-.7-.3zm.7 23.3zm.4-20.3c-.1 0-.1-.1-.2-.1 0-.1.1-.2.1-.2.1 0 .1.1.2.1-.1 0-.1.1-.1.2zm.2-1.6c0 .1-.1.1 0 0zm.1-.1c-.1-.4-.2-.7-.3-1.1.2.4.5.7.3 1.1zm.4-3.7c.4 0 .5.4.7.8-.8-.1-.8-.1-.7-.8zm.7 31.8s.1 0 .1-.1c0 .2 0 .3.1.5-.1-.1-.2-.2-.2-.4zm.3.7c0-.1-.1-.1-.1-.2.1.1.1.1.1.2.1-.1.1 0 .1.1l-.1-.1zm.2-32.7s0-.1 0 0l.1-.1c-.1 0-.1.1-.1.1zm-.6 36.5zm1.2-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3 0 .1-.1.1-.1.2zm.5-35.2c-.3.1-.8-.2-1 .3 0-.2 0-.4.1-.6.1-.2.4-.3.5-.3.4 0 .4.3.4.6zm.5 1.2v.1h-.1l.1-.1zm0 33.5V47h.1l-.1.1c.1 0 0 0 0 0zm.2-29.6s0-.1-.1-.1l.2-.2.1.1-.2.2zm.5 29.4c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2.1.1 0 .1-.1.1zm.1-32.7v-.1.1zm.5 34.1c0-.1-.1-.1-.1-.2s.1-.1.1-.2c0 .1.1.1.1.2 0 0 0 .1-.1.2zm1-30.5h-.1c0-.1 0-.1.1-.2h.1c-.1.1-.1.1-.1.2zm.6-5c.1-.3.1-.5.2-1 .3.5.5.8.7 1.2-.3 0-.5 0-.9-.2zm4.3 16.8c.1 0 .2 0 .2.1.2.2.4.4-.1.7 0-.3-.1-.6-.1-.8zm.2-9.5c.1-.2.2-.3.4-.4 0 0 .2 0 .2.1v.2c-.3 0-.5 0-.6.1zm1.3 1.8zm-1.6-1.6c.1-.1.2-.1.3-.2 0 .1 0 .2-.1.4 0 0-.1.1-.2.1 0-.1-.1-.2 0-.3zm-1.2 21zm1-12.9c.1.5.2.8.2 1.1-.3-.1-.4-.4-.2-1.1zm2.3 3s-.1-.1 0 0l-.1-.1s.1 0 .1.1zm-1.3-6l.5-1c.1.6.1.8-.5 1zm1.1.4c0-.1-.1-.2-.1-.3v.3c-.1 0-.2.1-.2.1.1-.1.2-.3.2-.4 0-.2.1-.4.2-.6.4 0 .6.2.6.7-.3 0-.5.1-.7.2zm2.1-2.9c-.1 0-.1-.1 0 0 0-.1 0-.2.1-.2-.1 0-.1.1-.1.2zm9.3 8.8c.1.2.1.5.2.8-.3-.1-.5-.3-.6-.6 0-.1.1-.2.1-.3.2-.1.3 0 .3.1zm.6-3.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1s.1.1.1.2c-.1.1-.1.1-.2.1zm1.7 1c0 .1 0 .1 0 0 0 .1 0 0 0 0 .1 0 .1 0 0 0zm.5 1c0-.6 0-.6.8-.8l-.8.8zm4-6.1s-.1 0 0 0c-.1-.1-.1-.2 0-.2l.1.1-.1.1zm.9 2.8c-.3-.5-.1-.9.2-1.4.1.6-.2.9-.2 1.4zm1.5-1.1c-.1-.1-.2-.1-.2-.2s.1-.1.1-.2c.1 0 .2 0 .2.1s-.1.2-.1.3zm11.8-.8c.1 0 .1-.1.2-.1h.1c.1.1.1.1-.1.1 0 .1-.1.1-.2 0zm-3.9.6c.3-.1.6-.2.8 0 .1 0 .1.1.2.1 0 .2-.2.5-.4.9-.2-.2-.4-.3-.5-.4-.1-.2-.2-.4-.3-.5 0 0 .1-.1.2-.1zm-1 .1zm-2.8.4l.1.1c0 .1-.1.1-.1.2 0 0 0-.1-.1-.1 0-.1 0-.1.1-.2zm-.4 1.1h-.1c-.5 0-.6 0-.4-.5.1.2.3.3.5.5zm-.8-1.3c.3.2.2.5.2.7-.2-.1-.4-.2-.7-.4.2-.1.4-.2.5-.3zm-.6 1.5zm-2 .1v-.1.1zm1.7 3.1v-.1h.1c0 .1 0 .1-.1.1zm.8.9s0-.1 0 0c.1-.1.1-.1 0 0zm.7-1.7c-.3-.2-.5-.4-.8-.5h-.2c-1 .6-1.1.5-1.2-.8-.1-1.1-.1-2.1-.1-3.3.2.1.4.1.4.2.1.4.1.7.1 1.1v2.3c.9-.3.9-.3 1.9-.1.1-.5.1-1 .2-1.4h.6c0 .3-.1.6-.1.9 0 .3.1.5.2.8-.5.2-.7.5-1 .8zm4.9 1.3h-.2c0-.1.1-.2.1-.2.1 0 .2.1.3.1-.1 0-.2.1-.2.1zm.7-1.4c-.2.1-.5 0-.8-.1-.2-.1-.4-.3-.7-.5-.2-.1-.4-.3-.5-.4-.4 0-.4.5-.6.7-.2.2-.3.4-.5.6-.2-.3-.3-.7-.5-.9-.6-.6-.5-1.2-.1-1.9.1-.2.4-.3.5-.5-.4-.3-1-.7-1-1 .2.1.5.2.7.1.2-.1.4-.1.7-.1.2 1.5.5 1.5 1.4 2.2.3.3.9.5 1.1.9 0 0 .3 0 .4-.1.1-.1.1-.3.1-.4-.2-.4-.4-.7-.6-1.1.4-.3.6-.3.7 0 .2.3.3.6.4.9.1.8-.1 1.4-.7 1.6zm1.2-2.2c-.2-.4-.5-.8-.8-1.2 0-.1.1-.2.2-.3h1.2c.1.2.3.4.5.7 0 .2 0 .4.1.5-.4.1-.7.2-1.2.3zm1.2 1.3v-.1.1zm.8-1.6c-.3-.2-.3-.9-.9-.6.1-.2.1-.4.1-.6.4 0 .8 0 1.2.1v.1c.1.3 0 .7-.4 1zm.6 1.7c-.1-.1-.1-.1 0-.1 0 0 .1 0 0 .1.1-.1.1 0 0 0zm-4.5 7.3s0-.1 0 0c.1-.1 0 0 0 0zm5.4-10.8c.1 0 .3 0 .4.1 0 0 0 .1-.1.1h-.3c0-.1-.1-.1 0-.2-.1 0-.1-.1 0 0zm-.2.7c.2-.1.5-.1.7-.1.3 0 .5-.1.6-.2.1.2.1.3-.1.5-.1.2-.1.5-.2.7-.6.9-.6 1 0 2-.2.2-.5.3-.7.5-.4-.3-.5-.8-.4-1.2.1-.8-.2-1.5.1-2.2zm1.4 5.4s-.1.1-.1.2l-.1-.1v-.4c.1 0 .2.1.2.3zm-1.7.5c0-.4-.1-.8-.1-1.3h1.3c.1 0 .2.2.3.3-.5.1-.5.6-.7.9-.3.1-.6-.4-.8.1zm1.6 1.9l-.3.3c-.1.1-.3.1-.4.1-.1-.1-.2-.3-.3-.5.1-.2.2-.5.3-.6.3-.4.6-.4.8-.3.3.2.2.6-.1 1zm.8.4v-.1.1zm.2-2.7h.2c0 .3-.1.2-.2 0zm.3 2h.1-.1zm0-2c.1-.1.2-.3.4-.5 0 .5-.2.5-.4.5zm4.8-2.8zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2l.1-.2zm-1.7 16.4s.1 0 .1-.1v.2c-.1.1-.2.1-.3.2 0-.1.1-.2.2-.3zm-.2.4c0 .1.1.1 0 .2l-.1.1v-.1c0-.1 0-.1.1-.2zm.3 2.2c-.1.2-.2.3-.3.4l-.2-.1v-.5c0-.1.2-.2.4-.4.1.3.2.5.1.6zm.3-8c-.2-.1-.4-.2-.4-.5.3 0 .5 0 .8-.1.1-.1.2-.1.3-.1 0 .1-.1.2-.2.3.2.8 1.2 1.2 1 2.3-.7-.6-1.3-.8-1.4-1.7.1 0 0-.1-.1-.2zm.5 3c.3-.2.5-.1.7.1.1 0 .1.2.1.2 0 .1-.1.1-.2.1-.3.1-.6 0-.6-.4zm.5 4c.6.6.6.6.9 1.8-.8-.4-.7-1.1-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.2.6.5.4 1zm-.4-1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1.5-.1 1 .7 1.3-.3.2.4.4.6.5.9-.2.3-.7.3-.7.8zm.8-6.7c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2-.1.2-.2.3-.3.3zm.8 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5 0 .1-.1.1-.1.1zm.5-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.5.2 1-.1 1.4zm.5 7.4c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2-.3.3zm.5-1.4l.1-.1-.1.1zm.5-6.1c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1-.1-.3-.2-.4-.4zm.7 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.2 0-.3.1-.4.1zm1.1-.4zm0-1.5c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 .1 0 .2-.1.2zm.8-.4c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2v-.7zm.2 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.8-8.1v0zm.4-5c.1 0 .2.1.2.1-.1 0-.2-.1-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3V24c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .5 0 .8zm.1 5.3v-.1h.2v.2c-.1-.1-.2-.1-.2-.1zm.5 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.2.2.1.4-.1.7zm.8-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.3 0 .5-.1.6-.1zm-.4 1.5c.2-.5.5-.4.8-.4-.3.5-.5.4-.8.4zm1.2 4.4l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.2 0-.3.1-.4.2zm0-1.3c.1-.2.2-.4.3-.7.2.4-.1.5-.3.7zm1.6 1.2v-.1.1zm-.3-1.6c.5-.8.5-.8 1.1-.3-.3.2-.6.2-1.1.3zm2.4 4.9c-.1-.1-.1-.1 0 0l-.1-.1c0-.1.1-.1.1.1 0-.1 0-.1 0 0zm0-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6v-.2l.1-.1c.1 0 .1.1.1.2-.1 0-.2 0-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2c0-.1-.2-.1-.2-.2zm1 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c0 .3-.2.3-.3.3zm1.2 1.9s0-.1 0 0c0 0 .1 0 .1.1 0-.1-.1-.1-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3 0 .5 0 .7zm1.5 4.4zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1.1-.1.1-.2.1zm.6-15.7c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3 0 .2 0 .4-.1.6zm.6 13.4c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.1.1-.2.1zm.6-16c-.1.1-.1 0 0 0zm1.7 16.1c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1.1-.1.2-.1.2zm3.8-.3zm-.5-5.2s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c0-.1.1-.2.2-.2zm-.7-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c.1-.2.1-.2.1-.3zm-.4 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c0-.2.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1 0 .2 0 .2.1zm-.3 4.2c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4 0-.1-.1-.2-.1-.2zm1.5 7.2c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.2-1 .3-1.5.4zm5.9-12s0 .1 0 0c0 .1-.1 0 0 0-.1 0-.1 0 0 0zm-.7 3.9c.1.1.1.1 0 .1 0 0-.1 0 0-.1-.1.1-.1 0 0 0zm-.4 4.7c.1 0 .1 0 0 0l.1.1s-.1 0-.1-.1zm-2.6-15.9v-.1l.1.1h-.1zm1 19c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.7-1.5.6-2.2.4zm2.6 1.3c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2.1 0 0 .1-.1.2zm1-9.5h.1v.2c-.1 0-.1 0-.2-.1 0 0 0-.1.1-.1zm-.2 5.1c.1.1.1.1 0 0v0c0 .1 0 .1 0 0zm.3 3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.7.1-1.2.1-1.6 0zm.7-14.4c-.1-.1-.1-.3 0-.4V20v.5zm0 6.2s0 .1-.1.1c0 0 0-.1.1-.1-.1 0 0 0 0 0zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.2-.1-.5-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.4-.3.5zm2 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.1 0-.1.1-.2.2zm-.3-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.1.6-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-3.2.3s-.1 0 0 0c-.1 0-.1 0 0 0zm-.6-.3c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.3 0 .5-.1.8-.2zm-9.7-6.4c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.1-.1.2-.2.2-.3zm-4.9-7.1v.1c-.1 0-.1 0 0-.1zm-5.6 5.5l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3v-.2zm-.9-.9c-.1.1-.1.1 0 0-.1.1-.1.1 0 0-.1 0-.1 0 0 0zm-1.1.1zm-2.5 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zm-1.3-12.8c.1 0 .1 0 0 0 .1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3.1 0 .2.1.3.2zm-4.2-17.8s0 .1 0 0zm-1.6 17.7v.1h-.1s-.1 0-.1-.1c0 .1.1.1.2 0zm-1.6-9.6v-.2s.1 0 .1.1l-.1.1zm.7 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1V27zm.7 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.7-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8-.1.3-.3.6-.8.6zm1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.3-4.4zm1.9 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.6-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.3.1-.5.2-.8.3zm1.4 1.9c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .2-.1.2zm1-2.1c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2 0 .4 0 .6zm-.2-6.5c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.4-.6-.8-.5-1.3-.4zm1.5 4.5v.1h-.2v-.1c.1-.1.2-.1.2 0zm-.6 3.9c-.1 0-.1 0 0 0-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1-.1.2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.4.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.2 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.2-1.7-.2zm1.9.2c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.3-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3v.2zm.1-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.1.8-.5 1-1 1zm2 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0-.1 0 0zm-.3-3.1s-.1-.1-.1-.2h.4s.1.1.1.2h-.4zm.3-12c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.3 9.3zm-.2-9.6c.1 0 .2.1.3.2-.2 0-.2-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .2-.1.2-.1zm.1 9.4s-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm.2-8h-.1v-.1c0-.1.1-.1.2-.2 0 .2-.1.2-.1.3zm.7 7.1zm-.2-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2c-.2-.1-.4-.1-.7 0zm.5 6.6c.1 0 0 0 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.7s-.1 0 0 0c-.1 0-.1-.1 0 0-.1-.1 0-.1 0 0zm1.2-2c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.4.1-.4-.2-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.6-.2-1.2-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2l-.1.1zm.1-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.4.3-.9 0-1.3.1zm1.3-6.9c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7h.2c-.1 0-.1-.1-.2-.1 0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2.1.4.2.9-.1 1.5zm.7 4h-.1c0-.1-.1-.1-.1-.2h.2v.2zm.4-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.7s-.1 0 0 0l-.1-.1c.1 0 .1 0 .1.1zm0-2.3c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.4c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.6-1.3-.9zm4.9 4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2s-.1 0 0 0c-.1 0-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm-3-3.4c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.2.5 0 .8-.3 1.1zm1.4 3.2c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.8.3.5.9.5 1.4zm.3-2.1c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.6-.2-.6-.7-.7-1.5zm2.5 4.8c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.3.4.3.7.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s0-.1 0 0c.1-.1 0 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .1-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9-.1-1.6.2-2.3.5zm1.6 5.9c.1 0 0 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.1.3-.4.5-.6.8zm.7-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.4-.5-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1-.1-.3 0-.4 0zm-1.2-4.9c.1-.2.3-.2.4 0l.7.7c-.7.2-.7.2-1.1-.7zm2.9.1c-.5.4-.7.8-.7 1.4 0 .1-.1.2-.2.5-.1-.2-.2-.3-.2-.4.1-1 .2-1-.3-2 .4-.2.9-.4 1.3-.6.2.4.5.8.1 1.1zm-.9-2.2c-.7.3-1.3-.4-1.9-.4-.4.4-.3.8-.3 1.2 0 .3-.2.5-.4.6v-.3c0-.1-.1-.3-.2-.3-.2-.1-.3.1-.3.3.2.1.3.2.5.3-.2-.1-.3-.2-.5-.3-.2 0-.3.1-.5.1-.1-.4-.3-.7-.4-1-.2 0-.3-.1-.6-.2.2-.4.4-.8.7-1h.1c.2 0 .3.1.3.4 0 .1 0 .2.1.2s.2 0 .3-.1c.1 0 .2-.1.2-.2.1-.1.3-.1.4 0 .1.1.3.2.5.1.4-.1.8-.1 1.2 0 .5.2 1.1.2 1.7-.1.3-.1.7-.1.9.2h.1c-.6.8-1.3.3-1.9.5zm7.5-1.1c0 .1 0 .1-.1.1 0 0 0-.1-.1-.1h.2zm-1.4 1h.4c-.2 0-.3 0-.5.1 0-.1.1-.1.1-.1zm-3.6 11.7s-.1-.1 0 0v-.1s.1.1.1.2c0-.1-.1-.1-.1-.1zm.1-10.7zm.8.5v-.1l.1-.1s.1.1 0 .1l-.1.1zm1.1.6c0 .4 0 .8-.1 1.3-.2-.3-.3-.5-.5-.8 0-.6.2-1.2.6-1.8.4.5-.1.9 0 1.3zm-1.1-1.9c-.4-.2-.3-.6-.4-.9l-.3-.3h.3c.5.5 1.1.9 1.9 1-.5.2-1 .2-1.5.2zm2.1 4.2c.2.5.4.8.5 1.1l-.1.2h-.2c-.4-.3-.4-.7-.2-1.3zm0 5.7c0-.4 0-.4.5-.6-.2.3-.3.5-.5.6zm.5-.5c.3-.2.5-.4.9-.6-.2.6-.2.7-.9.6zm.4-5.6h.2v.1h-.2v-.1zm.7-1.7c-.4.1-.9.1-1.4.2.2-.4.2-.6.3-.9.7.1.7.1 1.4-.2-.2.4-.2.6-.3.9zm.4 2.1V31s0-.1.1-.1c-.1 0 0 .1-.1.2.1 0 0 0 0 0zm.1-2.6c-.1-.1-.2-.2-.2-.3.4-.3.6.1.8.3-.2.2-.4.4-.6 0zm.9 5.6V34c.1 0 .1-.1.2-.1v.1c-.1 0-.2 0-.2.1zm-.3-1.9c.1 0 .2-.1.2-.1.1 0 .1.1.1.2s-.1.1-.1.2c0-.1-.1-.2-.2-.3zm0-3.7c.1-.3.2-.5.5-.5.2 0 .5 0 .5.3 0 .2 0 .4-.1.7-.3-.2-.6-.4-.9-.5zm1 2.6c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1-.2.2zm14.2 7.8c.1.1.3.3.4.5-.2-.1-.4-.1-.6-.2 0 0 0-.2-.1-.2.1-.1.2-.2.3-.1zm-13.4-8.1c.3-.2.6-.1 1 0 .1 0 .1.1.1.2s-.1.3-.1.3c-.1.1-.3.1-.5 0-.2 0-.6-.1-.5-.5zm1.3 1.1c.2 0 .5.3.4.5-.1.2-.2.3-.4.5-.4-.1-.3-.4-.3-.6-.1-.3 0-.4.3-.4zm-.8 5.5c-.1-.1-.1-.2-.2-.3.4-.4.8-.7 1.2-1.1.3.3.3.3.4.7-.6 0-1.1.2-1.4.7zm1-9.2c-.1 0-.2-.2-.2-.3.2-.1.3-.3.5-.4.1.1.3.2.3.3.1.2-.3.4-.6.4zm-.5-1.6c.1 0 .2 0 .3-.1.2-.1.4-.1.6-.2.1 0 .1 0 .2-.1-.3.3-.7.4-1.1.4zm2.6-.4l.1.1c.2.2.5.2.8.2h.1c-.2.1-.4.1-.6.2-.3 0-.7.2-1-.2.2-.4.4-.1.6-.3zm-.4 6v-.1.1zm.6-.8c-.2 0-.5-.1-.7-.2v-.4c.5-.3 2.7-.2 3.5 0-.1.1-.1.3-.2.3-.2.1-.4.2-.6.2-.7 0-1.3.1-2 .1zm.8 3.2v-.1.1zm.4 1.6V36h.1c.1.1.1.2.2.3 0-.1-.1-.1-.3-.1zm.5.2c0-.1-.1-.1-.1-.2l.2.2h-.1zm.5 1.4c-.1 0-.1-.1-.2-.1.1-.1.1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.2-3v-.1.1zm.7-2.2c-.1.6-.3.8-.8.7-.5 0-1-.2-1.5-.2 0-.3-.1-.5-.1-.8 0-.5.1-.5.7-.4.5-.2 1 0 1.6.2 0 .2.1.4.1.5zm.6 2.2c0-.2-.1-.3-.1-.5 0 0 .1-.1.3-.2.1.2.1.3.1.5 0 .1-.2.2-.3.2zm3.6-2.2c-.1.3 0 .7-.4.7l-.1-.1c-.1-.5.3-.5.5-.6zm-.6 1.4c.4.1 1 .1 1.3.6-.4.1-.9.3-1.2.1-.4-.2-.7.1-1.2.1.2-.6.6-1 1.1-.8zm-2.4 2.2c.1 0 .2.1.3.2 0 0 .1 0 .2-.1.2-.1.3-.4.5-.4s.5.2.7.4c.1.1.1.3.2.5.2.8.3.9 1.1.5.1-.1.2-.1.6-.2-.5.5-.9.8-1.2 1.2.1.3.2.7.2 1.1l-.2-.2c-.7-.4-1.2-.9-1.3-1.8-.3-.1-.5-.3-.7-.4-.1-.1-.3-.2-.4-.4-.2-.1-.2-.3 0-.4zm.7-4.9l-.4-.2.4-.4s.3.2.2.2c0 .1-.1.3-.2.4zm-.5-3.4l.2-.2c0 .1.1.1.1.2l-.1.1c0-.1-.1-.1-.2-.1zm1.8 1.9l-.2-.2c0-.1.1-.2.1-.2.1 0 .2 0 .2.1s0 .2-.1.3zm-.9-1.9c.4-.6.8-.4 1.3-.4-.1 1.1-.2 1.1-1.3.4zm1.3-1.4c-.7 0-1.4.3-2.2-.2-.1-.1-.3-.1-.4-.1-.9.4-1.8.4-2.7.2.5-.1.9-.3 1.2-.6 0 0 .1 0 .1-.1l.1.1c.2-.1.4-.1.6-.2v.3c0 .1.2.1.3.1.5 0 1 0 1.5.1s1 0 1.4-.3c.2.4.1.5.1.7zm3.2-.5c.1-.1.2-.1.3 0h-.3zm5.2 1.5s-.1 0 0 0c-.1-.1-.1-.1 0-.2h.1c-.1.1-.1.2-.1.2zm1.1-.8h-1.1c-.7 0-.9-.1-.9-.9.4-.1.8 0 1.2 0 .1.1.2.1.3.2.3.2.4.5.5.7.1-.4.2-.6.3-1h.1c.1.3.2.6.4.9-.3.1-.5.1-.8.1zm18.1-.7s.1.1.1.2c-.1 0-.1.1-.2.1 0 0-.1-.1-.1-.2.1 0 .2-.1.2-.1zm-7.2-.3s.1 0 0 0l.1.1c-.1 0-.1 0-.1-.1 0 .1 0 0 0 0zm-4.1.6c-.5-.2-.5-.2-.9.3-1-.1-1.1-.1-1-1h.1c.1 0 .3.1.4.2.1.1.3.2.4.1.2-.2.5-.2.8-.3.2.1.5.3.9.6-.2.2-.4.2-.7.1zm.7-.1c0-.2.1-.4.1-.5H1776.9c0 .2-.2.4-.4.5zm5.3 1.6c-.4.2-.9.4-1.4.6-.4-.4-.8-.6-1.3-.8-.5-.1-.9-.4-1.3-.6-.2-.1-.1-.3 0-.5l.1-.1v.1c.3-.3.6-.6.8-.9h.4c.1 0 .1.1.2.2.1.4.1.8.1 1.2.6-.2.6-.2 1.4-1 .2.4-.2.9.2 1.2.1.1.2.1.2.1.5-.1.4-1 1.1-.9-.2.5-.4.9-.5 1.4zm3.4 1.2c0-.2 0-.4-.1-.7.3.4.2.6.1.7zm1.8-.9c-.3.6-.8.7-1.3.3-.2-.2-.4-.5-.6-.7-.7.2-.7.2-1.3-.6-.3.1-.7.2-1.2.4 0-.6.4-1 .5-1.5.5.2.8.7 1.3.1.2-.3.6-.5.9-.7h.1c.2.6.2.6-.3 1.2.1.2.3.3.4.5.4 0 .7-.5 1.1 0 .2.2.6 0 .9 0-.2.3-.3.7-.5 1zm.2-2.9c.1-.1.3-.1.4-.3 0 0 0 .1.1.1-.2.2-.3.2-.5.2zm.9 3.2c-.1-.4-.1-.4.2-.8.2.4.1.6-.2.8zm2-.2h-.4v-.1c.1-.1.2-.1.4-.1 0 0 .1 0 .1.1 0-.1-.1 0-.1.1zm-.1-1.4l-.2-.1c0-.1.1-.2.2-.3l.2.2-.2.2zm1.1 1.2c-.1 0-.1-.1-.2-.1 0-.1.1-.1.1-.2 0 0 .1 0 .1.1.1.1 0 .2 0 .2zm0-2.3c-.1-.2-.1-.4 0-.6h.1c.3.1.2.3.2.6v.7c0-.3-.2-.5-.3-.7zm1 1.7c-.2-.4-.4-.7-.5-1.1.4.2.5.6.5 1.1zm.2.8c-.4-.2-.1-.6-.2-.8.5.4.5.4.2.8zm.6-3.4c.1.1.2.1.3.2 0 0 0 .1-.1.2h-.1c0-.1-.1-.2-.1-.4 0 .1 0 .1 0 0zm-.3 2.1c.4-.3.6 0 .8.1-.3 0-.5-.1-.8-.1zm1 1c-.3-.3-.1-.6-.1-.8.2 0 .4.1.5.2 0 .3-.3.4-.4.6zm.3-1.4v-.2c.1.1.1.1 0 .2.1-.1.1 0 0 0zm3.1-.1h.2v.1c-.1 0-.1.1-.2.1-.1-.1-.1-.1 0-.2zm-1.9-1.4c.1 0 .1-.1.2-.1.6.3.7.4.7.8-.1.3-.3.4-.7.3-.1-.3-.2-.6-.2-1zm-.3 4c-.1-.1-.2-.1-.2-.2.1-.1.2-.2.3-.2l.2.2c-.1 0-.2.1-.3.2zm.3-1.9h-.2s-.1-.2 0-.2c.1-.1.2-.1.3-.1.1 0 .1.1.2.2-.2 0-.2.1-.3.1zm.6.9c-.2-.4-.3-.7-.4-1.1.2-.1.3-.2.6-.4.2.4.3.8.4 1.2l-.6.3zm1.2-1.3c.1.3.2.5.3.8-.5-.3-.5-.3-.3-.8zm.5 1c-.1-.1-.2-.1-.2-.2h.3c-.1 0-.1.1-.2.1l.1.1zm.1-.1c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm2.3-3.3zm-.8 3.2c.1 0 .2.1.3.2 0 .1-.1.2-.1.2-.1 0-.2-.1-.3-.1 0-.2.1-.3.1-.3zm.1 2c0-.1 0-.2-.1-.3 0 0 .2-.1.2 0s.1.2.1.2-.1 0-.2.1zm.7-3.8c-.1 0-.1-.1 0 0-.1-.1-.1-.1 0-.1-.1 0 0 0 0 .1 0-.1 0 0 0 0zm.7 3c-.1-.1-.2-.1-.2-.2 0-.2.1-.3.1-.4h.2c0 .1.1.2 0 .4 0 .1-.1.2-.1.2zm1.6-.1v-.2c0-.2.1-.3.2-.4 0 .2 0 .4.1.6h-.3zm2.1.1zm12.7 4.3c-.1-.1-.3-.2-.4-.4.4-.1.4-.1.4.4zm-3.3.3c.1.1 0 .1 0 .1s-.1-.1 0-.1c-.1 0 0 0 0 0zm-1-2.1c.1 0 .1.1.1.2-.1 0-.1.1-.2.1 0-.1-.1-.1-.1-.2.1-.1.1-.1.2-.1zm-.1 1.4zm-2.5-4.1c0 .1.1.1.1.2-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1h.2zm-3.6.7c-.1 0-.1 0 0 0-.1-.1 0-.1 0 0zm-1.4 5.6zm-.1.2l.1-.1v0c0 .1.1.2.1.3 0-.1-.1-.1-.2-.2zm.3.5h-.1c.1-.1.1-.2.2-.3.2.1.3.2.5.2-.3 0-.4.1-.6.1zm5.7-2.2c.1.5 0 1-.3 1.4-.5.1-1 .1-1.4.2-.1-.2-.2-.4-.3-.5-.3 0-.5.2-.5.5v.1c-.6 0-1.1-.1-1.7-.1-.4.4-.5.5-.8.6.1 0 .1 0 .2-.1-.2-.3-.3-.6-.5-.8l.3-.3c0-.7-.3-1.1-.6-1.7.1.1.3.1.6.2l-.6-.6c.8-.1 1 0 1.1.9 0 .3-.1.6.2.7.4-.3.5-.3.7-.9 0-.1.1-.1.1-.2v-.1c-.3-.5-.6-1.1-.8-1.8h.2c.2-.1.4-.1.5-.1-.1.1-.1.3-.1.5 0 .5.3.8.8.8.4 0 .7-.3.7-.7 0-.2-.1-.4-.3-.6.1-.1.2-.2.1-.3-1-.3-1.2-1.1-1.2-2.1 0-.2 0-.3.1-.4.2-.2.4-.3.7-.5h.1c0 .2.1.4.1.6.2 0 .3 0 .4.2.1.5.2 1.1.6 1.4 0 .7-.2 1.3.3 1.8.6-.7.6-1-.1-1.7.1.1.2.1.3.2.2-.4.3-.8.5-1.2.1 0 .1-.1.2-.1.2-.1.3-.1.5-.1 0 .3 0 .6-.1.9-.1.2 0 .4 0 .6-.1 0-.2-.1-.3-.1 0 .3-.2.6.2.9.1 0 .1-.1.2-.1v.1c0 .2-.1.4-.2.5h.6v.1c-.2 0-.4.1-.6.1.2.6 0 1.2.1 1.8zm1.5 3.6v.2c.1.1.1.2.2.4-.3 0-.5.1-.8.6-.2.1-.4.2-.4.3v-.8c0-.1.7-.3 1-.4-.1-.1 0-.2 0-.3v-.2c.2 0 .4.1.6.2h-.6zm0-2.1c-.1-.2-.1-.4-.3-.6v-.1c.5 0 1-.1 1.6 0h.5c0 .3 0 .5-.2.7-.5.1-1.1-.2-1.6 0zm2 2.6c-.1 0-.1-.1-.2-.1.1-.1.2-.2.3-.1.1 0 .2.1.4.2-.3-.1-.4 0-.5 0zm1.8-2.2c-.1-.1-.3-.2-.4-.2h-.2c-.2-.2-.5-.3-.8-.4 0-.3 0-.7-.1-1l.1-.1.4.4s.1 0 .1-.1c.2.1.5.3.7.4.4.1.8.2 1.1.6-.3.2-.6.3-.9.4zm.6-1.6c.1 0 .1-.1.2-.1-.1-.1-.1-.2-.2-.3 0-.1.1-.1.1-.2.1.2.2.5.3.8-.2 0-.3-.1-.4-.2zm1.2 2.4c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1.1 0 0 0 0 .1zm1.5-6.8c.1 0 .2-.1.3-.1 0 .2 0 .3-.1.4 0-.1-.1-.2-.2-.3zm-1.3 2.8l.3-.3c.1-.1.1-.2.2-.4h.4c.1.1.2.1.3.2-.3.3-.4.4-.6.9-.2-.1-.4-.2-.6-.4zm.8.5c0 .1-.1.1-.2.1 0-.1 0-.1-.1-.2.2 0 .2.1.3.1zm.1 2.4c.2.4.2.5 0 .9-.1.1-.2.1-.3.2-.1-.5-.2-.9-.4-1.3l.6-.6c.2.3.4.4.8.5-.2.1-.4.2-.7.3zm1-1.4v-.3c0-.1-.1-.1-.2-.2 0 .1-.1.2 0 .4 0 0 .1.1.2.1-.1.2-.2.3-.3.5-.2 0-.5.1-.7.1v-.4c0-.1.1-.2.1-.2 0-.3 0-.6.1-.9.2 0 .4.1.6.1v-.1c0-.1.1-.1.1-.2 0 .1 0 .2.1.3l.3.3c-.1.1-.2.3-.3.5zm.7 2.7c0-.1-.1-.1 0 0l-.1-.1c0-.4 0-.7.1-1.1.1.1.1.4.1.8 0 .1 0 .2-.1.4zm.9-1.2c-.1-.1-.2-.2-.2-.3 0-.1.1-.2.2-.4.1.1.2.2.2.3 0 .2-.2.3-.2.4zm1.4 2.9zm2.2-7.4c0 .1-.1.1-.1.2s-.2.1-.3 0v-.2h.4zm-.2 1.6zm-.3-1.7zm.6 8.1c-.1-.1-.2-.2-.2-.3v-.4s.2-.1.2 0c.1.1.2.2.2.3-.1.1-.1.2-.2.4zm-.5-3.1h-.2v-.3c.2 0 .5.1 1 .2-.4.1-.6.1-.8.1zm1.7 7.1c.1 0 .1 0 .1-.1v.1h-.1zm.2-2v.6c-.2-.3-.1-.5 0-.6zm0-.1c0-.1-.1-.2-.1-.3-.1-.5 0-.6.4-.6h.2c-.2.3-.3.6-.5.9zm.8-.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm.1 1.1v-.2h.1l.1.1c-.1 0-.2 0-.2.1zm.4-5.3zm1.8 6.1s.1 0 .1-.1c0 .2 0 .3.1.5-.1-.1-.2-.2-.2-.4zm.3.7c0-.1-.1-.1-.1-.2.1.1.2.1.1.2.1-.1.1 0 .1.1 0-.1 0-.1-.1-.1zm-.4 3.8zm1.2-1.7c-.1-.1-.1-.2-.2-.3l.2-.2c.1.1.1.2.1.3 0 0-.1.1-.1.2zm1-.5v-.1h.1c0-.1 0 0-.1.1.1-.1 0-.1 0 0zm.7-.2c0-.1-.1-.2-.1-.2l.1-.1c0 .1.1.2.1.2.1 0 0 .1-.1.1zm.6 1.3c0-.1-.1-.1-.1-.2v-.1s.1 0 .1-.1l.1.1c0 .2 0 .3-.1.3zm5.9-8.3c0 .1-.1.2-.1.3l-.1.1c-.2-.2 0-.4.2-.4zm2.9-4.6zm-1.3-14.3c.1.1.1.2.2.3 0 0 0 .1-.1.1-.1-.1-.1-.2-.2-.2.1-.1.1-.2.1-.2zm-.3 18.1c.6.6.6.6.9 1.8-.8-.5-.6-1.2-.9-1.8zm1.7.8c-.4-.3-.3-.7-.4-1 .5.1.7.4.4 1zm-.3-1.1c-.3-.4-.8-.4-1.4-.3.1-.5.2-.8.3-1.1v0c.4 0 .9.6 1.2-.3.2.4.4.6.5.9-.2.3-.6.4-.6.8zm.7-6.6c0-.1-.1-.1-.1-.3.1-.1.2-.1.3-.2 0 .1.1.2.1.2l-.3.3zm.8 8.4c-.4 0-.3-.4-.4-.6.2.2.5.1.5.5l-.1.1zm.5-8.5c-.4.1-.4-.2-.5-.4v-.7l.6-.3c.2.4.2.9-.1 1.4zm.5 7.3c0-.1-.1-.1-.2-.3.1-.1.3-.2.4-.2l.1.2-.3.3zm.5-1.3l.1-.1-.1.1zm.5-6.2c-.1-.3 0-.7-.1-1h-.6v-.4h.1c.4.3.9.4 1.4.5v1.2c-.2 0-.4.1-.4.1-.1 0-.3-.2-.4-.4zm.8 7.5c-.1 0-.2-.1-.3-.2.2-.1.3-.2.4-.2.1 0 .2.2.3.3-.3 0-.3.1-.4.1zm1-.4zm0-1.4c-.1 0-.1-.1-.2-.1 0-.1 0-.1.1-.2.1 0 .1.1.2.1 0 0 0 .1-.1.2zm.8-.5c0-.1.1-.1.2-.3.1.2.2.2.2.3.1.3.2.6-.2.7h-.2c.1-.2 0-.5 0-.7zm.3 1.4h.1c.2.2.3.4.6.8-.9-.1-.9-.1-.7-.8zm.7-8.1v0zm.4-5c.1 0 .2.1.2.1-.1 0-.1 0-.2-.1zm.5 18.1c0-.1-.1-.1-.1-.2 0 0 .1-.1.1 0s.1.1.1.2h-.1zm.2-4.8l-.1-.1s0-.1.1-.1l.1.1s0 .1-.1.1zm.2 2.6h.1-.1zm.5-10.3h-.2l-.3-.3v-.1c-.1-.2-.2-.3-.3-.5l-.1.1v-.1s0-.1.1-.1h.1v-.1c.2.1.6.1.7.3.1.2 0 .6 0 .8zm.1 5.3v-.1h.2v.2c-.1 0-.2-.1-.2-.1zm.5 3c0 .1-.2.1-.2.1-.1 0-.1-.1-.1-.2 0-.3.1-.5.4-.6.3.2.1.5-.1.7zm.9-9.2l.1.2c0 .2-.3.4-.5.2-.1 0-.1-.1-.2-.3.2 0 .4 0 .6-.1zm-.5 1.5c.2-.5.5-.4.8-.4-.2.6-.5.4-.8.4zm1.2 4.5l-.2-.2c0-.4-.1-.7-.1-1.1h.3c.1.3.2.7.4 1.1-.2 0-.3.1-.4.2zm0-1.4c.1-.2.2-.4.3-.7.2.5-.1.5-.3.7zm1.6 1.2v-.1.1zm-.3-1.5c.5-.8.5-.8 1.1-.3-.3.1-.6.2-1.1.3zm2.4 4.8c-.1 0-.1 0 0 0l-.1-.1c.1 0 .1 0 .1.1 0-.1 0 0 0 0zm0-8.3c-.2-.2-.5-.4-.8-.7.4-.5.8-.4 1.2-.3.2.5-.1.7-.4 1zm.6 4.6V32l.1-.1c.1 0 .1.1.1.2-.1 0-.1.1-.2.1zm.8-10.5c0-.1.1-.2.2-.3.1.1.2.2.2.3l-.2.2s-.2-.1-.2-.2zm1 14.2c-.2 0-.4-.1-.6-.1v-.2h.9c.1.3-.2.3-.3.3zm1.2 1.9s.1 0 .1.1c0-.1-.1-.1-.1-.1zm.4-2.2zm.1-4.6c-.1 0-.2-.1-.3-.1.1-.2.1-.4.2-.6h.1c.1.3.1.5 0 .7zm1.5 4.5zm.2 2.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1s.1.1.2.1c-.1 0-.1.1-.2.1zm.7-15.8c-.2 0-.3-.1-.4-.2l-.1-.1c.2-.5.2-.5.6-.3-.1.2-.1.4-.1.6zm.5 13.5c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1 0 0 .1.1.2.1-.1 0-.1 0-.2.1zm.6-16.1c-.1.1-.1.1 0 0zm1-5.7c-.1-.1-.2-.2-.2-.3.1 0 .2.1.2.1.1.1.1.2 0 .2.1 0 .1 0 0 0zm.7 21.9c-.1 0-.1-.1-.2-.1.1 0 .1-.1.2-.1h.1c-.1 0-.1.2-.1.2zm3.8-.3zm-.5-5.3s.1.1.2.1c-.1.1-.1.2-.2.3l-.2-.2c.1-.1.1-.2.2-.2zm-.6-11.3c.1.1.2.1.2.2s-.1.2-.1.3l-.2-.2c0-.1 0-.2.1-.3zm-.5 16.5s.1.1.1.2c-.1 0-.1.1-.2.1l-.1-.1c.1-.1.1-.2.2-.2zm-.3-4.4v.1-.1zm-.4-4.2l-.1.1c0-.1-.1-.1-.1-.2.1.1.2.1.2.1zm-.3 4.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1-.1.1-.1zm-.4.4c0-.3.2-.2.3-.2 0 .2.1.4-.2.4l-.1-.2zm1.5 7.3c-.4.1-.7-.2-1.2-.2.3-.4.5-.6.6-.9.4-.1.7-.1.9.3h.2c.1-.1.2-.2.3-.2.2-.1.4-.2.6 0 .1.2.1.4.1.6-.5.1-1 .2-1.5.4zm6.8-8.6h.1v.2c-.1 0-.1 0-.2-.1 0 0 0-.1.1-.1zm-.2 5.2c.1 0 .1 0 0 0v0zm-.7-8.6zm-.7 3.8s0 .1 0 0c.1.1.1.1 0 .1v-.1c-.1.1 0 0 0 0zm-.3 4.7l.1.1c-.1 0-.2 0-.1-.1-.1.1-.1 0 0 0zm-2.7-15.9v-.1l.1.1h-.1zm1 19.1c-.2 0-.3-.3-.4-.5 0-.1.1-.3.2-.3.8.2 1.6-.1 2.4.4-.8.6-1.5.6-2.2.4zm2.6 1.2c-.1-.1-.1-.2-.2-.3.1 0 .1-.1.2-.1.1.1.2.1.1.2.1.1 0 .1-.1.2zm.2-25.4v-.1.1zm.4-.3c-.1 0-.2.1-.3.1 0-.1 0-.3.1-.4 0 0 0-.1.1-.1 0 .2 0 .3.1.4zm.5 24.3c-.1 0-.3-.2-.3-.3 0-.1.1-.4.2-.4.3-.1.6-.2.9-.2.2 0 .3.1.8.9-.7.1-1.2.1-1.6 0zm.7-14.4c-.1-.1-.1-.3 0-.4v-.1.5zm0 6.2s0 .1-.1.1l.1-.1zm.1-6.1s.1 0 .2.1h.2c.1 0 .2.1.2.2-.2 0-.4-.1-.6-.3zm.3-4.1c-.1-.1 0-.3-.1-.4 0 0 0-.1-.1-.2-.2.1-.3.2-.5.3 0-.1-.1-.2-.1-.2 0-.2.1-.3.2-.4.1 0 .2.1.3 0 .1 0 .2-.1.3-.1.2.1.3.2.3.4v.1c.1.3-.1.5-.3.5zm2.1 15.7c0-.1-.1-.1-.1-.2.1 0 .1-.1.2-.1l.1.1c-.2.1-.2.1-.2.2zm-.4-4.8c-.1 0-.3 0-.3-.1s0-.3.1-.4c.2-.2.5-.3.9-.4-.1.7-.4.8-.7.9zm37.6-1.2s0 .1 0 0c0 .1 0 .1-.1.1.1 0 .1 0 .1-.1zm-3.2.3zm-.6-.2c.2-.1.4 0 .5.2-.2.1-.5.2-.7.3-.3.2-.5 0-.6-.3.3 0 .5-.2.8-.2zm-9.7-6.5s.1 0 0 0c.2-.1.4 0 .4.2 0 .1-.2.3-.3.3-.1-.1-.2-.1-.3-.2.2-.1.2-.2.2-.3zm-5-7.3s.1 0 0 0c.1.1.1.3.1.4-.1-.1-.2-.2-.1-.4-.1.1 0 0 0 0zm-5.5 5.7l.6.3c-.1.1-.2.3-.2.3-.2 0-.3-.1-.6-.3 0-.1.1-.2.2-.3zm-.3 4.9l.1-.1c0 .1-.1.2-.1.3v-.2zm-.9-.8c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm-1.1 0zm-2.5 5.6c.4-.4.5-.9.6-1.5 0-.1.2-.2.3-.3 0 0 .1 0 .1.1 0 0 .1 0 .1-.1.1 0 .2.1.3.2.1.2.1.4.2.6 0 .1.2 0 .3 0 .3.7.3.7-.2 1.2-.2.2-.5.2-.7 0-.3-.3-.5-.2-.8 0 0 0-.2 0-.2-.1v-.1zm-1.3-12.8c.1 0 .1.1 0 0 .1.2 0 .2-.1.1v-.1h.1zm.1 11.8l.9-.3c0 .4 0 .4-.8 1.1-.5-.4-.5-.6-.1-.8zm1 4.9c-.1.1-.1.3-.2.3s-.3-.1-.5-.2c.2-.2.3-.3.4-.3.1 0 .2.1.3.2zm-4.2-17.8c.1.1.1.1 0 0 0 .1 0 0 0 0zm-1.6 17.8v.1h-.1s-.1 0-.1-.1h.2zm-1.6-9.7v-.2s.1 0 .1.1 0 .1-.1.1zm.8 4.9c.1 0 .2 0 .3.1v.4c-.1 0-.2-.1-.3-.1-.1-.2-.1-.3 0-.4zm.6 8c-.2-.3-.4-.5-.6-.7 0 0 0-.1.1-.1.3-.4.5-1 1.2-.8.1.6-.2 1.1-.7 1.6zm2.7-.4c-.1 0-.2-.1-.4-.1h-.1.1c-.2.1-.5.2-.7.2-.1 0-.3-.1-.3-.2-.2-.5.1-1.2.6-1.3h.8c.5 0 .7.3.8.8 0 .4-.3.6-.8.6zm1-2.7c-.1 0-.2-.1-.3-.1.1-.1.2-.1.2-.1.1 0 .1.1.2.1l-.1.1zm.3-4.4zm1.9 6.9c-.1.1-.4.1-.6.1-.2 0-.4-.2-.6-.2-.3 0-.5 0-.6-.4-.1-.3.2-.5.4-.7.2-.1.4-.2.6-.4.2.3.3.6.5.9.1 0 .3-.1.5-.1-.1.4-.1.7-.2.8zm.8 1.3zm-.7-2c-.1-.3-.1-.5.2-.6.3-.1.4.1.6.3-.2.1-.5.2-.8.3zm1.4 2c0-.1-.1-.1-.1-.2.1 0 .1 0 .2-.1 0 0 .1.1 0 .1 0 .1 0 .1-.1.2zm1-2.2c-.2.7-.7.9-1.2.4-.2-.1-.3-.4-.4-.5.5-.2.9-.8 1.6-.5.2.2.1.4 0 .6zm-.2-6.4c.1-.3.2-.5.3-.7.2-.1.3-.1.5-.1h.6v.4c.5.2.9.5 1.4.7.3.2.4.5.4.8-.6-.1-1.1-.6-1.7-.5-.1 0-.2-.1-.2-.2-.3-.6-.8-.5-1.3-.4zm1.5 4.4v.1h-.2v-.1h.2zm-.6 3.9s-.1 0 0 0c-.1-.1-.1-.1-.1-.2h.1v.2zm.8.1c-.1 0-.1-.1-.2-.2.1 0 .1-.1.2-.1l.1.1c0 .1 0 .2-.1.2zm1.1 0c.5-.4 1-.4 1.5-.5-.3.4-.8.6-1.5.5zm1.5-.6c-.3-.3-.6-.5-1-.8-.4.2-.8.3-1.2.4-.2.1-.5 0-.8-.1-.3-.1-.5-.6-.4-.8.2-.3.4-.2.7-.1.1.1.2.1.4.1.2-.3.5-.6.7-.9.4.2.8.4 1.1.5.4-.1.5-.7.9-.5 0 .1.1.2.1.2 0 .8.3 1.6-.5 2zm-1.1-6.8c.2-.9.2-.9-.4-1.8.5-.2.8-.7 1.4-.3.2 0 .4 0 .5.1v.1l.1.1c-.2 1-.2 1.1.1 2-.5-.1-1.1-.1-1.7-.2zm1.9.2c.3-.7.8-1.2 1.3-1.7l-.2-.1v-.6c0-.6 1.5.2 2-.4v1c.3.1.4.1.6.2 0 .1.1.2 0 .3-.3.4-.7.6-1.2.7-.5.1-1 .1-1.4.7-.2.4-.7.2-1.1-.1zm.8 4.7c-.1 0-.2-.1-.3-.1.1-.1.1-.2.2-.2s.2.1.3.1c-.1.1-.1.2-.2.2zm1 2.2c-.2.2-.4.1-.6.1.1-.4.3-.4.6-.3 0 0 .1.2 0 .2zm.2-2c-.1 0-.2-.1-.3-.2 0-.1 0-.3.1-.4l1.2-.4c-.2.8-.6 1-1 1zm1.9 1.2s-.1 0-.1-.1c0 0 .1 0 .1.1 0-.1 0 0 0 0zm-.3-3s-.1-.1-.1-.2h.4s.1.1.1.2c-.2-.1-.3 0-.4 0zm.3-12.1c-.1 0-.1 0-.2-.1v-.1c.1 0 .1-.1.2-.1v.3zm.3 9.4zm-.2-9.7c.1 0 .2.1.3.2-.1 0-.2-.1-.3-.2zm.4 6.8c-.1.1 0 .3.1.3h.2c-.2.1-.3 0-.5-.2.1 0 .2 0 .2-.1zm.1 9.4s-.1 0-.1-.1l.1.1c0-.1 0 0 0 0zm.2-8h-.1v-.1c0-.1.1-.1.2-.2 0 .2 0 .3-.1.3zm.7 7.1zm-.1-5.7v-.3c.2 0 .5-.1.7-.1 0 0 .1.1.1.2s-.1.2-.1.2h-.7zm.4 6.6c0 .1 0 .1 0 0 .1 0 .1 0 0 0zm.4-4.1s-.1-.1-.2-.1c.1 0 .1-.1.2-.1s.1 0 .2.1c-.1 0-.1.1-.2.1zm.4 1.8c-.1-.1-.1-.1 0 0 0-.2 0-.1 0 0 0-.1 0-.1 0 0zm1.2-2.1c.6 0 1.2 0 1.9-.1 0 0 0 .1.1.2-.1.1-.2.2-.3.2-.5.1-.9 0-1.4.2-.3.2-.4-.1-.3-.5zm-.7-2.3c.5-.4.8-.4 2.3.1-.2.1-.3.2-.4.2-.6-.1-1.2-.2-1.9-.3zm1 5.7c-.1 0-.1-.1-.2-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1.1v.1zm.7.9h-.2l.1-.1h.2s0 .1-.1.1zm.2-1c-.1-.1-.2-.1-.2-.2-.2-.3-.6-.6-.4-1 .2-.5.7-.3 1.1-.3.1 0 .3 0 .5.1.1.5.2.9.3 1.3-.5.3-1 .1-1.3.1zm1.3-6.8c-.2 0-.4.1-.6.1-.7-.2-1.4-.1-2.1.1-.4.1-.8.1-1.2.1h-.1c-.5 0-.9-.2-1.3-.5.4-.4.4-.4 1.2 0 .1-.3.3-.6.5-.9.2.1.3.1.4.2.5.6.5.7 1.2.3-.1-.2-.2-.3-.2-.5.1 0 .2-.1.2-.1.4.2.9.4 1.3.7l.1-.1c0-.2.1-.5.1-.7l.2.2.2-.1c.1-.1-.1-.3-.2-.3 0 0-.1 0-.1.1v-.1c0-.1.2-.2.3-.2.1 0 .3.1.3.2 0 .3 0 .9-.2 1.5zm.6 3.9h-.1c0-.1-.1-.1-.1-.2h.2v.2zm.4-4.1c-.3-.1-.5-.4-.4-.7.1-.2.3-.2.5-.1.3.2.5.1.7-.1 0 .1 0 .3-.1.4-.2.4-.4.6-.7.5zm.9 3.8c0-.1 0-.1 0 0l-.1-.1c.1-.1.1-.1.1.1.1-.1 0-.1 0 0zm0-2.4c-.1-.1-.2-.1-.3-.2 0 0 .1-.1.1-.3l.3.3s-.1.1-.1.2zm-.1-2.3c.1-.1.2-.2.4-.3h.5c.1 0 .1.1.2.1.2.2.4.3.7.5.8-.4 1.6.2 2.5-.4 0-.1-.1-.2-.1-.3l.1-.1c.1-.1.2-.2.3-.2.1.4.4.7.6 1.1-.1.2-.3.3-.4.5 0 .1.1.4.2.5.3.2.4.6.5 1-.6.3-1.2.2-1.8.3-.4 0-.8-.2-1.1-.4l-.9-.6c-.1-.3-.2-.6-.4-.8-.4-.4-.9-.7-1.3-.9zm4.9 3.9c-.1 0-.1 0-.2-.1v-.1c.1 0 .1 0 .2.1v.1zm-.6 2.2c0 .1-.1.1 0 0-.1 0-.1 0-.1-.1 0 .1 0 0 .1.1zm-2.9-3.3c-.4-.2-.5-.5-.4-1 .2 0 .4-.1.7-.1.1.4-.1.7-.3 1.1zm1.3 3.1c0 .3-.1.4-.4.4-.2-.6-.4-1.1-.1-1.8.8.3.5.9.5 1.4zm.4-2c.5.2.8.3 1.1.4-.1.4-.2.7-.4 1.1-.7-.3-.7-.8-.7-1.5zm2.4 4.7c-.2.3-.6.3-1 .2-.2-.1-.3-.3-.5-.4-.1-.6-.1-.7.3-.8h1.1c.4.4.3.8.1 1zm1.3-2.6c-.1 0-.1.1-.2.1-.2-.3-.3-.6-.4-.7-.4.1-.4.3-.4.4 0 .6-.3.8-.8 1-.4-.7 0-1.2.2-1.7.2-.8.8-1.4 1.6-1.5v2.4zm.1-2.3s0-.1 0 0c.1-.1.1 0 0 0zm.2 4.9v-.2h.1c0 .1 0 .2-.1.2.1 0 0 0 0 0zm-.3-5.9c-.5.2-.9 0-1.3-.3.9.1 1.6-.4 2.3-.9.2-.1.4-.4.2-.7-.8-.1-.8-.1-1.3-.4.2 0 .4 0 .5-.2.4-.1.8-.3 1.2-.5 0 .1.1.2.2.3.1.1.4.1.4 0 .1-.1.1-.2.2-.2.2.1.4.3.6.4-.3.5-.7.9-1 1.4.2.2.3.4.4.5 0 .1-.1.1-.1.1-.9 0-1.6.2-2.3.5zm1.6 5.9s.1 0 0 0c.1 0 0 0 0 0zm-.1-.1l-.1-.1c-.2-.8-.1-.9.7-.7-.1.3-.3.6-.6.8zm.7-4.3c-.1.3-.3.5-.5.9-.4-.3-.7-.6-.7-1.1.2-.1.4-.4.7-.5.2-.1.5 0 .7.1.2.1.3.3.4.5.1.1 0 .3-.1.7-.2-.3-.4-.4-.5-.6zm4.6 3.4c-.2 0-.4-.2-.6-.2-.3 0-.5 0-.8.1-.3.2-.1.5-.1.8 0 0-.1.1-.1.2-.3-.2-.5-.4-.9-.7.2-.2.3-.4.5-.6-.4-.6-.8-.9-1.5-.6-.2.1-.3 0-.5 0-.1 0-.1-.1-.2-.1.7-.6.7-.6 2.1-.3.1-.1.3-.3.4-.5.1-.1.1-.4 0-.5-.2-.3-.3-.1-.5 0-.1.1-.4.1-.5 0-.3-.6-.6-1.2-.4-2.2.5 1.1 1.2 1.1 2 1.3.1.5.1 1.1.2 1.7.2.1.5.3.8.4.1.3.3.7.5 1.2-.1 0-.3.1-.4 0zm-1.2-4.8c.1-.2.3-.2.4 0l.7.7c-.7.1-.7.1-1.1-.7z"/></svg>';

			// Prev Row SVG for previous to last row
			prevRow.append('<div class="mkdf-uncovering-row-landing-prev-svg">'+ svgTest +'</div>');
			// Don't forget to add custom CSS on page to override default VC styles
		}
	}

    /**
     * Init Owl Carousel
     */
    function mkdfOwlSlider() {
        var sliders = $('.mkdf-owl-slider');

        if (sliders.length) {
            sliders.each(function(){
                var slider = $(this),
                    owlSlider = $(this),
	                slideItemsNumber = slider.children().length,
	                numberOfItems = 1,
	                loop = true,
	                autoplay = true,
	                autoplayHoverPause = true,
	                sliderSpeed = 3000,
	                sliderSpeedAnimation = 600,
	                margin = 0,
	                responsiveMargin = 0,
	                responsiveMargin1 = 0,
	                stagePadding = 0,
	                stagePaddingEnabled = false,
	                center = false,
	                autoWidth = false,
	                animateInClass = false, // keyframe css animation
	                animateOutClass = false, // keyframe css animation
	                navigation = true,
	                pagination = false,
	                thumbnail = false,
                    thumbnailSlider,
	                sliderIsCPTList = !!slider.hasClass('mkdf-list-is-slider'),
	                sliderDataHolder = sliderIsCPTList ? slider.parent() : slider;  // this is condition for cpt to set list to be slider
	
	            if (typeof slider.data('number-of-items') !== 'undefined' && slider.data('number-of-items') !== false && ! sliderIsCPTList) {
		            numberOfItems = slider.data('number-of-items');
	            }
	            if (typeof sliderDataHolder.data('number-of-columns') !== 'undefined' && sliderDataHolder.data('number-of-columns') !== false && sliderIsCPTList) {
		            switch (sliderDataHolder.data('number-of-columns')) {
			            case 'one':
				            numberOfItems = 1;
				            break;
			            case 'two':
				            numberOfItems = 2;
				            break;
			            case 'three':
				            numberOfItems = 3;
				            break;
			            case 'four':
				            numberOfItems = 4;
				            break;
			            case 'five':
				            numberOfItems = 5;
				            break;
			            case 'six':
				            numberOfItems = 6;
				            break;
			            default :
				            numberOfItems = 4;
				            break;
		            }
	            }
	            if (sliderDataHolder.data('enable-loop') === 'no') {
		            loop = false;
	            }
	            if (sliderDataHolder.data('enable-autoplay') === 'no') {
		            autoplay = false;
	            }
	            if (sliderDataHolder.data('enable-autoplay-hover-pause') === 'no') {
		            autoplayHoverPause = false;
	            }
	            if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
		            sliderSpeed = sliderDataHolder.data('slider-speed');
	            }
	            if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
		            sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
	            }
	            if (typeof sliderDataHolder.data('slider-margin') !== 'undefined' && sliderDataHolder.data('slider-margin') !== false) {
		            if (sliderDataHolder.data('slider-margin') === 'no') {
			            margin = 0;
		            } else {
			            margin = sliderDataHolder.data('slider-margin');
		            }
	            } else {
		            if(slider.parent().hasClass('mkdf-huge-space')) {
			            margin = 60;
		            } else if (slider.parent().hasClass('mkdf-large-space')) {
			            margin = 50;
		            } else if (slider.parent().hasClass('mkdf-medium-space')) {
			            margin = 40;
		            } else if (slider.parent().hasClass('mkdf-normal-space')) {
			            margin = 30;
		            } else if (slider.parent().hasClass('mkdf-small-space')) {
			            margin = 20;
		            } else if (slider.parent().hasClass('mkdf-tiny-space')) {
			            margin = 10;
		            }
	            }
	            if (sliderDataHolder.data('slider-padding') === 'yes') {
		            stagePaddingEnabled = true;
		            stagePadding = parseInt(slider.outerWidth() * 0.28);
		            margin = 50;
	            }
	            if (sliderDataHolder.data('enable-center') === 'yes') {
		            center = true;
	            }
	            if (sliderDataHolder.data('enable-auto-width') === 'yes') {
		            autoWidth = true;
	            }
	            if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
		            animateInClass = sliderDataHolder.data('slider-animate-in');
	            }
	            if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                    animateOutClass = sliderDataHolder.data('slider-animate-out');
	            }
	            if (sliderDataHolder.data('enable-navigation') === 'no') {
		            navigation = false;
	            }
	            if (sliderDataHolder.data('enable-pagination') === 'yes') {
		            pagination = true;
	            }

	            if (sliderDataHolder.data('enable-thumbnail') === 'yes') {
                    thumbnail = true;
	            }

	            if(thumbnail && !pagination) {
                    /* page.index works only when pagination is enabled, so we add through html, but hide via css */
	                pagination = true;
                    owlSlider.addClass('mkdf-slider-hide-pagination');
                }

	            if(navigation && pagination) {
		            slider.addClass('mkdf-slider-has-both-nav');
	            }

	            if (slideItemsNumber <= 1) {
		            loop       = false;
		            autoplay   = false;
		            navigation = false;
		            pagination = false;
	            }

	            var responsiveNumberOfItems1 = 1,
		            responsiveNumberOfItems2 = 2,
		            responsiveNumberOfItems3 = 3,
		            responsiveNumberOfItems4 = numberOfItems,
		            responsiveNumberOfItems5 = numberOfItems;

	            if (numberOfItems < 3) {
		            responsiveNumberOfItems2 = numberOfItems;
		            responsiveNumberOfItems3 = numberOfItems;
	            }

	            if (numberOfItems > 4) {
		            responsiveNumberOfItems4 = 4;
	            }
	
	            if (numberOfItems > 5) {
		            responsiveNumberOfItems5 = 5;
	            }

	            if (stagePaddingEnabled || margin > 30) {
		            responsiveMargin = 20;
		            responsiveMargin1 = 30;
	            }

	            if (margin > 0 && margin <= 30) {
		            responsiveMargin = margin;
		            responsiveMargin1 = margin;
	            }

	            slider.waitForImages(function () {
		            owlSlider = slider.owlCarousel({
			            items: numberOfItems,
			            loop: loop,
			            autoplay: autoplay,
			            autoplayHoverPause: autoplayHoverPause,
			            autoplayTimeout: sliderSpeed,
			            smartSpeed: sliderSpeedAnimation,
			            margin: margin,
			            stagePadding: stagePadding,
			            center: center,
			            autoWidth: autoWidth,
			            animateIn: animateInClass,
			            animateOut: animateOutClass,
			            dots: pagination,
			            nav: navigation,
			            navText: [
				            '<span class="mkdf-prev-icon ion-ios-arrow-thin-left"></span>'+ mkdfGlobalVars.vars.sliderNavNextArrowSVG,
				            '<span class="mkdf-next-icon ion-ios-arrow-thin-right"></span>' + mkdfGlobalVars.vars.sliderNavNextArrowSVG
			            ],
			            responsive: {
				            0: {
					            items: responsiveNumberOfItems1,
					            margin: 0,
					            stagePadding: 0,
					            center: false,
					            autoWidth: false,
					            nav: false,
				            },
				            681: {
					            items: responsiveNumberOfItems2,
					            margin: responsiveMargin1,
					            nav: false
				            },
				            769: {
					            items: responsiveNumberOfItems2,
					            margin: responsiveMargin1
				            },
				            1025: {
					            items: responsiveNumberOfItems4
				            },
				            1281: {
					            items: responsiveNumberOfItems5
				            },
				            1367: {
					            items: numberOfItems
				            }
			            },
			            onInitialize: function () {
				            slider.css('visibility', 'visible');
							mkdfInitParallax();
							setTimeout(function() {
								mkdfTiltFx().init();
							}, 500);
				            if (slider.find('iframe').length || slider.find('video').length) {
					            setTimeout(function () {
						            mkdfSelfHostedVideoSize();
						            mkdfFluidVideo();
					            }, 500);
				            }
				            if (thumbnail) {
					            thumbnailSlider.find('.mkdf-slider-thumbnail-item:first-child').addClass('active');
				            }
			            },
			            onRefreshed: function () {
				            if (autoWidth === true) {
					            var oldSize = parseInt(slider.find('.owl-stage').css('width'));
					            slider.find('.owl-stage').css('width', (oldSize + 1) + 'px');
				            }
			            },
			            onTranslate: function (e) {
				            if (thumbnail) {
					            var index = e.page.index + 1;
					            thumbnailSlider.find('.mkdf-slider-thumbnail-item.active').removeClass('active');
					            thumbnailSlider.find('.mkdf-slider-thumbnail-item:nth-child(' + index + ')').addClass('active');
				            }
			            },
			            onDrag: function (e) {
				            if (mkdf.body.hasClass('mkdf-smooth-page-transitions-fadeout')) {
					            var sliderIsMoving = e.isTrigger > 0;
					
					            if (sliderIsMoving) {
						            slider.addClass('mkdf-slider-is-moving');
					            }
				            }
			            },
			            onDragged: function () {
				            if (mkdf.body.hasClass('mkdf-smooth-page-transitions-fadeout') && slider.hasClass('mkdf-slider-is-moving')) {
					
					            setTimeout(function () {
						            slider.removeClass('mkdf-slider-is-moving');
					            }, 500);
				            }
			            }
		            });
	            });
	
	            if (thumbnail) {
		            thumbnailSlider = slider.parent().find('.mkdf-slider-thumbnail');
		
		            var numberOfThumbnails = parseInt(thumbnailSlider.data('thumbnail-count'));
		            var numberOfThumbnailsClass = '';
		
		            switch (numberOfThumbnails % 6) {
			            case 2 :
				            numberOfThumbnailsClass = 'two';
				            break;
			            case 3 :
				            numberOfThumbnailsClass = 'three';
				            break;
			            case 4 :
				            numberOfThumbnailsClass = 'four';
				            break;
			            case 5 :
				            numberOfThumbnailsClass = 'five';
				            break;
			            case 0 :
				            numberOfThumbnailsClass = 'six';
				            break;
			            default :
				            numberOfThumbnailsClass = 'six';
				            break;
		            }
		
		            if (numberOfThumbnailsClass !== '') {
			            thumbnailSlider.addClass('mkdf-slider-columns-' + numberOfThumbnailsClass);
		            }
		
		            thumbnailSlider.find('.mkdf-slider-thumbnail-item').on('click', function () {
			            $(this).siblings('.active').removeClass('active');
			            $(this).addClass('active');
			            owlSlider.trigger('to.owl.carousel', [$(this).index(), sliderSpeedAnimation]);
		            });
	            }
            });
        }
    }

	function mkdfDashboardForm() {
		var forms = $('.mkdf-dashboard-form');

		if (forms.length) {
			forms.each(function () {
				var thisForm = $(this),
					btnText = thisForm.find('button.mkdf-dashboard-form-button'),
					updatingBtnText = btnText.data('updating-text'),
					updatedBtnText = btnText.data('updated-text'),
					actionName = thisForm.data('action');

				thisForm.on('submit', function (e) {
					e.preventDefault();
					var prevBtnText = btnText.html(),
						gallery = $(this).find('.mkdf-dashboard-gallery-upload-hidden'),
						namesArray = [];

					btnText.html(updatingBtnText);

					//get data
					var formData = new FormData();

					//get files
					gallery.each(function () {
						var thisGallery = $(this),
							thisName = thisGallery.attr('name'),
							thisRepeaterID = thisGallery.attr('id'),
							thisFiles = thisGallery[0].files,
							newName;

						//this part is needed for repeater with image uploads
						//adding specific names so they can be sorted in regular files and files in repeater
						if (thisName.indexOf("[") > -1) {
							newName = thisName.substring(0, thisName.indexOf("[")) + '_mkdf_regarray_';

							var firstIndex = thisRepeaterID.indexOf('['),
								lastIndex = thisRepeaterID.indexOf(']'),
								index = thisRepeaterID.substring(firstIndex + 1, lastIndex);

							namesArray.push(newName);
							newName = newName + index + '_';
						} else {
							newName = thisName + '_mkdf_reg_';
						}

						//if file not sent, send dummy file - so repeater fields are sent
						if (thisFiles.length === 0) {
							formData.append(newName, new File([""], "mkdf-dummy-file.txt", {
								type: "text/plain"
							}));
						}

						for (var i = 0; i < thisFiles.length; i++) {
							var allowedTypes = ['image/png','image/jpg','image/jpeg','application/pdf'];
							//security purposed - check if there is more than one dot in file name, also check whether the file type is in allowed types
							if (thisFiles[i].name.match(/\./g).length === 1 && $.inArray(thisFiles[i].type, allowedTypes) !== -1) {
								formData.append(newName + i, thisFiles[i]);
							}
						}
					});

					formData.append('action', actionName);

					//get data from form
					var otherData = $(this).serialize();
					formData.append('data', otherData);

					$.ajax({
						type: 'POST',
						data: formData,
						contentType: false,
						processData: false,
						url: mkdfGlobalVars.vars.mkdfAjaxUrl,
						success: function (data) {
							var response;
							response = JSON.parse(data);

							// append ajax response html
							mkdf.modules.socialLogin.mkdfRenderAjaxResponseMessage(response);
							if (response.status === 'success') {
								btnText.html(updatedBtnText);
								window.location = response.redirect;
							} else {
								btnText.html(prevBtnText);
							}
						}
					});

					return false;
				});
			});
		}
	}

    /**
     * Init Perfect Scrollbar
     */
    function mkdfInitPerfectScrollbar() {
	    var defaultParams = {
		    wheelSpeed: 0.6,
		    suppressScrollX: true
	    };
	
	    var mkdfInitScroll = function (holder) {
		    var ps = new PerfectScrollbar(holder.selector, defaultParams);
		    
		    $(window).resize(function () {
			    ps.update();
		    });
	    };
	
	    return {
		    init: function (holder) {
			    if (holder.length) {
				    mkdfInitScroll(holder);
			    }
		    }
	    };
    }

})(jQuery);
(function($) {
	"use strict";

    var blog = {};
    mkdf.modules.blog = blog;

    blog.mkdfOnDocumentReady = mkdfOnDocumentReady;
    blog.mkdfOnWindowLoad = mkdfOnWindowLoad;
    blog.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad);
    $(window).scroll(mkdfOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfInitAudioPlayer();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
	    mkdfInitBlogPagination().init();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdfOnWindowScroll() {
	    mkdfInitBlogPagination().scroll();
    }

    /**
    * Init audio player for Blog list and single pages
    */
    function mkdfInitAudioPlayer() {
	    var players = $('audio.mkdf-blog-audio');
	
	    if (players.length) {
		    players.mediaelementplayer({
			    audioWidth: '100%'
		    });
	    }
    }
	
	/**
	 * Initializes blog pagination functions
	 */
	function mkdfInitBlogPagination(){
		var holder = $('.mkdf-blog-holder');
		
		var initLoadMorePagination = function(thisHolder) {
			var loadMoreButton = thisHolder.find('.mkdf-blog-pag-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisHolder);
			});
		};
		
		var initInifiteScrollPagination = function(thisHolder) {
			var blogListHeight = thisHolder.outerHeight(),
				blogListTopOffest = thisHolder.offset().top,
				blogListPosition = blogListHeight + blogListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			if(!thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > blogListPosition) {
				initMainPagFunctionality(thisHolder);
			}
		};
		
		var initMainPagFunctionality = function(thisHolder) {
			var thisHolderInner = thisHolder.children('.mkdf-blog-holder-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
				maxNumPages = thisHolder.data('max-num-pages');
			}
			
			if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll')) {
				thisHolder.addClass('mkdf-blog-pagination-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisHolder),
				loadingItem = thisHolder.find('.mkdf-blog-pag-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			var nonceHolder = thisHolder.find('input[name*="mkdf_blog_load_more_nonce_"]');
			
			loadMoreDatta.blog_load_more_id = nonceHolder.attr('name').substring(nonceHolder.attr('name').length - 4, nonceHolder.attr('name').length);
			loadMoreDatta.blog_load_more_nonce = nonceHolder.val();
			
			if(nextPage <= maxNumPages){
				loadingItem.addClass('mkdf-showing');
				
				var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wanderland_mikado_blog_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdfGlobalVars.vars.mkdfAjaxUrl,
					success: function (data) {
						nextPage++;
						
						thisHolder.data('next-page', nextPage);

						var response = $.parseJSON(data),
							responseHtml =  response.html;

						thisHolder.waitForImages(function(){
							if(thisHolder.hasClass('mkdf-grid-masonry-list')){
								mkdfInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
								mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('article'), thisHolderInner.find('.mkdf-masonry-grid-sizer').width());
							} else {
								mkdfInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
							}
							
							setTimeout(function() {
								mkdfInitAudioPlayer();
								mkdf.modules.common.mkdfAddTiltFxClasses();
								mkdf.modules.common.mkdfOwlSlider();
								mkdf.modules.common.mkdfFluidVideo();
                                mkdf.modules.common.mkdfInitSelfHostedVideoPlayer();
                                mkdf.modules.common.mkdfSelfHostedVideoSize();
								
								if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
									mkdf.modules.common.mkdfStickySidebarWidget().reInit();
								}

                                // Trigger event.
                                $( document.body ).trigger( 'blog_list_load_more_trigger' );

							}, 400);
						});
						
						if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll-started')) {
							thisHolder.removeClass('mkdf-blog-pagination-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisHolder.find('.mkdf-blog-pag-load-more').hide();
			}
		};
		
		var mkdfInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing');
			
			setTimeout(function() {
				thisHolderInner.isotope('layout');
			}, 600);
		};
		
		var mkdfInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing');
			thisHolderInner.append(responseHtml);
		};
		
		return {
			init: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkdf-blog-pagination-load-more')) {
							initLoadMorePagination(thisHolder);
						}
						
						if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			},
			scroll: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			}
		};
	}

})(jQuery);
(function ($) {
	"use strict";
	
	var footer = {};
    mkdf.modules.footer = footer;
	
	footer.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	 
	function mkdfOnWindowLoad() {
		uncoveringFooter();
	}
	
	function uncoveringFooter() {
		var uncoverFooter = $('body:not(.error404) .mkdf-footer-uncover');

		if (uncoverFooter.length && !mkdf.htmlEl.hasClass('touch')) {

			var footer = $('footer'),
				footerHeight = footer.outerHeight(),
				content = $('.mkdf-content');
			
			var uncoveringCalcs = function () {
				content.css('margin-bottom', footerHeight);
				footer.css('height', footerHeight);
			};


			//set
			uncoveringCalcs();
			
			$(window).resize(function () {
				//recalc
				footerHeight = footer.find('.mkdf-footer-inner').outerHeight();
				uncoveringCalcs();
			});
		}
	}
	
})(jQuery);
(function($) {
	"use strict";
	
	var header = {};
	mkdf.modules.header = header;
	
	header.mkdfSetDropDownMenuPosition     = mkdfSetDropDownMenuPosition;
	header.mkdfSetDropDownWideMenuPosition = mkdfSetDropDownWideMenuPosition;
	
	header.mkdfOnDocumentReady = mkdfOnDocumentReady;
	header.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfSetDropDownMenuPosition();
		setTimeout(function(){
			mkdfDropDownMenu();
		}, 100);
	}
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfSetDropDownWideMenuPosition();
	}
	
	/**
	 * Set dropdown position
	 */
	function mkdfSetDropDownMenuPosition() {
		var menuItems = $('.mkdf-drop-down > ul > li.narrow.menu-item-has-children');
		
		if (menuItems.length) {
			menuItems.each(function (i) {
				var thisItem = $(this),
					menuItemPosition = thisItem.offset().left,
					dropdownHolder = thisItem.find('.second'),
					dropdownMenuItem = dropdownHolder.find('.inner ul'),
					dropdownMenuWidth = dropdownMenuItem.outerWidth(),
					menuItemFromLeft = mkdf.windowWidth - menuItemPosition;
				
				if (mkdf.body.hasClass('mkdf-boxed')) {
					menuItemFromLeft = mkdf.boxedLayoutWidth - (menuItemPosition - (mkdf.windowWidth - mkdf.boxedLayoutWidth ) / 2);
				}
				
				var dropDownMenuFromLeft; //has to stay undefined because 'dropDownMenuFromLeft < dropdownMenuWidth' conditional will be true
				
				if (thisItem.find('li.sub').length > 0) {
					dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
				}
				
				dropdownHolder.removeClass('right');
				dropdownMenuItem.removeClass('right');
				if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
					dropdownHolder.addClass('right');
					dropdownMenuItem.addClass('right');
				}
			});
		}
	}
	
	/**
	 * Set dropdown wide position
	 */
	function mkdfSetDropDownWideMenuPosition(){
		var menuItems = $(".mkdf-drop-down > ul > li.wide");
		
		if(menuItems.length) {
			menuItems.each( function(i) {
                var menuItem = $(this);
				var menuItemSubMenu = menuItem.find('.second');
				
				if(menuItemSubMenu.length && !menuItemSubMenu.hasClass('left_position') && !menuItemSubMenu.hasClass('right_position')) {
					menuItemSubMenu.css('left', 0);
					
					var left_position = menuItemSubMenu.offset().left;
					
					if(mkdf.body.hasClass('mkdf-boxed')) {
                        //boxed layout case
                        var boxedWidth = $('.mkdf-boxed .mkdf-wrapper .mkdf-wrapper-inner').outerWidth();
						left_position = left_position - (mkdf.windowWidth - boxedWidth) / 2;
						menuItemSubMenu.css({'left': -left_position, 'width': boxedWidth});

					} else if(mkdf.body.hasClass('mkdf-wide-dropdown-menu-in-grid')) {
                        //wide dropdown in grid case
                        menuItemSubMenu.css({'left': -left_position + (mkdf.windowWidth - mkdf.gridWidth()) / 2, 'width': mkdf.gridWidth()});

                    }
                    else {
                        //wide dropdown full width case
                        menuItemSubMenu.css({'left': -left_position, 'width': mkdf.windowWidth});

					}
				}
			});
		}
	}
	
	function mkdfDropDownMenu() {
		var menu_items = $('.mkdf-drop-down > ul > li');
		
		menu_items.each(function() {
			var thisItem = $(this);
			
			if(thisItem.find('.second').length) {
				thisItem.waitForImages(function(){
					var dropDownHolder = thisItem.find('.second'),
						dropDownHolderHeight = !mkdf.menuDropdownHeightSet ? dropDownHolder.outerHeight() : 0;
					
					if(thisItem.hasClass('wide')) {
						var tallest = 0,
							dropDownSecondItem = dropDownHolder.find('> .inner > ul > li');
						
						dropDownSecondItem.each(function() {
							var thisHeight = $(this).outerHeight();
							
							if(thisHeight > tallest) {
								tallest = thisHeight;
							}
						});
						
						dropDownSecondItem.css('height', '').height(tallest);
						
						if (!mkdf.menuDropdownHeightSet) {
							dropDownHolderHeight = dropDownHolder.outerHeight();
						}
					}
					
					if (!mkdf.menuDropdownHeightSet) {
						dropDownHolder.height(0);
					}
					
					if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
						thisItem.on("touchstart mouseenter", function() {
							dropDownHolder.css({
								'height': dropDownHolderHeight,
								'overflow': 'visible',
								'visibility': 'visible',
								'opacity': '1'
							});
						}).on("mouseleave", function() {
							dropDownHolder.css({
								'height': '0px',
								'overflow': 'hidden',
								'visibility': 'hidden',
								'opacity': '0'
							});
						});
					} else {
						if (mkdf.body.hasClass('mkdf-dropdown-animate-height')) {
							var animateConfig = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										dropDownHolder.addClass('mkdf-drop-down-start').css({
											'visibility': 'visible',
											'height': '0',
											'opacity': '1'
										});
										dropDownHolder.stop().animate({
											'height': dropDownHolderHeight
										}, 400, 'easeInOutQuint', function () {
											dropDownHolder.css('overflow', 'visible');
										});
									}, 100);
								},
								timeout: 100,
								out: function () {
									dropDownHolder.stop().animate({
										'height': '0',
										'opacity': 0
									}, 100, function () {
										dropDownHolder.css({
											'overflow': 'hidden',
											'visibility': 'hidden'
										});
									});
									
									dropDownHolder.removeClass('mkdf-drop-down-start');
								}
							};
							
							thisItem.hoverIntent(animateConfig);
						} else {
							var config = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										dropDownHolder.addClass('mkdf-drop-down-start').stop().css({'height': dropDownHolderHeight});
									}, 150);
								},
								timeout: 150,
								out: function () {
									dropDownHolder.stop().css({'height': '0'}).removeClass('mkdf-drop-down-start');
								}
							};
							
							thisItem.hoverIntent(config);
						}
					}
				});
			}
		});
		
		$('.mkdf-drop-down ul li.wide ul li a').on('click', function(e) {
			if (e.which === 1){
				var $this = $(this);
				
				setTimeout(function() {
					$this.mouseleave();
				}, 500);
			}
		});
		
		mkdf.menuDropdownHeightSet = true;
	}
	
})(jQuery);
(function($) {
    "use strict";

    var sidearea = {};
    mkdf.modules.sidearea = sidearea;

    sidearea.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfSideArea();
    }
	
	/**
	 * Show/hide side area
	 */
    function mkdfSideArea() {
		var wrapper = $('.mkdf-wrapper'),
			sideMenu = $('.mkdf-side-menu'),
			sideMenuButtonOpen = $('a.mkdf-side-menu-button-opener'),
			cssClass,
			//Flags
			slideFromRight = false,
			slideWithContent = false,
			slideUncovered = false;
		
		if (mkdf.body.hasClass('mkdf-side-menu-slide-from-right')) {
			$('.mkdf-cover').remove();
			cssClass = 'mkdf-right-side-menu-opened';
			wrapper.prepend('<div class="mkdf-cover"/>');
			slideFromRight = true;
		} else if (mkdf.body.hasClass('mkdf-side-menu-slide-with-content')) {
			cssClass = 'mkdf-side-menu-open';
			slideWithContent = true;
		} else if (mkdf.body.hasClass('mkdf-side-area-uncovered-from-content')) {
			cssClass = 'mkdf-right-side-menu-opened';
			slideUncovered = true;
		}
		
		$('a.mkdf-side-menu-button-opener, a.mkdf-close-side-menu').on('click', function (e) {
			e.preventDefault();
	
	        if (!sideMenuButtonOpen.hasClass('opened')) {
		        sideMenuButtonOpen.addClass('opened');
		        mkdf.body.addClass(cssClass);
		
		        if (slideFromRight) {
			        $('.mkdf-wrapper .mkdf-cover').on('click', function () {
				        mkdf.body.removeClass('mkdf-right-side-menu-opened');
				        sideMenuButtonOpen.removeClass('opened');
			        });
		        }
		
		        if (slideUncovered) {
			        sideMenu.css({
				        'visibility': 'visible'
			        });
		        }
		
		        var currentScroll = $(window).scrollTop();
		        $(window).scroll(function () {
			        if (Math.abs(mkdf.scroll - currentScroll) > 400) {
				        mkdf.body.removeClass(cssClass);
				        sideMenuButtonOpen.removeClass('opened');
				        if (slideUncovered) {
					        var hideSideMenu = setTimeout(function () {
						        sideMenu.css({'visibility': 'hidden'});
						        clearTimeout(hideSideMenu);
					        }, 400);
				        }
			        }
		        });
            } else {
	            sideMenuButtonOpen.removeClass('opened');
	            mkdf.body.removeClass(cssClass);
	
	            if (slideUncovered) {
		            var hideSideMenu = setTimeout(function () {
			            sideMenu.css({'visibility': 'hidden'});
			            clearTimeout(hideSideMenu);
		            }, 400);
	            }
            }
	
	        if (slideWithContent) {
		        e.stopPropagation();
		
		        wrapper.on('click', function () {
			        e.preventDefault();
			        sideMenuButtonOpen.removeClass('opened');
			        mkdf.body.removeClass('mkdf-side-menu-open');
		        });
	        }
        });

        if(sideMenu.length){
            mkdf.modules.common.mkdfInitPerfectScrollbar().init(sideMenu);
        }
    }

})(jQuery);

(function ($) {
	"use strict";
	
	var subscribePopup = {};
	mkdf.modules.subscribePopup = subscribePopup;
	
	subscribePopup.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfSubscribePopup();
	}
	
	function mkdfSubscribePopup() {
		var popupOpener = $('.mkdf-subscribe-popup-holder'),
			popupClose = $('.mkdf-sp-close');
		
		if (popupOpener.length) {
			var popupPreventHolder = popupOpener.find('.mkdf-sp-prevent'),
				disabledPopup = 'no';
			
			if (popupPreventHolder.length) {
				var isLocalStorage = popupOpener.hasClass('mkdf-sp-prevent-cookies'),
					popupPreventInput = popupPreventHolder.find('.mkdf-sp-prevent-input'),
					preventValue = popupPreventInput.data('value');
				
				if (isLocalStorage) {
					disabledPopup = localStorage.getItem('disabledPopup');
					sessionStorage.removeItem('disabledPopup');
				} else {
					disabledPopup = sessionStorage.getItem('disabledPopup');
					localStorage.removeItem('disabledPopup');
				}
				
				popupPreventHolder.children().on('click', function (e) {
					if ( preventValue !== 'yes' ) {
						preventValue = 'yes';
						popupPreventInput.addClass('mkdf-sp-prevent-clicked').data('value', 'yes');
					} else {
						preventValue = 'no';
						popupPreventInput.removeClass('mkdf-sp-prevent-clicked').data('value', 'no');
					}
					
					if (preventValue === 'yes') {
						if (isLocalStorage) {
							localStorage.setItem('disabledPopup', 'yes');
						} else {
							sessionStorage.setItem('disabledPopup', 'yes');
						}
					} else {
						if (isLocalStorage) {
							localStorage.setItem('disabledPopup', 'no');
						} else {
							sessionStorage.setItem('disabledPopup', 'no');
						}
					}
				});
			}
			
			if (disabledPopup !== 'yes') {
				if (mkdf.body.hasClass('mkdf-sp-opened')) {
					mkdf.body.removeClass('mkdf-sp-opened');
					mkdf.modules.common.mkdfEnableScroll();
				} else {
					mkdf.body.addClass('mkdf-sp-opened');
					mkdf.modules.common.mkdfDisableScroll();
				}
				
				popupClose.on('click', function (e) {
					e.preventDefault();
					
					mkdf.body.removeClass('mkdf-sp-opened');
					mkdf.modules.common.mkdfEnableScroll();
				});
				
				//Close on escape
				$(document).keyup(function (e) {
					if (e.keyCode === 27) { //KeyCode for ESC button is 27
						mkdf.body.removeClass('mkdf-sp-opened');
						mkdf.modules.common.mkdfEnableScroll();
					}
				});
			}
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var title = {};
    mkdf.modules.title = title;

    title.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfParallaxTitle();
    }

    /*
     **	Title image with parallax effect
     */
	function mkdfParallaxTitle() {
		var parallaxBackground = $('.mkdf-title-holder.mkdf-bg-parallax');
		
		if (parallaxBackground.length > 0 && mkdf.windowWidth > 1024) {
			var parallaxBackgroundWithZoomOut = parallaxBackground.hasClass('mkdf-bg-parallax-zoom-out'),
				titleHeight = parseInt(parallaxBackground.data('height')),
				imageWidth = parseInt(parallaxBackground.data('background-width')),
				parallaxRate = titleHeight / 10000 * 7,
				parallaxYPos = -(mkdf.scroll * parallaxRate),
				adminBarHeight = mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
			
			if (parallaxBackgroundWithZoomOut) {
				parallaxBackground.css({'background-size': imageWidth - mkdf.scroll + 'px auto'});
			}
			
			//set position of background on window scroll
			$(window).scroll(function () {
				parallaxYPos = -(mkdf.scroll * parallaxRate);
				parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
				
				if (parallaxBackgroundWithZoomOut) {
					parallaxBackground.css({'background-size': imageWidth - mkdf.scroll + 'px auto'});
				}
			});
		}
	}

})(jQuery);

(function($) {
    'use strict';

    var woocommerce = {};
    mkdf.modules.woocommerce = woocommerce;

    woocommerce.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfInitQuantityButtons();
        mkdfInitSelect2();
	    mkdfInitSingleProductLightbox();
    }
	
    /*
    ** Init quantity buttons to increase/decrease products for cart
    */
	function mkdfInitQuantityButtons() {
		$(document).on('click', '.mkdf-quantity-minus, .mkdf-quantity-plus', function (e) {
			e.stopPropagation();
			
			var button = $(this),
				inputField = button.siblings('.mkdf-quantity-input'),
				step = parseFloat(inputField.data('step')),
				max = parseFloat(inputField.data('max')),
				minus = false,
				inputValue = parseFloat(inputField.val()),
				newInputValue;
			
			if (button.hasClass('mkdf-quantity-minus')) {
				minus = true;
			}
			
			if (minus) {
				newInputValue = inputValue - step;
				if (newInputValue >= 1) {
					inputField.val(newInputValue);
				} else {
					inputField.val(0);
				}
			} else {
				newInputValue = inputValue + step;
				if (max === undefined) {
					inputField.val(newInputValue);
				} else {
					if (newInputValue >= max) {
						inputField.val(max);
					} else {
						inputField.val(newInputValue);
					}
				}
			}
			
			inputField.trigger('change');
		});
	}

    /*
    ** Init select2 script for select html dropdowns
    */
	function mkdfInitSelect2() {
		var orderByDropDown = $('.woocommerce-ordering .orderby');
		if (orderByDropDown.length) {
			orderByDropDown.select2({
				minimumResultsForSearch: Infinity
			});
		}
		
		var variableProducts = $('.mkdf-woocommerce-page .mkdf-content .variations td.value select');
		if (variableProducts.length) {
			variableProducts.select2();
		}
		
		var shippingCountryCalc = $('#calc_shipping_country');
		if (shippingCountryCalc.length) {
			shippingCountryCalc.select2();
		}
		
		var shippingStateCalc = $('.cart-collaterals .shipping select#calc_shipping_state');
		if (shippingStateCalc.length) {
			shippingStateCalc.select2();
		}
		
		var defaultMonsterWidgets = $('.widget.widget_archive select, .widget.widget_categories select, .widget.widget_text select');
		if (defaultMonsterWidgets.length && typeof defaultMonsterWidgets.select2 === 'function') {
			defaultMonsterWidgets.select2();
		}
	}
	
	/*
	 ** Init Product Single Pretty Photo attributes
	 */
	function mkdfInitSingleProductLightbox() {
		var item = $('.mkdf-woo-single-page.mkdf-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image');
		
		if(item.length) {
			item.children('a').attr('data-rel', 'prettyPhoto[woo_single_pretty_photo]');
			
			if (typeof mkdf.modules.common.mkdfPrettyPhoto === "function") {
				mkdf.modules.common.mkdfPrettyPhoto();
			}
		}
	}

})(jQuery);
(function($) {
    "use strict";

    var blogListSC = {};
    mkdf.modules.blogListSC = blogListSC;
    
    blogListSC.mkdfOnWindowLoad = mkdfOnWindowLoad;
    blogListSC.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(window).on('load', mkdfOnWindowLoad);
    $(window).scroll(mkdfOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitBlogListShortcodePagination().init();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
        mkdfInitBlogListShortcodePagination().scroll();
    }

    /**
     * Init blog list shortcode pagination functions
     */
    function mkdfInitBlogListShortcodePagination(){
        var holder = $('.mkdf-blog-list-holder');

        var initStandardPagination = function(thisHolder) {
            var standardLink = thisHolder.find('.mkdf-bl-standard-pagination li');

            if(standardLink.length) {
                standardLink.each(function(){
                    var thisLink = $(this).children('a'),
                        pagedLink = 1;

                    thisLink.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
                            pagedLink = thisLink.data('paged');
                        }

                        initMainPagFunctionality(thisHolder, pagedLink);
                    });
                });
            }
        };

        var initLoadMorePagination = function(thisHolder) {
            var loadMoreButton = thisHolder.find('.mkdf-blog-pag-load-more a');

            loadMoreButton.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                initMainPagFunctionality(thisHolder);
            });
        };

        var initInifiteScrollPagination = function(thisHolder) {
            var blogListHeight = thisHolder.outerHeight(),
                blogListTopOffest = thisHolder.offset().top,
                blogListPosition = blogListHeight + blogListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;

            if(!thisHolder.hasClass('mkdf-bl-pag-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > blogListPosition) {
                initMainPagFunctionality(thisHolder);
            }
        };

        var initMainPagFunctionality = function(thisHolder, pagedLink) {
            var thisHolderInner = thisHolder.find('.mkdf-blog-list'),
                nextPage,
                maxNumPages;

            if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
                maxNumPages = thisHolder.data('max-num-pages');
            }

            if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                thisHolder.data('next-page', pagedLink);
            }

            if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll')) {
                thisHolder.addClass('mkdf-bl-pag-infinite-scroll-started');
            }

            var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisHolder),
                loadingItem = thisHolder.find('.mkdf-blog-pag-loading');

            nextPage = loadMoreDatta.nextPage;
    
            var nonceHolder = thisHolder.find('input[name*="mkdf_blog_load_more_nonce_"]');
           
            loadMoreDatta.blog_load_more_id = nonceHolder.attr('name').substring(nonceHolder.attr('name').length - 4, nonceHolder.attr('name').length);
            loadMoreDatta.blog_load_more_nonce = nonceHolder.val();
          
            if(nextPage <= maxNumPages){
                if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                    loadingItem.addClass('mkdf-showing mkdf-standard-pag-trigger');
                    thisHolder.addClass('mkdf-bl-pag-standard-shortcodes-animate');
                } else {
                    loadingItem.addClass('mkdf-showing');
                }

                var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wanderland_mikado_blog_shortcode_load_more');

                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: mkdfGlobalVars.vars.mkdfAjaxUrl,
                    success: function (data) {
                        if(!thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                            nextPage++;
                        }

                        thisHolder.data('next-page', nextPage);

                        var response = $.parseJSON(data),
                            responseHtml =  response.html;

                        if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                            mkdfInitStandardPaginationLinkChanges(thisHolder, maxNumPages, nextPage);

                            thisHolder.waitForImages(function(){
                                if(thisHolder.hasClass('mkdf-bl-masonry')){
                                    mkdfInitHtmlIsotopeNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);
                                } else {
                                    mkdfInitHtmlGalleryNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);

                                    if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                                        mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        } else {
                            thisHolder.waitForImages(function(){
                                if(thisHolder.hasClass('mkdf-bl-masonry')){
                                    mkdfInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
                                    mkdf.modules.common.mkdfAddTiltFxClasses();
                                    mkdf.modules.common.mkdfBlogListZigZagParallax();
                                } else {
                                    mkdfInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
                                    if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                                        mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        }

                        setTimeout(function() {
                            mkdf.modules.common.mkdfAddTiltFxClasses();
                            mkdf.modules.common.mkdfBlogListZigZagParallax();
                        }, 500)

                        if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll-started')) {
                            thisHolder.removeClass('mkdf-bl-pag-infinite-scroll-started');
                        }
                    }
                });
            }

            if(nextPage === maxNumPages){
                thisHolder.find('.mkdf-blog-pag-load-more').hide();
            }
        };

        var mkdfInitStandardPaginationLinkChanges = function(thisHolder, maxNumPages, nextPage) {
            var standardPagHolder = thisHolder.find('.mkdf-bl-standard-pagination'),
                standardPagNumericItem = standardPagHolder.find('li.mkdf-pag-number'),
                standardPagPrevItem = standardPagHolder.find('li.mkdf-pag-prev a'),
                standardPagNextItem = standardPagHolder.find('li.mkdf-pag-next a');

            standardPagNumericItem.removeClass('mkdf-pag-active');
            standardPagNumericItem.eq(nextPage-1).addClass('mkdf-pag-active');

            standardPagPrevItem.data('paged', nextPage-1);
            standardPagNextItem.data('paged', nextPage+1);

            if(nextPage > 1) {
                standardPagPrevItem.css({'opacity': '1'});
            } else {
                standardPagPrevItem.css({'opacity': '0'});
            }

            if(nextPage === maxNumPages) {
                standardPagNextItem.css({'opacity': '0'});
            } else {
                standardPagNextItem.css({'opacity': '1'});
            }
        };

        var mkdfInitHtmlIsotopeNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            var sizerAndGutterHTML = '';
            if(thisHolderInner.children('[class*="-grid-sizer"]').length) {
                sizerAndGutterHTML += thisHolderInner.children('[class*="-grid-sizer"]')[0].outerHTML;
            }
            if(thisHolderInner.children('[class*="-grid-gutter"]').length) {
                sizerAndGutterHTML += thisHolderInner.children('[class*="-grid-gutter"]')[0].outerHTML;
            }
            
            thisHolderInner.html(sizerAndGutterHTML + responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
            loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
            thisHolder.removeClass('mkdf-bl-pag-standard-shortcodes-animate');

            setTimeout(function() {
                thisHolderInner.isotope('layout');

                if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                    mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                }
            }, 600);
        };

        var mkdfInitHtmlGalleryNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
            thisHolder.removeClass('mkdf-bl-pag-standard-shortcodes-animate');
            thisHolderInner.html(responseHtml);
        };

        var mkdfInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            console.log(thisHolderInner)
            thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
            loadingItem.removeClass('mkdf-showing');

            setTimeout(function() {
                thisHolderInner.isotope('layout');

                if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                    mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                }
            }, 600);
        };

        var mkdfInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('mkdf-showing');
            thisHolderInner.append(responseHtml);
        };

        return {
            init: function() {
                if(holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);

                        if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                            initStandardPagination(thisHolder);
                        }

                        if(thisHolder.hasClass('mkdf-bl-pag-load-more')) {
                            initLoadMorePagination(thisHolder);
                        }

                        if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            },
            scroll: function() {
                if(holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);

                        if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            }
        };
    }

})(jQuery);
(function($) {
    "use strict";

    var headerBottom = {};
    mkdf.modules.headerBottom = headerBottom;

    headerBottom.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfBottomMenuPosition();
    }

    function mkdfBottomMenuPosition() {
        var bottomHeader = $('.mkdf-header-bottom, .mkdf-header-bottom-centered');
        
        if(bottomHeader.length && mkdf.windowWidth > 1024) {
            var slider = $('.mkdf-slider'),
                sliderHeightUsed = slider.length && slider.outerHeight() + mkdfGlobalVars.vars.mkdfMenuAreaHeight < mkdf.windowHeight,
                initialHeight = sliderHeightUsed ? slider.outerHeight() : mkdf.windowHeight - mkdfGlobalVars.vars.mkdfMenuAreaHeight,
                contentHolder = $('.mkdf-content'),
                footer = $('footer'),
                footerHeight = footer.outerHeight(),
                uncoveringFooter = footer.hasClass('mkdf-footer-uncover');
            
            if(slider.length > 0) {
                slider.addClass('mkdf-slider-fixed');
                contentHolder.css("padding-top", initialHeight);
            }
            
            $(window).scroll(function() {
                if(mkdf.windowWidth > 1024) {
                    calculatePosition(initialHeight, uncoveringFooter, footerHeight);
                }
            });
        }

        function calculatePosition(initialHeight, uncoveringFooter, footerHeight) {
            if(uncoveringFooter) {
                if(mkdf.window.scrollTop() > initialHeight) {
                    slider.css('margin-top', '-' + footerHeight + 'px');
                } else {
                    slider.css('margin-top', 0);
                }
            }
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var headerDivided = {};
    mkdf.modules.headerDivided = headerDivided;
	
	headerDivided.mkdfOnDocumentReady = mkdfOnDocumentReady;
	headerDivided.mkdfOnWindowResize = mkdfOnWindowResize;

    $(document).ready(mkdfOnDocumentReady);
    $(window).resize(mkdfOnWindowResize);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfInitDividedHeaderMenu();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdfOnWindowResize() {
        mkdfInitDividedHeaderMenu();
    }

    /**
     * Init Divided Header Menu
     */
    function mkdfInitDividedHeaderMenu(){
        if(mkdf.body.hasClass('mkdf-header-divided')){
	        //get left side menu width
	        var menuArea = $('.mkdf-menu-area, .mkdf-sticky-header'),
		        menuAreaWidth = menuArea.width(),
		        menuAreaSidePadding = parseInt(menuArea.find('.mkdf-vertical-align-containers').css('paddingLeft'), 10),
		        menuAreaItem = $('.mkdf-main-menu > ul > li > a'),
		        menuItemPadding = 0,
		        logoArea = menuArea.find('.mkdf-logo-wrapper .mkdf-normal-logo'),
		        logoAreaWidth = 0;
	
	        menuArea.waitForImages(function() {
	        	
		        if(menuArea.find('.mkdf-grid').length) {
			        menuAreaWidth = menuArea.find('.mkdf-grid').outerWidth();
		        }
		
		        if(menuAreaItem.length) {
			        menuItemPadding = parseInt(menuAreaItem.css('paddingLeft'), 10);
		        }
		
		        if(logoArea.length) {
			        logoAreaWidth = logoArea.width() / 2;
		        }
		
		        var menuAreaLeftRightSideWidth = Math.round(menuAreaWidth/2 - menuItemPadding - logoAreaWidth - menuAreaSidePadding);
		
		        menuArea.find('.mkdf-position-left').width(menuAreaLeftRightSideWidth);
		        menuArea.find('.mkdf-position-right').width(menuAreaLeftRightSideWidth);
		
		        menuArea.css('opacity',1);
		
		        if (typeof mkdf.modules.header.mkdfSetDropDownMenuPosition === "function") {
			        mkdf.modules.header.mkdfSetDropDownMenuPosition();
		        }
		        if (typeof mkdf.modules.header.mkdfSetDropDownWideMenuPosition === "function") {
			        mkdf.modules.header.mkdfSetDropDownWideMenuPosition();
		        }
	        });
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var headerMinimal = {};
    mkdf.modules.headerMinimal = headerMinimal;
	
	headerMinimal.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfFullscreenMenu();
    }

    /**
     * Init Fullscreen Menu
     */
    function mkdfFullscreenMenu() {
	    var popupMenuOpener = $( 'a.mkdf-fullscreen-menu-opener');
	    
        if (popupMenuOpener.length) {
            var popupMenuHolderOuter = $(".mkdf-fullscreen-menu-holder-outer"),
                cssClass,
            //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
            //Widgets
                widgetAboveNav = $('.mkdf-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.mkdf-fullscreen-below-menu-widget-holder'),
            //Menu
                menuItems = $('.mkdf-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild =  $('.mkdf-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.mkdf-fullscreen-menu ul li:not(.has_sub) a');

            //set height of popup holder and initialize perfectScrollbar
            mkdf.modules.common.mkdfInitPerfectScrollbar().init(popupMenuHolderOuter);

            //set height of popup holder on resize
            $(window).resize(function() {
                popupMenuHolderOuter.height(mkdf.windowHeight);
            });

            if (mkdf.body.hasClass('mkdf-fade-push-text-right')) {
                cssClass = 'mkdf-push-nav-right';
                fadeRight = true;
            } else if (mkdf.body.hasClass('mkdf-fade-push-text-top')) {
                cssClass = 'mkdf-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay' : 0 + 'ms',
                        '-moz-animation-delay' : 0 + 'ms',
                        'animation-delay' : 0 + 'ms'
                    });
                }
                menuItems.each(function(i) {
                    $(this).css({
                        '-webkit-animation-delay': (i+1) * 70 + 'ms',
                        '-moz-animation-delay': (i+1) * 70 + 'ms',
                        'animation-delay': (i+1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        '-moz-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        'animation-delay' : (menuItems.length + 1)*70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click',function(e){
                e.preventDefault();

                if (!popupMenuOpener.hasClass('mkdf-fm-opened')) {
                    popupMenuOpener.addClass('mkdf-fm-opened');
                    mkdf.body.removeClass('mkdf-fullscreen-fade-out').addClass('mkdf-fullscreen-menu-opened mkdf-fullscreen-fade-in');
                    mkdf.body.removeClass(cssClass);
                    mkdf.modules.common.mkdfDisableScroll();
                    
                    $(document).keyup(function(e){
                        if (e.keyCode === 27 ) {
                            popupMenuOpener.removeClass('mkdf-fm-opened');
                            mkdf.body.removeClass('mkdf-fullscreen-menu-opened mkdf-fullscreen-fade-in').addClass('mkdf-fullscreen-fade-out');
                            mkdf.body.addClass(cssClass);
                            mkdf.modules.common.mkdfEnableScroll();

                            $("nav.mkdf-fullscreen-menu ul.sub_menu").slideUp(200);
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('mkdf-fm-opened');
                    mkdf.body.removeClass('mkdf-fullscreen-menu-opened mkdf-fullscreen-fade-in').addClass('mkdf-fullscreen-fade-out');
                    mkdf.body.addClass(cssClass);
                    mkdf.modules.common.mkdfEnableScroll();

                    $("nav.mkdf-fullscreen-menu ul.sub_menu").slideUp(200);
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();

                var thisItem = $(this),
	                thisItemParent = thisItem.parent(),
					thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');

                if (thisItemParent.hasClass('has_sub')) {
	                var submenu = thisItemParent.find('> ul.sub_menu');
	
	                if (submenu.is(':visible')) {
		                submenu.slideUp(450, 'easeInOutQuint');
		                thisItemParent.removeClass('open_sub');
	                } else {
		                thisItemParent.addClass('open_sub');
		
		                if(thisItemParentSiblingsWithDrop.length === 0) {
			                submenu.slideDown(400, 'easeInOutQuint');
		                } else {
							thisItemParent.closest('li.menu-item').siblings().find('.menu-item').removeClass('open_sub');
			                thisItemParent.siblings().removeClass('open_sub').find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
				                submenu.slideDown(400, 'easeInOutQuint');
			                });
		                }
	                }
                }
                
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.on('click', function (e) {
                if(($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")){
                    if (e.which === 1) {
                        popupMenuOpener.removeClass('mkdf-fm-opened');
                        mkdf.body.removeClass('mkdf-fullscreen-menu-opened');
                        mkdf.body.removeClass('mkdf-fullscreen-fade-in').addClass('mkdf-fullscreen-fade-out');
                        mkdf.body.addClass(cssClass);
                        $("nav.mkdf-fullscreen-menu ul.sub_menu").slideUp(200);
                        mkdf.modules.common.mkdfEnableScroll();
                    }
                } else {
                    return false;
                }
            });
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var headerVertical = {};
    mkdf.modules.headerVertical = headerVertical;
	
	headerVertical.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfVerticalMenu().init();
    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var mkdfVerticalMenu = function() {
	    var verticalMenuObject = $('.mkdf-vertical-menu-area');

	    /**
	     * Checks if vertical area is scrollable (if it has mkdf-with-scroll class)
	     *
	     * @returns {bool}
	     */
	    var verticalAreaScrollable = function () {
		    return verticalMenuObject.hasClass('mkdf-with-scroll');
	    };
	
	    /**
	     * Initialzes navigation functionality. It checks navigation type data attribute and calls proper functions
	     */
	    var initNavigation = function () {
		    var verticalNavObject = verticalMenuObject.find('.mkdf-vertical-menu');

		    if (verticalNavObject.hasClass('mkdf-vertical-dropdown-below')) {
				dropdownClickToggle();
			} else if (verticalNavObject.hasClass('mkdf-vertical-dropdown-side')) {
				dropdownFloat();
			}
		
		    /**
		     * Initializes click toggle navigation type. Works the same for touch and no-touch devices
		     */
		    function dropdownClickToggle() {
			    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
			
			    menuItems.each(function () {
				    var elementToExpand = $(this).find(' > .second, > ul');
				    var menuItem = this;
				    var dropdownOpener = $(this).find('> a');
				    var slideUpSpeed = 'fast';
				    var slideDownSpeed = 'slow';
				
				    dropdownOpener.on('click tap', function (e) {
					    e.preventDefault();
					    e.stopPropagation();
					
					    if (elementToExpand.is(':visible')) {
						    $(menuItem).removeClass('open');
						    elementToExpand.slideUp(slideUpSpeed);
					    } else if (dropdownOpener.parent().parent().children().hasClass('open') && dropdownOpener.parent().parent().parent().hasClass('mkdf-vertical-menu')) {
						    $(this).parent().parent().children().removeClass('open');
						    $(this).parent().parent().children().find(' > .second').slideUp(slideUpSpeed);
						
						    $(menuItem).addClass('open');
						    elementToExpand.slideDown(slideDownSpeed);
					    } else {
						
						    if (!$(this).parents('li').hasClass('open')) {
							    menuItems.removeClass('open');
							    menuItems.find(' > .second, > ul').slideUp(slideUpSpeed);
						    }
						
						    if ($(this).parent().parent().children().hasClass('open')) {
							    $(this).parent().parent().children().removeClass('open');
							    $(this).parent().parent().children().find(' > .second, > ul').slideUp(slideUpSpeed);
						    }
						
						    $(menuItem).addClass('open');
						    elementToExpand.slideDown(slideDownSpeed);
					    }
				    });
			    });
		    }


			/**
			 * Initializes click float navigation type
			 */
			function dropdownFloat() {
				var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
				var allDropdowns = menuItems.find(' > .second > .inner > ul, > ul');

				menuItems.each(function() {
					var elementToExpand = $(this).find(' > .second > .inner > ul, > ul');
					var menuItem = this;

					if(Modernizr.touch) {
						var dropdownOpener = $(this).find('> a');

						dropdownOpener.on('click tap', function(e) {
							e.preventDefault();
							e.stopPropagation();

							if(elementToExpand.hasClass('mkdf-float-open')) {
								elementToExpand.removeClass('mkdf-float-open');
								$(menuItem).removeClass('open');
							} else {
								if(!$(this).parents('li').hasClass('open')) {
									menuItems.removeClass('open');
									allDropdowns.removeClass('mkdf-float-open');
								}

								elementToExpand.addClass('mkdf-float-open');
								$(menuItem).addClass('open');
							}
						});
					} else {
						//must use hoverIntent because basic hover effect doesn't catch dropdown
						//it doesn't start from menu item's edge
						$(this).hoverIntent({
							over: function() {
								elementToExpand.addClass('mkdf-float-open');
								$(menuItem).addClass('open');
							},
							out: function() {
								elementToExpand.removeClass('mkdf-float-open');
								$(menuItem).removeClass('open');
							},
							timeout: 300
						});
					}
				});
			}
	    };

        /**
         * Initializes scrolling in vertical area. It checks if vertical area is scrollable before doing so
         */
        var initVerticalAreaScroll = function() {
            if(verticalAreaScrollable()) {
                mkdf.modules.common.mkdfInitPerfectScrollbar().init(verticalMenuObject);
            }
        };

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function() {
                if(verticalMenuObject.length) {
                    initNavigation();
                    initVerticalAreaScroll();
                }
            }
        };
    };

})(jQuery);
(function ($) {
	"use strict";
	
	var mobileHeader = {};
	mkdf.modules.mobileHeader = mobileHeader;
	
	mobileHeader.mkdfOnDocumentReady = mkdfOnDocumentReady;
	mobileHeader.mkdfOnWindowResize = mkdfOnWindowResize;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).resize(mkdfOnWindowResize);
	
	/*
		All functions to be called on $(document).ready() should be in this function
	*/
	function mkdfOnDocumentReady() {
		mkdfInitMobileNavigation();
		mkdfInitMobileNavigationScroll();
		mkdfMobileHeaderBehavior();
	}
	
	/*
        All functions to be called on $(window).resize() should be in this function
    */
	function mkdfOnWindowResize() {
		mkdfInitMobileNavigationScroll();
	}
	
	function mkdfInitMobileNavigation() {
		var navigationOpener = $('.mkdf-mobile-header .mkdf-mobile-menu-opener'),
			navigationHolder = $('.mkdf-mobile-header .mkdf-mobile-nav'),
			dropdownOpener = $('.mkdf-mobile-nav .mobile_arrow, .mkdf-mobile-nav h6, .mkdf-mobile-nav a.mkdf-mobile-no-link');
		
		//whole mobile menu opening / closing
		if (navigationOpener.length && navigationHolder.length) {
			navigationOpener.on('tap click', function (e) {
				e.stopPropagation();
				e.preventDefault();
				
				if (navigationHolder.is(':visible')) {
					navigationHolder.slideUp(450, 'easeInOutQuint');
					navigationOpener.removeClass('mkdf-mobile-menu-opened');
				} else {
					navigationHolder.slideDown(450, 'easeInOutQuint');
					navigationOpener.addClass('mkdf-mobile-menu-opened');
				}
			});
		}
		
		//dropdown opening / closing
		if (dropdownOpener.length) {
			dropdownOpener.each(function () {
				var thisItem = $(this),
					initialNavHeight = navigationHolder.outerHeight();
				
				thisItem.on('tap click', function (e) {
					var thisItemParent = thisItem.parent('li'),
						thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');
					
					if (thisItemParent.hasClass('has_sub')) {
						var submenu = thisItemParent.find('> ul.sub_menu');
						
						if (submenu.is(':visible')) {
							submenu.slideUp(450, 'easeInOutQuint');
							thisItemParent.removeClass('mkdf-opened');
							navigationHolder.stop().animate({'height': initialNavHeight}, 300);
						} else {
							thisItemParent.addClass('mkdf-opened');
							
							if (thisItemParentSiblingsWithDrop.length === 0) {
								thisItemParent.find('.sub_menu').slideUp(400, 'easeInOutQuint', function () {
									submenu.slideDown(400, 'easeInOutQuint');
									navigationHolder.stop().animate({'height': initialNavHeight + 50}, 300);
								});
							} else {
								thisItemParent.siblings().removeClass('mkdf-opened').find('.sub_menu').slideUp(400, 'easeInOutQuint', function () {
									submenu.slideDown(400, 'easeInOutQuint');
									navigationHolder.stop().animate({'height': initialNavHeight + 50}, 300);
								});
							}
						}
					}
				});
			});
		}
		
		$('.mkdf-mobile-nav a, .mkdf-mobile-logo-wrapper a').on('click tap', function (e) {
			if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
				navigationHolder.slideUp(450, 'easeInOutQuint');
				navigationOpener.removeClass("mkdf-mobile-menu-opened");
			}
		});
	}
	
	function mkdfInitMobileNavigationScroll() {
		if (mkdf.windowWidth <= 1024) {
			var mobileHeader = $('.mkdf-mobile-header'),
				mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0,
				navigationHolder = mobileHeader.find('.mkdf-mobile-nav'),
				navigationHeight = navigationHolder.outerHeight(),
				windowHeight = mkdf.windowHeight - 100;
			
			//init scrollable menu
			var scrollHeight = mobileHeaderHeight + navigationHeight > windowHeight ? windowHeight - mobileHeaderHeight : navigationHeight;

            // in case if mobile header exists on specific page
            if(navigationHolder.length) {
                navigationHolder.height(scrollHeight);
                mkdf.modules.common.mkdfInitPerfectScrollbar().init(navigationHolder);
            }
		}
	}
	
	function mkdfMobileHeaderBehavior() {
		var mobileHeader = $('.mkdf-mobile-header'),
			mobileMenuOpener = mobileHeader.find('.mkdf-mobile-menu-opener'),
			mobileHeaderHeight = mobileHeader.length ? mobileHeader.outerHeight() : 0;
		
		if (mkdf.body.hasClass('mkdf-content-is-behind-header') && mobileHeaderHeight > 0 && mkdf.windowWidth <= 1024) {
			$('.mkdf-content').css('marginTop', -mobileHeaderHeight);
		}
		
		if (mkdf.body.hasClass('mkdf-sticky-up-mobile-header')) {
			var stickyAppearAmount,
				adminBar = $('#wpadminbar');
			
			var docYScroll1 = $(document).scrollTop();
			stickyAppearAmount = mobileHeaderHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			$(window).scroll(function () {
				var docYScroll2 = $(document).scrollTop();
				
				if (docYScroll2 > stickyAppearAmount) {
					mobileHeader.addClass('mkdf-animate-mobile-header');
				} else {
					mobileHeader.removeClass('mkdf-animate-mobile-header');
				}
				
				if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount && !mobileMenuOpener.hasClass('mkdf-mobile-menu-opened')) || (docYScroll2 < stickyAppearAmount)) {
					mobileHeader.removeClass('mobile-header-appear');
					mobileHeader.css('margin-bottom', 0);
					
					if (adminBar.length) {
						mobileHeader.find('.mkdf-mobile-header-inner').css('top', 0);
					}
				} else {
					mobileHeader.addClass('mobile-header-appear');
					mobileHeader.css('margin-bottom', stickyAppearAmount);
				}
				
				docYScroll1 = $(document).scrollTop();
			});
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var stickyHeader = {};
    mkdf.modules.stickyHeader = stickyHeader;
	
	stickyHeader.isStickyVisible = false;
	stickyHeader.stickyAppearAmount = 0;
	stickyHeader.behaviour = '';
	
	stickyHeader.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    if(mkdf.windowWidth > 1024) {
		    mkdfHeaderBehaviour();
	    }
    }

    /*
     **	Show/Hide sticky header on window scroll
     */
    function mkdfHeaderBehaviour() {
        var header = $('.mkdf-page-header'),
	        stickyHeader = $('.mkdf-sticky-header'),
            fixedHeaderWrapper = $('.mkdf-fixed-wrapper'),
	        fixedMenuArea = fixedHeaderWrapper.children('.mkdf-menu-area'),
	        fixedMenuAreaHeight = fixedMenuArea.outerHeight(),
            sliderHolder = $('.mkdf-slider'),
            revSliderHeight = sliderHolder.length ? sliderHolder.outerHeight() : 0,
	        stickyAppearAmount,
	        headerAppear;
        
        var headerMenuAreaOffset = fixedHeaderWrapper.length ? fixedHeaderWrapper.offset().top - mkdfGlobalVars.vars.mkdfAddForAdminBar : 0;

        switch(true) {
            // sticky header that will be shown when user scrolls up
            case mkdf.body.hasClass('mkdf-sticky-header-on-scroll-up'):
                mkdf.modules.stickyHeader.behaviour = 'mkdf-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = parseInt(mkdfGlobalVars.vars.mkdfTopBarHeight) + parseInt(mkdfGlobalVars.vars.mkdfLogoAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfMenuAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfStickyHeaderHeight);
	            
                headerAppear = function(){
                    var docYScroll2 = $(document).scrollTop();
					
                    if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        mkdf.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.mkdf-main-menu .second').removeClass('mkdf-drop-down-start');
                        mkdf.body.removeClass('mkdf-sticky-header-appear');
                    } else {
                        mkdf.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    mkdf.body.addClass('mkdf-sticky-header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case mkdf.body.hasClass('mkdf-sticky-header-on-scroll-down-up'):
                mkdf.modules.stickyHeader.behaviour = 'mkdf-sticky-header-on-scroll-down-up';

                if(mkdfPerPageVars.vars.mkdfStickyScrollAmount !== 0){
                    mkdf.modules.stickyHeader.stickyAppearAmount = parseInt(mkdfPerPageVars.vars.mkdfStickyScrollAmount);
                } else {
                    mkdf.modules.stickyHeader.stickyAppearAmount = parseInt(mkdfGlobalVars.vars.mkdfTopBarHeight) + parseInt(mkdfGlobalVars.vars.mkdfLogoAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfMenuAreaHeight) + parseInt(revSliderHeight);
                }

                headerAppear = function(){
                    if(mkdf.scroll < mkdf.modules.stickyHeader.stickyAppearAmount) {
                        mkdf.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.mkdf-main-menu .second').removeClass('mkdf-drop-down-start');
	                    mkdf.body.removeClass('mkdf-sticky-header-appear');
                    }else{
                        mkdf.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    mkdf.body.addClass('mkdf-sticky-header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case mkdf.body.hasClass('mkdf-fixed-on-scroll'):
                mkdf.modules.stickyHeader.behaviour = 'mkdf-fixed-on-scroll';
                var headerFixed = function(){
	
	                if(mkdf.scroll <= headerMenuAreaOffset) {
		                fixedHeaderWrapper.removeClass('fixed');
		                mkdf.body.removeClass('mkdf-fixed-header-appear');
		                header.css('margin-bottom', '0');
	                } else {
		                fixedHeaderWrapper.addClass('fixed');
		                mkdf.body.addClass('mkdf-fixed-header-appear');
		                header.css('margin-bottom', fixedMenuAreaHeight + 'px');
	                }
                };

                headerFixed();

                $(window).scroll(function() {
                    headerFixed();
                });

                break;
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var searchOnside = {};
    mkdf.modules.searchOnside = searchOnside;

    searchOnside.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);

    /*
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfSearchOnside();
    }

    /**
     * Init Search Types
     */
    function mkdfSearchOnside() {
        if ( mkdf.body.hasClass( 'mkdf-on-side-search' ) ) {

            var searchOpener = $('a.mkdf-search-opener');

            if (searchOpener.length) {
                var searchOpenerParent = searchOpener.parent(),
                    searchOpenerInput = $('input.mkdf-search-field');

                searchOpener.on('click', function(e){
                    searchOpenerParent.addClass("opened");

                    setTimeout(function () {
                        searchOpenerInput.focus();
                    }, 500)
                });

                $(document).on('click', function(e){
                    if (searchOpenerParent.hasClass("opened") &&
                        e.target.className !== 'mkdf-search-field' &&
                        e.target.parentElement.className !== 'mkdf-onside-btn' &&
                        e.target.parentElement.className !== 'mkdf-search-opener-wrapper') {
                        searchOpenerParent.removeClass("opened");
                    }
                });
            }
        }
    }

})(jQuery);

(function($) {
    'use strict';

    var like = {};
    
    like.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /**
    *  All functions to be called on $(document).ready() should be in this function
    **/
    function mkdfOnDocumentReady() {
        mkdfLikes();
    }

    function mkdfLikes() {
        $(document).on('click','.mkdf-like', function() {
            var likeLink = $(this),
                id = likeLink.attr('id'),
                postID = likeLink.data('post-id'),
                type = '';

            if ( likeLink.hasClass('liked') ) {
                return false;
            }

            if (typeof likeLink.data('type') !== 'undefined') {
                type = likeLink.data('type');
            }
    
            var dataToPass = {
                action: 'wanderland_core_action_like',
                likes_id: id,
                type: type,
                like_nonce: $('#mkdf_like_nonce_'+postID).val()
            };
        
            var like = $.post(mkdfGlobalVars.vars.mkdfAjaxUrl, dataToPass, function( data ) {
                likeLink.html(data).addClass('liked').attr('title', 'You already like this!');
            });

            return false;
        });
    }
    
})(jQuery);
(function ($) {
	'use strict';
	
	var rating = {};
	mkdf.modules.rating = rating;

    rating.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCommentRating();
	}
	
	function mkdfInitCommentRating() {
		var ratingHolder = $('.mkdf-comment-form-rating');

        var addActive = function (stars, ratingValue) {
            for (var i = 0; i < stars.length; i++) {
                var star = stars[i];
                if (i < ratingValue) {
                    $(star).addClass('active');
                } else {
                    $(star).removeClass('active');
                }
            }
        };

		ratingHolder.each(function() {
		    var thisHolder = $(this),
                ratingInput = thisHolder.find('.mkdf-rating'),
                ratingValue = ratingInput.val(),
                stars = thisHolder.find('.mkdf-star-rating');

                addActive(stars, ratingValue);

            stars.on('click', function () {
                ratingInput.val($(this).data('value')).trigger('change');
            });

            ratingInput.change(function () {
                ratingValue = ratingInput.val();
                addActive(stars, ratingValue);
            });
        });
	}
	
})(jQuery);
var j = jQuery.noConflict();

function CustomMarker( options ) {
    this.latlng = new google.maps.LatLng({lat: options.position.lat, lng: options.position.lng});
    this.setMap(options.map);
    this.templateData = options.templateData;
    this.markerData = {
        pin : options.markerPin
    };
}

if (typeof google === 'object') {
    CustomMarker.prototype = new google.maps.OverlayView();
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;

    if (!div) {
        div = this.div = document.createElement('div');
        var id = this.templateData.itemId;
        div.className = 'mkdf-map-marker-holder';
        div.setAttribute("id", id);
        div.setAttribute("data-latlng", this.latlng);

        var markerInfoTemplate = _.template( j('.mkdf-info-window-template').html() );
        markerInfoTemplate = markerInfoTemplate( self.templateData );

        var markerTemplate = _.template( j('.mkdf-marker-template').html() );
        markerTemplate = markerTemplate( self.markerData );

        j(div).append(markerInfoTemplate);
        j(div).append(markerTemplate);

        div.style.position = 'absolute';
        div.style.cursor = 'pointer';

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
        div.style.left = (point.x) + 'px';
        div.style.top = (point.y) + 'px';
    }
};

CustomMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

CustomMarker.prototype.getPosition = function() {
    return this.latlng;
};
(function($) {
	'use strict';
	
	var destination = {};
	mkdf.modules.destination = destination;
	
	destination.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfDestinationSingleFollow().init();
	}
	
	var mkdfDestinationSingleFollow = function () {
		var info = $('.mkdf-follow-destination-info .mkdf-destination-single-holder .mkdf-ds-info-sticky-holder');
		
		if (info.length) {
			var infoHolder = info.parent(),
				infoHolderHeight = infoHolder.height(),
				mediaHolder = $('.mkdf-ds-image-holder'),
				mediaHolderHeight = mediaHolder.height(),
				mediaHolderOffset = mediaHolder.offset().top,
				mediaHolderItemSpace = parseInt(mediaHolder.find('.mkdf-ds-image:last-of-type').css('marginBottom'), 10),
				header = $('.header-appear, .mkdf-fixed-wrapper'),
				headerHeight = header.length ? header.height() : 0;
			
			var stickyHolderPosition = function () {
				if (mediaHolderHeight >= infoHolderHeight) {
					var scrollValue = mkdf.scroll;
					
					//Calculate header height if header appears
					if (scrollValue > 0 && header.length) {
						headerHeight = header.height();
					}
					
					var headerMixin = headerHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar;
					if (scrollValue >= mediaHolderOffset - headerMixin) {
						if (scrollValue + infoHolderHeight >= mediaHolderHeight + mediaHolderOffset - mediaHolderItemSpace - headerMixin) {
							info.stop().animate({
								marginTop: mediaHolderHeight - mediaHolderItemSpace - infoHolderHeight
							});
							//Reset header height
							headerHeight = 0;
						} else {
							info.stop().animate({
								marginTop: scrollValue - mediaHolderOffset + headerMixin
							});
						}
					} else {
						info.stop().animate({
							marginTop: 0
						});
					}
				}
			};
		}
		
		return {
			init: function () {
				if (info.length) {
					stickyHolderPosition();
					$(window).scroll(function () {
						stickyHolderPosition();
					});
				}
			}
		};
	};
	
})(jQuery);
(function ($) {
    "use strict";

    var destinationMaps = {};
    mkdf.modules.destinationMaps = destinationMaps;
    destinationMaps.mkdfInitMultipleDestinationMap = mkdfInitMultipleDestinationMap;
    destinationMaps.mkdfInitMobileMap = mkdfInitMobileMap;
    destinationMaps.mkdfReinitMultipleGoogleMaps = mkdfReinitMultipleGoogleMaps;
    destinationMaps.mkdfGoogleMaps = {};

    $(window).on('load', mkdfOnWindowLoad);

    function mkdfOnWindowLoad() {
	    mkdfInitMultipleDestinationMap();
	    mkdfInitMobileMap();
	    mkdfBindListTitlesAndMap();
    }

    function mkdfInitMultipleDestinationMap() {
        var mapHolder = $('#mkdf-destination-multiple-map-holder');

        if (mapHolder.length) {
	        mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses({
                mapHolder: 'mkdf-destination-multiple-map-holder',
                hasFilter: true
            });
        }
    }

    function mkdfInitMobileMap() {
        var mapOpener = $('.mkdf-destination-view-larger-map a'),
            mapOpenerIcon = mapOpener.children('i'),
            mapHolder = $('.mkdf-map-holder');

        if (mapOpener.length) {
            mapOpener.on('click', function (e) {
                e.preventDefault();

                if (mapHolder.hasClass('mkdf-fullscreen-map')) {
                    mapHolder.removeClass('mkdf-fullscreen-map');
                    mapOpenerIcon.removeClass('icon-basic-magnifier-minus');
                    mapOpenerIcon.addClass('icon-basic-magnifier-plus');
                } else {
                    mapHolder.addClass('mkdf-fullscreen-map');
                    mapOpenerIcon.removeClass('icon-basic-magnifier-plus');
                    mapOpenerIcon.addClass('icon-basic-magnifier-minus');
                }

                mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses();
            });
        }
    }

    function mkdfReinitMultipleGoogleMaps(addresses, action) {
        if (action === 'append') {
            var mapObjs = mkdfMultipleMapVars.multiple.addresses.concat(addresses);
            mkdfMultipleMapVars.multiple.addresses = mapObjs;

            mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses({
                addresses: mapObjs
            });
        } else if (action === 'replace') {
            mkdfMultipleMapVars.multiple.addresses = addresses;
            mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses({
                addresses: addresses
            });
        }

        mkdfBindListTitlesAndMap();
    }

    function mkdfBindListTitlesAndMap() {
        var itemsList = $('.mkdf-map-list-holder');

        if (itemsList.length) {
            itemsList.each(function () {
                var thisItemsList = $(this),
                    listItems = thisItemsList.find('article'),
                    map = thisItemsList.find('.mkdf-map-list-map-part');

                if (map.length) {
                    listItems.each(function () {
                        //Init hover
                        var listItem = $(this);

                        if (!listItem.hasClass('mkdf-init')) {
                            listItem.mouseenter(function () {
                                var itemId = listItem.data('id'),
                                    inactiveMarkersHolder = $('.mkdf-map-marker-holder:not(.mkdf-map-active)'),
                                    clusterMarkersHolder = $('.mkdf-cluster-marker');

                                if (inactiveMarkersHolder.length) {
                                    inactiveMarkersHolder.removeClass('mkdf-active');
                                    $('#' + itemId + '.mkdf-map-marker-holder').addClass('mkdf-active');
                                }

                                if (clusterMarkersHolder.length) {
                                    clusterMarkersHolder.each(function () {
                                        var thisClusterMarker = $(this),
                                            clusterMarkersItemIds = thisClusterMarker.data('item-ids');

                                        if (clusterMarkersItemIds !== undefined && clusterMarkersItemIds.includes(itemId.toString())) {
                                            thisClusterMarker.addClass('mkdf-active');
                                        }
                                    });
                                }
                            }).mouseleave(function () {
                                var markersHolder = $('.mkdf-map-marker-holder'),
                                    clusterMarkersHolder = $('.mkdf-cluster-marker');

                                if (markersHolder.length) {
                                    markersHolder.each(function () {
                                        var thisMapHolder = $(this);

                                        if (!thisMapHolder.hasClass('mkdf-map-active')) {
                                            thisMapHolder.removeClass('mkdf-active');
                                        }
                                    });
                                }

                                if (clusterMarkersHolder.length) {
                                    clusterMarkersHolder.removeClass('mkdf-active');
                                }
                            });

                            listItem.addClass('mkdf-init');
                        }
                    });
                }
            });
        }
    }

    destinationMaps.mkdfGoogleMaps = {
        //Object variables
        mapHolder: {},
        map: {},
        markers: {},
        radius: {},
        circle: {},

        /**
         * Returns map with single address
         *
         * @param options
         */
        getDirectoryItemAddress: function (options) {
            /**
             * use mkdfMapsVars to get variables for address, latitude, longitude by default
             */
            var defaults = {
                location: mkdfSingleMapVars.single['currentDestination'].location,
                zoom: 16,
                mapHolder: '',
                draggable: mkdfMapsVars.global.draggable,
                mapTypeControl: mkdfMapsVars.global.mapTypeControl,
                scrollwheel: mkdfMapsVars.global.scrollable,
                streetViewControl: mkdfMapsVars.global.streetViewControl,
                zoomControl: mkdfMapsVars.global.zoomControl,
                title: mkdfSingleMapVars.single['currentDestination'].title,
                excerpt: mkdfSingleMapVars.single['currentDestination'].excerpt,
                categories: mkdfSingleMapVars.single['currentDestination'].categories,
                itemId: mkdfSingleMapVars.single['currentDestination'].itemId,
                content: '',
                styles: mkdfMapsVars.global.mapStyle,
                markerPin: mkdfSingleMapVars.single['currentDestination'].markerPin,
                featuredImage: mkdfSingleMapVars.single['currentDestination'].featuredImage,
                itemUrl: mkdfSingleMapVars.single['currentDestination'].itemUrl
            };
            var settings = $.extend({}, defaults, options);

            //Save variables for later usage
            this.mapHolder = settings.mapHolder;

            //Get map holder
            var mapHolder = document.getElementById(settings.mapHolder);

            //Initialize map
            var map = new google.maps.Map(mapHolder, {
                zoom: settings.zoom,
                draggable: settings.draggable,
                mapTypeControl: settings.mapTypeControl,
                scrollwheel: settings.scrollwheel,
                streetViewControl: settings.streetViewControl,
                zoomControl: settings.zoomControl
            });

            //Set map style
            map.setOptions({
                styles: settings.styles
            });

            //Try to locate by latitude and longitude
            if (typeof settings.location !== 'undefined' && settings.location !== null) {
                var latLong = {
                    lat: parseFloat(settings.location.latitude),
                    lng: parseFloat(settings.location.longitude)
                };
                //Set map center to location
                map.setCenter(latLong);
                //Add marker to map

                var templateData = {
                    title: settings.title,
                    excerpt: settings.excerpt,
                    categories: settings.categories,
                    itemId: settings.itemId,
                    address: settings.location.address,
                    featuredImage: settings.featuredImage,
                    itemUrl: settings.itemUrl
                };

                var customMarker = new CustomMarker({
                    map: map,
                    position: latLong,
                    templateData: templateData,
                    markerPin: settings.markerPin
                });

                this.initMarkerInfo();
            }
        },

        /**
         * Returns map with multiple addresses
         *
         * @param options
         */
        getDirectoryItemsAddresses: function (options) {
            var defaults = {
                geolocation: false,
                mapHolder: 'mkdf-destination-multiple-map-holder',
                addresses: mkdfMultipleMapVars.multiple.addresses,
                draggable: mkdfMapsVars.global.draggable,
                mapTypeControl: mkdfMapsVars.global.mapTypeControl,
                scrollwheel: mkdfMapsVars.global.scrollable,
                streetViewControl: mkdfMapsVars.global.streetViewControl,
                zoomControl: mkdfMapsVars.global.zoomControl,
                zoom: 16,
                styles: mkdfMapsVars.global.mapStyle,
                radius: 50, //radius for marker visibility, in km
                hasFilter: false
            };
            var settings = $.extend({}, defaults, options);

            //Get map holder
            var mapHolder = document.getElementById(settings.mapHolder);

            //Initialize map
            var map = new google.maps.Map(mapHolder, {
                zoom: settings.zoom,
                draggable: settings.draggable,
                mapTypeControl: settings.mapTypeControl,
                scrollwheel: settings.scrollwheel,
                streetViewControl: settings.streetViewControl,
                zoomControl: settings.zoomControl
            });

            //Save variables for later usage
            this.mapHolder = settings.mapHolder;
            this.map = map;
            this.radius = settings.radius;

            //Set map style
            map.setOptions({
                styles: settings.styles
            });

            //If geolocation enabled set map center to user location
            if (navigator.geolocation && settings.geolocation) {
                this.centerOnCurrentLocation();
            }

            //Filter addresses, remove items without latitude and longitude
            var addresses = [];

            if (typeof settings.addresses !== 'undefined') {
                var addressesLength = settings.addresses.length;

                if (settings.addresses.length !== null) {
                    for (var i = 0; i < addressesLength; i++) {
                        var location = settings.addresses[i].location;

                        if (typeof location !== 'undefined' && location !== null) {

                            if (location.latitude !== '' && location.longitude !== '') {
                                addresses.push(settings.addresses[i]);
                            }
                        }
                    }
                }
            }

            //Center map and set borders of map
            this.setMapBounds(addresses);

            //Add markers to the map
            this.addMultipleMarkers(addresses);
        },

        /**
         * Add multiple markers to map
         */
        addMultipleMarkers: function (markersData) {
            var map = this.map;
            var markers = [];
            //Loop through markers
            var len = markersData.length;

            for (var i = 0; i < len; i++) {
                var latLng = {
                    lat: parseFloat(markersData[i].location.latitude),
                    lng: parseFloat(markersData[i].location.longitude)
                };

                //Custom html markers
                //Insert marker data into info window template
                var templateData = {
                    title: markersData[i].title,
                    excerpt: markersData[i].excerpt,
                    categories: markersData[i].categories,
                    itemId: markersData[i].itemId,
                    address: markersData[i].location.address,
                    featuredImage: markersData[i].featuredImage,
                    itemUrl: markersData[i].itemUrl,
                    latLng: latLng
                };

                var customMarker = new CustomMarker({
                    position: latLng,
                    map: map,
                    templateData: templateData,
                    markerPin: markersData[i].markerPin
                });

                markers.push(customMarker);
            }

            this.markers = markers;

            //Init map clusters ( Grouping map markers at small zoom values )
            this.initMapClusters();

            //Init marker info
            this.initMarkerInfo();

            //Init marker info close
            this.initMarkerInfoClose();
        },

        /**
         * Set map bounds for Map with multiple markers
         *
         * @param addressesArray
         */
        setMapBounds: function (addressesArray) {
            var bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < addressesArray.length; i++) {
                bounds.extend(new google.maps.LatLng(parseFloat(addressesArray[i].location.latitude), parseFloat(addressesArray[i].location.longitude)));
            }

            this.map.fitBounds(bounds);
        },

        /**
         * Init map clusters for grouping markers on small zoom values
         */
        initMapClusters: function () {

            //Activate clustering on multiple markers
            var markerClusteringOptions = {
                minimumClusterSize: 2,
                maxZoom: 12,
                styles: [{
                    width: 50,
                    height: 60,
                    url: '',
                    textSize: 12
                }]
            };

            var markerClusterer = new MarkerClusterer(this.map, this.markers, markerClusteringOptions);
        },

        initMarkerInfo: function () {

            var map = this.map;

            google.maps.event.addListenerOnce(map, 'idle', function(){
                $('.mkdf-map-marker-holder').parent().addClass('mkdf-to-front');
            });

            $(document).off('click', '.mkdf-map-marker').on('click', '.mkdf-map-marker', function () {
                var self = $(this),
                    markerHolders = $('.mkdf-map-marker-holder'),
                    infoWindows = $('.mkdf-info-window'),
                    markerHolder = self.parent('.mkdf-map-marker-holder'),
                    markerlatlngData = markerHolder.data('latlng'),
                    infoWindow = self.siblings('.mkdf-info-window');

                if (markerHolder.hasClass('mkdf-active mkdf-map-active')) {
                    markerHolder.removeClass('mkdf-active mkdf-map-active');
                    infoWindow.fadeOut(0);
                } else {
                    markerHolders.removeClass('mkdf-active mkdf-map-active');
                    infoWindows.fadeOut(0);
                    markerHolder.addClass('mkdf-active mkdf-map-active');
                    markerHolder.parent().addClass('mkdf-to-front');
                    infoWindow.fadeIn(300);

                    if (markerlatlngData.length && markerlatlngData !== undefined) {
                        var latlngStr = markerlatlngData.replace('(', '').replace(')', '').split(',', 2);
                        var lat = parseFloat(latlngStr[0]);
                        var lng = parseFloat(latlngStr[1]);

                        map.panTo(new google.maps.LatLng(lat, lng));
                    }
                }
            });

        },

        initMarkerInfoClose: function () {

            $(document).on('click', '.icon_close', function () {

                var self = $(this),
                    markerHolder = self.parents('.mkdf-map-marker-holder'),
                    infoWindow = self.parents('.mkdf-info-window');


                if (markerHolder.hasClass('mkdf-active mkdf-map-active')) {
                    markerHolder.removeClass('mkdf-active mkdf-map-active');
                    markerHolder.parent().removeClass('mkdf-to-front');
                    infoWindow.fadeOut(0);
                }
            });
        },

        /**
         * If geolocation enabled center map on users current position
         */
        centerOnCurrentLocation: function (setInputAddressValue, placesInput, geoLocationLinkIcon, destinationListHolder) {
            var map = this.map;

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                if (setInputAddressValue) {
                    geoLocationLinkIcon.addClass('fa-spinner fa-spin');
                }

                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        var lat = position.coords.latitude,
                            lng = position.coords.longitude,
                            latlng = {
                                lat: lat,
                                lng: lng
                            };

                        if (setInputAddressValue) {
                            var geocoder = new google.maps.Geocoder(),
                                cityName = '',
                                cityWithCountryName = '';

                            geocoder.geocode({'latLng': new google.maps.LatLng(lat, lng)}, function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK && typeof results === 'object') {
                                    var resultsObject = results;

                                    for (var $i = 0; $i <= resultsObject.length; $i++) {
                                        var result = resultsObject[$i];

                                        if (typeof result === 'object' && result.types[0] === 'locality') {
                                            var currentAddress = result.address_components;

                                            cityName = currentAddress[0].long_name;

                                            for (var $j = 0; $j <= currentAddress.length; $j++) {
                                                if (typeof currentAddress[$j] === 'object' && currentAddress[$j].types[0] === 'country') {
                                                    cityWithCountryName = cityName + ',' + currentAddress[$j].long_name;
                                                }
                                            }
                                        }
                                    }

                                    if (typeof cityName === 'string') {
                                        geoLocationLinkIcon.removeClass('fa-spinner fa-spin');

                                        if (typeof cityWithCountryName === 'string') {
                                            placesInput.val(cityWithCountryName);
                                        } else {
                                            placesInput.val(cityName);
                                        }

                                        // ReInit destination list and map
                                        if (destinationListHolder) {
                                            var locationObject = [];

                                            locationObject.push(cityName);
                                            locationObject.push(latlng);
                                            locationObject.push(true);

                                            mkdf.modules.destinationList.mkdfInitGeoLocationRangeSlider().showRangeSlider(latlng, true);
                                            mkdf.modules.destinationList.mkdfInitDestinationListPagination().getMainPagFunction(destinationListHolder, 1, true, locationObject);
                                        }
                                    }
                                }
                            });
                        } else {
                            map.setCenter(latlng);
                        }
                    }
                );
            }
        },

        /**
         * Center map on forward location position
         */
        centerOnForwardLocation: function (forwardLocation, markerEnabled, addressName) {
            var map = this.map;

            if (typeof forwardLocation === 'object') {

                if (markerEnabled) {
                    var customMarker = new CustomMarker({
                        map: map,
                        position: forwardLocation,
                        templateData: {
                            title: 'Your location is here',
                            excerpt: '',
                            categories: '',
                            itemId: 'mkdf-geo-location-marker',
                            address: addressName,
                            featuredImage: '',
                            itemUrl: ''
                        }
                    });

                    destinationMaps.mkdfGoogleMaps.initMarkerInfo();
                }

                map.setZoom(12);
                map.setCenter(forwardLocation);
            }
        },

        /**
         * Center map on forward address name location
         */
        centerOnForwardAddressLocation: function (addressName) {

            if (typeof addressName === 'string' && typeof google === 'object') {
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({'address': addressName}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK && typeof results[0] === 'object') {
                        destinationMaps.mkdfGoogleMaps.centerOnForwardLocation(results[0].geometry.location);
                    }
                });
            }
        },

        /**
         * Set radius for current geo location location
         */
        setGeoLocationRadius: function (forwardLocation, radius, isActive) {
            var map = this.map,
                circle = this.circle,
                markers = this.markers;

            if (typeof forwardLocation === 'object' && typeof google === 'object') {

                if (isActive) {
                    circle.setMap(null);
                }

                this.circle = new google.maps.Circle({
                    map: map,
                    center: forwardLocation,
                    radius: parseInt(radius, 10) * 1000, // 1000 change meters to kilometers
                    strokeWeight: 0,
                    fillColor: '#fc475f',
                    fillOpacity: 0.15
                });

                var currentCircle = this.circle;

                var itemsInArea = [];
                $.each(markers, function(i,marker) {
                    if (currentCircle.getBounds().contains(marker.latlng)) {
                        itemsInArea.push(marker.templateData.itemId);
                    }
                });

                mkdf.modules.destinationList.mkdfInitGeoLocationRangeSlider().disableItemsOutOfRange(itemsInArea);
            }
        },

        /**
         * Create autocomplete places for forward input field
         */
        createAutocompletePlaces: function (placeInputID, destinationListHolder) {

            if (typeof google === 'object' && typeof google.maps.places === 'object') {
                var autocompleteConfig = {
                    types: ['(cities)']
                };

                var autocomplete = new google.maps.places.Autocomplete(placeInputID, autocompleteConfig);

                autocomplete.addListener('place_changed', function () {
                    // Enable reset icon in field
                    $(placeInputID).next().show();

                    if (destinationListHolder) {
                        var place = autocomplete.getPlace();

                        if (!place.geometry) {
                            window.alert("No details available for input: '" + place.name + "'");
                            return;
                        }

                        var locationObject = [];

                        locationObject.push(place.address_components[0].short_name);
                        locationObject.push(place.geometry.location);
                        locationObject.push(false);

                        // ReInit destination list and map
                        mkdf.modules.destinationList.mkdfInitGeoLocationRangeSlider().reset();
                        mkdf.modules.destinationList.mkdfInitDestinationListPagination().getMainPagFunction(destinationListHolder, 1, true, locationObject);
                    }
                });
            }
        }
    };

})(jQuery);
// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3_3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0.2
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'imagePath': (string) The base URL where the images representing
 *                  clusters will be found. The full URL will be:
 *                  {imagePath}[1-5].{imageExtension}
 *                  Default: '../images/m'.
 *     'imageExtension': (string) The suffix for images URL representing
 *                       clusters will be found. See _imagePath_ for details.
 *                       Default: 'png'.
 *     'averageCenter': (boolean) Whether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = map;

    /**
     * @type {Array.<google.maps.Marker>}
     * @private
     */
    this.markers_ = [];

    /**
     *  @type {Array.<Cluster>}
     */
    this.clusters_ = [];

    this.sizes = [53, 56, 66, 78, 90];

    /**
     * @private
     */
    this.styles_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.ready_ = false;

    var options = opt_options || {};

    /**
     * @type {number}
     * @private
     */
    this.gridSize_ = options['gridSize'] || 60;

    /**
     * @private
     */
    this.minClusterSize_ = options['minimumClusterSize'] || 2;


    /**
     * @type {?number}
     * @private
     */
    this.maxZoom_ = options['maxZoom'] || null;

    this.styles_ = options['styles'] || [];

    /**
     * @type {string}
     * @private
     */
    this.imagePath_ = options['imagePath'] ||
        this.MARKER_CLUSTER_IMAGE_PATH_;

    /**
     * @type {string}
     * @private
     */
    this.imageExtension_ = options['imageExtension'] ||
        this.MARKER_CLUSTER_IMAGE_EXTENSION_;

    /**
     * @type {boolean}
     * @private
     */
    this.zoomOnClick_ = true;

    if (options['zoomOnClick'] != undefined) {
        this.zoomOnClick_ = options['zoomOnClick'];
    }

    /**
     * @type {boolean}
     * @private
     */
    this.averageCenter_ = false;

    if (options['averageCenter'] != undefined) {
        this.averageCenter_ = options['averageCenter'];
    }

    this.setupStyles_();

    this.setMap(map);

    /**
     * @type {number}
     * @private
     */
    this.prevZoom_ = this.map_.getZoom();

    // Add the map event listeners
    var that = this;
    google.maps.event.addListener(this.map_, 'zoom_changed', function () {
        // Determines map type and prevent illegal zoom levels
        var zoom = that.map_.getZoom();
        var minZoom = that.map_.minZoom || 0;
        var maxZoom = Math.min(that.map_.maxZoom || 100,
            that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom);
        zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

        if (that.prevZoom_ != zoom) {
            that.prevZoom_ = zoom;
            that.resetViewport();
        }
    });

    google.maps.event.addListener(this.map_, 'idle', function () {
        that.redraw();
    });

    // Finally, add the markers
    if (opt_markers && (opt_markers.length || Object.keys(opt_markers).length)) {
        this.addMarkers(opt_markers, false);
    }
}


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = '../images/m';


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return (function (object) {
        for (var property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }).apply(obj1, [obj2]);
};


/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
    this.setReady_(true);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () {
};

/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function () {
    if (this.styles_.length) {
        return;
    }

    for (var i = 0, size; size = this.sizes[i]; i++) {
        this.styles_.push({
            url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
            height: size,
            width: size
        });
    }
};

/**
 *  Fit the map to the bounds of the markers in the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }

    this.map_.fitBounds(bounds);
};


/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
};


/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};


/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function () {
    return this.zoomOnClick_;
};

/**
 * Whether average center is set.
 *
 * @return {boolean} True if averageCenter_ is set.
 */
MarkerClusterer.prototype.isAverageCenter = function () {
    return this.averageCenter_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 *  Returns the number of markers in the clusterer
 *
 *  @return {Number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};


/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
};


/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
};


/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function (markers, numStyles) {
    var index = 0;
    var count = markers.length;
    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }

    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index
    };
};


/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *     calculator. The function should return a object properties:
 *     'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
};


/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};


/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    if (markers.length) {
        for (var i = 0, marker; marker = markers[i]; i++) {
            this.pushMarkerTo_(marker);
        }
    } else if (Object.keys(markers).length) {
        for (var marker in markers) {
            this.pushMarkerTo_(markers[marker]);
        }
    }
    if (!opt_nodraw) {
        this.redraw();
    }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    marker.isAdded = false;
    if (marker['draggable']) {
        // If the marker is draggable add a listener so we update the clusters on
        // the drag end.
        var that = this;
        google.maps.event.addListener(marker, 'dragend', function () {
            marker.isAdded = false;
            that.repaint();
        });
    }
    this.markers_.push(marker);
};


/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
        this.redraw();
    }
};


/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var index = -1;
    if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                index = i;
                break;
            }
        }
    }

    if (index == -1) {
        // Marker is not in our list of markers.
        return false;
    }

    marker.setMap(null);

    this.markers_.splice(index, 1);

    return true;
};


/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    } else {
        return false;
    }
};


/**
 * Removes an array of markers from the cluster.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    // create a local copy of markers if required
    // (removeMarker_ modifies the getMarkers() array in place)
    var markersCopy = markers === this.getMarkers() ? markers.slice() : markers;
    var removed = false;

    for (var i = 0, marker; marker = markersCopy[i]; i++) {
        var r = this.removeMarker_(marker);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    }
};


/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function (ready) {
    if (!this.ready_) {
        this.ready_ = ready;
        this.createClusters_();
    }
};


/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};


/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function () {
    return this.map_;
};


/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function (map) {
    this.map_ = map;
};


/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};


/**
 * Sets the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (size) {
    this.gridSize_ = size;
};


/**
 * Returns the min cluster size.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getMinClusterSize = function () {
    return this.minClusterSize_;
};

/**
 * Sets the min cluster size.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setMinClusterSize = function (size) {
    this.minClusterSize_ = size;
};


/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
        bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
        bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
};


/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
};


/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport(true);

    // Set the markers a empty array.
    this.markers_ = [];
};


/**
 * Clears all existing clusters and recreates them.
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerClusterer.prototype.resetViewport = function (opt_hide) {
    // Remove all the clusters
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        cluster.remove();
    }

    // Reset the markers to not be added and to be invisible.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        marker.isAdded = false;
        if (opt_hide) {
            marker.setMap(null);
        }
    }

    this.clusters_ = [];
};

/**
 *
 */
MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_.length = 0;
    this.resetViewport();
    this.redraw();

    // Remove the old clusters.
    // Do it in a timeout so the other clusters have been drawn first.
    window.setTimeout(function () {
        for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
            cluster.remove();
        }
    }, 0);
};


/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function () {
    this.createClusters_();
};


/**
 * Calculates the distance between two latlng locations in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @private
 */
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    if (!p1 || !p2) {
        return 0;
    }

    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};


/**
 * Add a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    var pos = marker.getPosition();
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        var center = cluster.getCenter();
        if (center) {
            var d = this.distanceBetweenPoints_(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        var cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
    }
};


/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function () {
    if (!this.ready_) {
        return;
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
        this.map_.getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);

    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
            this.addToClosestCluster_(marker);
        }
    }
};


/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
    this.markerClusterer_ = markerClusterer;
    this.map_ = markerClusterer.getMap();
    this.gridSize_ = markerClusterer.getGridSize();
    this.minClusterSize_ = markerClusterer.getMinClusterSize();
    this.averageCenter_ = markerClusterer.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
        markerClusterer.getGridSize());
}

/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
    if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) != -1;
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function (marker) {
    if (this.isMarkerAlreadyAdded(marker)) {
        return false;
    }

    if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
    } else {
        if (this.averageCenter_) {
            var l = this.markers_.length + 1;
            var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
            var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
            this.center_ = new google.maps.LatLng(lat, lng);
            this.calculateBounds_();
        }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    var len = this.markers_.length;
    if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
        // Min cluster size not reached so show the marker.
        marker.setMap(this.map_);
    }

    if (len == this.minClusterSize_) {
        // Hide the markers that were showing.
        for (var i = 0; i < len; i++) {
            this.markers_[i].setMap(null);
        }
    }

    if (len >= this.minClusterSize_) {
        marker.setMap(null);
    }

    this.updateIcon();
    return true;
};


/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }
    return bounds;
};


/**
 * Removes the cluster
 */
Cluster.prototype.remove = function () {
    this.clusterIcon_.remove();
    this.markers_.length = 0;
    delete this.markers_;
};


/**
 * Returns the number of markers in the cluster.
 *
 * @return {number} The number of markers in the cluster.
 */
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};


/**
 * Returns a list of the markers in the cluster.
 *
 * @return {Array.<google.maps.Marker>} The markers in the cluster.
 */
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function () {
    return this.center_;
};


/**
 * Calculated the extended bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
};


/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function () {
    return this.map_;
};


/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function () {
    var zoom = this.map_.getZoom();
    var mz = this.markerClusterer_.getMaxZoom();

    if (mz && zoom > mz) {
        // The zoom is greater than our max zoom so show all the markers in cluster.
        for (var i = 0, marker; marker = this.markers_[i]; i++) {
            marker.setMap(this.map_);
        }
        return;
    }

    if (this.markers_.length < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.setSums(sums);
    this.clusterIcon_.show();
};


/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.styles_ = styles;
    this.padding_ = opt_padding || 0;
    this.cluster_ = cluster;
    this.center_ = null;
    this.map_ = cluster.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(this.map_);
}


/**
 * Triggers the clusterclick event and zoom's if the option is set.
 */
ClusterIcon.prototype.triggerClusterClick = function () {
    var markerClusterer = this.cluster_.getMarkerClusterer();

    // Trigger the clusterclick event.
    google.maps.event.trigger(markerClusterer.map_, 'clusterclick', this.cluster_);

    if (markerClusterer.isZoomOnClick()) {
        // Zoom into the cluster.
        this.map_.fitBounds(this.cluster_.getBounds());
    }
};


/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function () {
    this.div_ = document.createElement('DIV');
    this.div_.className = 'mkdf-cluster-marker';
    if (this.visible_) {
        var clusterItems = this.cluster_.markers_;
        var clusterItemsIDs = [];

        if (typeof clusterItems === 'object') {
            for (var $i = 0; $i < clusterItems.length; $i++){
                clusterItemsIDs.push(clusterItems[$i].templateData.itemId);
            }
        }

        this.div_.setAttribute('data-item-ids', clusterItemsIDs);

        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.innerHTML = '<div class="mkdf-cluster-marker-inner">' +
            '<span class="mkdf-cluster-marker-number">' + this.sums_.text + '</span>' +
            '<span class="mkdf-cluster-marker-spiner"></span>' +
            '</div>';
    }

    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);

    var that = this;
    google.maps.event.addDomListener(this.div_, 'click', function () {
        that.triggerClusterClick();
    });
};


/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
    return pos;
};


/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + 'px';
        this.div_.style.left = pos.x + 'px';
        this.div_.style.zIndex = google.maps.Marker.MAX_ZINDEX + 1;
    }
};


/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.display = 'none';
    }
    this.visible_ = false;
};


/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.style.display = '';
    }
    this.visible_ = true;
};


/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function () {
    this.setMap(null);
};


/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.hide();
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};


/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function (sums) {
    this.sums_ = sums;
    this.text_ = sums.text;
    this.index_ = sums.index;
    if (this.div_) {
        this.div_.innerHTML = sums.text;
    }

    this.useStyle();
};


/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function () {
    var index = Math.max(0, this.sums_.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style['url'];
    this.height_ = style['height'];
    this.width_ = style['width'];
    this.textColor_ = style['textColor'];
    this.anchor_ = style['anchor'];
    this.textSize_ = style['textSize'];
    this.backgroundPosition_ = style['backgroundPosition'];
};


/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
};


/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    style.push('background-image:url(' + this.url_ + ');');
    var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
    style.push('background-position:' + backgroundPosition + ';');

    if (typeof this.anchor_ === 'object') {
        if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
            this.anchor_[0] < this.height_) {
            style.push('height:' + (this.height_ - this.anchor_[0]) +
                'px; padding-top:' + this.anchor_[0] + 'px;');
        } else {
            style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
                'px;');
        }
        if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
            this.anchor_[1] < this.width_) {
            style.push('width:' + (this.width_ - this.anchor_[1]) +
                'px; padding-left:' + this.anchor_[1] + 'px;');
        } else {
            style.push('width:' + this.width_ + 'px; text-align:center;');
        }
    } else {
        style.push('height:' + this.height_ + 'px; line-height:' +
            this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    }

    var txtColor = this.textColor_ ? this.textColor_ : 'black';
    var txtSize = this.textSize_ ? this.textSize_ : 11;

    style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
        pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
        txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
    return style.join('');
};


// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
var window = window || {};
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] =
    MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['fitMapToMarkers'] =
    MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype['getCalculator'] =
    MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] =
    MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getExtendedBounds'] =
    MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] =
    MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] =
    MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] =
    MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['removeMarkers'] =
    MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype['resetViewport'] =
    MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['repaint'] =
    MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype['setCalculator'] =
    MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] =
    MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['setMaxZoom'] =
    MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
Cluster.prototype['getSize'] = Cluster.prototype.getSize;
Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;

Object.keys = Object.keys || function (o) {
    var result = [];
    for (var name in o) {
        if (o.hasOwnProperty(name))
            result.push(name);
    }
    return result;
};

if (typeof module === 'object') {
    module.exports = MarkerClusterer;
}
(function($) {
    'use strict';
	
	var accordions = {};
	mkdf.modules.accordions = accordions;
	
	accordions.mkdfInitAccordions = mkdfInitAccordions;
	
	
	accordions.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitAccordions();
	}
	
	/**
	 * Init accordions shortcode
	 */
	function mkdfInitAccordions(){
		var accordion = $('.mkdf-accordion-holder');
		
		if(accordion.length){
			accordion.each(function(){
				var thisAccordion = $(this);

				if(thisAccordion.hasClass('mkdf-accordion')){
					thisAccordion.accordion({
						animate: "swing",
						collapsible: true,
						active: 0,
						icons: "",
						heightStyle: "content"
					});
				}

				if(thisAccordion.hasClass('mkdf-toggle')){
					var toggleAccordion = $(this),
						toggleAccordionTitle = toggleAccordion.find('.mkdf-accordion-title'),
						toggleAccordionContent = toggleAccordionTitle.next();

					toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
					toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
					toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

					toggleAccordionTitle.each(function(){
						var thisTitle = $(this);

						thisTitle.mouseenter(function() {
							thisTitle.addClass("ui-state-hover");
						})
						.mouseleave(function() {
							thisTitle.removeClass("ui-state-hover");
						});

						thisTitle.on('click',function(){
							thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
							thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
						});
					});
				}
			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var button = {};
	mkdf.modules.button = button;
	
	button.mkdfButton = mkdfButton;
	
	
	button.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfButton().init();
	}
	
	/**
	 * Button object that initializes whole button functionality
	 * @type {Function}
	 */
	var mkdfButton = function() {
		//all buttons on the page
		var buttons = $('.mkdf-btn');
		
		/**
		 * Initializes button hover color
		 * @param button current button
		 */
		var buttonHoverColor = function(button) {
			if(typeof button.data('hover-color') !== 'undefined') {
				var changeButtonColor = function(event) {
					event.data.button.css('color', event.data.color);
				};
				
				var originalColor = button.css('color');
				var hoverColor = button.data('hover-color');
				
				button.on('mouseenter', { button: button, color: hoverColor }, changeButtonColor);
				button.on('mouseleave', { button: button, color: originalColor }, changeButtonColor);
			}
		};
		
		/**
		 * Initializes button hover background color
		 * @param button current button
		 */
		var buttonHoverBgColor = function(button) {
			if(typeof button.data('hover-bg-color') !== 'undefined') {
				var changeButtonBg = function(event) {
					event.data.button.css('background-color', event.data.color);
				};
				
				var originalBgColor = button.css('background-color');
				var hoverBgColor = button.data('hover-bg-color');
				
				button.on('mouseenter', { button: button, color: hoverBgColor }, changeButtonBg);
				button.on('mouseleave', { button: button, color: originalBgColor }, changeButtonBg);
			}
		};
		
		/**
		 * Initializes button border color
		 * @param button
		 */
		var buttonHoverBorderColor = function(button) {
			if(typeof button.data('hover-border-color') !== 'undefined') {
				var changeBorderColor = function(event) {
					event.data.button.css('border-color', event.data.color);
				};
				
				var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
				var hoverBorderColor = button.data('hover-border-color');
				
				button.on('mouseenter', { button: button, color: hoverBorderColor }, changeBorderColor);
				button.on('mouseleave', { button: button, color: originalBorderColor }, changeBorderColor);
			}
		};
		
		return {
			init: function() {
				if(buttons.length) {
					buttons.each(function() {
						buttonHoverColor($(this));
						buttonHoverBgColor($(this));
						buttonHoverBorderColor($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
	'use strict';
	
	var countdown = {};
	mkdf.modules.countdown = countdown;
	
	countdown.mkdfInitCountdown = mkdfInitCountdown;
	
	
	countdown.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCountdown();
	}
	
	/**
	 * Countdown Shortcode
	 */
	function mkdfInitCountdown() {
		var countdowns = $('.mkdf-countdown'),
			date = new Date(),
			currentMonth = date.getMonth(),
			year,
			month,
			day,
			hour,
			minute,
			timezone,
			monthLabel,
			dayLabel,
			hourLabel,
			minuteLabel,
			secondLabel;
		
		if (countdowns.length) {
			countdowns.each(function(){
				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#'+countdownId),
					digitFontSize,
					labelFontSize;
				
				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');
				monthLabel = countdown.data('month-label');
				dayLabel = countdown.data('day-label');
				hourLabel = countdown.data('hour-label');
				minuteLabel = countdown.data('minute-label');
				secondLabel = countdown.data('second-label');
				digitFontSize = countdown.data('digit-size');
				labelFontSize = countdown.data('label-size');

				if( currentMonth !== month ) {
					month = month - 1;
				}
				
				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month, day, hour, minute, 44),
					labels: ['', monthLabel, '', dayLabel, hourLabel, minuteLabel, secondLabel],
					format: 'ODHMS',
					timezone: timezone,
					padZeroes: true,
					onTick: setCountdownStyle
				});
				
				function setCountdownStyle() {
					countdown.find('.countdown-amount').css({
						'font-size' : digitFontSize+'px',
						'line-height' : digitFontSize+'px'
					});
					countdown.find('.countdown-period').css({
						'font-size' : labelFontSize+'px'
					});
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var counter = {};
	mkdf.modules.counter = counter;
	
	counter.mkdfInitCounter = mkdfInitCounter;
	
	
	counter.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCounter();
	}
	
	/**
	 * Counter Shortcode
	 */
	function mkdfInitCounter() {
		var counterHolder = $('.mkdf-counter-holder');
		
		if (counterHolder.length) {
			counterHolder.each(function() {
				var thisCounterHolder = $(this),
					thisCounter = thisCounterHolder.find('.mkdf-counter');
				
				thisCounterHolder.appear(function() {
					thisCounterHolder.css('opacity', '1');
					
					//Counter zero type
					if (thisCounter.hasClass('mkdf-zero-counter')) {
						var max = parseFloat(thisCounter.text());
						thisCounter.countTo({
							from: 0,
							to: max,
							speed: 1500,
							refreshInterval: 100
						});
					} else {
						thisCounter.absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					}
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var customFont = {};
	mkdf.modules.customFont = customFont;
	
	customFont.mkdfCustomFontResize = mkdfCustomFontResize;
	customFont.mkdfCustomFontTypeOut = mkdfCustomFontTypeOut;
	
	
	customFont.mkdfOnDocumentReady = mkdfOnDocumentReady;
	customFont.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfCustomFontResize();
	}
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfCustomFontTypeOut();
	}
	
	/*
	 **	Custom Font resizing style
	 */
	function mkdfCustomFontResize() {
		var holder = $('.mkdf-custom-font-holder');
		
		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
				
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-custom-font-holder." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-custom-font-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}
				
				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
	/*
	 * Init Type out functionality for Custom Font shortcode
	 */
	function mkdfCustomFontTypeOut() {
		var mkdfTyped = $('.mkdf-cf-typed');
		
		if (mkdfTyped.length) {
			mkdfTyped.each(function () {
				
				//vars
				var thisTyped = $(this),
					typedWrap = thisTyped.parent('.mkdf-cf-typed-wrap'),
					customFontHolder = typedWrap.parent('.mkdf-custom-font-holder'),
					str = [],
					string_1 = thisTyped.find('.mkdf-cf-typed-1').text(),
					string_2 = thisTyped.find('.mkdf-cf-typed-2').text(),
					string_3 = thisTyped.find('.mkdf-cf-typed-3').text(),
					string_4 = thisTyped.find('.mkdf-cf-typed-4').text();
				
				if (string_1.length) {
					str.push(string_1);
				}
				
				if (string_2.length) {
					str.push(string_2);
				}
				
				if (string_3.length) {
					str.push(string_3);
				}
				
				if (string_4.length) {
					str.push(string_4);
				}
				
				customFontHolder.appear(function () {
					thisTyped.typed({
						strings: str,
						typeSpeed: 90,
						backDelay: 700,
						loop: true,
						contentType: 'text',
						loopCount: false,
						cursorChar: '_'
					});
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';

	var elementsHolder = {};
	mkdf.modules.elementsHolder = elementsHolder;

	elementsHolder.mkdfInitElementsHolderResponsiveStyle = mkdfInitElementsHolderResponsiveStyle;


	elementsHolder.mkdfOnDocumentReady = mkdfOnDocumentReady;

	$(document).ready(mkdfOnDocumentReady);

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitElementsHolderResponsiveStyle();
	}

	/*
	 **	Elements Holder responsive style
	 */
	function mkdfInitElementsHolderResponsiveStyle(){
		var elementsHolder = $('.mkdf-elements-holder');

		if(elementsHolder.length){
			elementsHolder.each(function() {
				var thisElementsHolder = $(this),
					elementsHolderItem = thisElementsHolder.children('.mkdf-eh-item'),
					style = '',
					responsiveStyle = '';

				elementsHolderItem.each(function() {
					var thisItem = $(this),
						itemClass = '',
						largeLaptop = '',
						smallLaptop = '',
						ipadLandscape = '',
						ipadPortrait = '',
						mobileLandscape = '',
						mobilePortrait = '';

					if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
						itemClass = thisItem.data('item-class');
					}
					if (typeof thisItem.data('1400-1600') !== 'undefined' && thisItem.data('1400-1600') !== false) {
                        largeLaptop = thisItem.data('1400-1600');
					}
					if (typeof thisItem.data('1025-1399') !== 'undefined' && thisItem.data('1025-1399') !== false) {
						smallLaptop = thisItem.data('1025-1399');
					}
					if (typeof thisItem.data('769-1024') !== 'undefined' && thisItem.data('769-1024') !== false) {
						ipadLandscape = thisItem.data('769-1024');
					}
					if (typeof thisItem.data('681-768') !== 'undefined' && thisItem.data('681-768') !== false) {
						ipadPortrait = thisItem.data('681-768');
					}
					if (typeof thisItem.data('680') !== 'undefined' && thisItem.data('680') !== false) {
						mobileLandscape = thisItem.data('680');
					}

					if(largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {

						if(largeLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1400px) and (max-width: 1600px) {.mkdf-eh-item-content."+itemClass+" { padding: "+largeLaptop+" !important; } }";
						}
						if(smallLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1399px) {.mkdf-eh-item-content."+itemClass+" { padding: "+smallLaptop+" !important; } }";
						}
						if(ipadLandscape.length) {
							responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadLandscape+" !important; } }";
						}
						if(ipadPortrait.length) {
							responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadPortrait+" !important; } }";
						}
						if(mobileLandscape.length) {
							responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-eh-item-content."+itemClass+" { padding: "+mobileLandscape+" !important; } }";
						}
					}

                    if (typeof mkdf.modules.common.mkdfOwlSlider === "function") { // if owl function exist
                        var owl = thisItem.find('.mkdf-owl-slider');
                        if (owl.length) { // if owl is in elements holder
                            setTimeout(function () {
                                owl.trigger('refresh.owl.carousel'); // reinit owl
                            }, 100);
                        }
                    }

				});

				if(responsiveStyle.length) {
					style = '<style type="text/css">'+responsiveStyle+'</style>';
				}

				if(style.length) {
					$('head').append(style);
				}

			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var fullScreenSections = {};
	mkdf.modules.fullScreenSections = fullScreenSections;
	
	fullScreenSections.mkdfInitFullScreenSections = mkdfInitFullScreenSections;
	
	
	fullScreenSections.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitFullScreenSections();
	}
	
	/*
	 **	Init full screen sections shortcode
	 */
	function mkdfInitFullScreenSections(){
		var fullScreenSections = $('.mkdf-full-screen-sections');
		
		if(fullScreenSections.length){
			fullScreenSections.each(function() {
				var thisFullScreenSections = $(this),
					fullScreenSectionsWrapper = thisFullScreenSections.children('.mkdf-fss-wrapper'),
					fullScreenSectionsItems = fullScreenSectionsWrapper.children('.mkdf-fss-item'),
					fullScreenSectionsItemsNumber = fullScreenSectionsItems.length,
					fullScreenSectionsItemsHasHeaderStyle = fullScreenSectionsItems.hasClass('mkdf-fss-item-has-style'),
					enableContinuousVertical = false,
					enableNavigationData = '',
					enablePaginationData = '';
				
				var defaultHeaderStyle = '';
				if (mkdf.body.hasClass('mkdf-light-header')) {
					defaultHeaderStyle = 'light';
				} else if (mkdf.body.hasClass('mkdf-dark-header')) {
					defaultHeaderStyle = 'dark';
				}
				
				if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
					enableContinuousVertical = true;
				}
				if (typeof thisFullScreenSections.data('enable-navigation') !== 'undefined' && thisFullScreenSections.data('enable-navigation') !== false) {
					enableNavigationData = thisFullScreenSections.data('enable-navigation');
				}
				if (typeof thisFullScreenSections.data('enable-pagination') !== 'undefined' && thisFullScreenSections.data('enable-pagination') !== false) {
					enablePaginationData = thisFullScreenSections.data('enable-pagination');
				}
				
				var enableNavigation = enableNavigationData !== 'no',
					enablePagination = enablePaginationData !== 'no';
				
				fullScreenSectionsWrapper.fullpage({
					sectionSelector: '.mkdf-fss-item',
					scrollingSpeed: 1200,
					verticalCentered: false,
					continuousVertical: enableContinuousVertical,
					navigation: enablePagination,
					onLeave: function(index, nextIndex, direction){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle($(fullScreenSectionsItems[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, nextIndex);
						}
					},
					afterRender: function(){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle(fullScreenSectionsItems.first().data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, 1);
							thisFullScreenSections.children('.mkdf-fss-nav-holder').css('visibility','visible');
						}
						
						fullScreenSectionsWrapper.css('visibility','visible');
					}
				});
				
				setResposniveData(thisFullScreenSections);
				
				if(enableNavigation) {
					thisFullScreenSections.find('#mkdf-fss-nav-up').on('click', function() {
						$.fn.fullpage.moveSectionUp();
						return false;
					});
					
					thisFullScreenSections.find('#mkdf-fss-nav-down').on('click', function() {
						$.fn.fullpage.moveSectionDown();
						return false;
					});
				}
			});
		}
	}
	
	function checkFullScreenSectionsItemForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
		} else {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
		}
	}
	
	function checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, index){
		var thisHolder = thisFullScreenSections,
			thisHolderArrowsUp = thisHolder.find('#mkdf-fss-nav-up'),
			thisHolderArrowsDown = thisHolder.find('#mkdf-fss-nav-down'),
			enableContinuousVertical = false;
		
		if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
			enableContinuousVertical = true;
		}
		
		if (index === 1 && !enableContinuousVertical) {
			thisHolderArrowsUp.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(index !== fullScreenSectionsItemsNumber){
				thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else if (index === fullScreenSectionsItemsNumber && !enableContinuousVertical) {
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(fullScreenSectionsItemsNumber === 2){
				thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else {
			thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
		}
	}
	
	function setResposniveData(thisFullScreenSections) {
		var fullScreenSections = thisFullScreenSections.find('.mkdf-fss-item'),
			responsiveStyle = '',
			style = '';
		
		fullScreenSections.each(function(){
			var thisSection = $(this),
				itemClass = '',
				imageLaptop = '',
				imageTablet = '',
				imagePortraitTablet = '',
				imageMobile = '';
			
			if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
				itemClass = thisSection.data('item-class');
			}
			if (typeof thisSection.data('laptop-image') !== 'undefined' && thisSection.data('laptop-image') !== false) {
				imageLaptop = thisSection.data('laptop-image');
			}
			if (typeof thisSection.data('tablet-image') !== 'undefined' && thisSection.data('tablet-image') !== false) {
				imageTablet = thisSection.data('tablet-image');
			}
			if (typeof thisSection.data('tablet-portrait-image') !== 'undefined' && thisSection.data('tablet-portrait-image') !== false) {
				imagePortraitTablet = thisSection.data('tablet-portrait-image');
			}
			if (typeof thisSection.data('mobile-image') !== 'undefined' && thisSection.data('mobile-image') !== false) {
				imageMobile = thisSection.data('mobile-image');
			}
			
			if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {
				
				if (imageLaptop.length) {
					responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-fss-item." + itemClass + " { background-image: url(" + imageLaptop + ") !important; } }";
				}
				if (imageTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageTablet + ") !important; } }";
				}
				if (imagePortraitTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imagePortraitTablet + ") !important; } }";
				}
				if (imageMobile.length) {
					responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageMobile + ") !important; } }";
				}
			}
		});
		
		if (responsiveStyle.length) {
			style = '<style type="text/css">' + responsiveStyle + '</style>';
		}
		
		if (style.length) {
			$('head').append(style);
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var googleMap = {};
	mkdf.modules.googleMap = googleMap;
	
	googleMap.mkdfShowGoogleMap = mkdfShowGoogleMap;
	
	
	googleMap.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfShowGoogleMap();
	}
	
	/*
	 **	Show Google Map
	 */
	function mkdfShowGoogleMap(){
		var googleMap = $('.mkdf-google-map');
		
		if(googleMap.length){
			googleMap.each(function(){
				var element = $(this);
				
				var snazzyMapStyle = false;
				var snazzyMapCode  = '';
				if(typeof element.data('snazzy-map-style') !== 'undefined' && element.data('snazzy-map-style') === 'yes') {
					snazzyMapStyle = true;
					var snazzyMapHolder = element.parent().find('.mkdf-snazzy-map'),
						snazzyMapCodes  = snazzyMapHolder.val();
					
					if( snazzyMapHolder.length && snazzyMapCodes.length ) {
						snazzyMapCode = JSON.parse( snazzyMapCodes.replace(/`{`/g, '[').replace(/`}`/g, ']').replace(/``/g, '"').replace(/`/g, '') );
					}
				}
				
				var customMapStyle;
				if(typeof element.data('custom-map-style') !== 'undefined') {
					customMapStyle = element.data('custom-map-style');
				}
				
				var colorOverlay;
				if(typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
					colorOverlay = element.data('color-overlay');
				}
				
				var saturation;
				if(typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
					saturation = element.data('saturation');
				}
				
				var lightness;
				if(typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
					lightness = element.data('lightness');
				}
				
				var zoom;
				if(typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
					zoom = element.data('zoom');
				}
				
				var pin;
				if(typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
					pin = element.data('pin');
				}
				
				var mapHeight;
				if(typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
					mapHeight = element.data('height');
				}
				
				var uniqueId;
				if(typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
					uniqueId = element.data('unique-id');
				}
				
				var scrollWheel;
				if(typeof element.data('scroll-wheel') !== 'undefined') {
					scrollWheel = element.data('scroll-wheel');
				}
				var addresses;
				if(typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
					addresses = element.data('addresses');
				}
				
				var map = "map_"+ uniqueId;
				var geocoder = "geocoder_"+ uniqueId;
				var holderId = "mkdf-map-"+ uniqueId;
				
				mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin,  map, geocoder, addresses);
			});
		}
	}
	
	/*
	 **	Init Google Map
	 */
	function mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin,  map, geocoder, data){
		
		if(typeof google !== 'object') {
			return;
		}
		
		var mapStyles = [];
		if(snazzyMapStyle && snazzyMapCode.length) {
			mapStyles = snazzyMapCode;
		} else {
			mapStyles = [
				{
					stylers: [
						{hue: color },
						{saturation: saturation},
						{lightness: lightness},
						{gamma: 1}
					]
				}
			];
		}
		
		var googleMapStyleId;
		
		if(snazzyMapStyle || customMapStyle === 'yes'){
			googleMapStyleId = 'mkdf-style';
		} else {
			googleMapStyleId = google.maps.MapTypeId.ROADMAP;
		}
		
		wheel = wheel === 'yes';
		
		var qoogleMapType = new google.maps.StyledMapType(mapStyles, {name: "Google Map"});
		
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		
		if (!isNaN(height)){
			height = height + 'px';
		}
		
		var myOptions = {
			zoom: zoom,
			scrollwheel: wheel,
			center: latlng,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'mkdf-style'],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeId: googleMapStyleId
		};
		
		map = new google.maps.Map(document.getElementById(holderId), myOptions);
		map.mapTypes.set('mkdf-style', qoogleMapType);
		
		var index;
		
		for (index = 0; index < data.length; ++index) {
			mkdfInitializeGoogleAddress(data[index], pin, map, geocoder);
		}
		
		var holderElement = document.getElementById(holderId);
		holderElement.style.height = height;
	}
	
	/*
	 **	Init Google Map Addresses
	 */
	function mkdfInitializeGoogleAddress(data, pin, map, geocoder){
		if (data === '') {
			return;
		}
		
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<div id="bodyContent">'+
			'<p>'+data+'</p>'+
			'</div>'+
			'</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		geocoder.geocode( { 'address': data}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon:  pin,
					title: data.store_title
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});
				
				google.maps.event.addDomListener(window, 'resize', function() {
					map.setCenter(results[0].geometry.location);
				});
			}
		});
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var timeline = {};
	mkdf.modules.timeline = timeline;
	
	timeline.mkdfInitHorizontalTimeline = mkdfInitHorizontalTimeline;
	
	
	timeline.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitHorizontalTimeline();
	}
	
	function mkdfInitHorizontalTimeline() {
		var timelines = $('.mkdf-horizontal-timeline');
		
		timelines.each(function () {
			var timeline = $(this),
				children = $(this).find('.mkdf-ht-content-item'),
				childrenLength  = $(this).find('.mkdf-ht-content-item').length,
				timelineHolder = timeline.parent().parent(),
				itemDelayCounter = 0,
				timelineWidth = childrenLength * 423,
				thisDraggableWrapper = timeline.parent(),
				draggableOffset = thisDraggableWrapper.offset(),
				box = {
					x1: draggableOffset.left + (thisDraggableWrapper.outerWidth() - timelineWidth),
					y1: draggableOffset.top + (thisDraggableWrapper.outerHeight() - timeline.outerHeight()),
					x2: draggableOffset.left,
					y2: draggableOffset.top
				};
			
			timeline.draggable({
				containment: [box.x1 + 120, box.y1, box.x2, box.y2 ],
				axis: "x"
			});

			timelineHolder.css({'clip-path': 'inset(0 100% 0 0)', '-webkit-clip-path': 'inset(0 100% 0 0)'});
			
			timeline.appear(function() {
				timelineHolder.css({ 'clip-path': 'inset(0 0 0 0)', '-webkit-clip-path': 'inset(0 0 0 0)', 'transition': "clip-path " + childrenLength*.2 + 's linear' });
				$(this).css({'width': timelineWidth});

				children.each(function() {
					itemDelayCounter+=.4;
					$(this).css({'opacity': '1', 'transform': 'translateX(-66px) translateY(-10px)', 'transition': '.3s ' + itemDelayCounter + 's'});
				});

			}, {accX: 0, accY: 50});
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var icon = {};
	mkdf.modules.icon = icon;
	
	icon.mkdfIcon = mkdfIcon;
	
	
	icon.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfIcon().init();
	}
	
	/**
	 * Object that represents icon shortcode
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdfIcon = function() {
		var icons = $('.mkdf-icon-shortcode');
		
		/**
		 * Function that triggers icon animation and icon animation delay
		 */
		var iconAnimation = function(icon) {
			if(icon.hasClass('mkdf-icon-animation')) {
				icon.appear(function() {
					icon.parent('.mkdf-icon-animation-holder').addClass('mkdf-icon-animation-show');
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			}
		};
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var iconElement = icon.find('.mkdf-icon-element');
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};
		
		/**
		 * Function that triggers icon holder background color hover functionality
		 */
		var iconHolderBackgroundHover = function(icon) {
			if(typeof icon.data('hover-background-color') !== 'undefined') {
				var changeIconBgColor = function(event) {
					event.data.icon.css('background-color', event.data.color);
				};
				
				var hoverBackgroundColor = icon.data('hover-background-color');
				var originalBackgroundColor = icon.css('background-color');
				
				if(hoverBackgroundColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		};
		
		/**
		 * Function that initializes icon holder border hover functionality
		 */
		var iconHolderBorderHover = function(icon) {
			if(typeof icon.data('hover-border-color') !== 'undefined') {
				var changeIconBorder = function(event) {
					event.data.icon.css('border-color', event.data.color);
				};
				
				var hoverBorderColor = icon.data('hover-border-color');
				var originalBorderColor = icon.css('borderTopColor');
				
				if(hoverBorderColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
					icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconAnimation($(this));
						iconHoverColor($(this));
						iconHolderBackgroundHover($(this));
						iconHolderBorderHover($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
	'use strict';
	
	var iconListItem = {};
	mkdf.modules.iconListItem = iconListItem;
	
	iconListItem.mkdfInitIconList = mkdfInitIconList;
	
	
	iconListItem.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitIconList().init();
	}
	
	/**
	 * Button object that initializes icon list with animation
	 * @type {Function}
	 */
	var mkdfInitIconList = function() {
		var iconList = $('.mkdf-animate-list');
		
		/**
		 * Initializes icon list animation
		 * @param list current slider
		 */
		var iconListInit = function(list) {
			setTimeout(function(){
				list.appear(function(){
					list.addClass('mkdf-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			},30);
		};
		
		return {
			init: function() {
				if(iconList.length) {
					iconList.each(function() {
						iconListInit($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
    'use strict';
    
    var imageMarquee = {};
    mkdf.modules.imageMarquee = imageMarquee;
    
    imageMarquee.mkdfInitImageMarquee = mkdfInitImageMarquee;
    
    imageMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;
    
    $(document).ready(mkdfOnDocumentReady);
    
    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitImageMarquee();
    }
    
    /**
     * Init Image Marquee effect
     */
    function mkdfInitImageMarquee() {
        var imageMarqueeShortcodes = $('.mkdf-image-marquee');

        if (imageMarqueeShortcodes.length) {

            imageMarqueeShortcodes.each(function(){
                var imageMarqueeShortcode = $(this),
                    marqueeElements = imageMarqueeShortcode.find('.mkdf-image'),
                    originalItem = marqueeElements.filter('.mkdf-original'),
                    auxItem = marqueeElements.filter('.mkdf-aux');

                var marqueeEffect = function () {
	                
                    var delta = 1, //pixel movement
                        speedCoeff = 0.8, // below 1 to slow down, above 1 to speed up
                        marqueeWidth = originalItem.width();

                    auxItem.css('width', marqueeWidth); //same width as the initial marquee element
                    auxItem.css('left', marqueeWidth); //set to the right of the initial marquee element

                    //movement loop
                    marqueeElements.each(function(i){
                        var marqueeElement = $(this),
							currentPos = 0,
							animFrame;

                        var mkdfInfiniteScrollEffect = function() {
                            currentPos -= delta;

                            //move marquee element
                            if (marqueeElement.position().left <= -marqueeWidth) {
                                marqueeElement.css('left', parseInt(marqueeWidth - delta));
                                currentPos = 0;
                            }

                            marqueeElement.css('transform','translate3d('+speedCoeff*currentPos+'px,0,0)');
	
	                        animFrame = requestAnimationFrame(mkdfInfiniteScrollEffect);
                        }; 
						animFrame = requestAnimationFrame(mkdfInfiniteScrollEffect);

						// Function to reset marquee on mobile orientation change
						function mkdfOrientationChange() {
							marqueeWidth = originalItem.width();
							currentPos = 0;
							originalItem.css('left',0); // reset
							auxItem.css('width', marqueeWidth); //same width as the initial marquee element
							auxItem.css('left', marqueeWidth); //set to the right of the inital marquee element
						}
						  
						window.addEventListener('orientationchange', mkdfOrientationChange);
						
						// Mobile Safari touch blocking fix
						mkdf.body.on('touchstart', function(e) {
							if(!$.contains(imageMarqueeShortcode.get(0), e.target)) {
								if (animFrame) {
									cancelAnimationFrame(animFrame);
									animFrame = null;
	
									setTimeout(function() {
										animFrame = requestAnimationFrame(mkdfInfiniteScrollEffect);
									}, 300);
								}
							}
						});
                    });
                };

                imageMarqueeShortcode.waitForImages(function(){
	                marqueeEffect();
	            });
            });
        }
    }
})(jQuery);
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
(function ($) {
	'use strict';
	
	var outlineText = {};
	mkdf.modules.outlineText = outlineText;
	
	outlineText.mkdfOutlineTextResize = mkdfOutlineTextResize;
	
	
	outlineText.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfOutlineTextResize();
	}
	
	/*
	 **	Outline Text resizing style
	 */
	function mkdfOutlineTextResize() {
		var holder = $('.mkdf-outline-text-holder');
		
		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
				
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-outline-text-holder." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-outline-text-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-outline-text-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-outline-text-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}
				
				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var pieChart = {};
	mkdf.modules.pieChart = pieChart;
	
	pieChart.mkdfInitPieChart = mkdfInitPieChart;
	
	
	pieChart.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitPieChart();
	}
	
	/**
	 * Init Pie Chart shortcode
	 */
	function mkdfInitPieChart() {
		var pieChartHolder = $('.mkdf-pie-chart-holder');
		
		if (pieChartHolder.length) {
			pieChartHolder.each(function () {
				var thisPieChartHolder = $(this),
					pieChart = thisPieChartHolder.children('.mkdf-pc-percentage'),
					barColor = '#25abd1',
					trackColor = '#f7f7f7',
					lineWidth = 3,
					size = 176;
				
				if(typeof pieChart.data('size') !== 'undefined' && pieChart.data('size') !== '') {
					size = pieChart.data('size');
				}
				
				if(typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
					barColor = pieChart.data('bar-color');
				}
				
				if(typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
					trackColor = pieChart.data('track-color');
				}
				
				pieChart.appear(function() {
					initToCounterPieChart(pieChart);
					thisPieChartHolder.css('opacity', '1');
					
					pieChart.easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: lineWidth,
						animate: 1500,
						size: size
					});
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
	/*
	 **	Counter for pie chart number from zero to defined number
	 */
	function initToCounterPieChart(pieChart){
		var counter = pieChart.find('.mkdf-pc-percent'),
			max = parseFloat(counter.text());
		
		counter.countTo({
			from: 0,
			to: max,
			speed: 1500,
			refreshInterval: 50
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var process = {};
	mkdf.modules.process = process;
	
	process.mkdfInitProcess = mkdfInitProcess;
	
	
	process.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProcess();
	}
	
	/**
	 * Inti process shortcode on appear
	 */
	function mkdfInitProcess() {
		var holder = $('.mkdf-process-holder');
		
		if(holder.length) {
			holder.each(function(){
				var thisHolder = $(this);
				
				thisHolder.appear(function(){
					thisHolder.addClass('mkdf-process-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var progressBar = {};
	mkdf.modules.progressBar = progressBar;
	
	progressBar.mkdfInitProgressBars = mkdfInitProgressBars;
	
	
	progressBar.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProgressBars();
	}
	
	/*
	 **	Horizontal progress bars shortcode
	 */
	function mkdfInitProgressBars() {
		var progressBar = $('.mkdf-progress-bar');
		
		if (progressBar.length) {
			progressBar.each(function () {
				var thisBar = $(this),
					thisBarContent = thisBar.find('.mkdf-pb-content'),
					progressBar = thisBar.find('.mkdf-pb-percent'),
					percentage = thisBarContent.data('percentage');
				
				thisBar.appear(function () {
					mkdfInitToCounterProgressBar(progressBar, percentage);
					
					thisBarContent.css('width', '0%').animate({'width': percentage + '%'}, 2000);
					
					if (thisBar.hasClass('mkdf-pb-percent-floating')) {
						progressBar.css('left', '0%').animate({'left': percentage + '%'}, 2000);
					}
				});
			});
		}
	}
	
	/*
	 **	Counter for horizontal progress bars percent from zero to defined percent
	 */
	function mkdfInitToCounterProgressBar(progressBar, percentageValue){
		var percentage = parseFloat(percentageValue);
		
		if(progressBar.length) {
			progressBar.each(function() {
				var thisPercent = $(this);
				thisPercent.css('opacity', '1');
				
				thisPercent.countTo({
					from: 0,
					to: percentage,
					speed: 2000,
					refreshInterval: 50
				});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var tabs = {};
	mkdf.modules.tabs = tabs;
	
	tabs.mkdfInitTabs = mkdfInitTabs;
	
	
	tabs.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitTabs();
	}
	
	/*
	 **	Init tabs shortcode
	 */
	function mkdfInitTabs(){
		var tabs = $('.mkdf-tabs');
		
		if(tabs.length){
			tabs.each(function(){
				var thisTabs = $(this);
				
				thisTabs.children('.mkdf-tab-container').each(function(index){
					index = index + 1;
					var that = $(this),
						link = that.attr('id'),
						navItem = that.parent().find('.mkdf-tabs-nav li:nth-child('+index+') a'),
						navLink = navItem.attr('href');
					
					link = '#'+link;

					if(link.indexOf(navLink) > -1) {
						navItem.attr('href',link);
					}
				});
				
				thisTabs.tabs();

                $('.mkdf-tabs a.mkdf-external-link').unbind('click');
			});
		}
	}
	
})(jQuery);
(function ($) {
    'use strict';
    
    var textMarquee = {};
    mkdf.modules.textMarquee = textMarquee;
    
    textMarquee.mkdfTextMarquee = mkdfTextMarquee;
    
    textMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;
    
    $(document).ready(mkdfOnDocumentReady);
    
    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTextMarquee().init();
        mkdfMarqueeTextResize();
    }

    /*
     ** Custom Font resizing
     */
    function mkdfMarqueeTextResize() {
        var marqueeText = $('.mkdf-text-marquee');

        if (marqueeText.length) {
            marqueeText.each(function () {
                var thisMarqueeText = $(this);
                var fontSize;
                var lineHeight;
                var coef1 = 1;
                var coef2 = 1;

                if (mkdf.windowWidth < 1480) {
                    coef1 = 0.8;
                }

                if (mkdf.windowWidth < 1200) {
                    coef1 = 0.7;
                }

                if (mkdf.windowWidth < 768) {
                    coef1 = 0.55;
                    coef2 = 0.65;
                }

                if (mkdf.windowWidth < 600) {
                    coef1 = 0.45;
                    coef2 = 0.55;
                }

                if (mkdf.windowWidth < 480) {
                    coef1 = 0.4;
                    coef2 = 0.5;
                }

                fontSize = parseInt(thisMarqueeText.css('font-size'));

                if (fontSize > 200) {
                    fontSize = Math.round(fontSize * coef1);
                } else if (fontSize > 60) {
                    fontSize = Math.round(fontSize * coef2);
                }

                thisMarqueeText.css('font-size', fontSize + 'px');

                lineHeight = parseInt(thisMarqueeText.css('line-height'));

                if (lineHeight > 70 && mkdf.windowWidth < 1440) {
                    lineHeight = '1.2em';
                } else if (lineHeight > 35 && mkdf.windowWidth < 768) {
                    lineHeight = '1.2em';
                } else {
                    lineHeight += 'px';
                }

                thisMarqueeText.css('line-height', lineHeight);

            });
        }
    }

    /**
     * Init Text Marquee effect
     */
    function mkdfTextMarquee() {
        var marquees = $('.mkdf-text-marquee');

        var Marquee = function (marquee) {
            this.holder = marquee;
            this.els = this.holder.find('.mkdf-marquee-element');
            this.delta = .05;
        }

        var inRange = function (el) {
            if (mkdf.scroll + mkdf.windowHeight >= el.offset().top &&
                mkdf.scroll < el.offset().top + el.height()) {
                return true;
            }

            return false;
        }

        var loop = function (marquee) {
            if (!inRange(marquee.holder)) {
                requestAnimationFrame(function () {
                    loop(marquee);
                });
                return false;
            } else {
                marquee.els.each(function (i) {
                    var el = $(this);
                    el.css('transform', 'translate3d(' + el.data('x') + '%, 0, 0)');
                    el.data('x', (el.data('x') - marquee.delta).toFixed(2));
                    el.offset().left < -el.width() - 25 && el.data('x', 100 * Math.abs(i - 1));
                })
                requestAnimationFrame(function () {
                    loop(marquee);
                });
            }
        }

        var init = function (marquee) {
            marquee.els.each(function (i) {
                $(this).data('x', 0);
            });

            requestAnimationFrame(function () {
                loop(marquee);
            });
        }

        return {
            init: function () {
                marquees.length &&
                marquees.each(function () {
                    var marquee = new Marquee($(this));

                    init(marquee);
                });
            }
        }
    }
})(jQuery);
(function($) {
    'use strict';

    var uncoveringSections = {};
    mkdf.modules.uncoveringSections = uncoveringSections;

    uncoveringSections.mkdfInitUncoveringSections = mkdfInitUncoveringSections;


    uncoveringSections.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitUncoveringSections();
    }

    /*
     **	Init full screen sections shortcode
     */
    function mkdfInitUncoveringSections(){
        var uncoveringSections = $('.mkdf-uncovering-sections');

        if(uncoveringSections.length){
            uncoveringSections.each(function() {
                var thisUS = $(this),
                    thisCurtain = uncoveringSections.find('.curtains'),
                    curtainItems = thisCurtain.find('.mkdf-uss-item'),
                    curtainShadow = uncoveringSections.find('.mkdf-fss-shadow');
                var body = mkdf.body;
                var defaultHeaderStyle = '';
                if (body.hasClass('mkdf-light-header')) {
                    defaultHeaderStyle = 'light';
                } else if (body.hasClass('mkdf-dark-header')) {
                    defaultHeaderStyle = 'dark';
                }

                body.addClass('mkdf-uncovering-section-on-page');
                if(mkdfPerPageVars.vars.mkdfHeaderVerticalWidth > 0 && mkdf.windowWidth > 1024) {
                    curtainItems.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });

                    curtainShadow.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });
                }

                thisCurtain.curtain({
                    scrollSpeed: 400,
                    nextSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle); },
                    prevSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);}
                });

                checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);
                setResposniveData(thisCurtain);

                thisUS.addClass('mkdf-loaded');
            });
        }
    }

    function checkFullScreenSectionsItemForHeaderStyle(thisUncoveringSections, default_header_style) {
        var section_header_style = thisUncoveringSections.find('.current').data('header-style');
        if (section_header_style !== undefined && section_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
        } else if (default_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
        } else {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
        }
    }

    function setResposniveData(thisUncoveringSections) {
        var uncoveringSections = thisUncoveringSections.find('.mkdf-uss-item'),
            responsiveStyle = '',
            style = '';

        uncoveringSections.each(function(){
            var thisSection = $(this),
                thisSectionImage = thisSection.find('.mkdf-uss-image-holder'),
                itemClass = '',
                imageLaptop = '',
                imageTablet = '',
                imagePortraitTablet = '',
                imageMobile = '';

            if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
                itemClass = thisSection.data('item-class');
            }

            if (typeof thisSectionImage.data('laptop-image') !== 'undefined' && thisSectionImage.data('laptop-image') !== false) {
                imageLaptop = thisSectionImage.data('laptop-image');
            }
            if (typeof thisSectionImage.data('tablet-image') !== 'undefined' && thisSectionImage.data('tablet-image') !== false) {
                imageTablet = thisSectionImage.data('tablet-image');
            }
            if (typeof thisSectionImage.data('tablet-portrait-image') !== 'undefined' && thisSectionImage.data('tablet-portrait-image') !== false) {
                imagePortraitTablet = thisSectionImage.data('tablet-portrait-image');
            }
            if (typeof thisSectionImage.data('mobile-image') !== 'undefined' && thisSectionImage.data('mobile-image') !== false) {
                imageMobile = thisSectionImage.data('mobile-image');
            }


            if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {

                if (imageLaptop.length) {
                    responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url(" + imageLaptop + ") !important; } }";
                }
                if (imageTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageTablet + ") !important; } }";
                }
                if (imagePortraitTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imagePortraitTablet + ") !important; } }";
                }
                if (imageMobile.length) {
                    responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageMobile + ") !important; } }";
                }
            }
        });

        if (responsiveStyle.length) {
            style = '<style type="text/css">' + responsiveStyle + '</style>';
        }

        if (style.length) {
            $('head').append(style);
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var destinationList = {};
    mkdf.modules.destinationList = destinationList;

    destinationList.mkdfOnWindowLoad = mkdfOnWindowLoad;
    destinationList.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(window).on('load', mkdfOnWindowLoad);
    $(window).scroll(mkdfOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitDestinationListAnimation();
	    mkdfInitDestinationPagination().init();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
	    mkdfInitDestinationPagination().scroll();
    }

    /**
     * Initializes destination list article animation
     */
    function mkdfInitDestinationListAnimation(){
        var destList = $('.mkdf-destination-list-holder.mkdf-dl-has-animation');

        if(destList.length){
            destList.each(function(){
                var thisDestList = $(this).children('.mkdf-dl-inner');

                thisDestList.children('article').each(function(l) {
                    var thisArticle = $(this);

                    thisArticle.appear(function() {
                        thisArticle.addClass('mkdf-item-show');

                        setTimeout(function(){
                            thisArticle.addClass('mkdf-item-shown');
                        }, 1000);
                    },{accX: 0, accY: 0});
                });
            });
        }
    }
	
	/**
	 * Initializes destination pagination functions
	 */
	function mkdfInitDestinationPagination(){
		var destList = $('.mkdf-destination-list-holder');
		
		var initStandardPagination = function(thisDestList) {
			var standardLink = thisDestList.find('.mkdf-dl-standard-pagination li');
			
			if(standardLink.length) {
				standardLink.each(function(){
					var thisLink = $(this).children('a'),
						pagedLink = 1;
					
					thisLink.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
							pagedLink = thisLink.data('paged');
						}
						
						initMainPagFunctionality(thisDestList, pagedLink);
					});
				});
			}
		};
		
		var initLoadMorePagination = function(thisDestList) {
			var loadMoreButton = thisDestList.find('.mkdf-dl-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisDestList);
			});
		};
		
		var initInifiteScrollPagination = function(thisDestList) {
			var destListHeight = thisDestList.outerHeight(),
				destListTopOffest = thisDestList.offset().top,
				destListPosition = destListHeight + destListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			if(!thisDestList.hasClass('mkdf-dl-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > destListPosition) {
				initMainPagFunctionality(thisDestList);
			}
		};
		
		var initMainPagFunctionality = function(thisDestList, pagedLink) {
			var thisDestListInner = thisDestList.find('.mkdf-dl-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisDestList.data('max-num-pages') !== 'undefined' && thisDestList.data('max-num-pages') !== false) {
				maxNumPages = thisDestList.data('max-num-pages');
			}
			
			if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
				thisDestList.data('next-page', pagedLink);
			}
			
			if(thisDestList.hasClass('mkdf-dl-pag-infinite-scroll')) {
				thisDestList.addClass('mkdf-dl-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisDestList),
				loadingItem = thisDestList.find('.mkdf-dl-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages || maxNumPages === 0){
				if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
					loadingItem.addClass('mkdf-showing mkdf-standard-pag-trigger');
					thisDestList.addClass('mkdf-dl-pag-standard-animate');
				} else {
					loadingItem.addClass('mkdf-showing');
				}
				
				var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wanderland_core_destination_ajax_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdfGlobalVars.vars.mkdfAjaxUrl,
					success: function (data) {
						if(!thisDestList.hasClass('mkdf-dl-pag-standard')) {
							nextPage++;
						}
						
						thisDestList.data('next-page', nextPage);
						
						var response = $.parseJSON(data),
							responseHtml =  response.html;
						
						if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
							mkdfInitStandardPaginationLinkChanges(thisDestList, maxNumPages, nextPage);
							
							thisDestList.waitForImages(function(){
								if(thisDestList.hasClass('mkdf-dl-masonry')){
									mkdfInitHtmlIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								} else if (thisDestList.hasClass('mkdf-dl-gallery') && thisDestList.hasClass('mkdf-dl-has-filter')) {
									mkdfInitHtmlIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								} else {
									mkdfInitHtmlGalleryNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								}
							});
						} else {
							thisDestList.waitForImages(function(){
								if(thisDestList.hasClass('mkdf-dl-masonry')){
								    if(pagedLink === 1) {
                                        mkdfInitHtmlIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
                                    }
								} else if (thisDestList.hasClass('mkdf-dl-gallery') && thisDestList.hasClass('mkdf-dl-has-filter') && pagedLink !== 1) {
									mkdfInitAppendIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								} else {
								    if (pagedLink === 1) {
                                        mkdfInitHtmlGalleryNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendGalleryNewContent(thisDestListInner, loadingItem, responseHtml);
                                    }
								}
							});
						}
						
						if(thisDestList.hasClass('mkdf-dl-infinite-scroll-started')) {
							thisDestList.removeClass('mkdf-dl-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisDestList.find('.mkdf-dl-load-more-holder').hide();
			}
		};
		
		var mkdfInitStandardPaginationLinkChanges = function(thisDestList, maxNumPages, nextPage) {
			var standardPagHolder = thisDestList.find('.mkdf-dl-standard-pagination'),
				standardPagNumericItem = standardPagHolder.find('li.mkdf-pag-number'),
				standardPagPrevItem = standardPagHolder.find('li.mkdf-pag-prev a'),
				standardPagNextItem = standardPagHolder.find('li.mkdf-pag-next a');
			
			standardPagNumericItem.removeClass('mkdf-pag-active');
			standardPagNumericItem.eq(nextPage-1).addClass('mkdf-pag-active');
			
			standardPagPrevItem.data('paged', nextPage-1);
			standardPagNextItem.data('paged', nextPage+1);
			
			if(nextPage > 1) {
				standardPagPrevItem.css({'opacity': '1'});
			} else {
				standardPagPrevItem.css({'opacity': '0'});
			}
			
			if(nextPage === maxNumPages) {
				standardPagNextItem.css({'opacity': '0'});
			} else {
				standardPagNextItem.css({'opacity': '1'});
			}
		};
		
		var mkdfInitHtmlIsotopeNewContent = function(thisDestList, thisDestListInner, loadingItem, responseHtml) {
            thisDestListInner.find('article').remove();
            thisDestListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisDestList, thisDestListInner.find('article'), thisDestListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisDestListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisDestList.removeClass('mkdf-dl-pag-standard-animate');
			
			setTimeout(function() {
				thisDestListInner.isotope('layout');
				mkdfInitDestinationListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitHtmlGalleryNewContent = function(thisDestList, thisDestListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisDestList.removeClass('mkdf-dl-pag-standard-animate');
			thisDestListInner.html(responseHtml);
			mkdfInitDestinationListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
		};
		
		var mkdfInitAppendIsotopeNewContent = function(thisDestList, thisDestListInner, loadingItem, responseHtml) {
            thisDestListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisDestList, thisDestListInner.find('article'), thisDestListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisDestListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing');
			
			setTimeout(function() {
				thisDestListInner.isotope('layout');
				mkdfInitDestinationListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitAppendGalleryNewContent = function(thisDestListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing');
			thisDestListInner.append(responseHtml);
			mkdfInitDestinationListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
		};
		
		return {
			init: function() {
				if(destList.length) {
					destList.each(function() {
						var thisDestList = $(this);
						
						if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
							initStandardPagination(thisDestList);
						}
						
						if(thisDestList.hasClass('mkdf-dl-pag-load-more')) {
							initLoadMorePagination(thisDestList);
						}
						
						if(thisDestList.hasClass('mkdf-dl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisDestList);
						}
					});
				}
			},
			scroll: function() {
				if(destList.length) {
					destList.each(function() {
						var thisDestList = $(this);
						
						if(thisDestList.hasClass('mkdf-dl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisDestList);
						}
					});
				}
			},
            getMainPagFunction: function(thisDestList, paged) {
                initMainPagFunctionality(thisDestList, paged);
            }
		};
	}

})(jQuery);
(function($) {
    'use strict';
	
	var masonryGalleryList = {};
	mkdf.modules.masonryGalleryList = masonryGalleryList;

    masonryGalleryList.mkdfInitMasonryGallery = mkdfInitMasonryGallery;

    masonryGalleryList.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitMasonryGallery().init();
	}
	
	/**
	 * Masonry gallery, init masonry and resize pictures in grid
	 */
	function mkdfInitMasonryGallery() {
		var holder = $('.mkdf-masonry-gallery-holder');
		
		var initMasonryGallery = function (thisHolder, size) {
			thisHolder.waitForImages(function () {
				var masonry = thisHolder.children();
				
				masonry.isotope({
					layoutMode: 'packery',
					itemSelector: '.mkdf-mg-item',
					percentPosition: true,
					packery: {
						gutter: '.mkdf-mg-grid-gutter',
						columnWidth: '.mkdf-mg-grid-sizer'
					}
				});
				
				mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
				
				setTimeout(function () {
					mkdf.modules.common.mkdfInitParallax();
				}, 600);
				
				masonry.isotope( 'layout').css('opacity', '1');
			});
		};
		
		var reInitMasonryGallery = function (thisHolder, size) {
			mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
			
			thisHolder.children().isotope('reloadItems');
		};
		
		return {
			init: function () {
				if (holder.length) {
					holder.each(function () {
						var thisHolder = $(this),
							size = thisHolder.find('.mkdf-mg-grid-sizer').outerWidth();
						
						initMasonryGallery(thisHolder, size);
						
						$(window).resize(function () {
							reInitMasonryGallery(thisHolder, size);
						});
					});
				}
			}
		};
	}

})(jQuery);
(function ($) {
    'use strict';

    var testimonialsCarousel = {};
    mkdf.modules.testimonialsCarousel = testimonialsCarousel;

    testimonialsCarousel.mkdfInitTestimonials = mkdfInitTestimonialsCarousel;


    testimonialsCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitTestimonialsCarousel();
    }

    /**
     * Init testimonials shortcode elegant type
     */
    function mkdfInitTestimonialsCarousel(){
        var testimonial = $('.mkdf-testimonials-holder.mkdf-testimonials-carousel');

        if(testimonial.length){
            testimonial.each(function(){
                var thisTestimonials = $(this),
                    mainTestimonialsSlider = thisTestimonials.find('.mkdf-testimonials-main'),
                    imagePagSlider = thisTestimonials.children('.mkdf-testimonial-image-nav'),
                    loop = true,
                    autoplay = true,
                    sliderSpeed = 5000,
                    sliderSpeedAnimation = 600,
                    mouseDrag = false;

                if (mainTestimonialsSlider.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (mainTestimonialsSlider.data('enable-autoplay') === 'no') {
                    autoplay = false;
                }
                if (typeof mainTestimonialsSlider.data('slider-speed') !== 'undefined' && mainTestimonialsSlider.data('slider-speed') !== false) {
                    sliderSpeed = mainTestimonialsSlider.data('slider-speed');
                }
                if (typeof mainTestimonialsSlider.data('slider-speed-animation') !== 'undefined' && mainTestimonialsSlider.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = mainTestimonialsSlider.data('slider-speed-animation');
                }
                if(mkdf.windowWidth < 680){
                    mouseDrag = true;
                }

                if (mainTestimonialsSlider.length && imagePagSlider.length) {
                    var text = mainTestimonialsSlider.owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: mouseDrag,
                        onInitialize: function () {
                            mainTestimonialsSlider.css('visibility', 'visible');
                        }
                    });

                    var image = imagePagSlider.owlCarousel({
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        center: true,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: false,
                        responsive: {
                            1025: {
                                items: 5
                            },
                            0: {
                                items: 3
                            }
                        },
                        onInitialize: function () {
                            imagePagSlider.css('visibility', 'visible');
                            thisTestimonials.css('opacity', '1');
                        }
                    });

                    imagePagSlider.find('.owl-item').on('click touchpress', function (e) {
                        e.preventDefault();

                        var thisItem = $(this),
                            itemIndex = thisItem.index(),
                            numberOfClones = imagePagSlider.find('.owl-item.cloned').length,
                            modifiedItems = itemIndex - numberOfClones / 2 >= 0 ? itemIndex - numberOfClones / 2 : itemIndex;

                        image.trigger('to.owl.carousel', modifiedItems);
                        text.trigger('to.owl.carousel', modifiedItems);
                    });

                }
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var testimonialsImagePagination = {};
    mkdf.modules.testimonialsImagePagination = testimonialsImagePagination;

    testimonialsImagePagination.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);

    /* 
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTestimonialsImagePagination();
    }

    /**
     * Init Owl Carousel
     */
    function mkdfTestimonialsImagePagination() {
        var sliders = $('.mkdf-testimonials-image-pagination-inner');

        if (sliders.length) {
            sliders.each(function() {
                var slider = $(this),
                    slideItemsNumber = slider.children().length,
                    loop = true,
                    autoplay = true,
                    autoplayHoverPause = false,
                    sliderSpeed = 3500,
                    sliderSpeedAnimation = 500,
                    margin = 0,
                    stagePadding = 0,
                    center = false,
                    autoWidth = false,
                    animateInClass = false, // keyframe css animation
                    animateOutClass = false, // keyframe css animation
                    navigation = true,
                    pagination = false,
                    drag = true,
                    sliderDataHolder = slider;

                if (sliderDataHolder.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
                    sliderSpeed = sliderDataHolder.data('slider-speed');
                }
                if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
                }
                if (sliderDataHolder.data('enable-auto-width') === 'yes') {
                    autoWidth = true;
                }
                if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
                    animateInClass = sliderDataHolder.data('slider-animate-in');
                }
                if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                    animateOutClass = sliderDataHolder.data('slider-animate-out');
                }
                if (sliderDataHolder.data('enable-navigation') === 'no') {
                    navigation = false;
                }
                if (sliderDataHolder.data('enable-pagination') === 'yes') {
                    pagination = true;
                }

                if (navigation && pagination) {
                    slider.addClass('mkdf-slider-has-both-nav');
                }

                if (pagination) {
                    var dotsContainer = '#mkdf-testimonial-pagination';
                    $('.mkdf-tsp-item').on('click', function () {
                        slider.trigger('to.owl.carousel', [$(this).index(), 300]);
                    });
                }

                if (slideItemsNumber <= 1) {
                    loop = false;
                    autoplay = false;
                    navigation = false;
                    pagination = false;
                }

                slider.waitForImages(function () {
                    $(this).owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayHoverPause: autoplayHoverPause,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        margin: margin,
                        stagePadding: stagePadding,
                        center: center,
                        autoWidth: autoWidth,
                        animateIn: animateInClass,
                        animateOut: animateOutClass,
                        dots: pagination,
                        dotsContainer: dotsContainer,
                        nav: navigation,
                        drag: drag,
                        callbacks: true,
                        navText: [
                            '<span class="mkdf-prev-icon ion-chevron-left"></span>',
                            '<span class="mkdf-next-icon ion-chevron-right"></span>'
                        ],
                        onInitialize: function () {
                            slider.css('visibility', 'visible');
                        },
                        onDrag: function (e) {
                            if (mkdf.body.hasClass('mkdf-smooth-page-transitions-fadeout')) {
                                var sliderIsMoving = e.isTrigger > 0;

                                if (sliderIsMoving) {
                                    slider.addClass('mkdf-slider-is-moving');
                                }
                            }
                        },
                        onDragged: function () {
                            if (mkdf.body.hasClass('mkdf-smooth-page-transitions-fadeout') && slider.hasClass('mkdf-slider-is-moving')) {

                                setTimeout(function () {
                                    slider.removeClass('mkdf-slider-is-moving');
                                }, 500);
                            }
                        }
                    });

                });
            });
        }
    }
    
})(jQuery);