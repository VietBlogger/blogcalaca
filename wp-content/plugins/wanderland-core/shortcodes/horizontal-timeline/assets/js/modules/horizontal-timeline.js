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