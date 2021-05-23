<?php

if ( ! function_exists( 'wanderland_mikado_register_header_bottom_minimal_type' ) ) {
	/**
	 * This function is used to register header type class for header factory file
	 */
	function wanderland_mikado_register_header_bottom_minimal_type( $header_types ) {
		$header_type = array(
			'header-bottom-minimal' => 'WanderlandMikadoNamespace\Modules\Header\Types\HeaderBottomMinimal'
		);
		
		$header_types = array_merge( $header_types, $header_type );
		
		return $header_types;
	}
}

if ( ! function_exists( 'wanderland_mikado_init_register_header_bottom_minimal_type' ) ) {
	/**
	 * This function is used to wait header-function.php file to init header object and then to init hook registration function above
	 */
	function wanderland_mikado_init_register_header_bottom_minimal_type() {
		add_filter( 'wanderland_mikado_filter_register_header_type_class', 'wanderland_mikado_register_header_bottom_minimal_type' );
	}
	
	add_action( 'wanderland_mikado_action_before_header_function_init', 'wanderland_mikado_init_register_header_bottom_minimal_type' );
}

if ( ! function_exists( 'wanderland_mikado_register_header_bottom_minimal_areas' ) ) {
	/**
	 * Registers widget area for sticky header
	 */
	function wanderland_mikado_register_header_bottom_minimal_areas() {
		register_sidebar(
			array(
				'id'            => 'mkdf-header-bottom-minimal',
				'name'          => esc_html__( 'Header Bottom Minimal Widget Area', 'wanderland' ),
				'description'   => esc_html__( 'Widgets added here will appear on the left hand side of header bottom minimal', 'wanderland' ),
				'before_widget' => '<div id="%1$s" class="widget %2$s mkdf-header-bottom-minimal">',
				'after_widget'  => '</div>'
			)
		);
	}
	
	add_action( 'widgets_init', 'wanderland_mikado_register_header_bottom_minimal_areas' );
}

if ( ! function_exists( 'wanderland_mikado_get_bottom_fullscreen_menu_icon_class' ) ) {
	/**
	 * Loads full screen menu icon class
	 */
	function wanderland_mikado_get_bottom_fullscreen_menu_icon_class() {
		$classes = array(
			'mkdf-fullscreen-menu-opener'
		);
		
		$classes[] = wanderland_mikado_get_icon_sources_class( 'fullscreen_menu', 'mkdf-fullscreen-menu-opener' );
		
		return $classes;
	}
}

if ( ! function_exists( 'wanderland_mikado_get_header_bottom_minimal_widget_menu_area' ) ) {
	/**
	 * Loads sticky header widgets area HTML
	 */
	function wanderland_mikado_get_header_bottom_minimal_widget_menu_area() {
		
		if ( is_active_sidebar( 'mkdf-header-bottom-minimal' ) ) {
			dynamic_sidebar( 'mkdf-header-bottom-minimal' );
		}
	}
}