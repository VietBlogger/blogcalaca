<?php

if ( ! function_exists( 'wanderland_core_add_highlight_shortcodes' ) ) {
	function wanderland_core_add_highlight_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WanderlandCore\CPT\Shortcodes\Highlight\Highlight'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcode', 'wanderland_core_add_highlight_shortcodes' );
}