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