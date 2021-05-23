<?php

if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
	class WPBakeryShortCode_Mkdf_Full_Screen_Sections extends WPBakeryShortCodesContainer {}
	class WPBakeryShortCode_Mkdf_Full_Screen_Sections_Item extends WPBakeryShortCodesContainer {}
}

if ( ! function_exists( 'wanderland_core_add_full_screen_sections_shortcodes' ) ) {
	function wanderland_core_add_full_screen_sections_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WanderlandCore\CPT\Shortcodes\FullScreenSections\FullScreenSections',
			'WanderlandCore\CPT\Shortcodes\FullScreenSections\FullScreenSectionsItem'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcode', 'wanderland_core_add_full_screen_sections_shortcodes' );
}

if ( ! function_exists( 'wanderland_core_set_full_screen_sections_custom_style_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom css style for full screen sections holder shortcode
	 */
	function wanderland_core_set_full_screen_sections_custom_style_for_vc_shortcodes( $style ) {
		$current_style = '.vc_shortcodes_container.wpb_mkdf_full_screen_sections_item { 
			background-color: #f4f4f4; 
		}';
		
		$style .= $current_style;
		
		return $style;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_style', 'wanderland_core_set_full_screen_sections_custom_style_for_vc_shortcodes' );
}

if ( ! function_exists( 'wanderland_core_set_full_screen_sections_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for full screen sections holder shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wanderland_core_set_full_screen_sections_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-full-screen-sections';
		$shortcodes_icon_class_array[] = '.icon-wpb-full-screen-sections-item';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_icon_class', 'wanderland_core_set_full_screen_sections_icon_class_name_for_vc_shortcodes' );
}