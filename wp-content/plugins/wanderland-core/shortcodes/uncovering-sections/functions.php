<?php

if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
	class WPBakeryShortCode_Mkdf_Uncovering_Sections extends WPBakeryShortCodesContainer {}
	class WPBakeryShortCode_Mkdf_Uncovering_Sections_Item extends WPBakeryShortCodesContainer {}
}

if ( ! function_exists( 'wanderland_core_add_uncovering_sections_shortcodes' ) ) {
	function wanderland_core_add_uncovering_sections_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WanderlandCore\CPT\Shortcodes\UncoveringSections\UncoveringSections',
			'WanderlandCore\CPT\Shortcodes\UncoveringSections\UncoveringSectionsItem'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcode', 'wanderland_core_add_uncovering_sections_shortcodes' );
}

if ( ! function_exists( 'wanderland_core_set_uncovering_sections_custom_style_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom css style for full screen sections holder shortcode
	 */
	function wanderland_core_set_uncovering_sections_custom_style_for_vc_shortcodes( $style ) {
		$current_style = '.vc_shortcodes_container.wpb_mkdf_uncovering_sections_item { 
			background-color: #f4f4f4; 
		}';
		
		$style .= $current_style;
		
		return $style;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_style', 'wanderland_core_set_uncovering_sections_custom_style_for_vc_shortcodes' );
}

if ( ! function_exists( 'wanderland_core_set_uncovering_sections_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for full screen sections holder shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wanderland_core_set_uncovering_sections_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-uncovering-sections';
		$shortcodes_icon_class_array[] = '.icon-wpb-uncovering-sections-item';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wanderland_core_filter_add_vc_shortcodes_custom_icon_class', 'wanderland_core_set_uncovering_sections_icon_class_name_for_vc_shortcodes' );
}

if ( ! function_exists( 'wanderland_core_set_uncovering_sections_header_top_custom_styles' ) ) {
    /**
     * Function that set custom icon class name for full screen sections holder shortcode to set our icon for Visual Composer shortcodes panel
     */
    function wanderland_core_set_uncovering_sections_header_top_custom_styles() {
        $top_header_height = wanderland_mikado_options()->getOptionValue( 'top_bar_height' );

        if ( ! empty( $top_header_height ) ) {
            echo wanderland_mikado_dynamic_css( '.mkdf-uncovering-section-on-page:not(.mkdf-header-bottom).mkdf-header-top-enabled .mkdf-top-bar', array( 'top' => '-' . wanderland_mikado_filter_px( $top_header_height ) . 'px' ) );
            echo wanderland_mikado_dynamic_css( '.mkdf-uncovering-section-on-page:not(.mkdf-header-bottom).mkdf-header-top-enabled:not(.mkdf-sticky-header-appear) .mkdf-page-header', array( 'top' => wanderland_mikado_filter_px( $top_header_height ) . 'px' ) );
        }
    }

    add_action( 'wanderland_mikado_action_style_dynamic', 'wanderland_core_set_uncovering_sections_header_top_custom_styles' );
}