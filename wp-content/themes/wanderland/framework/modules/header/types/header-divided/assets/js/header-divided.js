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