<?php

/*** Child Theme Function  ***/

	if ( ! function_exists( 'wanderland_mikado_child_theme_enqueue_scripts' ) ) {
	function wanderland_mikado_child_theme_enqueue_scripts() {
		$parent_style = 'wanderland-mikado-default-style';
		
		wp_enqueue_style( 'wanderland-mikado-child-style', get_stylesheet_directory_uri() . '/style.css', array( $parent_style ) );
	}
	
	add_action( 'wp_enqueue_scripts', 'wanderland_mikado_child_theme_enqueue_scripts' );
}