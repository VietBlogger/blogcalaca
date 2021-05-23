<?php

if ( ! function_exists( 'wanderland_mikado_disable_wpml_css' ) ) {
	function wanderland_mikado_disable_wpml_css() {
		define( 'ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true );
	}
	
	add_action( 'after_setup_theme', 'wanderland_mikado_disable_wpml_css' );
}