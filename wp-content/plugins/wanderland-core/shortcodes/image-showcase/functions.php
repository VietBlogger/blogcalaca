<?php

if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
	class WPBakeryShortCode_Mkdf_Image_Showcase extends WPBakeryShortCodesContainer {}
	class WPBakeryShortCode_Mkdf_Image_Showcase_Item extends WPBakeryShortCodesContainer {}
}

if ( ! function_exists( 'wanderland_core_add_image_showcase_shortcodes' ) ) {
	function wanderland_core_add_image_showcase_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WanderlandCore\CPT\Shortcodes\ImageShowcase\ImageShowcase',
			'WanderlandCore\CPT\Shortcodes\ImageShowcaseItem\ImageShowcaseItem'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcode', 'wanderland_core_add_image_showcase_shortcodes' );
}

if ( ! function_exists( 'wanderland_core_set_image_showcase_custom_style_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom css style for image showcase shortcode
	 */
	function wanderland_core_set_image_showcase_custom_style_for_vc_shortcodes( $style ) {
		$current_style = '.vc_shortcodes_container.wpb_mkdf_image_showcase_item {
			background-color: #f4f4f4;
		}';
		
		$style .= $current_style;
		
		return $style;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_style', 'wanderland_core_set_image_showcase_custom_style_for_vc_shortcodes' );
}

if ( ! function_exists( 'wanderland_core_set_image_showcase_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for image showcase shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wanderland_core_set_image_showcase_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-image-showcase';
		$shortcodes_icon_class_array[] = '.icon-wpb-image-showcase-item';

		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_icon_class', 'wanderland_core_set_image_showcase_icon_class_name_for_vc_shortcodes' );
}