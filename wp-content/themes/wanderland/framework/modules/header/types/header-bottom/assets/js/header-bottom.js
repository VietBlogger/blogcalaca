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