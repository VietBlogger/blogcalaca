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