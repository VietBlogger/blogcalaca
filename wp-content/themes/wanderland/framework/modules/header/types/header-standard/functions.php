<?php

if ( ! function_exists( 'wanderland_mikado_register_header_standard_type' ) ) {
	/**
	 * This function is used to register header type class for header factory file
	 */
	function wanderland_mikado_register_header_standard_type( $header_types ) {
		$header_type = array(
			'header-standard' => 'WanderlandMikadoNamespace\Modules\Header\Types\HeaderStandard'
		);
		
		$header_types = array_merge( $header_types, $header_type );
		
		return $header_types;
	}
}

if ( ! function_exists( 'wanderland_mikado_init_register_header_standard_type' ) ) {
	/**
	 * This function is used to wait header-function.php file to init header object and then to init hook registration function above
	 */
	function wanderland_mikado_init_register_header_standard_type() {
		add_filter( 'wanderland_mikado_filter_register_header_type_class', 'wanderland_mikado_register_header_standard_type' );
	}
	
	add_action( 'wanderland_mikado_action_before_header_function_init', 'wanderland_mikado_init_register_header_standard_type' );
}