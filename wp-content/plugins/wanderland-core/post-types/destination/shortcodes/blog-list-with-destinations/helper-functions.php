<?php

if ( ! function_exists( 'wanderland_core_add_blog_list_with_destinations_shortcode' ) ) {
	function wanderland_core_add_blog_list_with_destinations_shortcode( $shortcodes_class_name ) {
		$shortcodes = array(
			'WanderlandCore\CPT\Shortcodes\BlogListWithDestinations\BlogListWithDestinations'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcode', 'wanderland_core_add_blog_list_with_destinations_shortcode' );
}

if ( ! function_exists( 'wanderland_core_set_blog_list_with_destinations_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for destination list shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wanderland_core_set_blog_list_with_destinations_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-blog-list-with-destinations';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_icon_class', 'wanderland_core_set_blog_list_with_destinations_icon_class_name_for_vc_shortcodes' );
}