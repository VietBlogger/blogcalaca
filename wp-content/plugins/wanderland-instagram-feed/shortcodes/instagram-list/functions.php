<?php

if ( ! function_exists( 'wanderland_instagram_add_instagram_list_shortcodes' ) ) {
	function wanderland_instagram_add_instagram_list_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WanderlandInstagram\Shortcodes\InstagramList\InstagramList'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wanderland_instagram_filter_add_vc_shortcode', 'wanderland_instagram_add_instagram_list_shortcodes' );
}

if ( ! function_exists( 'wanderland_instagram_set_instagram_list_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for instagram list shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wanderland_instagram_set_instagram_list_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-instagram-list';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_icon_class', 'wanderland_instagram_set_instagram_list_icon_class_name_for_vc_shortcodes' );
}